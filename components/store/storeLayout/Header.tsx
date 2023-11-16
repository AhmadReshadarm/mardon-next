import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { Container, Content, Wrapper } from './common';
import { overrideDefaultIOSZoom } from './helpers';
import AuthorizationModel from './utils/HeaderAuth/index';
import HeaderCart from './utils/HeaderCart';
import SearchBar from './utils/SearchBar/SearchBar';
import ExtraNavBar from './utils/ExtraNav';
import variants from '../lib/variants';
import color from '../lib/ui.colors';
import { outsideClickListner } from 'components/store/storeLayout/helpers';
import LogoSVG from '../../../assets/fingarden.svg';
import SearchedNormalSVG from '../../../assets/search_normal.svg';
import SearchedPressedSVG from '../../../assets/search_pressed.svg';
import WishlistNormalSVG from '../../../assets/Wishlist_normal_black.svg';
import ProfileLogedOutSVG from '../../../assets/profile_loged_out.svg';
import { PopupDisplay } from './constants';
import { motion } from 'framer-motion';
import HeaderCatalog from './utils/HeaderCatalog/index';
import { devices } from '../lib/Devices';
import { useEffect, useState, useCallback } from 'react';
import { useAppDispatch } from 'redux/hooks';
import NavWrapMobile from './NavWrapMobile';
import { useRouter } from 'next/router';
import ReactGA from 'react-ga';
import { handleSearchclosed } from './helpers';
import { TWishlistState, TAuthState } from 'redux/types';
import { useAppSelector } from 'redux/hooks';
import SearchBarMobile from './utils/SearchBar/SearchBarMobile';
const Header = () => {
  const dispatch = useAppDispatch();
  const [isSearchActive, setSearchActive] = useState(false);
  const [display, setDisplay] = useState(PopupDisplay.None);
  const [searchWrapperRef, setSearchWrapperRef] = useState(null);
  const [searchBtnRef, setSearchBtnRef] = useState(null);
  const [listening, setListening] = useState(false);
  const searchWrapperNode = useCallback((node: any) => {
    setSearchWrapperRef(node);
  }, []);
  const searchBtnNode = useCallback((node: any) => {
    setSearchBtnRef(node);
  }, []);

  const [onWhichNav, setOnWhichNav] = useState('');
  const { wishlist }: TWishlistState = useAppSelector(
    (state) => state.wishlist,
  );
  useEffect(
    outsideClickListner(
      listening,
      setListening,
      searchWrapperRef,
      searchBtnRef,
      setSearchActive,
      setDisplay,
    ),
  );

  useEffect(() => {
    if (!isSearchActive) {
      handleSearchclosed(dispatch);
    }
  }, [isSearchActive]);
  // ReactGA.initialize('G-LGRKY05W0C');
  // const router = useRouter();

  // useEffect(() => {
  //   const handleRouteChange = (url, { shallow }) => {
  //     // REACTGA
  //     // Send pageview with a custom path
  //     ReactGA.send({ hitType: 'pageview', page: url });

  //     console.log(
  //       `App is changing to ${url} ${
  //         shallow ? 'with' : 'without'
  //       } shallow routing`,
  //     );
  //   };

  //   router.events.on('routeChangeComplete', handleRouteChange);

  //   // If the component is unmounted, unsubscribe
  //   // from the event with the `off` method:
  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteChange);
  //   };
  // }, []);
  // useEffect(() => {
  //   ReactGA.pageview(window.location.pathname + window.location.search);
  // }, []);
  useEffect(() => overrideDefaultIOSZoom());
  const { user } = useAppSelector<TAuthState>((state) => state.auth);
  return (
    <>
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.css"
          rel="stylesheet"
        />

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container
        variants={variants.fadInOut}
        key="header"
        initial="start"
        animate="middle"
        exit="end"
        flex_direction="column"
        justify_content="center"
        position="relative"
        bg_color={`linear-gradient(to right, ${color.bgSecondary} 60%, ${color.bgPrimary});`}
        id="page-top"
      >
        <Wrapper flex_direction="column">
          <Content
            height="90px"
            flex_direction="row"
            justify_content="space-between"
            align_items="center"
          >
            <LogoWrapper>
              <Link href="/">
                <LogoSVG id="header-logo" />
              </Link>
              <div className="mobile-div"></div>
            </LogoWrapper>
            <NavWraper>
              <button
                onMouseEnter={() => setOnWhichNav('catalog')}
                onMouseLeave={() => setOnWhichNav('')}
              >
                <span>КАТАЛОГ</span>
              </button>
              <button
                onMouseEnter={() => setOnWhichNav('services')}
                onMouseLeave={() => setOnWhichNav('')}
              >
                <span>УСЛУГИ</span>
              </button>
              <button
                onMouseEnter={() => setOnWhichNav('about')}
                onMouseLeave={() => setOnWhichNav('')}
              >
                <span>О КОМПАНИИ</span>
              </button>
            </NavWraper>
            <BtnsWrapper>
              <div className="innerWrapper">
                <button
                  className="header-action-btns"
                  ref={searchBtnNode}
                  title="Поиск"
                  onClick={() => {
                    setSearchActive(!isSearchActive);
                    !isSearchActive
                      ? setDisplay(PopupDisplay.Flex)
                      : setTimeout(() => setDisplay(PopupDisplay.None), 150);
                  }}
                >
                  <motion.span
                    animate={isSearchActive ? 'exit' : 'animate'}
                    variants={variants.fadeOutSlideOut}
                    className="search-absolute-position"
                  >
                    <SearchedNormalSVG />
                  </motion.span>
                  <motion.span
                    animate={isSearchActive ? 'animate' : 'exit'}
                    variants={variants.fadeInSlideIn}
                    className="search-absolute-position"
                  >
                    <SearchedPressedSVG />
                  </motion.span>
                </button>
                <div className="pop-up-parrent">
                  <AuthorizationModel />
                </div>
                <Link
                  href="/wishlist"
                  className="header-action-btns wishlist-Wrapper"
                  title="Избранное"
                >
                  {!!wishlist?.items?.length && (
                    <Counter>{wishlist?.items?.length}</Counter>
                  )}
                  <span>
                    <WishlistNormalSVG />
                  </span>
                </Link>
                <div className="pop-up-parrent">
                  <HeaderCart />
                </div>
              </div>
            </BtnsWrapper>
            <SignInMobile>
              {!!user ? (
                <motion.button
                  key="auth-profile-mobile"
                  initial="init"
                  animate={!!user ? 'animate' : 'exit'}
                  variants={variants.fadeInSlideIn}
                >
                  <Link
                    href="/profile"
                    style={{
                      borderRadius: '50%',
                      width: '28px',
                      height: '28px',
                      backgroundColor: '#000',
                      display: 'block',
                    }}
                  >
                    <img
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                      }}
                      src={
                        user?.image
                          ? `/api/images/${user.image}`
                          : `https://api.dicebear.com/7.x/micah/svg?radius=50&backgroundColor=ECEEE7&seed=${user?.firstName}`
                      }
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = `https://api.dicebear.com/7.x/micah/svg?radius=50&backgroundColor=ECEEE7&seed=${user?.firstName}`;
                      }}
                    />
                  </Link>
                </motion.button>
              ) : (
                <motion.button
                  key="auth"
                  initial="init"
                  animate={!!!user ? 'animate' : 'exit'}
                  variants={variants.fadeInSlideIn}
                  title="Войти"
                  className="mobile-sigin-btn"
                >
                  <Link href="/profile">
                    <span>
                      <ProfileLogedOutSVG />
                    </span>
                  </Link>
                </motion.button>
              )}
            </SignInMobile>
          </Content>
          <SearchBarMobile />
        </Wrapper>
        {onWhichNav == 'catalog' ? (
          <HeaderCatalog onWhichNav="catalog" setOnWhichNav={setOnWhichNav} />
        ) : (
          ''
        )}
        {onWhichNav == 'services' ? (
          <ExtraNavBar onWhichNav="service" setOnWhichNav={setOnWhichNav} />
        ) : (
          ''
        )}
        {onWhichNav == 'about' ? (
          <ExtraNavBar onWhichNav="about" setOnWhichNav={setOnWhichNav} />
        ) : (
          ''
        )}
        <SearchBar
          isSearchActive={isSearchActive}
          setSearchActive={setSearchActive}
          searchWrapperNode={searchWrapperNode}
          isSearchFormVisiable={display}
          setSearchDisplay={setDisplay}
        />
      </Container>
      <NavWrapMobile />
    </>
  );
};

const LogoWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  .mobile-div {
    display: none;
  }
  @media ${devices.laptopS} {
    position: relative;
    a {
      z-index: 2;
    }
    .mobile-div {
      display: block;
      min-height: 90px;
      background: white;
      width: 100%;
      position: absolute;
      z-index: 1;
      left: 55px;
    }
  }

  @media ${devices.mobileL} {
    position: relative;
    a {
      z-index: 2;
    }
    .mobile-div {
      display: block;
      min-height: 90px;
      background: white;
      width: 100%;
      position: absolute;
      z-index: 1;
      left: 55px;
    }
  }
  @media ${devices.mobileM} {
    position: relative;
    a {
      z-index: 2;
    }
    .mobile-div {
      display: block;
      min-height: 90px;
      background: white;
      width: 100%;
      position: absolute;
      z-index: 1;
      left: 55px;
    }
  }
  @media ${devices.mobileS} {
    position: relative;
    a {
      z-index: 2;
    }
    .mobile-div {
      display: block;
      min-height: 90px;
      background: white;
      width: 100%;
      position: absolute;
      z-index: 1;
      left: 55px;
    }
  }
`;

const NavWraper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${color.bgPrimary};
  a,
  button {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    span {
      color: #606060;
      font-size: 1rem;
      font-family: Anticva;
    }
  }
  @media ${devices.laptopS} {
    display: none;
  }

  @media ${devices.mobileL} {
    display: none;
  }
  @media ${devices.mobileM} {
    display: none;
  }
  @media ${devices.mobileS} {
    display: none;
  }
`;

const BtnsWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  background-color: ${color.bgPrimary};
  .innerWrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
    .pop-up-parrent {
      position: relative;
    }
    .wishlist-Wrapper {
      position: relative;
    }
    .header-action-btns {
      cursor: pointer;
      width: 25px;
      height: 25px;
      position: relative;
      .search-absolute-position {
        position: absolute;
        top: 0;
        left: 0;
      }
      span {
        width: 100%;
        height: 100%;
      }
    }
  }

  @media ${devices.laptopS} {
    display: none;
  }

  @media ${devices.mobileL} {
    display: none;
  }
  @media ${devices.mobileM} {
    display: none;
  }
  @media ${devices.mobileS} {
    display: none;
  }
`;

const SignInMobile = styled.div`
  display: none;
  height: 100%;
  width: 25px;
  background-color: ${color.bgPrimary};
  .mobile-sigin-btn {
    width: 25px;
    a {
      width: 25px;
      span {
        width: 25px;
        height: 25px;
      }
    }
  }
  @media ${devices.laptopS} {
    display: flex;
  }

  @media ${devices.mobileL} {
    display: flex;
  }
  @media ${devices.mobileM} {
    display: flex;
  }
  @media ${devices.mobileS} {
    display: flex;
  }
`;
const Counter = styled.span`
  position: absolute;
  top: -8px;
  right: -10px;
  width: 20px !important;
  height: 20px !important;
  border-radius: 50%;
  background-color: ${color.hoverBtnBg};
  color: ${color.textPrimary};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2px;
`;

export default Header;
