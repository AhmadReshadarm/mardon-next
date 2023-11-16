import { Pagination, Spin, Table } from 'antd';
import { ColumnGroupType, ColumnType } from 'antd/lib/table/interface';
import { AppContext } from 'common/context/AppContext';
import { DataType } from 'common/interfaces/data-type.interface';
import AdminLayout from 'components/admin/adminLayout/layout';
import { columns } from 'components/admin/questions/constants';
import { useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  clearProductsWithQuestions,
  fetchProductsWithQuestions,
} from 'redux/slicers/store/productInfoSlicer';
import { TProductInfoState } from 'redux/types';

import styles from './index.module.scss';

const PAGE_ITEMS_LIMIT = 20;

const QuestionsPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { offset, setOffset } = useContext(AppContext);

  const dispatch = useAppDispatch();
  const { products, loading, productsLength } =
    useAppSelector<TProductInfoState>((state) => state.productInfo);

  const dataSource = (products as any)?.map(
    ({
      id,
      name,
      price,
      oldPrice,
      desc,
      available,
      colors,
      category,
      images,
      brand,
      tags,
      url,
      productVariants,
      ...rest
    }) => ({
      key: id,
      id,
      name,
      oldPrice,
      price,
      desc,
      available: available ? 'Да' : 'Нет',
      colors,
      category,
      images: (images as string)?.split(','),
      brand,
      tags,
      url,
      productVariants,
    }),
  ) as unknown as DataType[];

  useEffect(() => {
    dispatch(
      fetchProductsWithQuestions({
        offset: String(offset),
        limit: PAGE_ITEMS_LIMIT,
      }),
    );

    return () => {
      dispatch(clearProductsWithQuestions());
      setOffset(0);
    };
  }, []);

  return (
    <>
      {loading ? (
        <Spin className={styles.spinner} size="large" />
      ) : (
        <>
          <Table
            scroll={{
              // x: 1366,
              y: 768,
            }}
            columns={
              columns as (ColumnGroupType<DataType> | ColumnType<DataType>)[]
            }
            pagination={false}
            dataSource={dataSource}
          />
          <Pagination
            style={{ marginTop: '20px' }}
            defaultCurrent={currentPage}
            total={productsLength}
            pageSize={PAGE_ITEMS_LIMIT}
            onChange={(current) => {
              const newOffset = ((current as number) - 1) * PAGE_ITEMS_LIMIT;
              setOffset(newOffset);
              dispatch(
                fetchProductsWithQuestions({
                  offset: String(newOffset),
                  limit: PAGE_ITEMS_LIMIT,
                }),
              );
              setCurrentPage(current as number);
            }}
          />
        </>
      )}
    </>
  );
};

QuestionsPage.PageLayout = AdminLayout;

export default QuestionsPage;
