import Link from 'next/link';
import styled from 'styled-components';
import { Container, Content, Wrapper } from './common';
import { handleMenuStateRedux, overrideDefaultIOSZoom } from './helpers';
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
import { useRouter } from 'next/router';
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
import NavMobile from './utils/mobileNav';
import dynamic from 'next/dynamic';
import { createCart, fetchCart } from 'redux/slicers/store/cartSlicer';
import { axiosInstance } from 'common/axios.instance';
import {
  // createWishlist,
  fetchWishlistProducts,
} from 'redux/slicers/store/wishlistSlicer';

const HeaderCatalog = dynamic(() => import('./utils/HeaderCatalog/index'), {
  ssr: false,
});
const SearchBar = dynamic(() => import('./utils/SearchBar'), {
  ssr: false,
});
const HeaderWishlist = dynamic(() => import('./utils/HeaderWishlist'), {
  ssr: false,
});
const HeaderCart = dynamic(() => import('./utils/HeaderCart'), {
  ssr: false,
});
const AuthorizationModel = dynamic(() => import('./utils/HeaderAuth/index'), {
  ssr: false,
});

const Header = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => overrideDefaultIOSZoom());
  const { user } = useAppSelector<TAuthState>((state) => state.auth);
  const { cart } = useAppSelector<TCartState>((state) => state.cart);
  const { wishlist } = useAppSelector<TWishlistState>(
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
    // isDropDownOpen,
    catelogDisplay,
    searchDisplay,
    wishlistDisplay,
    cartDisplay,
    authDisplay,
  } = useAppSelector<TGlobalUIState>((state) => state.globalUI);

  const [windowWidth, setWindowWidth]: [any, any] = useState(null);

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

  const [isClient, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const basketId = localStorage.getItem('basketId');
      const wishlistId = localStorage.getItem('wishlistId')!;

      const createWishlistId = async () => {
        try {
          const wishlist = await axiosInstance.post('/wishlists');
          localStorage.setItem('wishlistId', wishlist.data.id);
        } catch (error) {
          console.log(error);
        }
      };

      const fetchDataCartProducts = async () => {
        if (!basketId) {
          await dispatch(createCart());
          const newCreatedCardId = localStorage.getItem('basketId');
          await dispatch(fetchCart(newCreatedCardId!));
        }
        if (basketId) {
          const cartResponse = await dispatch(fetchCart(basketId));
          // only for dev use 👇
          if (cartResponse.meta.requestStatus == 'rejected') {
            await dispatch(createCart());
            const newCreatedCardId = localStorage.getItem('basketId');
            await dispatch(fetchCart(newCreatedCardId!));
          }
        }
      };
      fetchDataCartProducts();

      const fetchDataWishlistProducts = async () => {
        if (!wishlistId) {
          await createWishlistId();
          const newCreatedWishlistId = localStorage.getItem('wishlistId');
          dispatch(fetchWishlistProducts(newCreatedWishlistId!));
        }
        if (wishlistId) {
          const wishlistResponse = await dispatch(
            fetchWishlistProducts(wishlistId),
          );
          // only for dev use 👇
          if (wishlistResponse.meta.requestStatus == 'rejected') {
            await createWishlistId();
            const newCreatedWishlistId = localStorage.getItem('wishlistId');
            dispatch(fetchWishlistProducts(newCreatedWishlistId!));
          }
        }
      };
      fetchDataWishlistProducts();
    }
  }, [isClient]);

  return (
    <>
      {isClient ? (
        <>
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
                  title="каталог"
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
                    <MenuActiveStateSVG
                      fill={color.activeIcons}
                      animate={true}
                    />
                  )}
                </MenuButtonWrapper>
                {/* ---------------------- end of catelog ------------------------- */}
                <LogoWrapper>
                  <Link
                    href="/"
                    prefetch={false}
                    title="Перейти на главную страницу"
                  >
                    <LogoSVG />
                  </Link>
                </LogoWrapper>
                <IconsWrapper>
                  {/* ---------------------- search ------------------------- */}
                  <button
                    ref={searchButtonNode}
                    onClick={handleMenuStateRedux(
                      dispatch,
                      changeSearchFormState,
                      changeSearchDisplayState,
                      isSearchFormActive,
                      searchDisplay,
                    )}
                    className="icons-parent-wrapper"
                    title="Поиск товаров"
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
                  </button>
                  {/* ---------------------- end of search ------------------------- */}
                  {/* ---------------------- wishlist ------------------------- */}
                  <button
                    ref={wishlistButtonNode}
                    onClick={handleMenuStateRedux(
                      dispatch,
                      changeWishlistState,
                      changeWishlistDisplayState,
                      isWishlistOpen,
                      wishlistDisplay,
                    )}
                    className="icons-parent-wrapper"
                    title="избранное"
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
                  </button>
                  {/* ---------------------- end of wishlist ------------------------- */}
                  {/* ---------------------- basket ------------------------- */}
                  <button
                    ref={cartButtonNode}
                    onClick={handleMenuStateRedux(
                      dispatch,
                      changeBasketState,
                      changeCartDisplayState,
                      isBasketOpen,
                      cartDisplay,
                    )}
                    className="icons-parent-wrapper"
                    title="корзина"
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
                  </button>
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
                      <>
                        <motion.button
                          key="profile-global-indecator-loged-out"
                          initial="init"
                          animate={!!user ? 'exit' : 'animate'}
                          variants={variants.fadeInSlideIn}
                          title="личный кабинет"
                          aria-label="личный кабинет"
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
                        <span className="profile-tag-mobile">Л.K.</span>
                      </>
                    ) : (
                      <motion.button
                        key="profile-global-indecator-loged-in"
                        initial="init"
                        animate={!!user ? 'animate' : 'exit'}
                        variants={variants.fadeInSlideIn}
                        title="личный кабинет"
                        aria-label="личный кабинет"
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
                              : `https://api.dicebear.com/7.x/initials/svg?radius=50&seed=${user?.firstName}`
                          }
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?radius=50&seed=${user?.firstName}`;
                          }}
                        />
                      </motion.button>
                    )}
                  </div>

                  {/* ---------------------- end of Authorization ------------------------- */}
                </IconsWrapper>
              </Content>

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
          <NavMobile />
        </>
      ) : (
        ''
      )}
    </>
  );
};

const LogoWrapper = styled.div`
  z-index: 100;
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
    flex-direction: column;
    align-items: center;
    z-index: 100;
    overflow: hidden;
    button {
      cursor: pointer;
    }
    .profile-tag-mobile {
      display: none;
      font-size: 12px;
      font-weight: 500;
    }
  }
  @media ${devices.laptopS} {
    .icons-parent-wrapper {
      display: none;
    }
    .profile-icon-wrapper {
      .profile-tag-mobile {
        display: block;
      }
    }
  }
  @media ${devices.tabletL} {
    .icons-parent-wrapper {
      display: none;
    }
    .profile-icon-wrapper {
      .profile-tag-mobile {
        display: block;
      }
    }
  }
  @media ${devices.tabletS} {
    .icons-parent-wrapper {
      display: none;
    }
    .profile-icon-wrapper {
      .profile-tag-mobile {
        display: block;
      }
    }
  }
  @media ${devices.mobileL} {
    .icons-parent-wrapper {
      display: none;
    }
    .profile-icon-wrapper {
      .profile-tag-mobile {
        display: block;
      }
    }
  }
  @media ${devices.mobileM} {
    .icons-parent-wrapper {
      display: none;
    }
    .profile-icon-wrapper {
      .profile-tag-mobile {
        display: block;
      }
    }
  }
  @media ${devices.mobileS} {
    .icons-parent-wrapper {
      display: none;
    }
    .profile-icon-wrapper {
      .profile-tag-mobile {
        display: block;
      }
    }
  }
`;

const MenuButtonWrapper = styled.button`
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
