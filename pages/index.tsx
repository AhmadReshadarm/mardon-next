import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { Suspense, useEffect, useState } from 'react';
import StoreLayout from 'components/store/storeLayout/layouts';
import SEOstatic from 'components/store/SEO/SEOstatic';
import { baseUrl } from '../common/constant';
import styled from 'styled-components';
import { Product, Slide } from 'swagger/services';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import fs from 'fs';
import { getProductVariantsImages } from 'common/helpers/getProductVariantsImages.helper';
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
  let slides: Slide[];
  let caroselImages: string[];
  // wait for clinet side to render image then delete it from server
  setTimeout(() => {
    fs.unlink(`./public/temp/${slides[0].image}`, (err) => {
      if (err) {
      }
    });
    fs.unlink(`./public/temp/${caroselImages[0]}`, (err) => {
      if (err) {
      }
    });
  }, 20000);
  try {
    const res = await fetch(`http://5.35.93.60:4010/slides`);
    const resCarosel = await fetch(
      `http://5.35.93.60:4010/products?tags[]=main_page`,
    );
    slides = await res.json();
    const caroselProducts: { rows: Product[]; lenght: number } =
      await resCarosel.json();

    caroselImages = getProductVariantsImages(
      caroselProducts.rows[0].productVariants,
    );

    const respSlides = await fetch(
      `http://5.35.93.60:4010/images/${slides[0].image}`,
    );
    const imgBlob = await respSlides.blob();
    const buffer = Buffer.from(await imgBlob.arrayBuffer());

    fs.writeFile(`./public/temp/${slides[0].image}`, buffer, () => {
      console.log('image saved');
    });

    // --------------------------

    const respCarosel = await fetch(
      `http://5.35.93.60:4010/images/${caroselImages[0]}`,
    );
    const imgCaroselBlob = await respCarosel.blob();
    const bufferCarosel = Buffer.from(await imgCaroselBlob.arrayBuffer());

    fs.writeFile(`./public/temp/${caroselImages[0]}`, bufferCarosel, () => {
      console.log('image saved');
    });

    return { props: { slides, caroselProducts: caroselProducts.rows } };
  } catch (error) {
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
