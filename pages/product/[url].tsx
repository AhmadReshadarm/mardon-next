import { useRouter } from 'next/router';
// import SEO from 'components/store/SEO';
import StoreLayout from 'components/store/storeLayout/layouts';
import ProductInfo from 'components/store/product/productInfo';
import Recomendation from 'components/store/product/recomendation';
import ReveiwsAndQuastions from 'components/store/product/reviewsAndQuastions';
import { useEffect, useRef } from 'react';
import { fetchProduct } from 'redux/slicers/store/productInfoSlicer';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TProductInfoState } from 'redux/types';
import Loading from 'ui-kit/Loading';
import styled from 'styled-components';
import { getProductVariantsImages } from 'common/helpers/getProductVariantsImages.helper';
import React from 'react';
import { fetchCheckouts } from 'redux/slicers/store/checkoutSlicer';
import { ErrorBoundary } from 'react-error-boundary';
import FallbackRender from 'ui-kit/FallbackRenderer';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { Product } from 'swagger/services';
import { baseUrl } from 'common/constant';

import dynamic from 'next/dynamic';
import Head from 'next/head';

const DynamicComponentWithSSR = dynamic(() => import('components/store/SEO'), {
  ssr: true,
});

export const getServerSideProps = (async (context) => {
  const { url } = context.query;
  // Fetch data from external API
  const res = await fetch(`https://nbhoz.ru/api/products/by-url/${url}`);
  const repo: Product = await res.json();

  const images = getProductVariantsImages(repo?.productVariants);
  const imagesWithUrl: string[] = [];
  for (let i = 0; i < images?.length; i++) {
    imagesWithUrl.push(`${baseUrl}/api/images/${images[i]}`);
  }

  // Pass data to the page via props
  return { props: { repo, imagesWithUrl } };
}) as GetServerSideProps<{ repo: Product; imagesWithUrl: string[] }>;

// -----------------------------------------------------------

const ProductInfoPage = ({
  repo,
  imagesWithUrl,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const dispatch = useAppDispatch();
  const { product, loading }: TProductInfoState = useAppSelector(
    (state) => state.productInfo,
  );

  const router = useRouter();
  const reviewBtnRef = useRef(null);
  const questionBtnRef = useRef(null);

  useEffect(() => {
    if (router.query.url) {
      dispatch(fetchProduct(router.query.url as string));
    }
    return () => {};
  }, [dispatch, router.query]);

  useEffect(() => {
    dispatch(fetchCheckouts());
  }, []);

  // const images = getProductVariantsImages(repo?.productVariants);
  // const imagesWithUrl: any = [];
  // for (let i = 0; i < images?.length; i++) {
  //   imagesWithUrl.push(`${baseUrl}/api/images/${images[i]}`);
  // }
  return (
    <>
      {/* <DynamicComponentWithSSR images={imagesWithUrl} product={repo} /> */}
      <Head>
        <title>{repo?.name} | NBHOZ</title>
        <meta name="robots" content="index, follow" />
        <meta name="title" content={repo?.name} />
        <meta name="description" content={repo?.shortDesc} />
        <meta name="image" content={imagesWithUrl[0]} />
        <meta name="keywords" content={repo?.keywords} />
        <link
          rel="canonical"
          href={`https://nbhoz.ru/product/${repo?.url}`}
          key="canonical"
        />
        {/* ------ OG ------- */}
        <meta
          property="twitter:site"
          name="twitter:site"
          content="@nbhoz"
        ></meta>
        <meta
          property="twitter:title"
          name="twitter:title"
          content={repo?.name}
        ></meta>
        <meta
          property="twitter:description"
          name="twitter:description"
          content={repo?.shortDesc}
        ></meta>
        <meta
          property="twitter:creator"
          name="twitter:creator"
          content="@nbhoz"
        ></meta>
        <meta
          property="twitter:image:src"
          name="twitter:image:src"
          content={imagesWithUrl[0]}
        ></meta>
        <meta
          property="twitter:card"
          name="twitter:card"
          content="summary_large_image"
        ></meta>
        <meta property="og:title" name="og:title" content={repo?.name}></meta>
        <meta property="og:type" name="og:type" content="website"></meta>
        <meta
          property="og:url"
          name="og:url"
          content={`https://nbhoz.ru/product/${repo?.url}`}
        ></meta>
        <meta
          property="og:image"
          name="og:image"
          content={imagesWithUrl[0]}
        ></meta>
        <meta
          property="og:image:type"
          name="og:image:type"
          content="image/webp"
        ></meta>
        <meta
          property="og:image:width"
          name="og:image:width"
          content="1080"
        ></meta>
        <meta
          property="og:image:height"
          name="og:image:height"
          content="1080"
        ></meta>
        <meta
          property="og:description"
          name="og:description"
          content={repo?.shortDesc}
        ></meta>
        <meta
          property="og:site_name"
          name="og:site_name"
          content="NBHOZ"
        ></meta>
        <meta
          property="og:published_time"
          name="og:published_time"
          content={repo?.createdAt}
        ></meta>
        <meta
          property="og:modified_time"
          name="og:modified_time"
          content={repo?.updatedAt}
        ></meta>
        {/* ------ OG end ------ */}
        {repo?.reviews?.length != 0 ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'http://schema.org',
                '@type': 'Product',
                name: repo?.name,
                description: repo?.shortDesc,
                // image: image[0],
                image: imagesWithUrl,
                sku: repo?.productVariants![0]?.artical,
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: product?.rating?.avg ?? 0,
                  reviewCount: product?.reviews?.length ?? 0,
                },
                offers: {
                  '@type': 'Offer',
                  url: `https://nbhoz.ru/product/${repo?.url}`,
                  priceCurrency: 'RUB',
                  price: repo?.productVariants![0]?.price,
                  itemCondition: 'https://schema.org/NewCondition',
                  availability: 'https://schema.org/InStock',
                },
              }),
            }}
          />
        ) : (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'http://schema.org',
                '@type': 'Product',
                name: repo?.name,
                description: repo?.shortDesc,
                // image: image[0],
                image: imagesWithUrl,
                sku: repo?.productVariants![0]?.artical,
                offers: {
                  '@type': 'Offer',
                  url: `https://nbhoz.ru/product/${repo?.url}`,
                  priceCurrency: 'RUB',
                  price: repo?.productVariants![0]?.price,
                  itemCondition: 'https://schema.org/NewCondition',
                  availability: 'https://schema.org/InStock',
                },
              }),
            }}
          />
        )}
      </Head>
      {!loading && product && repo ? (
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
      ) : (
        <LoadingWrapper>
          <Loading />
        </LoadingWrapper>
      )}
    </>
  );
};

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
`;

ProductInfoPage.PageLayout = StoreLayout;
export default ProductInfoPage;
