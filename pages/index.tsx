import StoreLayout from 'components/store/storeLayout/layouts';
import Banners from 'components/store/homePage/banners';
import ProductsSlider from 'components/store/homePage/productsSlider';
import MainPageCatalog from 'components/store/homePage/mainPageCatalog';
import NewsMainPage from 'components/store/homePage/newsMainPage';
import ReviewMainPage from 'components/store/homePage/reviewMainPage';
import ContactsMainPage from 'components/store/homePage/contactsMainPage';
import Subscribers from 'ui-kit/Subscribers';
import SEOstatic from 'components/store/SEO/SEOstatic';
import Loading from 'ui-kit/Loading';
import React, { Suspense, useEffect } from 'react';
import { baseUrl } from '../common/constant';
import BestProduct from 'components/store/homePage/bestProducts';
const IndexPage = (): JSX.Element => {
  return (
    <>
      <SEOstatic
        page={{
          name: 'Главный',
          url: '/',
          desc: 'Интернет-магазин NBhoz',
          keywords: 'nbhoz, nbhoz.ru',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }}
        image={`${baseUrl}/favicon.svg`}
      />

      <Suspense fallback={<Loading />}>
        <Banners />
        <ProductsSlider />
        <BestProduct />
        {/* <MainPageCatalog />
        <NewsMainPage />
        <ReviewMainPage /> */}
        <Subscribers />
        <ContactsMainPage />
      </Suspense>
    </>
  );
};

IndexPage.PageLayout = StoreLayout;
export default IndexPage;
