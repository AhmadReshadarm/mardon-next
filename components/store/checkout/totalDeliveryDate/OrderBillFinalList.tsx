import { fixPriceMissMatchOrBoxMissMatch } from 'components/store/cart/helpers';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TCartState } from 'redux/types';
import {
  calculateIndvidualPercent,
  calculateIndvidualProductTotal,
} from './helpers';
import { devices } from 'components/store/lib/Devices';
import color from 'components/store/lib/ui.colors';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const OrderFinalBillList = ({ orderProduct, paymentOption }) => {
  const { cart } = useAppSelector<TCartState>((state) => state.cart);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (cart && orderProduct?.productVariant) {
      fixPriceMissMatchOrBoxMissMatch(
        orderProduct.product!,
        cart,
        orderProduct.productVariant,
        dispatch,
      );
    }
  }, [cart, orderProduct]);

  return (
    <ItemRow>
      <span title={orderProduct.product.name}>
        {orderProduct.product?.name?.slice(0, 20)}..
      </span>
      <p className="product-price-mobile-wrapper">
        <span>{orderProduct!.qty} шт</span> *{'  '}
        <span>
          {calculateIndvidualPercent(
            paymentOption,
            orderProduct.productVariant?.price,
          )}{' '}
          ₽
        </span>
        {'  '}
        <span>=</span>
        {'  '}
        <span style={{ whiteSpace: 'nowrap' }}>
          {calculateIndvidualProductTotal(
            paymentOption,
            orderProduct.productVariant?.price,
            orderProduct.qty,
          )}{' '}
          ₽
        </span>
      </p>
    </ItemRow>
  );
};

const ItemRow = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  .self-pick-up {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    user-select: none;
    input {
      cursor: pointer;
    }
  }
  h3 {
    font-size: 1rem;
    font-weight: 500;
  }
  .product-wheight {
    color: ${color.textTertiary};
  }
  .total {
    font-size: 1.6rem;
    font-weight: 600;
  }
  @media ${devices.laptopS} {
    .product-price-mobile-wrapper {
      width: 100%;
      text-align: end;
    }
  }
  @media ${devices.tabletL} {
    .product-price-mobile-wrapper {
      width: 100%;
      text-align: end;
    }
  }
  @media ${devices.tabletS} {
    .product-price-mobile-wrapper {
      width: 100%;
      text-align: end;
    }
  }

  @media ${devices.mobileL} {
    .product-price-mobile-wrapper {
      width: 100%;
      text-align: end;
    }
  }
  @media ${devices.mobileM} {
    .product-price-mobile-wrapper {
      width: 100%;
      text-align: end;
    }
  }
  @media ${devices.mobileS} {
    .product-price-mobile-wrapper {
      width: 100%;
      text-align: end;
    }
  }
`;

export default OrderFinalBillList;
