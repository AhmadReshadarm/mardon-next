import {
  deleteBrand,
  fetchBrands,
  createBrand,
  editBrand,
} from 'redux/slicers/brandsSlicer';
import { AppDispatch } from 'redux/store';
import { navigateTo } from '../../../common/helpers';
import { NextRouter } from 'next/router';
import { Page, paths } from 'routes/constants';
import { TableProps } from 'antd';
import { DataType } from 'common/interfaces/data-type.interface';

export const handleDeleteBrand =
  (id: string, dispatch: AppDispatch, setVisible: any, offset: number) =>
    async () => {
      const isSaved: any = await dispatch(deleteBrand(id));
      if (!isSaved.error) {
        dispatch(
          fetchBrands({
            offset: String(offset),
            limit: '20',
          }),
        );
        setVisible((prev) => !prev);
      }
    };

export const handleFormSubmitBrands =
  (router: NextRouter, dispatch: AppDispatch, image: any) => async (form) => {
    if (router.query.id) {
      const isSaved: any = await dispatch(
        editBrand({
          ...form,
          image: image[0].url.split('/api/images/')[1],
          id: router.query.id,
        }),
      );

      if (!isSaved.error) {
        navigateTo(router, Page.ADMIN_BRANDS)();
      }

      return;
    }

    const imageUrl = image[0]?.url.split('/api/images/')[1];

    const isSaved: any = await dispatch(
      createBrand({ ...form, image: imageUrl }),
    );

    if (!isSaved.error) {
      navigateTo(router, Page.ADMIN_BRANDS)();
    }
  };

export const handleRedirectBrands = (id: string, router: NextRouter) => () => {
  router.push(`${paths[Page.ADMIN_BRANDS]}/${id}`);
};

export const handleTableChange: TableProps<DataType>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log('params', pagination, filters, sorter, extra);
};
