import StoreLayout from 'components/store/storeLayout/layouts';
import Head from 'next/head';
import { baseUrl } from 'common/constant';
import { useEffect, useState } from 'react';
import { LoaderMask } from 'ui-kit/generalLoaderMask';
import Cart from 'components/store/cart';
import styles from 'components/store/cart/cartStyles.module.css';

const CardPage = () => {
  const [isClient, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);
  return (
    <>
      <Head>
        <title>Корзина | NBHOZ</title>
        <meta
          property="og:image"
          name="og:image"
          content={`${baseUrl}/static/logo_800x800.png`}
        />
      </Head>
      <div className={styles.Container}>
        {isClient ? <Cart /> : <LoaderMask />}
      </div>
    </>
  );
};

CardPage.PageLayout = StoreLayout;
export default CardPage;
