import styled from 'styled-components';
import { motion } from 'framer-motion';
// import { UserSelectWrapper } from './common';

import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { Basket, OrderProduct, Product } from 'swagger/services';
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
import { AddToCart, AddToWishlist } from 'ui-kit/ProductActionBtns';
import { findCartQTY } from 'ui-kit/HeaderProductItems/helpers';
import { checkIfItemInCart } from 'ui-kit/ProductActionBtns/helpers';
type Props = {
  orderProduct?: OrderProduct;
  cart: Basket;
  product: Product;
  // onCartBtnClick: () => void;
  // onCountChange: (counter: number, product: Product) => void;
};

const ActionBtns: React.FC<Props> = ({
  orderProduct,
  cart,
  product,
  // onCartBtnClick,
  // onCountChange,
}) => {
  const dispatch = useAppDispatch();
  const { variant, productSize } = useAppSelector<TCartState>(
    (state) => state.cart,
  );

  // const handleOneClickBuy = (evt) => {
  //   dispatch(setOneClickBy(true));
  //   if (variant == null || productSize == '') {
  //     evt.preventDefault();
  //   }
  //   if (variant == null) openErrorNotification('Выберите цвет');
  //   // if (productSize == '') openErrorNotification('Выберите размер'); && productSize !== ''
  //   if (variant !== null && !isInCart) {
  //     onCartBtnClick();
  //   }
  // };

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
        <AddToWishlist product={product!} />
        <AddToCart
          product={product!}
          qty={findCartQTY(product, cart!)}
          variant={variant ?? product?.productVariants![0]}
        />
      </ActionBtnsWrapper>
      {checkIfItemInCart(product, cart!) && (
        <CounterAndGotoCartWrapper
          initial="exit"
          animate="animate"
          variants={variants.fadeInSlideIn}
        >
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
  padding: 50px 0;
`;

const ActionBtnsWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  @media ${devices.mobileL} {
    flex-direction: column;
    align-items: flex-start;
  }
  @media ${devices.mobileM} {
    flex-direction: column;
    align-items: flex-start;
  }
  @media ${devices.mobileS} {
    flex-direction: column;
    align-items: flex-start;
  }
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
  background: ${color.activeIcons};
  width: 150px;
  height: 50px;
  border-radius: 30px;

  .in-cart {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 0.7rem;
      color: ${color.textPrimary};
    }
  }
  &:active {
    border: 1px solid;
    background-color: ${color.textPrimary};
    .in-cart {
      span {
        color: ${color.activeIcons};
      }
    }
  }
  @media ${devices.laptopM} {
    width: 140px;
  }
`;

export default ActionBtns;
