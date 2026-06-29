import styles from 'components/store/profileComp/styles/profile.module.css'; // NEW
import StoreLayout from 'components/store/storeLayout/layouts';
import Head from 'next/head';
import { useState } from 'react';
import { baseUrl } from 'common/constant';
import ProfileComp from 'components/store/profileComp';

const Profile = () => {
  const [isActive, setActive] = useState('profile');

  return (
    <>
      <Head>
        <title>Личные кабинет | NBHOZ</title>
        <meta
          property="og:image"
          name="og:image"
          content={`${baseUrl}/static/logo_800x800.png`}
        />
      </Head>
      <div className={styles.pageContainer}>
        <div className={styles.pageWrapper}>
          <div className={styles.pageContent}>
            <ProfileComp isActive={isActive} setActive={setActive} />
          </div>
        </div>
      </div>
    </>
  );
};

Profile.PageLayout = StoreLayout;

export default Profile;
