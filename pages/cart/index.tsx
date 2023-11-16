import StoreLayout from 'components/store/storeLayout/layouts';
import styled from 'styled-components';
import Link from 'next/link';
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
      <BasketHeader>
        <div className="basket-header-back-btn">
          <Link href="/">
            <img src="/icons/back_arrow.png" alt="back button" />
            <span>Обратно на главную</span>
          </Link>
        </div>
        <PageTitle>
          <h3>Корзина</h3>
        </PageTitle>
      </BasketHeader>
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
const BasketHeader = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
  .basket-header-back-btn {
    width: 100%;
    max-width: 1230px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    a {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 20px;
      img {
        width: 40px;
      }
      span {
        font-family: 'Jost';
      }
    }
  }
  @media ${devices.mobileL} {
    width: 95%;
  }
  @media ${devices.mobileM} {
    width: 95%;
  }
  @media ${devices.mobileS} {
    width: 95%;
  }
`;

const PageTitle = styled.div`
  width: 100%;
  max-width: 1230px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0 30px 0 0;
  h3 {
    font-size: 1.5rem;
    font-family: 'Anticva';
    font-weight: 100;
  }
`;

CardPage.PageLayout = StoreLayout;
export default CardPage;
