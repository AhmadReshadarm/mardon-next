import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Product, ProductVariant } from 'swagger/services';
import { checkIfItemInCart, checkIfItemInWishlist } from './helpers';
import ItemCounter from 'ui-kit/ItemCounter';
import color from 'components/store/lib/ui.colors';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TCartState, TWishlistState } from 'redux/types';
import {
  handleCartBtnClick,
  handleWishBtnClick,
} from 'ui-kit/products/helpers';
import { devices } from 'components/store/lib/Devices';
import { useState } from 'react';

type PropsCart = {
  product: Product;
  qty: number;
  variant: ProductVariant | undefined;
};

type StyleProps = {
  cardWidth?: number;
  isInwishList?: boolean;
};

export const AddToCart: React.FC<PropsCart> = ({ product, qty, variant }) => {
  const { cart, countLoading } = useAppSelector<TCartState>(
    (state) => state.cart,
  );

  const dispatch = useAppDispatch();

  // -------------------- UI Hooks ---------------------
  const [productId, setProductId] = useState('');

  // ------------------- end of UI Hooks --------------------

  return (
    <>
      {!checkIfItemInCart(product, cart!) ? (
        <CartButtonWrapper
          onClick={() => {
            handleCartBtnClick(product, dispatch, variant!, cart!)();
            setProductId('');
            setProductId(product.id!);
            setTimeout(() => setProductId(''), 1200);
          }}
          disabled={countLoading ? true : false}
        >
          <motion.div
            initial={{ height: '0%', width: '0%' }}
            animate={{ height: '100%', width: '100%' }}
            transition={{ duration: 0.15 }}
            className="content-wrapper"
          >
            {countLoading && productId === product.id ? (
              <Loader />
            ) : (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                В КОРЗИНУ
              </motion.span>
            )}
          </motion.div>
          <div className="content-indecator"></div>
        </CartButtonWrapper>
      ) : (
        <ItemCounter product={product} qty={qty} />
      )}
    </>
  );
};

type PropsWishlist = {
  product: Product;
};

export const AddToWishlist: React.FC<PropsWishlist> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { wishlist, loading }: TWishlistState = useAppSelector(
    (state) => state.wishlist,
  );

  // -------------------- UI Hooks ---------------------

  const [productId, setProductId] = useState('');

  // ------------------- end of UI Hooks --------------------

  return (
    <WishlistButtonWrapper
      onClick={handleWishBtnClick(product, dispatch, wishlist!)}
      onMouseDown={() => {
        setProductId('');
        setProductId(product.id!);
        setTimeout(() => setProductId(''), 1000);
      }}
      disabled={loading ? true : false}
    >
      <InWishlistButtonContent
        isInwishList={checkIfItemInWishlist(product, wishlist!)}
      >
        {loading && productId === product.id ? (
          <Loader />
        ) : (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="wishlist-text-wrapper"
            style={{
              fontSize: checkIfItemInWishlist(product, wishlist!)
                ? '0.7rem'
                : '',
            }}
          >
            {checkIfItemInWishlist(product, wishlist!)
              ? 'УЖЕ В ИЗБРАННОЕ'
              : 'В ИЗБРАННОЕ'}
          </motion.span>
        )}
        <div className="content-indecator"></div>
      </InWishlistButtonContent>
    </WishlistButtonWrapper>
  );
};

const Loader = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    transform: translateX(-100px);
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    animation: loading 0.8s infinite;
  }

  @keyframes loading {
    100% {
      transform: translateX(100%);
    }
  }
`;

const CartButtonWrapper = styled(motion.button)`
  width: 150px;
  height: 50px;
  border-radius: 30px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  span {
    color: ${color.textPrimary};
  }

  .content-wrapper {
    background-color: ${color.buttonPrimary};
    width: 150px;
    height: 50px;
    border-radius: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .content-indecator {
    width: 100%;
    height: 100%;
    background-color: transparent;
    position: absolute;
    top: 0;
    left: 0;
  }

  &:active {
    background-color: ${color.backgroundPrimary};
    border: 1px solid;
    span {
      color: ${color.textSecondary};
    }
  }
  @media ${devices.laptopM} {
    width: 140px;
  }
  @media ${devices.tabletS} {
    width: 125px;
  }
`;

const InWishlistButtonContent = styled.div<StyleProps>`
  width: 150px;
  height: 50px;
  border-radius: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  transition: 200ms;
  position: relative;
  overflow: hidden;
  background: ${(props) => {
    return props.isInwishList
      ? `linear-gradient(
      90deg,
      #cda172 -6.8%,
      #fef5ca 34.14%,
      #fff8d7 38.26%,
      #fdf3c8 66.52%,
      #cda172 107.04%
    )`
      : `linear-gradient(94deg, #f2d099 9.58%, #c6986a 106.37%)`;
  }};
  ${(props) => {
    return props.isInwishList ? `border:1px solid #00000017` : `none`;
  }};
  span {
    color: ${color.textSecondary};
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .content-indecator {
    width: 100%;
    height: 100%;
    background-color: transparent;
    position: absolute;
    top: 0;
    left: 0;
  }
  &:active {
    background: #c1ab93;
    border: none;
  }
  @media ${devices.laptopM} {
    width: 140px;
  }
  @media ${devices.tabletS} {
    width: 125px;
  }
`;

const WishlistButtonWrapper = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: transparent;
  width: 150px;
  height: 50px;
  position: relative;
  overflow: hidden;
  @media ${devices.laptopM} {
    width: 140px;
  }
  @media ${devices.tabletS} {
    width: 125px;
  }
`;
