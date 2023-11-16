import AdminLayout from 'components/admin/adminLayout/layout';
import ManageUsersForm from 'components/admin/settings/users/ManageUsersForm';
import { useAppSelector } from 'redux/hooks';
import { TAuthState } from 'redux/types';

const CreateNewsPost = () => {
  const title = 'Создание пользователь';
  const { loading } = useAppSelector<TAuthState>((state) => state.auth);

  return <ManageUsersForm title={title} isLoading={loading} />;
};

CreateNewsPost.PageLayout = AdminLayout;

export default CreateNewsPost;
