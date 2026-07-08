import {
  getQueryParams,
  pushQueryParams,
} from 'common/helpers/manageQueryParams.helper';
import {
  convertQueryParams,
  getFiltersConfig,
  onLocationChange,
  setPriceRange,
} from 'components/store/catalog/helpers';
import StoreLayout from 'components/store/storeLayout/layouts';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchParentCategories } from 'redux/slicers/store/catalogSlicer';
import { TCatalogState } from 'redux/types';
import { Color, Product } from 'swagger/services';
import SEOstatic from 'components/store/SEO/SEOstatic';
import Pagination from 'antd/es/pagination';
import Head from 'next/head';
// import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import { LoaderMask } from 'ui-kit/generalLoaderMask';
import { FilterType, getFilters } from 'components/store/catalog/constants';
import styles from 'components/store/catalog/styles/catalog.module.css';
import { baseUrl } from 'common/constant';
const TopFilterBar = dynamic(
  () => import('components/store/catalog/TopFilterBar'),
  {
    ssr: false,
    loading: () => <LoaderMask />,
  },
);
const ProductGrid = dynamic(() => import('ui-kit/products/productGrid'), {
  ssr: false,
  loading: () => <LoaderMask />,
});

// const queryStringToObject = (url) =>
//   Object.fromEntries([...new URLSearchParams(url.split('?')[1])]);

// export const getServerSideProps = (async (context) => {
//   const query = context.resolvedUrl;

//   const queryObj = {
//     categories:
//       queryStringToObject(query).categories == undefined
//         ? null
//         : queryStringToObject(query).categories,
//     subCategories:
//       queryStringToObject(query).subCategories == undefined
//         ? null
//         : queryStringToObject(query).subCategories,
//   };

//   const url = `${process.env.API_URL}/products?${
//     queryObj.categories ? 'parent=' + queryObj.categories : ''
//   }${
//     queryObj.subCategories
//       ? queryObj.categories
//         ? '&categories[]=' + queryObj.subCategories
//         : 'categories[]=' + queryObj.subCategories
//       : ''
//   }`;

//   // Fetch data from external API
//   try {
//     const res = await fetch(url);
//     const repo = await res.json();
//     const randomProduct = Math.floor(Math.random() * repo.rows?.length);
//     // Pass data to the page via props
//     return {
//       props: {
//         repo: repo.rows,
//         randomProduct,
//       },
//     };
//   } catch (error) {
//     return {
//       props: {
//         repo: [],
//         randomProduct: 0,
//       },
//     };
//   }
// }) as GetServerSideProps<{ repo: Product[]; randomProduct: number }>;

// =
// ({
// repo,
// randomProduct,
// }: InferGetServerSidePropsType<typeof getServerSideProps>)

const CatalogPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { categories, subCategories, colors, tags, priceRange } =
    useAppSelector<TCatalogState>((state) => state.catalog);
  // const [selectedCategory, setSelectedCategory] = useState<
  //   string | undefined
  // >();

  const handleLocationChange = onLocationChange(dispatch);
  const [firstLoad, setFirstLoad] = useState(true);
  const lastQueryRef = useRef<string | null>(null);
  useEffect(() => {
    localStorage.removeItem('location');

    const wrappedHandler = async () => {
      const currentQS = window.location.search;
      if (lastQueryRef.current === currentQS) return;
      lastQueryRef.current = currentQS;
      await handleLocationChange();
    };

    window.addEventListener('locationChange', wrappedHandler);
    setPriceRange(dispatch);

    (async () => {
      if (firstLoad) {
        await dispatch(fetchParentCategories());
        await wrappedHandler();
        setFirstLoad(false);
      }
    })();

    return () => {
      window.removeEventListener('locationChange', wrappedHandler);
    };
  }, []);

  const filteredTags: any = tags.filter((tag) => {
    if (
      tag.url?.match(/(?:^|\W)best_product(?:$|\W)/) ||
      tag.url?.match(/(?:^|\W)main_page(?:$|\W)/) ||
      tag.url == '-' ||
      tag.url == '_' ||
      tag.url == ' '
    ) {
      return;
    }
    return tag;
  });

  const filteredColors: Color[] = colors.filter((color) => {
    if (
      color.url?.match(/(?:^|\W)-(?:$|\W)/) ||
      color.url?.match(/(?:^|\W)_(?:$|\W)/) ||
      color.url?.match(/(?:^|\W) (?:$|\W)/)
    ) {
      return;
    }
    return color;
  });

  // const [expanded, setExpanded] = useState(true);

  // const handleExpantionChange = () => {
  //   setExpanded((prev) => !prev);
  // };

  const paginationLength = useAppSelector(
    (state) => state.catalog.productsLength,
  );

  // ------------------------- pagination handlers ---------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize]: [number, any] = useState(12);
  const containerRef = useRef<HTMLDivElement>(null);
  const veiwPortcontainerRef = useRef<HTMLDivElement>(null);
  const handlePageChange = (
    page: number,
    pageSize: number,
    current: number,
  ) => {
    setPageSize(pageSize);
    setCurrentPage(current);
    pushQueryParams([
      { name: 'page', value: page },
      { name: 'limit', value: pageSize },
    ]);
    // window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    containerRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };
  // ---------------------------------------------------------------------------

  const [isClient, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);

  // ----------------------------- filters ---------------------

  const filters = convertQueryParams(router.query);
  const [filtersConfig, setFiltersConfig] = useState(
    getFiltersConfig({
      categories,
      subCategories,
      colors: filteredColors,
      priceRange,
      filters,
      tags: filteredTags,
    }),
  );

  const [localFilters, setLocalFilters] = useState(getFilters(filtersConfig));

  useEffect(() => {
    const filters = convertQueryParams(getQueryParams(window.location.search));

    setFiltersConfig(
      getFiltersConfig({
        categories,
        subCategories,
        colors: filteredColors,
        priceRange,
        filters,
        tags: filteredTags,
      }),
    );
  }, [categories, subCategories, colors, priceRange, tags]);

  useEffect(() => {
    setLocalFilters(getFilters(filtersConfig));
  }, [filtersConfig]);

  // useEffect(() => {
  //   const filtersCategory = localFilters.filter(
  //     (filter) => filter.type === FilterType.SINGLE_SELECTION,
  //   );
  //   const checkedCategory = filtersCategory.map((filter) => {
  //     const checkedOption = filter.options!.filter(
  //       (option) => option.checked === true,
  //     );
  //     return checkedOption;
  //   });

  //   if (checkedCategory[0].length > 0) {
  //     if (checkedCategory[1].length > 0) {
  //       setSelectedCategory(checkedCategory[1][0].name);
  //     } else {
  //       setSelectedCategory(checkedCategory[0][0].name);
  //     }
  //   }
  // }, [localFilters]);

  return (
    <>
      {/* {repo.length !== 0 ? ( */}
      <SEOstatic
        // page={{
        //   realName: `${selectedCategory ?? 'Каталог'} | NBHOZ`,
        //   name: `${
        //     repo[randomProduct].category?.parent?.name +
        //     ' > ' +
        //     repo[randomProduct].category?.name
        //   }`,
        //   url: `${router.asPath}`,
        //   desc: `${
        //     repo[0].category?.name ?? 'Каталог'
        //   } - покупайте Опт на NBHOZ по выгодным ценам! оптом ${
        //     repo[randomProduct]?.shortDesc
        //   }`,
        //   keywords: `${repo[randomProduct]?.keywords}`,
        //   createdAt: repo[randomProduct]?.createdAt,
        //   updatedAt: repo[randomProduct]?.updatedAt,

        // }}
        // image={`https://nbhoz.ru/api/images/${repo[0]?.category?.parent?.image}`}
        page={{
          realName: 'Каталог | NBHOZ - Опт Товаров для Дома и Бизнеса',
          name: 'Каталог | NBHOZ - Опт Товаров для Дома и Бизнеса',
          url: `${router.asPath}`,
          desc: 'Оптовый поставщик товаров для дома и бизнеса. У нас вы найдете широкий ассортимент хозяйственных товаров, включая уборочный инвентарь, товары для ремонта, и многое другое. Закажите оптом и получите выгодные цены!',
          keywords:
            'оптом, товары для дома, хозяйственные товары, мелкая оптовая торговля, купить оптом, продажа оптом, оптовый склад, оптовый поставщик, швабры, губки, столовые приборы, инструменты, коврики, спортивный инвентарь',
          createdAt: '2023-10-18T00:00:00Z',
          updatedAt: new Date().toISOString(),
        }}
        image={`${baseUrl}/static/logo_800x800.png`}
      />
      {/* ) : (
        ''
      )} */}
      <Head>
        <link rel="canonical" href="https://nbhoz.ru/catalog" />
      </Head>

      {isClient ? (
        <div className={styles.Container}>
          <div className={styles.Wrapper}>
            <div className={styles.CatelogContentWrapper}>
              <TopFilterBar
                subCategories={subCategories}
                priceRange={priceRange}
                // expanded={expanded}
                // handleExpantionChange={handleExpantionChange}
                setCurrentPage={setCurrentPage}
                setPageSize={setPageSize}
                localFilters={localFilters}
                containerRef={containerRef}
                veiwPortcontainerRef={veiwPortcontainerRef}
              />

              <div className={styles.Content}>
                <div className={styles.Products} ref={veiwPortcontainerRef}>
                  <ProductGrid containerRef={containerRef} />
                </div>
                <Pagination
                  style={{ marginTop: '20px' }}
                  defaultCurrent={currentPage}
                  current={currentPage}
                  total={paginationLength}
                  pageSize={pageSize}
                  pageSizeOptions={[12, 24, 36, 50, 100]}
                  onChange={(current, pageSize) => {
                    handlePageChange(current, pageSize, current);
                  }}
                  locale={{ items_per_page: '/ странице' }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

CatalogPage.PageLayout = StoreLayout;

export default CatalogPage;
