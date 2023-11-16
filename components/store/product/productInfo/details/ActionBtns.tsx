import styled from 'styled-components';
import { motion } from 'framer-motion';
// import { UserSelectWrapper } from './common';

import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { OrderProduct, Product } from 'swagger/services';
import ItemCounter from 'ui-kit/ItemCounter';
import React from 'react';
import Link from 'next/link';
import { devices } from 'components/store/lib/Devices';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TCartState } from 'redux/types';
import { openErrorNotification } from 'common/helpers';
import {
  clearVariant,
  clearproductSize,
  setOneClickBy,
} from 'redux/slicers/store/cartSlicer';
type Props = {
  orderProduct?: OrderProduct;
  isInCart: boolean;
  onCartBtnClick: () => void;
  onCountChange: (counter: number, product: Product) => void;
};

const ActionBtns: React.FC<Props> = ({
  orderProduct,
  isInCart,
  onCartBtnClick,
  onCountChange,
}) => {
  const dispatch = useAppDispatch();
  const { variant, productSize } = useAppSelector<TCartState>(
    (state) => state.cart,
  );

  const handleAddToCartClick = () => {
    dispatch(setOneClickBy(false));
    if (variant == null) openErrorNotification('Выберите цвет');
    if (productSize == '') openErrorNotification('Выберите размер');
    if (variant !== null && productSize !== '' && !isInCart) {
      onCartBtnClick();
    }
  };

  const handleRemoveFromCartClick = () => {
    onCartBtnClick();
  };

  const handleOneClickBuy = (evt) => {
    dispatch(setOneClickBy(true));
    if (variant == null || productSize == '') {
      evt.preventDefault();
    }
    if (variant == null) openErrorNotification('Выберите цвет');
    if (productSize == '') openErrorNotification('Выберите размер');
    if (variant !== null && productSize !== '' && !isInCart) {
      onCartBtnClick();
    }
  };

  const handleGoToCart = () => {
    clearVariant();
    clearproductSize();
  };

  return (
    <ActionBtnContainer>
      <ActionBtnsWrapper
        key="action-btns-product-page"
        custom={0.3}
        initial="init"
        animate="animate"
        exit={{ y: -20, opacity: 0, transition: { delay: 0.2 } }}
        variants={variants.fadInSlideUp}
      >
        <AddtoCartWrapper>
          <motion.button
            onClick={handleRemoveFromCartClick}
            key={'basket-pressed'}
            animate={isInCart ? 'animate' : 'exit'}
            variants={variants.fadeOutSlideOut}
            className="in-cart"
          >
            <span>уже в корзине</span>
            <img src="/icons/vector.png" alt="in cart sign" />
          </motion.button>
          <motion.button
            onClick={handleAddToCartClick}
            key={'basket-normal'}
            animate={isInCart ? 'exit' : 'animate'}
            variants={variants.fadeOutSlideOut}
            className="not-in-cart"
          >
            <span>В КОРЗИНУ</span>
          </motion.button>
        </AddtoCartWrapper>
        <AddtoCartWrapper>
          <Link href="/checkout">
            <button
              onClick={(evt) => handleOneClickBuy(evt)}
              className="not-in-cart btn-secondery"
            >
              <span>КУПИТЬ В ОДИН КЛИК</span>
            </button>
          </Link>
        </AddtoCartWrapper>
      </ActionBtnsWrapper>
      {!!orderProduct && (
        <CounterAndGotoCartWrapper
          animate={isInCart ? 'animate' : 'exit'}
          variants={variants.fadeInSlideIn}
        >
          <ItemCounter
            qty={orderProduct?.qty!}
            product={orderProduct?.product!}
            onCountChange={onCountChange}
          />
          <Link href="/cart">
            <AddtoCartWrapper>
              <button onClick={handleGoToCart} className="in-cart">
                <span>ПЕРЕЙТИ В КОРЗИНУ</span>
              </button>
            </AddtoCartWrapper>
          </Link>
        </CounterAndGotoCartWrapper>
      )}
    </ActionBtnContainer>
  );
};

const ActionBtnContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const ActionBtnsWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;

const CounterAndGotoCartWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  a {
    width: 170px;
    justify-self: flex-end;
  }
`;

const AddtoCartWrapper = styled.div`
  width: 200px;
  height: 40px;
  position: relative;
  overflow: hidden;
  transition: 300ms;
  &:hover {
    transform: scale(1.02);
  }
  &:active {
    transform: scale(1);
  }
  .in-cart {
    border: 1px solid;
    gap: 10px;
    cursor: pointer;

    span {
      font-size: 1rem;
      font-weight: 300;
    }
  }
  .not-in-cart {
    background-color: ${color.btnPrimary};
    color: ${color.textPrimary};
    cursor: pointer;
    span {
      font-size: 1rem;
      font-weight: 300;
    }
  }
  .btn-secondery {
    background-color: ${color.btnSecondery};
    color: ${color.btnPrimary};
    &:hover {
      background-color: ${color.searchBtnBg};

      transform: scale(1.02);
    }
    &:active {
      transform: scale(1);
      background-color: ${color.btnPrimary};
      color: ${color.textPrimary};
    }
  }
  button {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  @media ${devices.laptopS} {
    width: 100%;
  }
  @media ${devices.mobileL} {
    width: 100%;
  }
  @media ${devices.mobileM} {
    width: 100%;
  }
  @media ${devices.mobileS} {
    width: 100%;
  }
`;

export default ActionBtns;
