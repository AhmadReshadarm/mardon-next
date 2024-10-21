import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import styled from 'styled-components';
import {
  handleMenuStateRedux,
  outsideClickListnerRedux,
} from 'components/store/storeLayout/helpers';
import { TCartState, TGlobalUIState } from 'redux/types';
import { getTotalPrice } from 'components/store/cart/helpers';
import { TAuthState } from 'redux/types';
import { setOneClickBy } from 'redux/slicers/store/cartSlicer';
import HeaderProductItmes from 'ui-kit/HeaderProductItems';
import {
  changeBasketState,
  changeCartDisplayState,
} from 'redux/slicers/store/globalUISlicer';

type Props = {
  cartButtonRef: HTMLDivElement | any;
};

type StyleProps = {
  isLargeTotal: boolean;
};
const HeaderCart: React.FC<Props> = ({ cartButtonRef }) => {
  const dispatch = useAppDispatch();

  const { cart } = useAppSelector<TCartState>((state) => state.cart);
  const { user } = useAppSelector<TAuthState>((state) => state.auth);
  const handleGoToCart = () => {
    dispatch(setOneClickBy(false));
  };

  //  -------------------------- UI HOOKS ------------------------------
  const { isBasketOpen, cartDisplay } = useAppSelector<TGlobalUIState>(
    (state) => state.globalUI,
  );
  const [cartWrapperRef, setCartWrapperRef] = useState(null);
  const [listening, setListening] = useState(false);
  const cartWrapperNode = useCallback((node: any) => {
    setCartWrapperRef(node);
  }, []);

  useEffect(
    outsideClickListnerRedux(
      listening,
      setListening,
      cartWrapperRef,
      cartButtonRef,
      dispatch,
      changeBasketState,
      changeCartDisplayState,
    ),
  );
  // ---------------------- end of UI hooks ---------------------
  return (
    <PopupWrapper
      ref={cartWrapperNode}
      style={{ display: cartDisplay }}
      animate={isBasketOpen ? 'open' : 'close'}
      variants={variants.fadeInReveal}
    >
      {isBasketOpen && (
        <>
          <div className="header-basket-form-background"></div>
          <div className="header-spacer"></div>
          {!cart?.orderProducts?.length ? (
            <div className="empty-wrapper">
              <h1>{`Корзина пуста`.toLocaleUpperCase()}</h1>
            </div>
          ) : (
            <PopupDivider>
              <PopupContent>
                {cart?.orderProducts?.map((orderProduct, index: any) => {
                  return (
                    <HeaderProductItmes
                      key={`cart-item-${index}`}
                      orderProduct={orderProduct}
                      dataType="cart"
                      handleMenuState={handleMenuStateRedux(
                        dispatch,
                        changeBasketState,
                        changeCartDisplayState,
                        isBasketOpen,
                        cartDisplay,
                      )}
                    />
                  );
                })}
              </PopupContent>

              <PopupBtnsDivider>
                <Link href="/cart" prefetch={false}>
                  <ActionBtns
                    onClick={handleMenuStateRedux(
                      dispatch,
                      changeBasketState,
                      changeCartDisplayState,
                      isBasketOpen,
                      cartDisplay,
                    )}
                  >
                    {`корзина`.toLocaleUpperCase()}
                  </ActionBtns>
                </Link>
                <Link href="/checkout" prefetch={false}>
                  <ActionBtns
                    onClick={() => {
                      handleGoToCart();
                      handleMenuStateRedux(
                        dispatch,
                        changeBasketState,
                        changeCartDisplayState,
                        isBasketOpen,
                        cartDisplay,
                      )();
                    }}
                  >
                    {`Оформить заказ`.toLocaleUpperCase()}
                  </ActionBtns>
                </Link>
                <TotalPriceWrapper
                  isLargeTotal={
                    getTotalPrice(cart.orderProducts, user!)! > 100000
                  }
                >
                  <h1>ОБЩИЙ СЧЕТ</h1>
                  <h1 className="total-price-wrapper">
                    {getTotalPrice(cart.orderProducts, user!)}₽
                  </h1>
                </TotalPriceWrapper>
              </PopupBtnsDivider>
            </PopupDivider>
          )}
        </>
      )}
    </PopupWrapper>
  );
};

const PopupWrapper = styled(motion.div)`
  width: 80%;
  height: 100vh;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 99;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 50px 50px 50px;
  .header-basket-form-background {
    width: calc(100% + 50vw);
    height: 100%;
    position: absolute;
    top: 0;
    right: -50vw;
    background-color: ${color.glassmorphismBg};
    -webkit-backdrop-filter: blur(9px);
    backdrop-filter: blur(9px);
    z-index: -1;
  }
  .header-spacer {
    width: 100%;
    height: 90px;
    min-height: 100px;
  }
  .empty-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1 {
      font-family: ricordi;
    }
  }
  @media (min-width: 1024px) and (max-width: 1150px) {
    width: 90%;
  }
`;

const PopupDivider = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const PopupBtnsDivider = styled.div`
  width: 100%;
  height: 110px;
  background-color: ${color.backgroundPrimary};
  display: flex;
  flex-direction: row;
  -webkit-box-pack: justify;
  justify-content: flex-start;
  align-items: center;
  padding: 30px;
  border: 1px solid #e5e2d9;
  gap: 30px;
`;

const TotalPriceWrapper = styled.div<StyleProps>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  h1 {
    font-size: 1.8rem;
    font-family: ricordi;
    color: ${color.textBase};
    white-space: nowrap;
  }
  .total-price-wrapper {
    color: ${color.textSecondary};
    ${({ isLargeTotal }) => {
      if (isLargeTotal) {
        return `
        font-size:1rem;`;
      }
    }}
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
`;

const ActionBtns = styled.button`
  width: 200px;
  height: 50px;
  background: ${color.btnPrimary};
  color: ${color.textPrimary};
  border: none;
  border-radius: 30px;
  font-family: ricordi;
  &:active {
    border: 1px solid;
    background: ${color.backgroundPrimary};
    color: ${color.textSecondary};
  }
`;

export default HeaderCart;
