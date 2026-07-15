import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TAuthState, TProductState } from 'redux/types';
import { UsePagination } from 'components/store/storeLayout/utils/HeaderAuth/authorize/helpers';
import styles from './external.module.css';
import StoreLayout from 'components/store/storeLayout/layouts';
import Authorization from 'components/store/storeLayout/utils/HeaderAuth/authorize';
import { fetchProductsByIDs } from 'redux/slicers/productsSlicer';
import AddReviewExternal from 'components/store/reviews/AddReviewExternal';
import SEO from 'components/store/SEO';
import { baseUrl } from 'common/constant';
import { Product } from 'swagger/services';

const parseProductIds = (queryIds: string | string[] | undefined): string[] => {
  if (!queryIds) return [];
  const ids = Array.isArray(queryIds) ? queryIds[0] : queryIds;
  return ids
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean);
};

export const getServerSideProps: GetServerSideProps<{
  firstProduct: Product | null;
  imagesWithUrl: string[];
}> = async (context) => {
  const queryProductIds = context.query.productIds;
  const productIds = parseProductIds(queryProductIds);

  if (productIds.length === 0) {
    return {
      props: { firstProduct: null, imagesWithUrl: [] },
    };
  }

  try {
    const apiUrl = process.env.API_URL || 'http://localhost:4010';
    // Fetch only the first product for SEO meta tags
    const res = await fetch(`${apiUrl}/products/${productIds[0]}`);
    if (!res.ok) {
      return { props: { firstProduct: null, imagesWithUrl: [] } };
    }
    const firstProduct: Product = await res.json();

    const firstVariant = firstProduct.productVariants?.[0];
    const images = firstVariant?.images?.split(', ') || [];
    const imagesWithUrl = images.map((img) => `${baseUrl}/api/images/${img}`);

    return {
      props: { firstProduct, imagesWithUrl },
    };
  } catch (error) {
    console.error('Error fetching first product for SEO:', error);
    return {
      props: { firstProduct: null, imagesWithUrl: [] },
    };
  }
};

const ExternalReviewPage = ({
  firstProduct,
  imagesWithUrl,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector<TAuthState>((state) => state.auth);
  const { reveiwProducts, loading } = useAppSelector<TProductState>(
    (state) => state.products,
  );
  const hasFetched = useRef(false);
  const [direction, authType, paginate] = UsePagination();

  const productIds = parseProductIds(router.query.productIds);
  const token = router.query.token as string;

  useEffect(() => {
    if (!router.isReady) return;
    if (!user) return;
    if (hasFetched.current || loading) return;
    if (productIds.length === 0) return;
    if (reveiwProducts.length > 0) return;
    hasFetched.current = true;
    dispatch(fetchProductsByIDs(productIds));
  }, [
    router.isReady,
    user,
    productIds,
    loading,
    reveiwProducts.length,
    dispatch,
  ]);

  // SEO: rendered unconditionally so social crawlers always get meta tags
  const seoProduct: any = firstProduct || undefined;
  const seoImages = imagesWithUrl || [];

  return (
    <>
      {/* SEO component uses first product's data (server‑side) */}
      <SEO images={seoImages} product={seoProduct} />

      {/* No product IDs in URL */}
      {productIds.length === 0 && (
        <div className={styles.page}>
          <div className={styles.messageBox}>
            <h1>Нет товаров для отзыва</h1>
            <p>В ссылке не указаны идентификаторы товаров.</p>
          </div>
        </div>
      )}

      {/* User is NOT logged in → show sign‑in / sign‑up */}
      {productIds.length > 0 && !user && (
        <div className={styles.AuthContainer}>
          <div className={styles.AuthWrapper}>
            <Authorization
              direction={direction}
              authType={authType}
              paginate={paginate}
            />
          </div>
        </div>
      )}

      {/* User IS logged in → show review forms */}
      {productIds.length > 0 && user && (
        <div className={styles.page}>
          <div className={styles.container}>
            <h1 className={styles.title}>Оставить отзыв</h1>

            {loading && <div className={styles.loading}>Загрузка товаров…</div>}

            {!loading && reveiwProducts.length === 0 && (
              <div className={styles.messageBox}>Товары не найдены.</div>
            )}

            {!loading &&
              reveiwProducts.map((product) => {
                const firstVariant = product.productVariants?.[0];
                const firstImage = firstVariant?.images
                  ?.split(', ')?.[0]
                  ?.trim();
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
                    <AddReviewExternal product={product} token={token || ''} />
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

ExternalReviewPage.PageLayout = StoreLayout;
export default ExternalReviewPage;
