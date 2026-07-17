import styles from 'components/store//profileComp/styles/resetPassword.module.css';
import StoreLayout from 'components/store/storeLayout/layouts';
import Head from 'next/head';
import { baseUrl } from 'common/constant';

import EmailResetPsw from 'components/store/profileComp/emailresetpsw';

const PswReset = () => {
  return (
    <>
      <Head>
        <title>Сброс пароля | NBHOZ</title>
        <meta
          property="og:image"
          name="og:image"
          content={`${baseUrl}/static/logo_800x800.png`}
        />
      </Head>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <EmailResetPsw />
          </div>
        </div>
      </div>
    </>
  );
};

PswReset.PageLayout = StoreLayout;

export default PswReset;
