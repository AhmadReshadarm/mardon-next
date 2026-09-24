import color from 'components/store/lib/ui.colors';
import styled from 'styled-components';
import { useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { AppDispatch } from 'redux/store';
import { openErrorNotification } from 'common/helpers';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import { editProduct } from 'redux/slicers/productsSlicer';
import { fetchProducts } from 'redux/slicers/store/catalogSlicer';

/* ------------------------------ helpers ------------------------------ */

const BATCH_SIZE = 100;

/** "ST-20915 | Размер - 30х40 см." -> "ST-20915"; "st-20915" -> "ST-20915" */
const normalizeArticle = (artical?: string | null): string => {
  if (!artical) return '';
  return artical.includes('|')
    ? artical.split('|')[0].trim().toUpperCase()
    : artical.trim().toUpperCase();
};

/** Matches "В коробке, шт", "В коробке шт", "В коробке", "В коробке, шт.", "В коробка" ... */
const isBoxParam = (name?: string | null): boolean => {
  if (!name) return false;
  return /^в\s+коробк[аеи](\s*,?\s*шт\.?)?$/i.test(name.trim());
};

const isEmptyValue = (value?: string | null): boolean => {
  if (!value) return true;
  const v = value.trim();
  return v === '' || v === '-' || v === '—';
};

/**
 * Article pattern: 2-6 uppercase letters, optional space/dash,
 * 1-8 digits, optional trailing uppercase letter.
 * Matches "ST-2562", "ST-5201", "ST-2022A", "ST 818", etc.
 */
const ARTICLE_REGEX_SOURCE = '[A-ZА-Я]{2,6}[\\s-]?\\d{1,8}[A-ZА-Я]?';

const findArticles = (raw: string) => {
  const re = new RegExp(ARTICLE_REGEX_SOURCE, 'g');
  const out: { article: string; index: number; length: number }[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(raw)) !== null) {
    out.push({ article: m[0], index: m.index, length: m[0].length });
    if (m.index === re.lastIndex) re.lastIndex++;
  }
  return out;
};

/**
 * Parse per-variant strings such as:
 *   "ST-21067: 30 шт | ST-21068: 20 шт | ST-5150: 20 шт"
 *   "ST-2562: 36 шт. ST-2563: 26 шт. ST-2564: 48 шт."
 *   "ST-2526: 12 шт, ST-2532: 12 шт, ST-2533: 10 шт"
 *   "ST-6510: 35шт, ST-6511: 35шт, ST-6512: 35шт"
 *   "(ST-2486 - 12 шт), (ST-2487 - 12 шт)"
 *
 * Returns Map<normalized article, quantity> — first occurrence wins
 * when the same article appears twice. Returns null if no article found.
 */
const extractPerVariant = (raw: string): Map<string, number> | null => {
  const matches = findArticles(raw);
  if (matches.length === 0) return null;

  const map = new Map<string, number>();

  for (let i = 0; i < matches.length; i++) {
    const { article, index, length } = matches[i];
    const normalized = normalizeArticle(article);
    if (map.has(normalized)) continue;

    const endIdx = index + length;
    const nextIdx = i + 1 < matches.length ? matches[i + 1].index : raw.length;
    const segment = raw.slice(endIdx, nextIdx);

    const nums = segment.match(/\d+/g);
    if (nums && nums.length > 0) {
      map.set(normalized, Number(nums[0]));
    }
  }

  return map.size >= 1 ? map : null;
};

/**
 * Extract a single numeric value from a non-per-variant string.
 *
 * Rules in order:
 *  1. "коробк*" is present → take the number immediately after the word,
 *     or the last number before it if nothing follows.
 *       "упаковка 50 шт, В коробка 300 шт."                     → 300
 *       "В коробке 100 штук, упаковок 600 штук"                 → 100
 *       "100 слоев в одной упаковке и 100 упаковок в коробке"   → 100
 *  2. "N уп" / "N упаковок" → take N
 *       "1500шт,150уп"                                          → 150
 *       "1000 шт. 100 упаковок"                                 → 100
 *  3. Exactly one unique number → take it
 *       "50 шт"                                                 → 50
 *       "220"                                                   → 220
 *  4. Otherwise → null (ambiguous)
 */
const extractSingleNumber = (raw: string): number | null => {
  const v = raw.trim();
  if (!v) return null;

  // Rule 1: "коробк*"
  const boxMatch = v.match(/коробк/i);
  if (boxMatch && boxMatch.index !== undefined) {
    const afterIdx = boxMatch.index + boxMatch[0].length;
    const after = v.slice(afterIdx, afterIdx + 40);
    const numAfter = after.match(/\d+/);
    if (numAfter) return Number(numAfter[0]);

    const before = v.slice(Math.max(0, boxMatch.index - 60), boxMatch.index);
    const numsBefore = before.match(/\d+/g);
    if (numsBefore && numsBefore.length > 0) {
      return Number(numsBefore[numsBefore.length - 1]);
    }
  }

  // Rule 2: "N уп"
  const upMatch = v.match(/(\d+)\s*уп/i);
  if (upMatch) return Number(upMatch[1]);

  // Rule 3: single unique number
  const allNums = v.match(/\d+/g);
  if (allNums && new Set(allNums).size === 1) {
    return Number(allNums[0]);
  }

  return null;
};

type Resolution =
  | { kind: 'single'; value: number }
  | { kind: 'perVariant'; map: Map<string, number> }
  | { kind: 'error'; reason: string };

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

  // First try to interpret as per-variant (any article mentioned).
  const perVariant = extractPerVariant(value);
  if (perVariant) {
    return { kind: 'perVariant', map: perVariant };
  }

  // Otherwise single number for all variants.
  const single = extractSingleNumber(value);
  if (single === null) {
    return {
      kind: 'error',
      reason: `could not extract a single number from "${value}"`,
    };
  }

  return { kind: 'single', value: single };
};

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
  const [ignoredLog, setIgnoredLog] = useState<string[]>([]);

  const handleRun = async () => {
    setRunning(true);
    setProgress(0);
    setSuccessLog([]);
    setErrorLog([]);
    setSkippedLog([]);
    setIgnoredLog([]);

    try {
      /* ---------- 1. Fetch all products in batches ---------- */
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

      /* ---------- 2. Process each product ---------- */
      const success: string[] = [];
      const errors: string[] = [];
      const skipped: string[] = [];
      const ignored: string[] = [];

      for (let i = 0; i < all.length; i++) {
        const product = all[i];

        setProgress(Math.floor((100 * (i + 1)) / all.length));
        setStatus(
          `Processing ${i + 1}/${all.length}: ${String(
            product.name || '',
          ).slice(0, 60)}…`,
        );

        // Ignore unpublished products entirely.
        if (product.publish === false) {
          ignored.push(`#${product.id} — unpublished`);
          setIgnoredLog([...ignored]);
          continue;
        }

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

          const save: any = await dispatch(
            editProduct({ ...payload, id: product.id }),
          );

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

        /* ---------- per-variant branch ---------- */
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

        const save: any = await dispatch(
          editProduct({ ...payload, id: product.id }),
        );
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

      /* ---------- 3. Done ---------- */
      setStatus(
        `Done. ${success.length} updated · ${errors.length} error(s) · ${skipped.length} skipped · ${ignored.length} ignored (unpublished).`,
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
            setIgnoredLog([]);
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

      <LogSection>
        <LogHeader>⊘ Ignored — publish=false ({ignoredLog.length})</LogHeader>
        {ignoredLog.length === 0 ? <Empty>—</Empty> : renderList(ignoredLog)}
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
