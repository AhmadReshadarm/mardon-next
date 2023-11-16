import AdminLayout from 'components/admin/adminLayout/layout';
import { Button, Spin, Table } from 'antd';
import { AppContext } from 'common/context/AppContext';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { Page } from 'routes/constants';
import { clearNewsPosts, fetchNewsposts } from 'redux/slicers/newsSlicer';
import { columns } from 'components/admin/newsPosts/constants';
import { ColumnGroupType, ColumnType } from 'antd/lib/table/interface';
import { NewsDataType } from 'common/interfaces/data-type.interface';
import styles from './index.module.scss';
import { navigateTo } from 'common/helpers';
const NewsPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { offset, setOffset } = useContext(AppContext);

  const dispatch = useAppDispatch();
  const news = useAppSelector((state) => state.newsPosts.newsPosts);
  const isLoading = useAppSelector((state) => state.newsPosts.loading);
  const router = useRouter();
  //
  const dataSource = news.map(
    ({ id, title, url, description, image, showOnMain }) => ({
      key: id,
      id,
      title,
      image,
      description,
      url,
      showOnMain,
    }),
  ) as unknown as NewsDataType[];

  useEffect(() => {
    dispatch(
      fetchNewsposts({
        offset: String(offset),
        limit: '20',
      }),
    );

    return () => {
      dispatch(clearNewsPosts());
      setOffset(0);
    };
  }, []);

  return (
    <>
      <div className={styles.newsPostsHeader}>
        <h1 className={styles.newsPostsHeader__title}>Новости</h1>
        <Button
          className={styles.newsPostsHeader__createnewsPostsButton}
          type="primary"
          onClick={navigateTo(router, Page.ADMIN_CREATE_NEWS)}
        >
          Создать новый Новости
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
            columns as (
              | ColumnGroupType<NewsDataType>
              | ColumnType<NewsDataType>
            )[]
          }
          dataSource={dataSource}
          onChange={(event) => {
            const newOffset = ((event.current as number) - 1) * 20;
            setOffset(newOffset);
            dispatch(
              fetchNewsposts({
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

NewsPage.PageLayout = AdminLayout;
export default NewsPage;
