import LoginForm from 'components/admin/login/LoginForm';
import React from 'react';
import { useAppSelector } from 'redux/hooks';
import styles from './login.module.scss';

const Login: React.FC = () => {
  const isLoading = useAppSelector((state) => state.auth.loading);

  return (
    <>
      <h1 className={styles['title']}>Авторизация</h1>
      <LoginForm isLoading={isLoading} />
    </>
  );
};

export default Login;
