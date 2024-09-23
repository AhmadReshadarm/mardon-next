import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { Suspense, useEffect, useState } from 'react';
import StoreLayout from 'components/store/storeLayout/layouts';
import SEOstatic from 'components/store/SEO/SEOstatic';
import { baseUrl } from '../common/constant';
import styled from 'styled-components';
import { Product, Slide } from 'swagger/services';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

const Banners = dynamic(() => import('components/store/homePage/banners'), {
  loading: () => <LoaderMask />,
});
const ProductsSlider = dynamic(
  () => import('components/store/homePage/productsSlider'),
  {
    loading: () => <LoaderMask />,
  },
);
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
  try {
    const res = await fetch(`https://nbhoz.ru/api/slides`);
    const resCarosel = await fetch(
      `https://nbhoz.ru/api/products?tags[]=main_page`,
    );
    const slides: Slide[] = await res.json();
    const caroselProducts: { rows: Product[]; lenght: number } =
      await resCarosel.json();
    return { props: { slides, caroselProducts: caroselProducts.rows } };
  } catch (error) {
    console.log(error);
    return { props: { slides: [], caroselProducts: [] } };
  }
}) as GetServerSideProps<{ slides: Slide[]; caroselProducts: Product[] }>;

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
        <Suspense fallback={<LoaderMask />}>
          <Banners slides={slides} />
          <ProductsSlider caroselProducts={caroselProducts} />
          <MainPageCatalog />
          <BestProduct />
          <Subscribers />
          <ContactsMainPage />
        </Suspense>
      ) : (
        <LoaderMask />
      )}
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

IndexPage.PageLayout = StoreLayout;
export default IndexPage;
