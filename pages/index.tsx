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
import { useAppSelector } from 'redux/hooks';
import { TCatalogState } from 'redux/types';
const IndexPage = (): JSX.Element => {
  const { categories, subCategories } = useAppSelector<TCatalogState>(
    (state) => state.catalog,
  );
  const [categoriesList, setCategoriesList] = useState('');
  useEffect(() => {
    categories.map((category) =>
      setCategoriesList(
        `${categoriesList}${categoriesList !== '' ? ', ' : ''}${category.name}`,
      ),
    );
    subCategories.map((category) =>
      setCategoriesList(
        `${categoriesList}${categoriesList !== '' ? ', ' : ''}${category.name}`,
      ),
    );
  }, [categories, subCategories]);
  return (
    <>
      <SEOstatic
        page={{
          realName:
            'NBHOZ - интернет магазин хозтовары оптом. по выгодным ценам',
          name: 'NBHOZ - интернет магазин хозтовары оптом. по выгодным ценам',
          url: '/',
          desc: `NBHOZ, Дешевые хозтовары оптом в интернет магазине nbhoz в Москве и все Россия, купить ${categoriesList}`,
          keywords:
            'nbhoz, nbhoz.ru, Товары для сервировки стола,купить Кухонная утварь, Товары для ванной комнаты, Дешевые хозтовары',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }}
        image={`${baseUrl}/static/favicon.png`}
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
