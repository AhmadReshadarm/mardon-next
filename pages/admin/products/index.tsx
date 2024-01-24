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
// _____________________________________________
import FilterBar from 'components/store/catalog/FilterBar';
import styled from 'styled-components';
import { devices } from 'components/store/lib/Devices';
import { TCatalogState } from 'redux/types';
import { Category } from 'swagger/services';
import {
  convertQueryParams,
  onLocationChange,
  setPriceRange,
} from 'components/store/catalog/helpers';
import {
  getQueryParams,
  pushQueryParams,
} from 'common/helpers/manageQueryParams.helper';
import { fetchParentCategories } from 'redux/slicers/store/catalogSlicer';

// _____________________________________________
const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  // ____________________________________________________________________
  const [category, setCategory] = useState<Category | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >();
  const {
    products,
    productsLength,
    categories,
    subCategories,
    brands,
    colors,
    tags,
    priceRange,
    loading,
    page,
  } = useAppSelector<TCatalogState>((state) => state.catalog);

  const handleLocationChange = onLocationChange(dispatch);

  const onCategoryChange = () => {
    const queryParams = convertQueryParams(
      getQueryParams(window.location.search),
    );
    const categoryUrl =
      queryParams.categories && queryParams.categories![0]
        ? queryParams.categories![0]
        : '';
    const category = categories.find(
      (category) => category.url === categoryUrl,
    );
    setCategory(category);
  };

  const handlePageChange = (page: number) => {
    pushQueryParams([{ name: 'page', value: page }]);
  };

  useEffect(() => {
    localStorage.removeItem('location');
    window.addEventListener('locationChange', () => {
      handleLocationChange();
      onCategoryChange();
    });
    setPriceRange(dispatch);

    (async () => {
      await dispatch(fetchParentCategories());
      await handleLocationChange();
      onCategoryChange();
    })();

    return () => {
      window.removeEventListener('locationChange', handleLocationChange);
    };
  }, []);

  const [expanded, setExpanded] = useState(false);

  const handleExpantionChange = () => {
    setExpanded((prev) => !prev);
  };

  const paginationLength = useAppSelector(
    (state) => state.catalog.productsLength,
  );
  const [currentPage, setCurrentPage] = useState(1);

  // ___________________________________________________________________
  const dataSource = products?.map(
    ({
      id,
      name,
      desc,
      category,
      brand,
      tags,
      sizes,
      url,
      productVariants,
      ...rest
    }) => ({
      key: id,
      id,
      name,
      desc,
      category,
      tags,
      sizes,
      url,
      productVariants,
    }),
  ) as unknown as DataType[];

  return (
    <>
      <div className={styles.productsHeader}>
        <h1 className={styles.productsHeader__title}>Продукты</h1>
        <Button
          className={styles.productsHeader__createProductButton}
          type="primary"
          onClick={navigateTo(router, Page.ADMIN_CREATE_PRODUCT)}
        >
          Создать новый продукт
        </Button>
      </div>

      <CatelogContentWrapper>
        <FilterBar
          categories={categories}
          subCategories={subCategories}
          colors={colors}
          priceRange={priceRange}
          tags={tags}
          expanded={expanded}
          handleExpantionChange={handleExpantionChange}
          setSelectedCategory={setSelectedCategory}
        />
        <Content>
          {loading || !productsLength ? (
            <Spin className={styles.spinner} size="large" />
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
                  pageSize: 12,
                  current: currentPage,
                  total: paginationLength,
                }}
                dataSource={dataSource}
                onChange={(event) => {
                  setCurrentPage(event.current as number);
                  handlePageChange(event.current as number);
                }}
              />
            </>
          )}
        </Content>
      </CatelogContentWrapper>
    </>
  );
};

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
  // .ant-pagination {
  //   display: none;
  // }
`;

ProductsPage.PageLayout = AdminLayout;

export default ProductsPage;
