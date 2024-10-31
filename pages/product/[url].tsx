import SEO from 'components/store/SEO';
import StoreLayout from 'components/store/storeLayout/layouts';
import { useEffect, useRef, useState } from 'react';
import { getProductVariantsImages } from 'common/helpers/getProductVariantsImages.helper';
import React from 'react';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { Product } from 'swagger/services';
import dynamic from 'next/dynamic';
import { getAccessToken } from 'common/helpers/jwtToken.helpers';
import { setProductStateFromServer } from 'redux/slicers/store/productInfoSlicer';
import { useAppDispatch } from 'redux/hooks';
import { fetchCheckouts } from 'redux/slicers/store/checkoutSlicer';
import ProductInfo from 'components/store/product/productInfo';
import { LoaderMask } from 'ui-kit/generalLoaderMask';
import { handleHistory } from 'common/helpers/history.helper';

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
  let images: string[] = [];

  // Fetch data from external API
  try {
    const res = await fetch(`http://5.35.93.60:4010/products/by-url/${url}`);
    const repo: Product = await res.json();

    images = getProductVariantsImages(repo?.productVariants);
    const imagesWithUrl: string[] = [];
    for (let i = 0; i < images?.length; i++) {
      imagesWithUrl.push(`https://nbhoz.ru/api/images/${images[i]}`);
    }
    // Pass data to the page via props
    return { props: { repo, imagesWithUrl } };
  } catch (error) {
    return { props: { repo: {}, imagesWithUrl: [] } };
  }
}) as GetServerSideProps<{
  repo: Product;
  imagesWithUrl: string[];
}>;

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
  useEffect(() => {
    dispatch(setProductStateFromServer(repo));
    if (getAccessToken()) dispatch(fetchCheckouts());
  }, []);

  const reviewBtnRef = useRef(null);
  const questionBtnRef = useRef(null);

  const [isClient, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);
  useEffect(() => {
    if (isClient) {
      handleHistory(repo.id);
    }
  }, [isClient]);
  return (
    <>
      <SEO images={imagesWithUrl} product={repo} />

      <>
        {isClient ? (
          !isNotFound(repo) ? (
            <>
              <ProductInfo
                reviewRef={reviewBtnRef}
                questionRef={questionBtnRef}
                product={repo}
              />
              <Recomendation product={repo} />
              <ReveiwsAndQuastions
                product={repo}
                reviewRef={reviewBtnRef}
                questionRef={questionBtnRef}
              />
            </>
          ) : (
            <LoaderMask />
          )
        ) : (
          <LoaderMask />
        )}
      </>
    </>
  );
};

ProductInfoPage.PageLayout = StoreLayout;
export default ProductInfoPage;
