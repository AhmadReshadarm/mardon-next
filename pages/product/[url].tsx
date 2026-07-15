import SEO from 'components/store/SEO';
import StoreLayout from 'components/store/storeLayout/layouts';
import { useEffect, useRef, useState } from 'react';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { Product } from 'swagger/services';
import dynamic from 'next/dynamic';
import ProductInfo from 'components/store/product/productInfo';
import { LoaderMask } from 'ui-kit/generalLoaderMask';
import { handleHistory } from 'common/helpers/history.helper';
import { baseUrl, FALLBACK_BLUR_DATA_URL } from 'common/constant';
import { getBase64Image } from 'common/helpers/getBase64Image.helper';
import Head from 'next/head';
import styles from './productError.module.css';
const Recomendation = dynamic(
  () => import('components/store/product/recomendation'),
  {
    ssr: false,
    loading: () => <LoaderMask />,
  },
);

const ReveiwsAndQuastions = dynamic(
  () => import('components/store/product/reviewsAndQuastions'),
  {
    ssr: false,
    loading: () => <LoaderMask />,
  },
);

// ------------------------------------------------------------------
export const getServerSideProps: GetServerSideProps<{
  repo: Product | null;
  imagesWithUrl: string[];
  imagesWithUrlUI: string[];
  base64Image: string;
  productError: boolean;
}> = async (context) => {
  const { url } = context.query;
  const apiUrl = process.env.API_URL || 'http://localhost:4010';

  const buildImages = (images: string[]) => {
    const withUrl: string[] = [];
    const withUrlUI: string[] = [];
    for (const img of images) {
      withUrl.push(`${baseUrl}/api/images/${img}`);
      withUrlUI.push(`/api/images/${img}`);
    }
    return { imagesWithUrl: withUrl, imagesWithUrlUI: withUrlUI };
  };

  let repo: Product | null = null;
  let productError = false;
  let images: string[] = [];
  let base64Image = FALLBACK_BLUR_DATA_URL;

  try {
    const res = await fetch(`${apiUrl}/products/by-url/${url}`);
    // --- Handle explicit 404 first ---
    if (res.status === 404) {
      return { notFound: true };
    }

    // --- Handle other non‑ok responses ---
    if (!res.ok) {
      // Attempt to parse the error body to detect a "not found" condition
      let errorData: any;
      try {
        errorData = await res.json();
      } catch {
        // body not parseable – treat as a generic error
      }

      // If the payload indicates a 404, show 404 page
      if (
        errorData?.statusCode === 404 ||
        errorData?.messages?.[0]?.includes?.('not found')
      ) {
        return { notFound: true };
      }

      // Otherwise, it's a real server error – flag and continue
      throw new Error(`Product fetch failed with status ${res.status}`);
    }

    // Success: parse product
    repo = await res.json();
    if (!repo?.productVariants?.[0]?.images) {
      // Essential data missing → treat as not found
      return { notFound: true };
    }

    images = repo.productVariants[0].images.split(', ');
  } catch (error) {
    console.error('Product page fetch error:', error);
    productError = true;
    // base64Image stays as fallback, repo and images stay empty
  }

  // --- Build image arrays if we have images ---
  let imagesWithUrl: string[] = [];
  let imagesWithUrlUI: string[] = [];
  if (images.length > 0) {
    ({ imagesWithUrl, imagesWithUrlUI } = buildImages(images));
  }

  // --- Attempt dynamic blur placeholder (non‑critical) ---
  if (!productError && images.length > 0) {
    try {
      const firstUrl = `${apiUrl}/images/compress/${images[0]}?qlty=1&width=100&height=100&lossless=false`;
      const result = await getBase64Image(firstUrl);
      if (result) base64Image = result;
    } catch (e) {
      console.error('Product base64 placeholder failed, using fallback:', e);
    }
  }

  return {
    props: {
      repo,
      imagesWithUrl,
      imagesWithUrlUI,
      base64Image,
      productError,
    },
  };
};

// ------------------------------------------------------------------
const ProductInfoPage = ({
  repo,
  imagesWithUrl,
  imagesWithUrlUI,
  base64Image,
  productError,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const reviewBtnRef = useRef(null);
  const questionBtnRef = useRef(null);
  const [isClient, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);
  useEffect(() => {
    if (isClient && repo) handleHistory(repo.id);
  }, [isClient, repo]);

  // Friendly error message when the product couldn't be fetched
  if (productError || !repo) {
    return (
      <>
        <Head>
          <title>Ошибка загрузки товара</title>
        </Head>
        <div className={styles.Container}>
          <div className={styles.Wrapper}>
            <div className={styles.Content}>
              <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                <h2>Не удалось загрузить товар</h2>
                <p>
                  Пожалуйста, попробуйте обновить страницу или вернитесь позже.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className={styles.refreshButton}
                >
                  Обновить страницу
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO images={imagesWithUrl} product={repo} />
      <ProductInfo
        reviewRef={reviewBtnRef}
        questionRef={questionBtnRef}
        product={repo}
        base64Image={base64Image}
        images={imagesWithUrlUI}
      />

      {isClient ? (
        <>
          <Recomendation product={repo} />
          <ReveiwsAndQuastions
            product={repo}
            reviewRef={reviewBtnRef}
            questionRef={questionBtnRef}
          />
        </>
      ) : (
        <LoaderMask />
      )}
    </>
  );
};

ProductInfoPage.PageLayout = StoreLayout;
export default ProductInfoPage;
