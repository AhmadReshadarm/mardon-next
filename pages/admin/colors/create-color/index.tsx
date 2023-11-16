import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { useEffect } from 'react';
import { fetchColors } from 'redux/slicers/colorsSlicer';
import ManageColorForm from 'components/admin/colors/ManageColorForm';
import AdminLayout from 'components/admin/adminLayout/layout';

const CreateColor = () => {
  const title = 'Создание цвета';
  const colors = useAppSelector((state) => state.colors.colors);
  const isLoading = useAppSelector((state) => state.colors.loading);
  const isSaveLoading = useAppSelector((state) => state.colors.saveLoading);

  return (
    <ManageColorForm
      title={title}
      editMode={false}
      colors={colors}
      isLoading={isLoading}
      isSaveLoading={isSaveLoading}
    />
  );
};

CreateColor.PageLayout = AdminLayout;

export default CreateColor;
