import { AppDispatch } from 'redux/store';
import { navigateTo } from '../../../common/helpers';
import { NextRouter } from 'next/router';
import { Page, paths } from 'routes/constants';
import { TableProps } from 'antd';
import { DataType } from 'common/interfaces/data-type.interface';
import {
  createNews,
  deleteNews,
  editNews,
  fetchNewsposts,
} from 'redux/slicers/newsSlicer';

export const handleDeleteNewsPost =
  (id: string, dispatch: AppDispatch, setVisible: any, offset: number) =>
  async () => {
    const isSaved: any = await dispatch(deleteNews(id));
    if (!isSaved.error) {
      dispatch(
        fetchNewsposts({
          offset: String(offset),
          limit: '20',
        }),
      );
      setVisible((prev) => !prev);
    }
  };

export const handleFormSubmitBrands =
  (router: NextRouter, dispatch: AppDispatch, image: any) => async (form) => {
    if (typeof form.post !== 'string') {
      form = {
        ...form,
        post: JSON.stringify(form.post),
      };
    }
    if (router.query.id) {
      const isSaved: any = await dispatch(
        editNews({
          ...form,
          image: image[0].url.split('/api/images/')[1],
          id: router.query.id,
        }),
      );

      if (!isSaved.error) {
        navigateTo(router, Page.ADMIN_NEWS)();
      }

      return;
    }

    const imageUrl = image[0]?.url.split('/api/images/')[1];

    const isSaved: any = await dispatch(
      createNews({ ...form, image: imageUrl }),
    );

    if (!isSaved.error) {
      navigateTo(router, Page.ADMIN_NEWS)();
    }
  };

export const handleRedirectNewsPost =
  (id: string, router: NextRouter) => () => {
    router.push(`${paths[Page.ADMIN_NEWS]}/${id}`);
  };

export const handleTableChange: TableProps<DataType>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log('params', pagination, filters, sorter, extra);
};
