import AdminLayout from 'components/admin/adminLayout/layout';
import ManageTagForm from 'components/admin/tags/ManageTagForm';
import ManageSizeForm from 'components/admin/sizes/ManageSizeForm';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchTags } from '../../../../redux/slicers/tagsSlicer';

const CreateSize = () => {
  const title = 'Создание Размер';
  const isLoading = useAppSelector((state) => state.sizes.loading);
  const isSaveLoading = useAppSelector((state) => state.sizes.saveLoading);

  return (
    <ManageSizeForm
      title={title}
      editMode={false}
      isLoading={isLoading}
      isSaveLoading={isSaveLoading}
    />
  );
};

CreateSize.PageLayout = AdminLayout;

export default CreateSize;
