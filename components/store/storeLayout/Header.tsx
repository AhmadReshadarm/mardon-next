import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { Container, Content, Wrapper } from './common';
import { handleMenuStateRedux, overrideDefaultIOSZoom } from './helpers';
import AuthorizationModel from './utils/HeaderAuth/index';
import HeaderCart from './utils/HeaderCart';
import SearchBar from './utils/SearchBar';
import HeaderCatalog from './utils/HeaderCatalog/index';
import variants from '../lib/variants';
import color from '../lib/ui.colors';
import {
  MenueNormalStateSVG,
  LogoSVG,
  SearchSVG,
  WishlistSVG,
  BasketSVG,
  ProfileSVG,
  MenuActiveStateSVG,
} from 'assets/icons/UI-icons';
import { PopupDisplay } from './constants';
import { motion } from 'framer-motion';
import { devices } from '../lib/Devices';
import { useEffect, useState, useCallback } from 'react';
import { useAppDispatch } from 'redux/hooks';
import NavWrapMobile from './NavWrapMobile';
import { useRouter } from 'next/router';
import ReactGA from 'react-ga';
import { handleSearchclosed } from './helpers';
import {
  TWishlistState,
  TAuthState,
  TGlobalUIState,
  TCartState,
} from 'redux/types';
import { useAppSelector } from 'redux/hooks';
import {
  changeCatelogState,
  changeCatelogDisplayState,
  changeSearchFormState,
  changeSearchDisplayState,
  changeAuthFormState,
  changeAuthFormDisplayState,
  changeBasketState,
  changeCartDisplayState,
  changeWishlistState,
  changeWishlistDisplayState,
} from 'redux/slicers/store/globalUISlicer';
import HeaderWishlist from './utils/HeaderWishlist';

const Header = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // useEffect(() => {
  //   if (!isSearchActive) {
  //     handleSearchclosed(dispatch);
  //   }
  // }, [isSearchActive]);
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
  const { cart } = useAppSelector<TCartState>((state) => state.cart);
  const { wishlist }: TWishlistState = useAppSelector(
    (state) => state.wishlist,
  );

  // ---------------------- UI HOOKS ------------------------

  // ------------------- catelog hooks -------------------
  const [catelogButtonRef, setCatelogButtonRef] = useState(null);
  const catelogButtonNode = useCallback((node: any) => {
    setCatelogButtonRef(node);
  }, []);
  // --------------------------------------------------------

  // ------------------- search hooks ---------------------
  const [searchButtonRef, setSearchButtonRef] = useState(null);
  const searchButtonNode = useCallback((node) => {
    setSearchButtonRef(node);
  }, []);

  // ------------------ wishlist hooks ------------------------
  const [wishlistButtonRef, setWishlistButtonRef] = useState(null);
  const wishlistButtonNode = useCallback((node) => {
    setWishlistButtonRef(node);
  }, []);
  // ------------------- cart hooks ------------------------------
  const [cartButtonRef, setCartButtonRef] = useState(null);
  const cartButtonNode = useCallback((node) => {
    setCartButtonRef(node);
  }, []);

  // ------------------- authorization hooks ---------------------
  const [authButtonRef, setAuthButtonRef] = useState(null);
  const authButtonNode = useCallback((node) => {
    setAuthButtonRef(node);
  }, []);
  // ------------------ end of authorization hooks ------------------
  const {
    isCatalogOpen,
    isAuthFormOpen,
    isBasketOpen,
    isWishlistOpen,
    isSearchFormActive,
    isDropDownOpen,
    catelogDisplay,
    searchDisplay,
    wishlistDisplay,
    cartDisplay,
    authDisplay,
  } = useAppSelector<TGlobalUIState>((state) => state.globalUI);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  // --------------------- end of UI hooks --------------------------

  return (
    <>
      {/* <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.css"
          rel="stylesheet"
        />

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head> */}
      <Container
        variants={variants.fadInOut}
        key="header-global"
        initial="start"
        animate="middle"
        exit="end"
        flex_direction="column"
        justify_content="center"
        align_items="center"
        position="relative"
        bg_color={color.backgroundSecondery}
      >
        <Wrapper flex_direction="column" position="relative">
          <Content
            height="90px"
            flex_direction="row"
            justify_content="space-between"
            align_items="center"
          >
            {/* ---------------------- catelog ------------------------- */}
            <MenuButtonWrapper
              ref={catelogButtonNode}
              onClick={handleMenuStateRedux(
                dispatch,
                changeCatelogState,
                changeCatelogDisplayState,
                isCatalogOpen,
                catelogDisplay,
              )}
            >
              {catelogDisplay == PopupDisplay.None ? (
                <MenueNormalStateSVG
                  fill={
                    isAuthFormOpen ||
                    isBasketOpen ||
                    isWishlistOpen ||
                    isSearchFormActive
                      ? color.inactiveIcons
                      : color.activeIcons
                  }
                  animate={true}
                />
              ) : (
                <MenuActiveStateSVG fill={color.activeIcons} animate={true} />
              )}
            </MenuButtonWrapper>
            {/* ---------------------- end of catelog ------------------------- */}
            <LogoWrapper>
              <Link href="/">
                <LogoSVG />
              </Link>
            </LogoWrapper>
            <IconsWrapper>
              {/* ---------------------- search ------------------------- */}
              <div
                ref={searchButtonNode}
                onClick={handleMenuStateRedux(
                  dispatch,
                  changeSearchFormState,
                  changeSearchDisplayState,
                  isSearchFormActive,
                  searchDisplay,
                )}
                className="icons-parent-wrapper"
              >
                <SearchSVG
                  fill={
                    isAuthFormOpen ||
                    isBasketOpen ||
                    isWishlistOpen ||
                    isCatalogOpen
                      ? color.inactiveIcons
                      : color.activeIcons
                  }
                />
              </div>
              {/* ---------------------- end of search ------------------------- */}
              {/* ---------------------- wishlist ------------------------- */}
              <div
                ref={wishlistButtonNode}
                onClick={handleMenuStateRedux(
                  dispatch,
                  changeWishlistState,
                  changeWishlistDisplayState,
                  isWishlistOpen,
                  wishlistDisplay,
                )}
                className="icons-parent-wrapper"
              >
                {!!wishlist?.items?.length && (
                  <Counter>{wishlist?.items?.length}</Counter>
                )}
                <WishlistSVG
                  fill={
                    isAuthFormOpen ||
                    isSearchFormActive ||
                    isBasketOpen ||
                    isCatalogOpen
                      ? color.inactiveIcons
                      : color.activeIcons
                  }
                />
              </div>
              {/* ---------------------- end of wishlist ------------------------- */}
              {/* ---------------------- basket ------------------------- */}
              <div
                ref={cartButtonNode}
                onClick={handleMenuStateRedux(
                  dispatch,
                  changeBasketState,
                  changeCartDisplayState,
                  isBasketOpen,
                  cartDisplay,
                )}
                className="icons-parent-wrapper"
              >
                {!!cart?.orderProducts?.length && (
                  <Counter>{cart?.orderProducts?.length}</Counter>
                )}
                <BasketSVG
                  fill={
                    isAuthFormOpen ||
                    isSearchFormActive ||
                    isWishlistOpen ||
                    isCatalogOpen
                      ? color.inactiveIcons
                      : color.activeIcons
                  }
                />
              </div>
              {/* ---------------------- end of basket ------------------------- */}
              {/* ---------------------- Authorization ------------------------- */}
              <div
                ref={authButtonNode}
                onClick={() => {
                  windowWidth < 1024
                    ? router.push('/profile')
                    : handleMenuStateRedux(
                        dispatch,
                        changeAuthFormState,
                        changeAuthFormDisplayState,
                        isAuthFormOpen,
                        authDisplay,
                      )();
                }}
                className="profile-icon-wrapper"
              >
                {!!!user ? (
                  <motion.button
                    key="profile-global-indecator-loged-out"
                    initial="init"
                    animate={!!user ? 'exit' : 'animate'}
                    variants={variants.fadeInSlideIn}
                  >
                    <ProfileSVG
                      fill={
                        isBasketOpen ||
                        isSearchFormActive ||
                        isWishlistOpen ||
                        isCatalogOpen
                          ? color.inactiveIcons
                          : color.activeIcons
                      }
                    />
                  </motion.button>
                ) : (
                  <motion.button
                    key="profile-global-indecator-loged-in"
                    initial="init"
                    animate={!!user ? 'animate' : 'exit'}
                    variants={variants.fadeInSlideIn}
                  >
                    <img
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                      }}
                      src={
                        user.image
                          ? `/api/images/${user.image}`
                          : `https://api.dicebear.com/7.x/micah/svg?radius=50&backgroundColor=ECEEE7&seed=${user?.firstName}`
                      }
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = `https://api.dicebear.com/7.x/micah/svg?radius=50&backgroundColor=ECEEE7&seed=${user?.firstName}`;
                      }}
                    />
                  </motion.button>
                )}
              </div>

              {/* ---------------------- end of Authorization ------------------------- */}
            </IconsWrapper>
          </Content>
          {/* <SearchBarMobile /> */}
          <HeaderCatalog catelogButtonRef={catelogButtonRef} />
          <SearchBar
            searchButtonRef={searchButtonRef}
            windowWidth={windowWidth}
          />
          <HeaderWishlist wishlistButtonRef={wishlistButtonRef} />
          <HeaderCart cartButtonRef={cartButtonRef} />
          <AuthorizationModel
            authButtonRef={authButtonRef}
            windowWidth={windowWidth}
          />
        </Wrapper>
      </Container>
    </>
  );
};

const LogoWrapper = styled.div`
  z-index: 100;
  // @media ${devices.laptopS} {
  // }

  // @media ${devices.mobileL} {
  // }
  // @media ${devices.mobileM} {
  // }
  // @media ${devices.mobileS} {
  // }
`;

const IconsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  .icons-parent-wrapper {
    display: flex;
    position: relative;
    z-index: 100;
    cursor: pointer;
  }
  .profile-icon-wrapper {
    display: flex;
    z-index: 100;
    button {
      cursor: pointer;
    }
  }
  @media ${devices.laptopS} {
    .icons-parent-wrapper {
      display: none;
    }
  }
  @media ${devices.tabletL} {
    .icons-parent-wrapper {
      display: none;
    }
  }
  @media ${devices.tabletS} {
    .icons-parent-wrapper {
      display: none;
    }
  }
  @media ${devices.mobileL} {
    .icons-parent-wrapper {
      display: none;
    }
  }
  @media ${devices.mobileM} {
    .icons-parent-wrapper {
      display: none;
    }
  }
  @media ${devices.mobileS} {
    .icons-parent-wrapper {
      display: none;
    }
  }
`;

const MenuButtonWrapper = styled.div`
  z-index: 100;
  cursor: pointer;
  @media ${devices.laptopS} {
    display: none;
  }
  @media ${devices.tabletL} {
    display: none;
  }
  @media ${devices.tabletS} {
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

const Counter = styled.span`
  position: absolute;
  top: -8px;
  right: -10px;
  width: 20px !important;
  height: 20px !important;
  border-radius: 50%;
  background-color: ${color.buttonPrimary};
  color: ${color.textPrimary};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2px;
  user-select: none;
`;

export default Header;
