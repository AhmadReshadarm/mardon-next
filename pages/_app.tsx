import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { AnimatePresence } from 'framer-motion';
import { session } from 'redux/slicers/authSlicer';
import 'styles.css';
import { wrapper } from '../redux/store';
import {
  createWishlist,
  fetchCategories,
  fetchTags,
  fetchNewsPost,
} from 'redux/slicers/store/globalSlicer';
import { createCart, fetchCart } from 'redux/slicers/store/cartSlicer';
import { ContextProvider } from 'common/context/AppContext';
import { fetchWishlistProducts } from 'redux/slicers/store/wishlistSlicer';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { fetchAdvertisement } from 'redux/slicers/bannersSlicer';
import { axiosInstance } from 'common/axios.instance';

export type ComponentWithPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout?: React.FC<any>;
  };
};

function App({ Component, pageProps }: ComponentWithPageLayout) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const basketId = localStorage.getItem('basketId');
    const wishlistId = localStorage.getItem('wishlistId')!;

    if (!basketId) {
      dispatch(createCart());
    }
    if (!wishlistId) {
      // dispatch(createWishlist());
      const createWishlistId = async () => {
        try {
          const wishlist = await axiosInstance.post('/wishlists');
          localStorage.setItem('wishlistId', wishlist.data.id);
        } catch (error) {
          console.log(error);
        }
      };
      createWishlistId();
    }

    const fetchDataCartProducts = async () => {
      function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
      await sleep(500);
      const createdCardId = localStorage.getItem('basketId');
      if (createdCardId) {
        dispatch(fetchCart(createdCardId));
      }
      if (!createdCardId) {
        fetchDataCartProducts();
      }
    };
    fetchDataCartProducts();

    const fetchDataWishlistProducts = async () => {
      function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }

      // waits for 500ms
      await sleep(500);
      const createdWishlistId = localStorage.getItem('wishlistId');
      if (createdWishlistId) {
        dispatch(fetchWishlistProducts(createdWishlistId));
      }
      if (!createdWishlistId) {
        fetchDataWishlistProducts();
      }
    };
    fetchDataWishlistProducts();
    dispatch(session());
    dispatch(fetchCategories());
    dispatch(fetchTags());
    dispatch(fetchAdvertisement());
    dispatch(fetchNewsPost());
  }, []);

  const [isClient, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);
  useEffect(() => {
    if (!router.pathname.includes('/admin')) {
      dispatch(session());
    }
  }, [router]);
  return (
    <>
      {isClient ? (
        <ContextProvider>
          {Component.PageLayout ? (
            <Component.PageLayout>
              <AnimatePresence mode="wait">
                <Component {...pageProps} key={router.asPath} />
              </AnimatePresence>
            </Component.PageLayout>
          ) : (
            <Component {...pageProps} />
          )}
        </ContextProvider>
      ) : (
        ''
      )}
    </>
  );
  // return router.pathname !== paths[Page.LOGIN] &&
  //   router.pathname.includes('/admin') ? (
  //   <AdminLayout user={user}>
  //     <Component {...pageProps} />
  //   </AdminLayout>
  // ) : (
  //   <Component {...pageProps} />
  // );
}

export default wrapper.withRedux(App);
