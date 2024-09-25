import SEO from 'components/store/SEO';
import StoreLayout from 'components/store/storeLayout/layouts';
import { useEffect, useRef, useState } from 'react';
import { setProductStateFromServer } from 'redux/slicers/store/productInfoSlicer';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TProductInfoState } from 'redux/types';
import styled from 'styled-components';
import { getProductVariantsImages } from 'common/helpers/getProductVariantsImages.helper';
import React from 'react';
import { fetchCheckouts } from 'redux/slicers/store/checkoutSlicer';
import { ErrorBoundary } from 'react-error-boundary';
import FallbackRender from 'ui-kit/FallbackRenderer';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { Product } from 'swagger/services';
import { baseUrl } from 'common/constant';
import NotFound from 'pages/404';
import { getAccessToken } from 'common/helpers/jwtToken.helpers';
import dynamic from 'next/dynamic';
import LoaderProduct from 'components/store/product/productInfo/Loader';
import Head from 'next/head';

const ProductInfo = dynamic(
  () => import('components/store/product/productInfo'),
  {
    loading: () => <LoaderMask />,
  },
);

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

export const getServerSideProps = (async (context) => {
  const { url } = context.query;
  // Fetch data from external API
  try {
    const res = await fetch(`https://nbhoz.ru/api/products/by-url/${url}`);
    const repo: Product = await res.json();

    const images = getProductVariantsImages(repo?.productVariants);
    const imagesWithUrl: string[] = [];
    for (let i = 0; i < images?.length; i++) {
      imagesWithUrl.push(`${baseUrl}/api/images/${images[i]}`);
    }

    // Pass data to the page via props
    return { props: { repo, imagesWithUrl } };
  } catch (error) {
    console.log(error);
    return { props: { repo: {}, imagesWithUrl: [] } };
  }
}) as GetServerSideProps<{ repo: Product; imagesWithUrl: string[] }>;

// -----------------------------------------------------------

function isNotFound(obj) {
  if (obj.statusCode == 404 || obj.statusCode >= 500) {
    return true;
  }
  return false;
}

const ProductInfoPage = ({
  repo,
  imagesWithUrl,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const dispatch = useAppDispatch();
  const { product }: TProductInfoState = useAppSelector(
    (state) => state.productInfo,
  );

  // const router = useRouter();
  const reviewBtnRef = useRef(null);
  const questionBtnRef = useRef(null);

  // useEffect(() => {
  //   if (router.query.url) {
  //     dispatch(fetchProduct(router.query.url as string));
  //   }
  //   return () => {};
  // }, [dispatch, router.query]);

  useEffect(() => {
    dispatch(setProductStateFromServer(repo));
    if (getAccessToken()) dispatch(fetchCheckouts());
  }, []);

  const [isClient, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <>
      <SEO images={imagesWithUrl} product={repo} />
      <Head>
        <link rel="preload" as="image" href={imagesWithUrl[0]} />
      </Head>
      <>
        {isClient ? (
          !isNotFound(repo) ? (
            <>
              <ProductInfo
                reviewRef={reviewBtnRef}
                questionRef={questionBtnRef}
                product={product}
              />
              <ErrorBoundary fallbackRender={FallbackRender}>
                <Recomendation product={product} />
              </ErrorBoundary>
              <ErrorBoundary fallbackRender={FallbackRender}>
                <ReveiwsAndQuastions
                  product={product}
                  reviewRef={reviewBtnRef}
                  questionRef={questionBtnRef}
                />
              </ErrorBoundary>
            </>
          ) : isNotFound(repo) ? (
            <NotFound />
          ) : (
            <LoaderProduct />
          )
        ) : (
          <LoaderProduct />
        )}
      </>
    </>
  );
};

const LoaderMask = styled.div`
  width: 100vw;
  height: 100vh;
  background: #cccccca3;
  position: relative;
  overflow: hidden;
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    transform: translateX(-100px);
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    animation: loading 0.8s infinite;
  }

  @keyframes loading {
    100% {
      transform: translateX(100%);
    }
  }
`;

ProductInfoPage.PageLayout = StoreLayout;
export default ProductInfoPage;
