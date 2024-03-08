import styled from '@emotion/styled';
import Link from 'next/link';
import { Btns } from '../../common';
import {
  CatelogSVG,
  BasketSVG,
  WishlistSVG,
  HomePageIconSVG,
} from 'assets/icons/UI-icons';
import { devices } from '../../../lib/Devices';
import { TCartState } from 'redux/types';
import { useAppSelector } from 'redux/hooks';
import { TWishlistState } from 'redux/types';
import { useRouter } from 'next/router';
import color from 'components/store/lib/ui.colors';

const NavMobile = () => {
  const { cart } = useAppSelector<TCartState>((state) => state.cart);
  const { wishlist }: TWishlistState = useAppSelector(
    (state) => state.wishlist,
  );
  const router = useRouter();

  return (
    <NavWrap>
      <Link aria-label="главная страница" href="/">
        <span>
          <HomePageIconSVG
            colorState={router.pathname == '/' ? '#000000' : '#949494'}
          />
        </span>
      </Link>
      <Link aria-label="каталог" href="/catalog">
        <span>
          {
            <CatelogSVG
              colorState={router.pathname == '/catalog' ? '#000000' : '#949494'}
            />
          }
        </span>
      </Link>

      <ParentWrapper>
        {!!cart?.orderProducts?.length && (
          <Counter>{cart?.orderProducts?.length}</Counter>
        )}
        <Link aria-label="корзина" href="/cart">
          <span>
            {
              <BasketSVG
                fill={router.pathname == '/cart' ? '#000000' : '#949494'}
              />
            }
          </span>
        </Link>
      </ParentWrapper>
      <ParentWrapper>
        {!!wishlist?.items?.length && (
          <Counter>{wishlist?.items?.length}</Counter>
        )}
        <Link aria-label="избранное" href="/wishlist">
          <span>
            <WishlistSVG
              fill={router.pathname == '/wishlist' ? '#000000' : '#949494'}
            />
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
  min-width: 100vw;
  min-height: 60px;
  max-height: 60px;
  height: 100%;
  background-color: ${color.glassmorphismBg};
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  @media ${devices.laptopS} {
    display: flex;
  }
  @media ${devices.tabletL} {
    display: flex;
  }
  @media ${devices.tabletS} {
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

export default NavMobile;
