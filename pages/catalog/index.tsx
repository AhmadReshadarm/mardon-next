import {
  getQueryParams,
  pushQueryParams,
} from 'common/helpers/manageQueryParams.helper';
import {
  convertQueryParams,
  defaultSeoData,
  defaultSeoImage,
  getFiltersConfig,
  getSeoData,
  getSeoImage,
  onLocationChange,
  setPriceRange,
} from 'components/store/catalog/helpers';
import StoreLayout from 'components/store/storeLayout/layouts';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchParentCategories } from 'redux/slicers/store/catalogSlicer';
import { TCatalogState } from 'redux/types';
import { CategoryInTree, Color } from 'swagger/services';
import SEOstatic from 'components/store/SEO/SEOstatic';
import Pagination from 'antd/es/pagination';
import Head from 'next/head';
import { InferGetServerSidePropsType } from 'next';
import { FilterType, getFilters } from 'components/store/catalog/constants';
import styles from 'components/store/catalog/styles/catalog.module.css';

import TopFilterBar from 'components/store/catalog/TopFilterBar';
import ProductGrid from 'ui-kit/products/productGrid';
import {
  getClientErrorDetails,
  getServerErrorDetails,
  sendErrorReport,
} from 'common/helpers/errorLogger.helper';
const queryStringToObject = (url) =>
  Object.fromEntries([...new URLSearchParams(url.split('?')[1])]);

export const getServerSideProps = async (context) => {
  try {
    const query = context.resolvedUrl;
    const baseURL = process.env.API_URL;
    if (!baseURL) {
      throw new Error('API_URL environment variable is not set');
    }

    const queryObj = {
      categories:
        queryStringToObject(query).categories == undefined
          ? null
          : queryStringToObject(query).categories,
      subCategories:
        queryStringToObject(query).subCategories == undefined
          ? null
          : queryStringToObject(query).subCategories,
    };

    const url = `${baseURL}/categories/categoriesTree`;
    const resp = await fetch(url);
    if (!resp.ok) {
      throw new Error(
        `Failed to fetch categories: ${resp.status} ${resp.statusText}`,
      );
    }

    const localizedData = (await resp.json()) as CategoryInTree[];
    const { categories, subCategories } = queryObj;

    let filteredData = localizedData;

    if (categories) {
      filteredData = filteredData.filter((cat) => cat.url === categories);
    }

    if (subCategories) {
      filteredData = filteredData
        .map((cat) => ({
          ...cat,
          children:
            cat.children?.filter((child) => child.url === subCategories) || [],
        }))
        .filter((cat) => cat.children && cat.children.length > 0);
    }

    const seoData = getSeoData(localizedData, queryObj);
    const seoImage = getSeoImage(localizedData, queryObj);

    return {
      props: {
        seoData,
        seoImage,
      },
    };
  } catch (error: any) {
    console.error('Error in getServerSideProps:', error);
    const details = getServerErrorDetails(error, context.req);
    // Fire-and-forget report (don't await to avoid blocking)
    sendErrorReport(details, true).catch(console.error);
    // Return defaults to keep page functional
    return {
      props: {
        seoData: defaultSeoData,
        seoImage: defaultSeoImage,
      },
    };
  }
};

const CatalogPage = ({
  seoData: initialSeoData,
  seoImage: initialSeoImage,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { categories, subCategories, colors, tags, priceRange } =
    useAppSelector<TCatalogState>((state) => state.catalog);
  const [seoData, setSeoData] = useState(initialSeoData);

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
      // if (firstLoad) {
      //   await dispatch(fetchParentCategories());
      //   await wrappedHandler();
      //   setFirstLoad(false);
      // }

      try {
        if (firstLoad) {
          await dispatch(fetchParentCategories());
          await wrappedHandler();
          setFirstLoad(false);
        }
      } catch (error: any) {
        const details = getClientErrorDetails(error, {
          action: 'catalogInit',
        });
        sendErrorReport(details, false);
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

  useEffect(() => {
    const filtersCategory = localFilters.filter(
      (filter) => filter.type === FilterType.SINGLE_SELECTION,
    );
    const checkedCategory = filtersCategory.map((filter) => {
      const checkedOption = filter.options!.filter(
        (option) => option.checked === true,
      );
      return checkedOption;
    });

    if (checkedCategory[0].length > 0) {
      if (checkedCategory[1].length > 0) {
        setSeoData({
          ...seoData,
          realName: `${checkedCategory[0][0].name} > ${checkedCategory[1][0].name}`,
        });
      } else {
        setSeoData({ ...seoData, realName: checkedCategory[0][0].name });
      }
    } else {
      setSeoData({
        ...seoData,
        realName: 'Каталог | NBHOZ - Опт Товаров для Дома и Бизнеса',
      });
    }
  }, [localFilters]);

  return (
    <>
      <SEOstatic
        page={{
          realName: seoData.realName,
          name: seoData.name,
          url: seoData.url,
          desc: seoData.desc,
          keywords: seoData.keywords,
          createdAt: seoData.createdAt,
          updatedAt: seoData.updatedAt,
        }}
        image={initialSeoImage}
      />

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
