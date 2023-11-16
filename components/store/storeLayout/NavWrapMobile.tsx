import styled from '@emotion/styled';
import Link from 'next/link';
import { Btns } from './common';
import color from '../lib/ui.colors';
import HomeSVG from '../../../assets/home_state_normal.svg';
import HomePressedSVG from '../../../assets/home_state_pressed.svg';
import CatalogSVG from '../../../assets/catelog_state_normal.svg';
import CatalogPressedSVG from '../../../assets/catelog_state_pressed_mobile.svg';
import WishListSVG from '../../../assets/wihslist_state_normal.svg';
import WishListPressedSVG from '../../../assets/wishlist_state_pressed.svg';
import CartSVG from '../../../assets/basket_state_normal.svg';
import CartPressedSVG from '../../../assets/basket_state_pressed_mobile.svg';
import { devices } from '../lib/Devices';
import { TCartState } from 'redux/types';
import { useAppSelector } from 'redux/hooks';
import { TWishlistState } from 'redux/types';
import { useRouter } from 'next/router';

const NavWrapMobile = () => {
  const { cart } = useAppSelector<TCartState>((state) => state.cart);
  const { wishlist }: TWishlistState = useAppSelector(
    (state) => state.wishlist,
  );
  const router = useRouter();

  return (
    <NavWrap>
      <Link href="/">
        <span>
          {router.pathname == '/' ? (
            <Btns>
              <span>
                <HomePressedSVG />
              </span>
            </Btns>
          ) : (
            <Btns>
              <span>
                <HomeSVG />
              </span>
            </Btns>
          )}
        </span>
      </Link>
      <Link href="/catalog">
        <span>
          {router.pathname == '/catalog' ? (
            <Btns>
              <span>
                <CatalogPressedSVG />
              </span>
            </Btns>
          ) : (
            <Btns>
              <span>
                <CatalogSVG />
              </span>
            </Btns>
          )}
        </span>
      </Link>
      <ParentWrapper>
        {!!wishlist?.items?.length && (
          <Counter>{wishlist?.items?.length}</Counter>
        )}
        <Link href="/wishlist">
          <span>
            {router.pathname == '/wishlist' ? (
              <Btns>
                <span>
                  <WishListPressedSVG />
                </span>
              </Btns>
            ) : (
              <Btns>
                <span>
                  <WishListSVG />
                </span>
              </Btns>
            )}
          </span>
        </Link>
      </ParentWrapper>
      <ParentWrapper>
        {!!cart?.orderProducts?.length && (
          <Counter>{cart?.orderProducts?.length}</Counter>
        )}
        <Link href="/cart">
          <span>
            {router.pathname == '/cart' ? (
              <Btns>
                <span>
                  <CartPressedSVG />
                </span>
              </Btns>
            ) : (
              <Btns>
                <span>
                  <CartSVG />
                </span>
              </Btns>
            )}
          </span>
        </Link>
      </ParentWrapper>
    </NavWrap>
  );
};

const NavWrap = styled.div`
  display: none;
  position: fixed;
  bottom: 0;
  z-index: 1000;
  width: 100vw;
  min-height: 60px;
  max-height: 60px;
  height: 100%;
  background-color: ${color.glassmorphismSeconderBG};
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
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

const ParentWrapper = styled.div`
  position: relative;
`;
const Counter = styled.span`
  position: absolute;
  top: -10px;
  right: -10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${color.hoverBtnBg};
  color: ${color.textPrimary};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2px;
`;

export default NavWrapMobile;
