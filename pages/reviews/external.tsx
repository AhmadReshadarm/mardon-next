import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TAuthState } from 'redux/types';
import { UsePagination } from 'components/store/storeLayout/utils/HeaderAuth/authorize/helpers';
import AddReview from 'components/store/product/reviewsAndQuastions/reviews/AddReview';
import { Product, ProductService } from 'swagger/services';
import { openErrorNotification } from 'common/helpers';
import styles from './external.module.css';
import StoreLayout from 'components/store/storeLayout/layouts';

// Dynamically import Authorization – it uses browser APIs
const Authorization = dynamic(
  () => import('components/store/storeLayout/utils/HeaderAuth/authorize'),
  { ssr: false },
);

// Helper: parse comma‑separated product IDs from query
const parseProductIds = (queryIds: string | string[] | undefined): string[] => {
  if (!queryIds) return [];
  const ids = Array.isArray(queryIds) ? queryIds[0] : queryIds;
  return ids
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean);
};

const ExternalReviewPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector<TAuthState>((state) => state.auth);

  // Pagination hook required by the Authorization component
  const [direction, authType, paginate] = UsePagination();

  // Local state for fetched products
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Extract product IDs from URL
  const productIds = parseProductIds(router.query.productIds);

  // Fetch products only when user is logged in and IDs are present
  useEffect(() => {
    if (!user || productIds.length === 0) {
      setProducts([]);
      return;
    }

    let cancelled = false;
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const results = await Promise.all(
          productIds.map((id) =>
            ProductService.findProductById({ productId: id }),
          ),
        );
        if (!cancelled) setProducts(results);
      } catch (e: any) {
        if (!cancelled) {
          console.error(e);
          setError('Не удалось загрузить информацию о товарах.');
          openErrorNotification('Ошибка загрузки товаров');
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchProducts();
    return () => {
      cancelled = true;
    };
  }, [user, productIds.join(',')]);

  // No product IDs in URL
  if (productIds.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.messageBox}>
          <h1>Нет товаров для отзыва</h1>
          <p>В ссылке не указаны идентификаторы товаров.</p>
        </div>
      </div>
    );
  }

  // User is NOT logged in → show sign‑in / sign‑up
  if (!user) {
    return (
      <div className={styles.AuthContainer}>
        <div className={styles.AuthWrapper}>
          <Authorization
            direction={direction}
            authType={authType}
            paginate={paginate}
          />
        </div>
      </div>
    );
  }

  // User IS logged in → show review forms for each product
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Оставить отзыв</h1>

        {isLoading && <div className={styles.loading}>Загрузка товаров…</div>}

        {error && <div className={styles.error}>{error}</div>}

        {!isLoading && !error && products.length === 0 && (
          <div className={styles.messageBox}>Товары не найдены.</div>
        )}

        {!isLoading &&
          products.map((product) => {
            // Take the first image from the first variant as a preview
            const firstVariant = product.productVariants?.[0];
            const firstImage = firstVariant?.images?.split(', ')?.[0]?.trim();

            return (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.productHeader}>
                  {firstImage && (
                    <img
                      src={`/api/images/${firstImage}`}
                      alt={product.name}
                      className={styles.productImage}
                    />
                  )}
                  <div>
                    <h3>{product.name}</h3>
                    {firstVariant?.artical && (
                      <p>Артикул: {firstVariant.artical}</p>
                    )}
                  </div>
                </div>

                {/* Exact AddReview component from the product page */}
                <AddReview product={product} />
              </div>
            );
          })}
      </div>
    </div>
  );
};
ExternalReviewPage.PageLayout = StoreLayout;
export default ExternalReviewPage;
