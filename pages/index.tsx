import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { Suspense, useEffect, useState } from 'react';
import StoreLayout from 'components/store/storeLayout/layouts';
import SEOstatic from 'components/store/SEO/SEOstatic';
import Loading from 'ui-kit/Loading';
import { baseUrl } from '../common/constant';
const Banners = dynamic(() => import('components/store/homePage/banners'), {
  ssr: false,
});
const ProductsSlider = dynamic(
  () => import('components/store/homePage/productsSlider'),
  {
    ssr: false,
  },
);
const MainPageCatalog = dynamic(
  () => import('components/store/homePage/mainPageCatalog'),
  {
    ssr: false,
  },
);
const BestProduct = dynamic(
  () => import('components/store/homePage/bestProducts'),
  {
    ssr: false,
  },
);
const Subscribers = dynamic(() => import('ui-kit/Subscribers'), {
  ssr: false,
});
const ContactsMainPage = dynamic(
  () => import('components/store/homePage/contactsMainPage'),
  {
    ssr: false,
  },
);

const IndexPage = (): JSX.Element => {
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
        <Suspense fallback={<Loading />}>
          <Banners />
          <ProductsSlider />
          <MainPageCatalog />
          <BestProduct />
          <Subscribers />
          <ContactsMainPage />
        </Suspense>
      ) : (
        ''
      )}
    </>
  );
};

IndexPage.PageLayout = StoreLayout;
export default IndexPage;
