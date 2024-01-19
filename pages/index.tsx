import StoreLayout from 'components/store/storeLayout/layouts';
import Banners from 'components/store/homePage/banners';
import ProductsSlider from 'components/store/homePage/productsSlider';
import ContactsMainPage from 'components/store/homePage/contactsMainPage';
import Subscribers from 'ui-kit/Subscribers';
import SEOstatic from 'components/store/SEO/SEOstatic';
import Loading from 'ui-kit/Loading';
import React, { Suspense } from 'react';
import { baseUrl } from '../common/constant';
import BestProduct from 'components/store/homePage/bestProducts';
const IndexPage = (): JSX.Element => {
  return (
    <>
      <SEOstatic
        page={{
          name: 'Главный | NBHOZ',
          url: '/',
          desc: 'NBHOZ, Дешевые хозтовары оптом в интернет магазине nbhoz в Москва и все Россия, купить Кухонная утварь, Товары для сервировки стола, Товары для ванной комнаты',
          keywords:
            'nbhoz, nbhoz.ru, Товары для сервировки стола,купить Кухонная утварь, Товары для ванной комнаты, Дешевые хозтовары',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }}
        image={`${baseUrl}/favicon.svg`}
      />

      <Suspense fallback={<Loading />}>
        <Banners />
        <ProductsSlider />
        <BestProduct />
        <Subscribers />
        <ContactsMainPage />
      </Suspense>
    </>
  );
};

IndexPage.PageLayout = StoreLayout;
export default IndexPage;
