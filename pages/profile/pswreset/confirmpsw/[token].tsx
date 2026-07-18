import StoreLayout from 'components/store/storeLayout/layouts';
import Head from 'next/head';
import { baseUrl } from 'common/constant';
import ConfirmResetPsw from 'components/store/profileComp/confirmResetPsw';
import styles from 'components/store/profileComp/styles/confirmResetPsw.module.css';

const ConfirmPswReset = () => {
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
            <ConfirmResetPsw />
          </div>
        </div>
      </div>
    </>
  );
};

ConfirmPswReset.PageLayout = StoreLayout;

export default ConfirmPswReset;
