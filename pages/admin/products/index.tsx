import { Button, Spin, Table } from 'antd';
import { ColumnGroupType, ColumnType } from 'antd/lib/table/interface';
import { navigateTo } from 'common/helpers';
import { DataType } from 'common/interfaces/data-type.interface';
import AdminLayout from 'components/admin/adminLayout/layout';
import { columns } from 'components/admin/products/constants';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { Page } from 'routes/constants';
import styles from './index.module.scss';
import FilterBar from 'components/store/catalog/FilterBar';
import styled from 'styled-components';
import { devices } from 'components/store/lib/Devices';
import { TCatalogState } from 'redux/types';
import {
  onLocationChange,
  setPriceRange,
} from 'components/store/catalog/helpers';
import { pushQueryParams } from 'common/helpers/manageQueryParams.helper';
import { fetchParentCategories } from 'redux/slicers/store/catalogSlicer';
import ExcelJs from 'exceljs';
import Head from 'next/head';
import IncreaseOrDecreasePrice from 'components/admin/products/increaseOrDecreasePrice';
import { handleProductDownloadInExcel } from 'components/admin/products/helpers';

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    products,
    productsLength,
    categories,
    subCategories,
    colors,
    tags,
    priceRange,
    productsLoading,
  } = useAppSelector<TCatalogState>((state) => state.catalog);

  const handleLocationChange = onLocationChange(dispatch);
  const paginationLength = useAppSelector(
    (state) => state.catalog.productsLength,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize]: [number, any] = useState(12);

  const [firstLoad, setFirstLoad] = useState(true);
  useEffect(() => {
    localStorage.removeItem('location');
    window.addEventListener('locationChange', () => {
      handleLocationChange();
    });
    setPriceRange(dispatch);

    (async () => {
      if (firstLoad) {
        await dispatch(fetchParentCategories());
        await handleLocationChange();
        setFirstLoad(false);
      }
    })();

    return () => {
      window.removeEventListener('locationChange', handleLocationChange);
    };
  }, []);

  const [expanded, setExpanded] = useState(false);

  const handleExpantionChange = () => {
    setExpanded((prev) => !prev);
  };

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
  };

  const isCheckBoxEnabled = useAppSelector(
    (state) => state.catalog.isCheckBoxEnabled,
  );
  const selectedProducts = useAppSelector(
    (state) => state.catalog.selectedProducts,
  );

  // ___________________________________________________________________
  let dataSource = products?.map(
    ({ id, name, desc, category, tags, url, productVariants, ...rest }) => ({
      key: id,
      id,
      name,
      desc,
      category,
      tags,
      url,
      productVariants,
      isCheckBoxEnabled,
      selectedProducts,
      dispatch,
    }),
  ) as unknown as DataType[];
  const [loadingProgress, seLoadingProgress] = useState(0);
  const [loadingData, setLoadingData] = useState(false);

  return (
    <>
      <Head>
        <title>Администрирование {`>`} Продукты | NBHOZ</title>
      </Head>
      <div className={styles.productsHeader}>
        <h1 className={styles.productsHeader__title}>Продукты</h1>
        <HeaderActionBtnWrapper>
          <Button
            className={styles.productsHeader__createProductButton}
            type="primary"
            onClick={() =>
              handleProductDownloadInExcel(
                dispatch,
                setLoadingData,
                ExcelJs,
                seLoadingProgress,
              )
            }
          >
            {loadingData
              ? `Загрузка ${loadingProgress}%`
              : 'Скачать прайс-лист'}
          </Button>
          <Button
            className={styles.productsHeader__createProductButton}
            type="primary"
            onClick={navigateTo(router, Page.ADMIN_CREATE_PRODUCT)}
          >
            Создать новый продукт
          </Button>
        </HeaderActionBtnWrapper>
      </div>

      <CatelogContentWrapper>
        <SideBarWrapper>
          <IncreaseOrDecreasePrice />
          <FilterBar
            categories={categories}
            subCategories={subCategories}
            colors={colors}
            priceRange={priceRange}
            tags={tags}
            expanded={expanded}
            handleExpantionChange={handleExpantionChange}
            setCurrentPage={setCurrentPage}
            handlePageChange={handlePageChange}
            setPageSize={setPageSize}
          />
        </SideBarWrapper>

        <Content>
          {productsLoading ? (
            <EmptyProductsTitle>
              <Spin className={styles.spinner} size="large" />
            </EmptyProductsTitle>
          ) : !productsLength ? (
            <EmptyProductsTitle>
              <h3>По вашему запросу ничего не найдено.</h3>
            </EmptyProductsTitle>
          ) : (
            <>
              <Table
                scroll={{
                  y: 768,
                }}
                columns={
                  columns as (
                    | ColumnGroupType<DataType>
                    | ColumnType<DataType>
                  )[]
                }
                pagination={{
                  pageSize: pageSize,
                  current: currentPage,
                  total: paginationLength,
                  pageSizeOptions: [12, 24, 36, 50, 100],
                  locale: { items_per_page: '/ странице' },
                }}
                dataSource={dataSource}
                onChange={(event) => {
                  handlePageChange(
                    event.current as number,
                    event.pageSize as number,
                    event.current as number,
                  );
                }}
              />
            </>
          )}
        </Content>
      </CatelogContentWrapper>
    </>
  );
};

const SideBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;
`;

const CatelogContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 40px;

  @media ${devices.mobileM} {
    flex-direction: column;
  }

  @media ${devices.mobileS} {
    flex-direction: column;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  padding: 20px 0;
  @media ${devices.mobileL} {
    margin-left: 0;
    padding: 10px 15px;
  }
`;

const EmptyProductsTitle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding-top: 100px;
  h3 {
    font-size: 2rem;
    font-family: var(--font-ricordi);
  }
`;

const HeaderActionBtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
`;
ProductsPage.PageLayout = AdminLayout;

export default ProductsPage;
