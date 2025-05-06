import StoreLayout from 'components/store/storeLayout/layouts';
import Head from 'next/head';
import { baseUrl } from 'common/constant';
import { LoaderMask } from 'ui-kit/generalLoaderMask';
import Wishlist from 'components/store/wishlist';
import styles from 'components/store/wishlist/wishlistStyles.module.css';
import { useEffect, useState } from 'react';
const WishlistPage = () => {
  const [isClient, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);
  return (
    <>
      <Head>
        <title>Избранное | WULUXE</title>
        <meta
          property="og:image"
          name="og:image"
          content={`${baseUrl}/static/logo_800x800.png`}
        />
      </Head>
      <div className={styles.Container}>
        {isClient ? <Wishlist /> : <LoaderMask />}
      </div>
    </>
  );
};

WishlistPage.PageLayout = StoreLayout;
export default WishlistPage;
