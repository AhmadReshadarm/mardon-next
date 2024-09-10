import StoreLayout from 'components/store/storeLayout/layouts';
import styled from 'styled-components';
import Cart from 'components/store/cart';
import { motion } from 'framer-motion';
import variants from 'components/store/lib/variants';
import { devices } from 'components/store/lib/Devices';
const CardPage = () => {
  return (
    <Container
      variants={variants.fadInOut}
      key="container-home-banners"
      initial="start"
      animate="middle"
      exit="end"
    >
      <Cart />
    </Container>
  );
};
const Container = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

CardPage.PageLayout = StoreLayout;
export default CardPage;
