import AdminLayout from 'components/admin/adminLayout/layout';
import BannersFormLayout from 'components/admin/banners/BannersFormLayout';
import { useEffect, useState } from 'react';

import styles from '../index.module.scss';

const UpdateBanner = () => {
  return (
    <>
      <div>
        <h1 className={styles.bannersHeader__title}>Обновление баннеров</h1>
      </div>
      <div>
        <BannersFormLayout />
      </div>
    </>
  );
};

UpdateBanner.PageLayout = AdminLayout;

export default UpdateBanner;
