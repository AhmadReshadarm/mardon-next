import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import styled from 'styled-components';
import { Basket } from 'swagger/services';
import BasketNormalSvg from '../../../../../assets/basket_normal.svg';
import { Btns } from '../../common';
import CartItem from './CartItem';
import { outsideClickListner } from 'components/store/storeLayout/helpers';
import { handleMenuState } from '../../helpers';
import { handleItemCountChange, handleItemRemove } from './helpers';
import { PopupDisplay } from '../../constants';
import { TCartState } from 'redux/types';
import { getTotalPrice } from 'components/store/cart/helpers';
import { TAuthState } from 'redux/types';
import { setOneClickBy } from 'redux/slicers/store/cartSlicer';

const HeaderCart = () => {
  const dispatch = useAppDispatch();
  const [isOpened, setIsOpened] = useState(false);
  const [display, setDisplay] = useState(PopupDisplay.None);
  const [menuRef, setMenuRef] = useState(null);
  const [btnRef, setBtnRef] = useState(null);
  const [listening, setListening] = useState(false);
  const menuNode = useCallback((node: any) => {
    setMenuRef(node);
  }, []);
  const btnNode = useCallback((node: any) => {
    setBtnRef(node);
  }, []);

  useEffect(
    outsideClickListner(
      listening,
      setListening,
      menuRef,
      btnRef,
      setIsOpened,
      setDisplay,
    ),
  );
  const { cart } = useAppSelector<TCartState>((state) => state.cart);
  const { user } = useAppSelector<TAuthState>((state) => state.auth);
  const handleGoToCart = () => {
    dispatch(setOneClickBy(false));
  };
  return (
    <>
      <div style={{ position: 'relative' }}>
        {!!cart?.orderProducts?.length && (
          <Counter>{cart?.orderProducts?.length}</Counter>
        )}
        <Btns
          ref={btnNode}
          id="cart-btn"
          title="Корзина"
          onClick={handleMenuState(setIsOpened, setDisplay)}
        >
          <span>
            <BasketNormalSvg />
          </span>
        </Btns>
      </div>
      <PopupWrapper
        ref={menuNode}
        style={{ display }}
        animate={isOpened ? 'open' : 'close'}
        variants={variants.fadeInReveal}
      >
        {!cart?.orderProducts?.length ? (
          <span style={{ color: color.hover }}>Корзина пуста</span>
        ) : (
          <PopupDivider>
            <PopupContent>
              {cart?.orderProducts?.map((item, index: any) => {
                return (
                  <CartItem
                    key={`cart-item-${index}`}
                    item={item}
                    onRemove={handleItemRemove(dispatch, cart)}
                    onCountChange={handleItemCountChange(dispatch, cart)}
                  />
                );
              })}
            </PopupContent>
            <TotalPriceWrapper>
              <span>Итого:</span>
              <span>{getTotalPrice(cart.orderProducts, user!)}₽</span>
            </TotalPriceWrapper>
            <PopupBtnsDivider>
              <Link href="/cart">
                <ActionBtns
                  whileHover="hover"
                  whileTap="tap"
                  variants={variants.boxShadow}
                  onClick={handleMenuState(setIsOpened, setDisplay)}
                >
                  Перейти в корзину
                </ActionBtns>
              </Link>
              <Link style={{ alignSelf: 'flex-end' }} href="/checkout">
                <ActionBtns
                  whileHover="hover"
                  whileTap="tap"
                  variants={variants.boxShadow}
                  onClick={() => {
                    handleGoToCart();
                    handleMenuState(setIsOpened, setDisplay);
                  }}
                >
                  Перейти к оформлению
                </ActionBtns>
              </Link>
            </PopupBtnsDivider>
          </PopupDivider>
        )}
      </PopupWrapper>
    </>
  );
};

const Counter = styled.span`
  position: absolute;
  top: -8px;
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

const PopupWrapper = styled(motion.div)`
  width: 450px;
  height: 350px;
  position: absolute;
  top: 60px;
  right: 0;
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${color.glassmorphismBg};
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);
  box-shadow: 0px 2px 10px ${color.boxShadowBtn};
  overflow: hidden;
  z-index: 99;
`;

const PopupDivider = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const PopupBtnsDivider = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  gap: 30px;
  a {
    width: 100%;
  }
`;

const TotalPriceWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 0;
  gap: 10px;
  padding-right: 10px;
  span {
    font-size: 1.3rem;
  }
`;

const PopupContent = styled(motion.ul)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-y: scroll;
  gap: 10px;
  &::-webkit-scrollbar {
    width: 5px;
  }
  a {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 10px 10px 0;
  }
`;

const ActionBtns = styled(motion.button)`
  width: 100%;
  height: 45px;
  background: ${color.btnPrimary};
  color: ${color.textPrimary};
  border: none;
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default HeaderCart;
