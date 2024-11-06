import variants from 'components/store/lib/variants';
import StoreLayout from 'components/store/storeLayout/layouts';
import styled from 'styled-components';
import Head from 'next/head';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TAuthState, TStoreCheckoutState } from 'redux/types';
import { useEffect, useState } from 'react';
import { fetchCheckouts } from 'redux/slicers/store/checkoutSlicer';
import { devices } from 'components/store/lib/Devices';
import { motion } from 'framer-motion';
import Link from 'next/link';
import color from 'components/store/lib/ui.colors';
import { baseUrl } from 'common/constant';
import dynamic from 'next/dynamic';
import { LoaderMask } from 'ui-kit/generalLoaderMask';
import Authorization from 'components/store/storeLayout/utils/HeaderAuth/authorize';
import { UsePagination } from 'components/store/storeLayout/utils/HeaderAuth/authorize/helpers';
import {
  Container,
  Content,
  Wrapper,
} from 'components/store/storeLayout/common';
const Order = dynamic(() => import('components/store/order'), {
  ssr: false,
  loading: () => <LoaderMask />,
});

const Orders = () => {
  const dispatch = useAppDispatch();
  const { checkouts } = useAppSelector<TStoreCheckoutState>(
    (state) => state.storeCheckout,
  );
  const { user } = useAppSelector<TAuthState>((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCheckouts());
  }, []);

  const [activeUI, setActiveUI] = useState('auth');
  const [direction, authType, paginate] = UsePagination();
  useEffect(() => {
    if (user) {
      setActiveUI('userData');
    }
    if (!user) {
      setActiveUI('auth');
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Мои заказы | NBHOZ</title>
        <meta
          property="og:image"
          name="og:image"
          content={`${baseUrl}/static/logo_800x800.png`}
        />
      </Head>
      <Container
        key="container-checkout"
        flex_direction="row"
        justify_content="center"
        align_items="center"
        padding="20px 0"
        bg_color={color.bgProduct}
        initial="start"
        animate="middle"
        exit="exit"
        variants={variants.fadInOut}
        style={{
          display: activeUI == 'auth' ? 'flex' : 'none',
        }}
      >
        <Wrapper gap={'20px'}>
          <Content
            flex_direction="column"
            justify_content="space-between"
            align_items="center"
          >
            <AuthContainer>
              <AuthWrapper variants={variants.fadeInReveal}>
                <AuthContent>
                  <Authorization
                    direction={direction}
                    authType={authType}
                    paginate={paginate}
                  />
                </AuthContent>
              </AuthWrapper>
            </AuthContainer>
          </Content>
        </Wrapper>
      </Container>

      {/* --------------------------------------------------------- */}
      <ContainerOrders
        variants={variants.fadInOut}
        key="container-home-banners"
        initial="start"
        animate="middle"
        exit="end"
        style={{
          display: activeUI == 'userData' ? 'flex' : 'none',
        }}
      >
        <BasketHeader>
          <div className="basket-header-back-btn">
            <Link href="/">
              <img src="/icons/back_arrow_min.png" alt="back button" />
              <span>Обратно на главную</span>
            </Link>
          </div>
          <HeaderWrapper>
            <div className="header-title-wrapper">
              <span>Заказы</span>
            </div>
          </HeaderWrapper>
        </BasketHeader>

        <Order checkouts={checkouts} />
      </ContainerOrders>
    </>
  );
};

const AuthContainer = styled(motion.div)`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: url(/auth_bg.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 350px;
`;

const AuthWrapper = styled(motion.div)`
  width: 100vw;
  height: 100%;
  position: relative;
  border-radius: 25px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${color.glassmorphismBg};
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);
  box-shadow: 0px 2px 10px ${color.boxShadowBtn};
  overflow: hidden;
`;

const AuthContent = styled(motion.div)`
  width: 85%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  p {
    text-align: center;
  }
`;

const ContainerOrders = styled(motion.div)`
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
    max-width: 1500px;
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
        font-family: ver(--font-Jost);
      }
    }
  }
  @media ${devices.laptopS} {
    width: 95%;
  }
  @media ${devices.tabletL} {
    width: 95%;
  }
  @media ${devices.tabletS} {
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
  position: relative;
  .header-title-wrapper {
    max-width: 1500px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 0 0 20px 30px;
    z-index: 2;
    span {
      font-size: 1.5rem;
    }
  }

  @media ${devices.laptopS} {
    .header-title-wrapper {
      max-width: 1230px;
    }
  }

  @media ${devices.laptopS} {
    .header-title-wrapper {
      max-width: unset;
    }
  }
  @media ${devices.tabletL} {
    .header-title-wrapper {
      max-width: unset;
    }
  }
  @media ${devices.tabletS} {
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
