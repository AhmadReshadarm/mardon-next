import StoreLayout from 'components/store/storeLayout/layouts';
import styled from 'styled-components';
import Wishlist from 'components/store/wishlist';
import { motion } from 'framer-motion';
import variants from 'components/store/lib/variants';
import Head from 'next/head';
const WishlistPage = () => {
  return (
    <>
      <Head>
        <title>Избранное | NBHOZ</title>
      </Head>
      <Container
        variants={variants.fadInOut}
        key="container-home-banners"
        initial="start"
        animate="middle"
        exit="end"
      >
        <Wishlist />
      </Container>
    </>
  );
};

const Container = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

WishlistPage.PageLayout = StoreLayout;
export default WishlistPage;
