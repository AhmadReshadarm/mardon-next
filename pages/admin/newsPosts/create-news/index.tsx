import AdminLayout from 'components/admin/adminLayout/layout';
import ManageNewsPostForm from 'components/admin/newsPosts/ManageNewsPostForm';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { clearImageList } from 'redux/slicers/imagesSlicer';

const CreateNewsPost = () => {
  const title = 'Создание Новости';
  const news = useAppSelector((state) => state.newsPosts.newsPosts);
  const isLoading = useAppSelector((state) => state.newsPosts.loading);
  const isSaveLoading = useAppSelector((state) => state.newsPosts.saveLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearImageList());
    };
  }, [dispatch]);

  return (
    <ManageNewsPostForm
      title={title}
      editMode={false}
      newsPosts={news}
      isLoading={isLoading}
      isSaveLoading={isSaveLoading}
    />
  );
};

CreateNewsPost.PageLayout = AdminLayout;

export default CreateNewsPost;
