import { Button } from 'antd';
import { navigateTo } from 'common/helpers';
import AdminLayout from 'components/admin/adminLayout/layout';
import BannersLayout from 'components/admin/banners/BannersLayout';
import { useRouter } from 'next/router';
import { Page } from 'routes/constants';

import styles from './index.module.scss';

const BannersPage = () => {
  const router = useRouter();

  return (
    <>
      <div className={styles.bannersHeader}>
        <h1 className={styles.bannersHeader__title}>Баннеры</h1>
        <Button
          className={styles.bannersHeader__createBannerButton}
          type="primary"
          onClick={navigateTo(router, Page.ADMIN_UPDATE_BANNERS)}
        >
          Обновить контент
        </Button>
      </div>
      <BannersLayout />
    </>
  );
};

BannersPage.PageLayout = AdminLayout;

export default BannersPage;
