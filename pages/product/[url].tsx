import SEO from 'components/store/SEO';
import StoreLayout from 'components/store/storeLayout/layouts';
import { useEffect, useRef, useState } from 'react';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { Product } from 'swagger/services';
import dynamic from 'next/dynamic';
import ProductInfo from 'components/store/product/productInfo';
import { LoaderMask } from 'ui-kit/generalLoaderMask';
import { handleHistory } from 'common/helpers/history.helper';
import { baseUrl } from 'common/constant';
import { getBase64Image } from 'common/helpers/getBase64Image.helper';
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

export const getServerSideProps: GetServerSideProps<{
  repo: Product;
  imagesWithUrl: string[];
  imagesWithUrlUI: string[];
  base64Image: string | null;
}> = (async (context) => {
  const { url } = context.query;
  let images: string[] | any = [];
  try {
    const apiUrl = process.env.API_URL || 'http://localhost:4010';
    const res = await fetch(`${apiUrl}/products/by-url/${url}`);
    if (!res.ok) throw new Error('Failed to fetch product');
    const repo: Product = await res.json();

    images = repo?.productVariants![0].images?.split(', ');
    const imagesWithUrl: string[] = [];
    const imagesWithUrlUI: string[] = [];

    for (let i = 0; i < images?.length; i++) {
      imagesWithUrl.push(`${baseUrl}/api/images/${images[i]}`);
      imagesWithUrlUI.push(`/api/images/${images[i]}`);
    }

    const firstProductImageUrl =
      images.length > 0
        ? `${apiUrl}/images/compress/${
            images[0]
          }?qlty=1&width=${100}&height=${100}&lossless=false`
        : '';

    const base64Image = await getBase64Image(firstProductImageUrl);

    return {
      props: { repo, imagesWithUrl, imagesWithUrlUI, base64Image },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      notFound: true,
    };
  }
}) as GetServerSideProps<{
  repo: Product;
  imagesWithUrl: string[];
  imagesWithUrlUI: string[];
  base64Image: any;
}>;

// -----------------------------------------------------------

const ProductInfoPage = ({
  repo,
  imagesWithUrl,
  imagesWithUrlUI,
  base64Image,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const reviewBtnRef = useRef(null);
  const questionBtnRef = useRef(null);

  const [isClient, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);
  useEffect(() => {
    if (isClient) handleHistory(repo.id);
  }, [isClient]);

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

      <>
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
    </>
  );
};

ProductInfoPage.PageLayout = StoreLayout;
export default ProductInfoPage;
