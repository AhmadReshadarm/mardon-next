import AdminLayout from 'components/admin/adminLayout/layout';
// import ManageTagForm from 'components/admin/tags/ManageTagForm';
import ManageSizeForm from 'components/admin/sizes/ManageSizeForm';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchSize } from 'redux/slicers/sizesSlicer';
// import {
//   clearTag,
//   fetchTag,
//   fetchTags,
// } from '../../../redux/slicers/tagsSlicer';

const EditSize = () => {
  const title = 'Редактирование Размеры';
  const router = useRouter();
  const sizes = useAppSelector((state) => state.sizes.sizes);
  const filteredSizes = sizes.filter(
    (size) => size.id !== Number(router.query.id),
  );
  const size = useAppSelector((state) => state.sizes.size);
  const isLoading = useAppSelector((state) => state.sizes.loading);
  const isSaveLoading = useAppSelector((state) => state.sizes.saveLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (router.query.id) {
      dispatch(fetchSize(router.query.id as string));
    }
  }, [dispatch, router.query]);

  return (
    <ManageSizeForm
      title={title}
      editMode={true}
      size={size}
      isLoading={isLoading}
      isSaveLoading={isSaveLoading}
    />
  );
};

EditSize.PageLayout = AdminLayout;

export default EditSize;
