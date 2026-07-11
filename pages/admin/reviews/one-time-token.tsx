import { useState, useCallback, ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { generateOneTimeToken } from 'redux/slicers/reviewsSlicer';
import { searchProducts } from 'redux/slicers/store/globalSlicer';
import { TGlobalState, TReviewState } from 'redux/types';
import debounce from 'lodash/debounce';
import { cleanSearchTerm } from 'components/store/catalog/helpers';
import AdminLayout from 'components/admin/adminLayout/layout';
import styles from './OneTimeToken.module.css';

const OneTimeToken = () => {
  const dispatch = useAppDispatch();

  const { products, productsLoading } = useAppSelector<TGlobalState>(
    (state) => state.global,
  );
  const { oneTimeToken, loading: tokenLoading } = useAppSelector<TReviewState>(
    (state) => state.reviews,
  );

  // Local state
  const [publicKey, setPublicKey] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [selectedProductsMap, setSelectedProductsMap] = useState<
    Map<string, any>
  >(new Map());
  const [copySuccess, setCopySuccess] = useState(false);

  // Debounced search – only fires when the cleaned term is non‑empty
  const delayedSearch = useCallback(
    debounce((term: string) => {
      const cleaned = cleanSearchTerm(term);
      if (!cleaned) return; // do nothing on empty query
      const payload = {
        name: cleaned,
        artical: cleaned,
        limit: 100,
      };
      dispatch(searchProducts(payload));
    }, 500),
    [],
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    delayedSearch(e.target.value);
  };

  // Toggle a single product selection
  const toggleSelection = (product: any) => {
    setSelectedIds((prev) => {
      const updated = new Set(prev);
      if (updated.has(String(product.id))) {
        updated.delete(String(product.id));
      } else {
        updated.add(String(product.id));
      }
      return updated;
    });

    setSelectedProductsMap((prev) => {
      const newMap = new Map(prev);
      if (newMap.has(String(product.id))) {
        newMap.delete(String(product.id));
      } else {
        newMap.set(String(product.id), product);
      }
      return newMap;
    });
  };

  // Select / deselect all currently visible products
  const toggleAll = () => {
    if (!products?.length) return;
    const allIds = products.map((p: any) => String(p.id));
    const allSelected = allIds.every((id) => selectedIds.has(id));

    if (allSelected) {
      // Deselect all
      setSelectedIds(new Set());
      setSelectedProductsMap(new Map());
    } else {
      // Select all current products
      const newIds = new Set(selectedIds);
      const newMap = new Map(selectedProductsMap);
      products.forEach((p: any) => {
        newIds.add(String(p.id));
        newMap.set(String(p.id), p);
      });
      setSelectedIds(newIds);
      setSelectedProductsMap(newMap);
    }
  };

  // Clear all selected products
  const clearAll = () => {
    setSelectedIds(new Set());
    setSelectedProductsMap(new Map());
  };

  // Generate the one‑time token
  const handleGenerate = () => {
    if (!publicKey.trim()) {
      alert('Введите публичный ключ пользователя');
      return;
    }
    if (selectedIds.size === 0) {
      alert('Выберите хотя бы один товар');
      return;
    }

    dispatch(
      generateOneTimeToken({
        publicKey: publicKey.trim(),
      }),
    );
  };

  // Construct the final link
  const baseURL = typeof window !== 'undefined' ? window.location.origin : '';
  const reviewLink = oneTimeToken
    ? `${baseURL}/reviews/external?productIds=${Array.from(selectedIds).join(
        ',',
      )}&token=${oneTimeToken}`
    : '';

  // Copy to clipboard
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(reviewLink);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      alert('Не удалось скопировать ссылку');
    }
  };

  // Selected products as array for rendering
  const selectedProducts = Array.from(selectedProductsMap.values());

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Генерация одноразовой ссылки для отзыва</h1>

      {/* – Public Key Input – */}
      <div className={styles.section}>
        <label className={styles.label}>
          Публичный ключ пользователя
          <input
            type="text"
            value={publicKey}
            onChange={(e) => setPublicKey(e.target.value)}
            placeholder="Введите публичный ключ"
            className={styles.input}
          />
        </label>
      </div>

      {/* – Product Search – */}
      <div className={styles.section}>
        <label className={styles.label}>
          Поиск товаров (название / артикул)
          <input
            type="text"
            onChange={handleSearchChange}
            placeholder="Начните вводить..."
            className={styles.input}
          />
        </label>
      </div>

      {/* – Selected Products Section – */}
      {selectedProducts.length > 0 && (
        <div className={styles.selectedSection}>
          <div className={styles.selectedHeader}>
            <span className={styles.selectedCount}>
              Выбрано товаров: {selectedIds.size}
            </span>
            <button className={styles.clearBtn} onClick={clearAll}>
              Очистить все
            </button>
          </div>
          <ul className={styles.productList}>
            {selectedProducts.map((product: any) => {
              const firstVariant = product.productVariants?.[0];
              const firstImage = firstVariant?.images?.split(',')?.[0]?.trim();
              return (
                <li key={product.id} className={styles.productItem}>
                  <div className={styles.productLabel}>
                    {firstImage && (
                      <img
                        src={`/api/images/${firstImage}`}
                        alt={product.name}
                        className={styles.thumbnail}
                      />
                    )}
                    <div className={styles.productInfo}>
                      <p className={styles.productName}>{product.name}</p>
                      {firstVariant?.artical && (
                        <span className={styles.artical}>
                          Арт: {firstVariant.artical}
                        </span>
                      )}
                    </div>
                    {/* Remove button – visible on hover */}
                    <button
                      className={styles.removeBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSelection(product);
                      }}
                      aria-label="Удалить товар"
                    >
                      ✕
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* – Product Search Results – */}
      <div className={styles.productArea}>
        {productsLoading && (
          <p className={styles.status}>Загрузка товаров...</p>
        )}

        {!productsLoading && products?.length > 0 && (
          <>
            <div className={styles.productListHeader}>
              <label className={styles.checkAll}>
                <input
                  type="checkbox"
                  onChange={toggleAll}
                  checked={
                    products.length > 0 &&
                    products.every((p: any) => selectedIds.has(String(p.id)))
                  }
                />
                <span>Выбрать все</span>
              </label>
            </div>

            <ul className={styles.productList}>
              {products.map((product: any) => {
                const firstVariant = product.productVariants?.[0];
                const firstImage = firstVariant?.images
                  ?.split(',')?.[0]
                  ?.trim();
                return (
                  <li key={product.id} className={styles.productItem}>
                    <label className={styles.productLabel}>
                      <input
                        type="checkbox"
                        checked={selectedIds.has(String(product.id))}
                        onChange={() => toggleSelection(product)}
                      />
                      {firstImage && (
                        <img
                          src={`/api/images/${firstImage}`}
                          alt={product.name}
                          className={styles.thumbnail}
                        />
                      )}
                      <div className={styles.productInfo}>
                        <p className={styles.productName}>{product.name}</p>
                        {firstVariant?.artical && (
                          <span className={styles.artical}>
                            Арт: {firstVariant.artical}
                          </span>
                        )}
                      </div>
                    </label>
                  </li>
                );
              })}
            </ul>
          </>
        )}

        {!productsLoading && products?.length === 0 && (
          <p className={styles.status}>Товары не найдены</p>
        )}
      </div>

      {/* – Generate Button – */}
      <button
        className={styles.generateBtn}
        onClick={handleGenerate}
        disabled={tokenLoading}
      >
        {tokenLoading ? 'Генерация...' : 'Сгенерировать ссылку'}
      </button>

      {/* – Result Link – */}
      {oneTimeToken && (
        <div className={styles.resultBox}>
          <p>Ссылка создана:</p>
          <div className={styles.linkRow}>
            <code className={styles.linkText}>{reviewLink}</code>
            <button className={styles.copyBtn} onClick={copyLink}>
              {copySuccess ? '✓ Скопировано' : 'Копировать'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

OneTimeToken.PageLayout = AdminLayout;
export default OneTimeToken;
