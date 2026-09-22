import color from 'components/store/lib/ui.colors';
import styled from 'styled-components';
import { useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { AppDispatch } from 'redux/store';
import { openErrorNotification } from 'common/helpers';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import { editProduct, fetchChosenProduct } from 'redux/slicers/productsSlicer';
import { fetchProducts } from 'redux/slicers/store/catalogSlicer';
import { clearQueryParams } from 'common/helpers/manageQueryParams.helper';

type RawEntry = { article: string; price: number | string };
type CleanEntry = { article: string; normalized: string; price: number };

const SAMPLE_JSON = `[
  {"article":"ST-21013","price":75},
  {"article":"ST-21013","price":75},
  {"article":"ST-21013","price":75},
  {"article":"ST-1096","price":"not sure 14500"}
]`;

/**
 * Normalizes an article so both sides of the comparison can be matched.
 * e.g. "ST-20915 | Размер - 30х40 см." -> "ST-20915"
 *      "st-20915"                      -> "ST-20915"
 */
const normalizeArticle = (artical?: string | null): string => {
  if (!artical) return '';
  return artical.includes('|')
    ? artical.split('|')[0].trim().toUpperCase()
    : artical.trim().toUpperCase();
};

/**
 * Parses one JSON entry. Returns null if the entry is invalid
 * (missing article, or price not convertible to a finite number).
 */
const parseEntry = (raw: any): CleanEntry | null => {
  if (!raw || typeof raw.article !== 'string') return null;

  const numeric =
    typeof raw.price === 'number'
      ? raw.price
      : Number(String(raw.price ?? '').trim());

  if (!Number.isFinite(numeric)) return null;

  return {
    article: raw.article,
    normalized: normalizeArticle(raw.article),
    price: numeric,
  };
};

/**
 * Deduplicates entries by normalized article. When the same article
 * appears multiple times with the same price (the color/image variants
 * case), we keep a single entry. Conflicting prices keep the first
 * occurrence and are reported back to the caller.
 */
const dedupeEntries = (entries: CleanEntry[]) => {
  const map = new Map<string, CleanEntry>();
  const conflicts: string[] = [];

  for (const e of entries) {
    const existing = map.get(e.normalized);
    if (!existing) {
      map.set(e.normalized, e);
      continue;
    }
    if (existing.price !== e.price) {
      conflicts.push(
        `${e.article}: ${existing.price} vs ${e.price} (keeping ${existing.price})`,
      );
    }
  }

  return { unique: Array.from(map.values()), conflicts };
};

/**
 * Builds a full product payload that preserves all existing fields and
 * replaces the price on **every** variant whose normalized article
 * matches the target (handles multi-variant / multi-color articles).
 */
const buildPayload = (product: any, target: string, newPrice: number) => ({
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
    price:
      normalizeArticle(variant.artical) === target ? newPrice : variant.price,
  })),
});

/**
 * From the search rows (variants may be trimmed), find the product id
 * that owns a variant matching the target article. Falls back to the
 * first row if no match is found.
 */
const resolveProductId = (rows: any[], normalized: string): number | null => {
  for (const product of rows) {
    const match = (product.productVariants || []).find(
      (v: any) => normalizeArticle(v.artical) === normalized,
    );
    if (match) return product.id;
  }
  return rows[0]?.id ?? null;
};

const SetPricesFromJson = () => {
  const dispatch = useAppDispatch();
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [jsonInput, setJsonInput] = useState(SAMPLE_JSON);
  const [log, setLog] = useState<string[]>([]);

  const appendLog = (msg: string) => setLog((prev) => [...prev, msg]);

  const handleSetPrices = async (rawEntries: RawEntry[]) => {
    if (!Array.isArray(rawEntries) || rawEntries.length === 0) {
      openErrorNotification('Please provide a non-empty JSON array');
      return;
    }

    // 1. Validate + dedupe up front.
    const valid: CleanEntry[] = [];
    const invalid: string[] = [];

    for (const raw of rawEntries) {
      const parsed = parseEntry(raw);
      if (parsed) valid.push(parsed);
      else invalid.push(JSON.stringify(raw));
    }

    const { unique, conflicts } = dedupeEntries(valid);

    setRunning(true);
    setProgress(0);
    setLog([]);

    if (invalid.length > 0) {
      appendLog(
        `⚠ skipped ${invalid.length} invalid entr${
          invalid.length === 1 ? 'y' : 'ies'
        }:`,
      );
      invalid.forEach((x) => appendLog(`   · ${x}`));
    }
    if (conflicts.length > 0) {
      appendLog(
        `⚠ ${conflicts.length} conflicting duplicate${
          conflicts.length === 1 ? '' : 's'
        }:`,
      );
      conflicts.forEach((x) => appendLog(`   · ${x}`));
    }
    appendLog(
      `▶ ${unique.length} unique article${
        unique.length === 1 ? '' : 's'
      } to process`,
    );

    if (unique.length === 0) {
      setRunning(false);
      openErrorNotification('No valid entries to process');
      return;
    }

    // 2. Cache full product payloads so different articles that share
    //    the same product don't clobber each other's variants.
    const fullProductCache: Record<number, any> = {};
    let counter = 0;

    const runOne = async (): Promise<void> => {
      if (counter >= unique.length) {
        setProgress(0);
        setRunning(false);
        clearQueryParams();
        openSuccessNotification('All prices updated');
        return;
      }

      const { article, normalized, price } = unique[counter];

      try {
        // 2a. Search by article to resolve the product id.
        const searchRes: any = await dispatch(
          fetchProducts({
            name: normalized,
            limit: 50,
            offset: 0,
          } as any),
        );

        const rows: any[] = searchRes?.payload?.rows ?? [];
        const productId = resolveProductId(rows, normalized);

        if (!productId) {
          appendLog(`✗ ${article} — no product found`);
          counter += 1;
          setProgress(Math.floor((100 * counter) / unique.length));
          return runOne();
        }

        // 2b. Fetch the FULL product so no variants are lost.
        let fullProduct = fullProductCache[productId];
        if (!fullProduct) {
          const fullRes: any = await dispatch(
            fetchChosenProduct(productId as any),
          );
          fullProduct = fullRes?.payload;
          if (!fullProduct) {
            appendLog(
              `✗ ${article} — failed to load full product #${productId}`,
            );
            counter += 1;
            setProgress(Math.floor((100 * counter) / unique.length));
            return runOne();
          }
          fullProductCache[productId] = fullProduct;
        }

        // 2c. Count how many variants will be updated.
        const matchingVariants = (fullProduct.productVariants || []).filter(
          (v: any) => normalizeArticle(v.artical) === normalized,
        );

        if (matchingVariants.length === 0) {
          appendLog(
            `✗ ${article} — variant not present in full product #${productId}`,
          );
          counter += 1;
          setProgress(Math.floor((100 * counter) / unique.length));
          return runOne();
        }

        // 2d. Build payload — updates ALL matching variants.
        const payload: any = buildPayload(fullProduct, normalized, price);

        const result: any = await dispatch(
          editProduct({ ...payload, id: fullProduct.id }),
        );

        if (result?.error) {
          appendLog(`✗ ${article} — save failed`);
        } else {
          const suffix =
            matchingVariants.length > 1
              ? ` (${matchingVariants.length} variants)`
              : '';
          appendLog(`✓ ${article} — set to ${price}${suffix}`);

          // Keep the cache fresh so later articles on the same product
          // build off the latest state.
          fullProductCache[productId] = {
            ...fullProduct,
            productVariants: payload.productVariants,
          };
        }
      } catch (err) {
        appendLog(`✗ ${article} — unexpected error`);
      }

      counter += 1;
      setProgress(Math.floor((100 * counter) / unique.length));
      await runOne();
    };

    await runOne();
  };

  const handleApply = async () => {
    let parsed: RawEntry[];
    try {
      parsed = JSON.parse(jsonInput);
    } catch {
      openErrorNotification('Invalid JSON');
      return;
    }
    if (!Array.isArray(parsed)) {
      openErrorNotification('JSON root must be an array');
      return;
    }
    await handleSetPrices(parsed);
  };

  return (
    <Wrapper>
      <HeaderWrapper>
        <h3>Set prices from JSON {progress !== 0 ? progress + '%' : ''}</h3>
      </HeaderWrapper>

      <Editor
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        rows={14}
        spellCheck={false}
        placeholder='[{"article": "ST-5208", "price": 800}, ...]'
      />

      <ButtonWrapper>
        <Buttons
          disabled={running}
          onClick={handleApply}
          style={{ opacity: running ? 0.6 : 1 }}
        >
          <span>{running ? 'Applying…' : 'Apply prices'}</span>
        </Buttons>
        <Buttons
          disabled={running}
          onClick={() => setLog([])}
          style={{ opacity: running ? 0.6 : 1 }}
        >
          <span>Clear log</span>
        </Buttons>
      </ButtonWrapper>

      {log.length > 0 && (
        <LogWrapper>
          {log.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </LogWrapper>
      )}
    </Wrapper>
  );
};

export default SetPricesFromJson;

/* ----------------------------- styles ----------------------------- */

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

const Editor = styled.textarea`
  width: 100%;
  font-family: monospace;
  font-size: 12px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${color.inactiveIcons};
  background-color: ${color.rangeBgcolor};
  resize: vertical;
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

const LogWrapper = styled.div`
  max-height: 240px;
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
