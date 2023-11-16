import { Button, Spin, Table } from 'antd';
import { ColumnGroupType, ColumnType } from 'antd/lib/table/interface';
import { AppContext } from 'common/context/AppContext';
import { navigateTo } from 'common/helpers';
import { DataType } from 'common/interfaces/data-type.interface';
import AdminLayout from 'components/admin/adminLayout/layout';
import { columns } from 'components/admin/brands/constants';
import { handleTableChange } from 'components/admin/brands/helpers';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { clearBrands, fetchBrands } from 'redux/slicers/brandsSlicer';
import { Page } from 'routes/constants';

import styles from './index.module.scss';

const Brands = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { offset, setOffset } = useContext(AppContext);

  const dispatch = useAppDispatch();
  const brands = useAppSelector((state) => state.brands.brands);
  const isLoading = useAppSelector((state) => state.brands.loading);
  const router = useRouter();

  const dataSource = brands?.map(
    ({ id, name, url, image, showOnMain, ...rest }) => ({
      key: id,
      id,
      name,
      url,
      showOnMain,
      image,
    }),
  ) as unknown as DataType[];

  useEffect(() => {
    dispatch(
      fetchBrands({
        offset: String(offset),
        limit: '20',
      }),
    );

    return () => {
      dispatch(clearBrands());
      setOffset(0);
    };
  }, []);

  return (
    <>
      <div className={styles.brandsHeader}>
        <h1 className={styles.brandsHeader__title}>Бренды</h1>
        <Button
          className={styles.brandsHeader__createBrandButton}
          type="primary"
          onClick={navigateTo(router, Page.ADMIN_CREATE_BRAND)}
        >
          Создать новый бренд
        </Button>
      </div>
      {isLoading ? (
        <Spin className={styles.spinner} size="large" />
      ) : (
        <Table
          scroll={{
            // x: 1366,
            y: 768,
          }}
          pagination={{
            pageSize: 20,
            current: currentPage,
          }}
          columns={
            columns as (ColumnGroupType<DataType> | ColumnType<DataType>)[]
          }
          dataSource={dataSource}
          onChange={(event) => {
            const newOffset = ((event.current as number) - 1) * 20;
            setOffset(newOffset);
            dispatch(
              fetchBrands({
                offset: String(newOffset),
                limit: '20',
              }),
            );
            setCurrentPage(event.current as number);
          }}
        />
      )}
    </>
  );
};

Brands.PageLayout = AdminLayout;

export default Brands;
