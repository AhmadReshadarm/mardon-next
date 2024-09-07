import StoreLayout from 'components/store/storeLayout/layouts';
import Banners from 'components/store/homePage/banners';
import ProductsSlider from 'components/store/homePage/productsSlider';
import ContactsMainPage from 'components/store/homePage/contactsMainPage';
import Subscribers from 'ui-kit/Subscribers';
import SEOstatic from 'components/store/SEO/SEOstatic';
import Loading from 'ui-kit/Loading';
import React, { Suspense, useEffect, useState } from 'react';
import { baseUrl } from '../common/constant';
import BestProduct from 'components/store/homePage/bestProducts';
import MainPageCatalog from 'components/store/homePage/mainPageCatalog';
import Head from 'next/head';

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
          url: '/',
          desc: 'Оптовый поставщик товаров для дома и бизнеса. У нас вы найдете широкий ассортимент хозяйственных товаров, включая уборочный инвентарь, товары для ремонта, и многое другое. Закажите оптом и получите выгодные цены!',
          keywords:
            'оптом, товары для дома, хозяйственные товары, мелкая оптовая торговля, купить оптом, продажа оптом, оптовый склад, оптовый поставщик, швабры, губки, столовые приборы, инструменты, коврики, спортивный инвентарь',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }}
        image={`${baseUrl}/static/logo_800x800.png`}
      />

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
