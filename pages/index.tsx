import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import StoreLayout from 'components/store/storeLayout/layouts';
import SEOstatic from 'components/store/SEO/SEOstatic';
import { baseUrl } from '../common/constant';
import { Product, Slide } from 'swagger/services';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getProductVariantsImages } from 'common/helpers/getProductVariantsImages.helper';
import Banners from 'components/store/homePage/banners';
import ProductsSlider from 'components/store/homePage/productsSlider';
import { LoaderMask } from 'ui-kit/generalLoaderMask';

const MainPageCatalog = dynamic(
  () => import('components/store/homePage/mainPageCatalog'),
  {
    ssr: false,
    loading: () => <LoaderMask />,
  },
);
const BestProduct = dynamic(
  () => import('components/store/homePage/bestProducts'),
  {
    ssr: false,
    loading: () => <LoaderMask />,
  },
);
const Subscribers = dynamic(() => import('ui-kit/Subscribers'), {
  loading: () => <LoaderMask />,
});
const ContactsMainPage = dynamic(
  () => import('components/store/homePage/contactsMainPage'),
  {
    loading: () => <LoaderMask />,
  },
);

export const getServerSideProps = (async () => {
  let slides: Slide[];
  let caroselImages: string[];

  try {
    const resSlides = await fetch(`http://5.35.93.60:4010/slides`);
    const resCarosel = await fetch(
      `http://5.35.93.60:4010/products?tags[]=main_page`,
    );
    slides = await resSlides.json();
    const caroselProducts: { rows: Product[]; lenght: number } =
      await resCarosel.json();

    caroselImages = getProductVariantsImages(
      caroselProducts.rows[0].productVariants,
    );

    return {
      props: {
        slides,
        caroselProducts: caroselProducts.rows,
      },
    };
  } catch (error) {
    return { props: { slides: [], caroselProducts: [] } };
  }
}) as GetServerSideProps<{
  slides: Slide[];
  caroselProducts: Product[];
}>;

const IndexPage = ({
  slides,
  caroselProducts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [isClient, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <>
      <SEOstatic
        page={{
          realName: 'NBHOZ - Опт Товаров для Дома и Бизнеса',
          name: 'NBHOZ - Опт Товаров для Дома и Бизнеса',
          url: '',
          desc: 'Оптовый поставщик товаров для дома и бизнеса. У нас вы найдете широкий ассортимент хозяйственных товаров, включая уборочный инвентарь, товары для ремонта, и многое другое. Закажите оптом и получите выгодные цены!',
          keywords:
            'оптом, товары для дома, хозяйственные товары, мелкая оптовая торговля, купить оптом, продажа оптом, оптовый склад, оптовый поставщик, швабры, губки, столовые приборы, инструменты, коврики, спортивный инвентарь',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }}
        image={`${baseUrl}/static/logo_800x800.png`}
      />
      <Head>
        <link rel="canonical" href="https://nbhoz.ru" />
      </Head>
      {isClient ? (
        <>
          <Banners slides={slides} />
          <ProductsSlider caroselProducts={caroselProducts} />
          <MainPageCatalog />
          <BestProduct />
          <Subscribers />
          <ContactsMainPage />
        </>
      ) : (
        <LoaderMask />
      )}
    </>
  );
};

IndexPage.PageLayout = StoreLayout;
export default IndexPage;
