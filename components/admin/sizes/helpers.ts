import { TableProps } from 'antd';
import { navigateTo } from 'common/helpers';
import { DataType } from 'common/interfaces/data-type.interface';
import { NextRouter } from 'next/router';
import {
  createTag,
  deleteTag,
  editTag,
  fetchTags,
} from 'redux/slicers/tagsSlicer';
import {
  createSize,
  deleteSize,
  editSize,
  fetchSizes,
} from 'redux/slicers/sizesSlicer';
import { AppDispatch } from 'redux/store';
import { Page, paths } from 'routes/constants';

export const handleTableChange: TableProps<DataType>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log('params', pagination, filters, sorter, extra);
};

export const handleFormSubmit =
  (router: NextRouter, dispatch: AppDispatch) => async (form) => {
    if (router.query.id) {
      const isSaved: any = await dispatch(
        editSize({
          ...form,
          id: router.query.id,
        }),
      );

      if (!isSaved.error) {
        navigateTo(router, Page.ADMIN_SIZES)();
      }

      return;
    }

    const isSaved: any = await dispatch(createSize(form));

    if (!isSaved.error) {
      navigateTo(router, Page.ADMIN_SIZES)();
    }
  };

export const handleDeleteSize =
  (id: string, dispatch: AppDispatch, setVisible: any, offset: number) =>
  async () => {
    const isSaved: any = await dispatch(deleteSize(id));
    if (!isSaved.error) {
      dispatch(
        fetchSizes({
          offset: String(offset),
          limit: '20',
        }),
      );
      setVisible((prev) => !prev);
    }
  };

export const handleRedirectSizes = (id: string, router: NextRouter) => () => {
  router.push(`${paths[Page.ADMIN_SIZES]}/${id}`);
};
