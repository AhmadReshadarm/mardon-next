import AdminLayout from 'components/admin/adminLayout/layout';
import ManageNewsPostForm from 'components/admin/newsPosts/ManageNewsPostForm';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { clearImageList } from 'redux/slicers/imagesSlicer';
import { useRouter } from 'next/router';
import { clearNews, fetchNewsById } from 'redux/slicers/newsSlicer';

const CreateNewsPost = () => {
  const router = useRouter();
  const title = 'Редактирование Новости';
  const newsPosts = useAppSelector((state) => state.newsPosts.newsPosts);
  const filteredNewsPosts = newsPosts.filter(
    (news) => news.id !== Number(router.query.id),
  );
  const news = useAppSelector((state) => state.newsPosts.news);
  const isLoading = useAppSelector((state) => state.newsPosts.loading);
  const isSaveLoading = useAppSelector((state) => state.newsPosts.saveLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (router.query.id) {
        await dispatch(fetchNewsById({ id: router.query.id as string }));
      }
    })();

    return () => {
      dispatch(clearNews());
      dispatch(clearImageList());
    };
  }, [dispatch, router.query]);

  return (
    <ManageNewsPostForm
      title={title}
      editMode={true}
      newsPosts={filteredNewsPosts}
      newsPost={news}
      isLoading={isLoading}
      isSaveLoading={isSaveLoading}
    />
  );
};

CreateNewsPost.PageLayout = AdminLayout;

export default CreateNewsPost;
