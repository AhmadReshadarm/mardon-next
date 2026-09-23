import color from 'components/store/lib/ui.colors';
import styled from 'styled-components';
import { useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { AppDispatch } from 'redux/store';
import { openErrorNotification } from 'common/helpers';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import { editProduct } from 'redux/slicers/productsSlicer';
import { fetchProducts } from 'redux/slicers/store/catalogSlicer';

/* ----------------------------- helpers ----------------------------- */

const BATCH_SIZE = 100;

/** "ST-20915 | Размер - 30х40 см." -> "ST-20915"; "st-20915" -> "ST-20915" */
const normalizeArticle = (artical?: string | null): string => {
  if (!artical) return '';
  return artical.includes('|')
    ? artical.split('|')[0].trim().toUpperCase()
    : artical.trim().toUpperCase();
};

/** Matches "В коробке, шт", "В коробке шт", "В коробке", "В коробке, шт." ... */
const isBoxParam = (name?: string | null): boolean => {
  if (!name) return false;
  return /^в\s+коробке(\s*,?\s*шт\.?)?$/i.test(name.trim());
};

const isEmptyValue = (value?: string | null): boolean => {
  if (!value) return true;
  const v = value.trim();
  return v === '' || v === '-' || v === '—';
};

/**
 * Extract a single numeric value out of a simple string.
 *  "50 шт"                                          -> 50
 *  "220"                                            -> 220
 *  "100 слоев в одной упаковке и 100 упаковок..."   -> 100  (all numbers equal)
 *  "10 упаковок, 100 шт"                            -> 10   (prefers N... "в коробке")
 *  "10 - 20 шт"                                     -> null (ambiguous)
 */
const extractSingleNumber = (raw: string): number | null => {
  const v = raw.trim();
  if (!v) return null;

  const nums = v.match(/\d+/g);
  if (!nums || nums.length === 0) return null;

  const unique = new Set(nums);
  if (unique.size === 1) return Number(nums[0]);

  // Prefer a number immediately preceding "в коробке"
  const boxMatch = v.match(/(\d+)[^\d]{0,60}?в\s*коробке/i);
  if (boxMatch) return Number(boxMatch[1]);

  return null;
};

/**
 * Parse a per-variant value like:
 *   "ST-21067: 30 шт | ST-21068: 20 шт | ST-5150: 20 шт"
 * Returns a map of normalized article -> quantity.
 */
const extractPerVariant = (raw: string): Map<string, number> => {
  const map = new Map<string, number>();
  const parts = raw.split('|');

  for (const rawPart of parts) {
    const part = rawPart.trim();
    if (!part) continue;

    let article = '';
    let rest = '';

    const colonIdx = part.indexOf(':');
    if (colonIdx !== -1) {
      article = part.slice(0, colonIdx).trim();
      rest = part.slice(colonIdx + 1).trim();
    } else {
      // "ST-21067 - 30 шт"  / "ST-21067 30 шт"
      const m = part.match(
        /^([A-Za-zА-Яа-я]+[\s-]?\d+[A-Za-z]?)\s*[-\s]\s*(.+)$/,
      );
      if (m) {
        article = m[1].trim();
        rest = m[2].trim();
      }
    }

    if (!article || !rest) continue;

    const nums = rest.match(/\d+/g);
    if (!nums || nums.length === 0) continue;

    // Use the last number — that's the "шт" quantity in these strings.
    const num = Number(nums[nums.length - 1]);
    if (!Number.isFinite(num)) continue;

    map.set(normalizeArticle(article), num);
  }

  return map;
};

type Resolution =
  | { kind: 'single'; value: number }
  | { kind: 'perVariant'; map: Map<string, number> }
  | { kind: 'error'; reason: string };

/**
 * Look at a product's parameterProducts and figure out the intended
 * `minimumAllowedOrder` value(s).
 */
const resolveMinimumOrder = (product: any): Resolution => {
  const params = product.parameterProducts || [];

  const boxParams = params.filter((p: any) => isBoxParam(p?.parameter?.name));

  if (boxParams.length === 0) {
    return { kind: 'error', reason: 'no "В коробке, шт" parameter' };
  }

  const withValues = boxParams.filter((p: any) => !isEmptyValue(p?.value));

  if (withValues.length === 0) {
    return { kind: 'error', reason: '"В коробке, шт" parameter has no value' };
  }

  if (withValues.length > 1) {
    return {
      kind: 'error',
      reason: `ambiguous: ${withValues.length} "В коробке, шт" parameters with values`,
    };
  }

  const value = String(withValues[0].value).trim();

  // Per-variant format
  if (value.includes('|')) {
    const map = extractPerVariant(value);
    if (map.size === 0) {
      return {
        kind: 'error',
        reason: `could not parse per-variant value: "${value}"`,
      };
    }
    return { kind: 'perVariant', map };
  }

  const single = extractSingleNumber(value);
  if (single === null) {
    return {
      kind: 'error',
      reason: `could not extract a single number from "${value}"`,
    };
  }

  return { kind: 'single', value: single };
};

/**
 * Build the payload we send to `editProduct`, replacing only
 * `minimumAllowedOrder` on each variant via the supplied resolver.
 */
const buildPayload = (product: any, resolve: (variant: any) => number) => ({
  id: product.id,
  name: product.name,
  desc: product.desc,
  shortDesc: product.shortDesc,
  keywords: product.keywords,
  category: product.category,
  brand: product.brand,
  tags: (product.tags || []).map((tag: any) => tag.id),
  sizes: product.sizes,
  url: product.url,
  rating: product.rating,
  reviews: product.reviews,
  questions: product.questions,
  parameterProducts: product.parameterProducts,
  productVariants: (product.productVariants || []).map((variant: any) => ({
    id: variant.id,
    artical: variant.artical,
    available: variant.available,
    color: variant.color,
    images: variant.images,
    oldPrice: variant.oldPrice,
    wholeSalePrice: variant.wholeSalePrice,
    price: variant.price,
    minimumAllowedOrder: resolve(variant),
  })),
});

/* ------------------------------ component ------------------------------ */

const SetMinimumAllowedOrder = () => {
  const dispatch = useAppDispatch();
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [successLog, setSuccessLog] = useState<string[]>([]);
  const [errorLog, setErrorLog] = useState<string[]>([]);
  const [skippedLog, setSkippedLog] = useState<string[]>([]);

  const handleRun = async () => {
    setRunning(true);
    setProgress(0);
    setSuccessLog([]);
    setErrorLog([]);
    setSkippedLog([]);

    try {
      /* ------------------ 1. Fetch all products ------------------ */
      const all: any[] = [];
      let offset = 0;
      let total = Infinity;

      while (all.length < total) {
        setStatus(
          `Fetching products… (${all.length}/${
            total === Infinity ? '?' : total
          })`,
        );

        const res: any = await dispatch(
          fetchProducts({
            sortBy: 'id',
            orderBy: 'DESC',
            limit: BATCH_SIZE,
            offset,
          } as any),
        );

        const rows: any[] = res?.payload?.rows ?? [];
        total = res?.payload?.length ?? rows.length;

        all.push(...rows);
        offset += BATCH_SIZE;

        if (rows.length === 0) break;
        if (rows.length < BATCH_SIZE) break;
      }

      if (all.length === 0) {
        openErrorNotification('No products fetched');
        setRunning(false);
        return;
      }

      setStatus(`Fetched ${all.length} products — processing…`);

      /* ------------------ 2. Process each product ------------------ */
      const success: string[] = [];
      const errors: string[] = [];
      const skipped: string[] = [];

      for (let i = 0; i < all.length; i++) {
        const product = all[i];

        setProgress(Math.floor((100 * (i + 1)) / all.length));
        setStatus(
          `Processing ${i + 1}/${all.length}: ${String(
            product.name || '',
          ).slice(0, 60)}…`,
        );

        const shortName = String(product.name || '').slice(0, 70);

        const resolution = resolveMinimumOrder(product);

        if (resolution.kind === 'error') {
          errors.push(`#${product.id} "${shortName}" — ${resolution.reason}`);
          setErrorLog([...errors]);
          continue;
        }

        const variants: any[] = product.productVariants || [];
        if (variants.length === 0) {
          errors.push(
            `#${product.id} "${shortName}" — product has no variants`,
          );
          setErrorLog([...errors]);
          continue;
        }

        if (resolution.kind === 'single') {
          const target = resolution.value;

          const allAlreadySet = variants.every(
            (v: any) => v.minimumAllowedOrder === target,
          );
          if (allAlreadySet) {
            skipped.push(`#${product.id} — already ${target} on all variants`);
            setSkippedLog([...skipped]);
            continue;
          }

          const payload: any = buildPayload(product, () => target);
          //   const save: any = await dispatch(
          //     editProduct({ ...payload, id: product.id }),
          //   );
          console.log('from single');

          console.log(payload);

          const save: any = true;
          if (save?.error) {
            errors.push(`#${product.id} — save failed`);
            setErrorLog([...errors]);
          } else {
            success.push(
              `#${product.id} — set ${variants.length} variant(s) → ${target}`,
            );
            setSuccessLog([...success]);
          }
          continue;
        }

        /* -------- per-variant (map: normalized article → number) -------- */
        const map = resolution.map;

        const resolvedVariants = variants.filter((v: any) =>
          map.has(normalizeArticle(v.artical)),
        );

        const missingArticles = variants
          .filter((v: any) => !map.has(normalizeArticle(v.artical)))
          .map((v: any) => v.artical);

        if (resolvedVariants.length === 0) {
          errors.push(
            `#${
              product.id
            } "${shortName}" — per-variant value matched no articles (got: ${Array.from(
              map.keys(),
            ).join(', ')})`,
          );
          setErrorLog([...errors]);
          continue;
        }

        const allAlreadySet =
          missingArticles.length === 0 &&
          resolvedVariants.every(
            (v: any) =>
              v.minimumAllowedOrder === map.get(normalizeArticle(v.artical)),
          );

        if (allAlreadySet) {
          skipped.push(`#${product.id} — already up to date`);
          setSkippedLog([...skipped]);
          continue;
        }

        const payload: any = buildPayload(
          product,
          (variant: any) =>
            map.get(normalizeArticle(variant.artical)) ??
            variant.minimumAllowedOrder,
        );

        // const save: any = await dispatch(
        //   editProduct({ ...payload, id: product.id }),
        // );
        console.log(payload);

        const save: any = true;

        if (save?.error) {
          errors.push(`#${product.id} — save failed`);
          setErrorLog([...errors]);
        } else {
          const detail = resolvedVariants
            .map(
              (v: any) =>
                `${v.artical}=${map.get(normalizeArticle(v.artical))}`,
            )
            .join(', ');
          const warn =
            missingArticles.length > 0
              ? ` (not matched: ${missingArticles.join(', ')})`
              : '';
          success.push(`#${product.id} — ${detail}${warn}`);
          setSuccessLog([...success]);
        }
      }

      /* ------------------ 3. Done ------------------ */
      setStatus(
        `Done. ${success.length} updated · ${errors.length} error(s) · ${skipped.length} skipped.`,
      );
      openSuccessNotification('Finished processing all products');
    } catch (err) {
      openErrorNotification('Unexpected error while processing');
      setStatus('Unexpected error.');
    } finally {
      setRunning(false);
      setProgress(0);
    }
  };

  const renderList = (items: string[]) => (
    <LogList>
      {items.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </LogList>
  );

  return (
    <Wrapper>
      <HeaderWrapper>
        <h3>Set minimumAllowedOrder from "В коробке, шт"</h3>
      </HeaderWrapper>

      {status && <StatusLine>{status}</StatusLine>}

      {progress > 0 && (
        <ProgressBar>
          <div style={{ width: `${progress}%` }} />
        </ProgressBar>
      )}

      <ButtonWrapper>
        <Buttons
          disabled={running}
          onClick={handleRun}
          style={{ opacity: running ? 0.6 : 1 }}
        >
          <span>
            {running ? `Running… ${progress}%` : 'Fetch all & update'}
          </span>
        </Buttons>
        <Buttons
          disabled={running}
          onClick={() => {
            setSuccessLog([]);
            setErrorLog([]);
            setSkippedLog([]);
            setStatus('');
          }}
          style={{ opacity: running ? 0.6 : 1 }}
        >
          <span>Clear logs</span>
        </Buttons>
      </ButtonWrapper>

      <LogSection>
        <LogHeader success>
          ✓ Successful updates ({successLog.length})
        </LogHeader>
        {successLog.length === 0 ? <Empty>—</Empty> : renderList(successLog)}
      </LogSection>

      <LogSection>
        <LogHeader error>✗ Errors / needs fixing ({errorLog.length})</LogHeader>
        {errorLog.length === 0 ? <Empty>—</Empty> : renderList(errorLog)}
      </LogSection>

      <LogSection>
        <LogHeader>↷ Skipped / already correct ({skippedLog.length})</LogHeader>
        {skippedLog.length === 0 ? <Empty>—</Empty> : renderList(skippedLog)}
      </LogSection>
    </Wrapper>
  );
};

export default SetMinimumAllowedOrder;

/* ------------------------------ styles ------------------------------ */

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 10px;
  border: solid 1px;
  padding: 10px;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
`;

const StatusLine = styled.div`
  font-family: monospace;
  font-size: 12px;
  padding: 0 10px;
  color: ${color.textSecondary};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background-color: ${color.rangeBgcolor};
  border-radius: 3px;
  overflow: hidden;

  & > div {
    height: 100%;
    background-color: ${color.btnPrimary};
    transition: width 200ms ease;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Buttons = styled.button`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  background-color: ${color.btnSecondery};
  cursor: pointer;
  transition: 300ms;

  &:hover {
    background-color: ${color.searchBtnBg};
    transform: scale(1.02);
  }
  &:active {
    transform: scale(1);
    background-color: ${color.btnPrimary};
    color: ${color.textPrimary};
  }
  span {
    font-family: var(--font-Jost);
    font-size: 1rem;
  }
`;

const LogSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const LogHeader = styled.div<{ success?: boolean; error?: boolean }>`
  font-family: var(--font-Jost);
  font-weight: 600;
  font-size: 0.9rem;
  color: ${({ success, error }) =>
    success ? '#1a7f37' : error ? '#b42318' : color.textSecondary};
`;

const LogList = styled.div`
  max-height: 220px;
  overflow-y: auto;
  padding: 8px;
  border-radius: 4px;
  background-color: ${color.rangeBgcolor};
  font-family: monospace;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Empty = styled.div`
  font-family: monospace;
  font-size: 12px;
  color: ${color.textSecondary};
  padding: 4px 8px;
`;
