import { useRouter } from 'next/router';
import SEO from 'components/store/SEO';
import StoreLayout from 'components/store/storeLayout/layouts';
import ProductInfo from 'components/store/product/productInfo';
import Recomendation from 'components/store/product/recomendation';
import ReveiwsAndQuastions from 'components/store/product/reviewsAndQuastions';
import { useEffect, useRef, useState } from 'react';
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

  const [isClient, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <>
      <SEO images={imagesWithUrl} product={repo} />
      <>
        {isClient ? (
          !loading && product ? (
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
          )
        ) : (
          ''
        )}
      </>
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
