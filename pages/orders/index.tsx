import variants from 'components/store/lib/variants';
import Order from 'components/store/order';
import StoreLayout from 'components/store/storeLayout/layouts';
import styled from 'styled-components';
import Head from 'next/head';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TStoreCheckoutState } from 'redux/types';
import Loading from 'ui-kit/Loading';
import { useEffect, useState } from 'react';
import { fetchCheckouts } from 'redux/slicers/store/checkoutSlicer';
import { devices } from 'components/store/lib/Devices';
import { motion } from 'framer-motion';
import Link from 'next/link';
import color from 'components/store/lib/ui.colors';

const Orders = () => {
  const dispatch = useAppDispatch();
  const { checkouts, loading } = useAppSelector<TStoreCheckoutState>(
    (state) => state.storeCheckout,
  );

  useEffect(() => {
    dispatch(fetchCheckouts());
  }, []);

  return (
    <>
      <Head>
        <title>Мои заказы | Fingarden</title>
      </Head>
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
          <HeaderWrapper>
            <div className="header-title-wrapper">
              <span>Заказы</span>
            </div>
            <div className="header-divder-wrapper"></div>
          </HeaderWrapper>
        </BasketHeader>
        <Order checkouts={checkouts} />
        {/* {loading ? <Loading /> : } */}
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
  .no-orders {
    width: 100%;
    height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .empty-orders {
      font-size: 2rem;
      font-family: Anticva;
      text-align: center;
    }
  }
`;
const BasketHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 35px;
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
  @media ${devices.laptopS} {
    width: 95%;
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

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  border-bottom: 1px solid ${color.textSecondary};
  position: relative;
  .header-title-wrapper {
    max-width: 1230px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 0 0 20px 30px;
    border-bottom: 1px solid ${color.textSecondary};
    z-index: 2;
    margin-bottom: -1px;
    span {
      font-family: Anticva;
      font-size: 1.5rem;
    }
  }
  .header-divder-wrapper {
    width: 50%;
    align-self: flex-start;
    border-bottom: 20px solid ${color.textPrimary};
    z-index: 1;
    position: absolute;
    top: 40px;
    left: 0;
  }
  @media ${devices.laptopS} {
    .header-title-wrapper {
      max-width: unset;
    }
  }

  @media ${devices.mobileL} {
    .header-title-wrapper {
      max-width: unset;
    }
  }
  @media ${devices.mobileM} {
    .header-title-wrapper {
      max-width: unset;
    }
  }

  @media ${devices.mobileS} {
    .header-title-wrapper {
      max-width: unset;
    }
  }
`;

Orders.PageLayout = StoreLayout;

export default Orders;
