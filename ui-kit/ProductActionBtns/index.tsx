import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Basket, Product, Wishlist } from 'swagger/services';
import variants from 'components/store/lib/variants';
import WishlistNormalSVG from '../../assets/wishlist_normal.svg';
import WishlistPressedSVG from '../../assets/wishlilst_pressed.svg';
import { checkIfItemInCart, checkIfItemInWishlist } from './helpers';
import ItemCounter from 'ui-kit/ItemCounter';
import color from 'components/store/lib/ui.colors';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TCartState, TWishlistState } from 'redux/types';
import {
  handleCartBtnClick,
  handleWishBtnClick,
} from 'ui-kit/products/helpers';

type PropsCart = {
  product: Product;
  qty: number;
};
export const AddToCart: React.FC<PropsCart> = ({ product, qty }) => {
  const { cart } = useAppSelector<TCartState>((state) => state.cart);
  const dispatch = useAppDispatch();
  return (
    <>
      {!checkIfItemInCart(product, cart!) ? (
        <CartButtonWrapper
          initial={{ height: '0px' }}
          animate={{ height: '50px' }}
          transition={{ duration: 0.004 }}
          onClick={handleCartBtnClick(
            product,
            dispatch,
            product.productVariants![0],
            cart!,
          )}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            В КОРЗИНУ
          </motion.span>
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
  const { wishlist }: TWishlistState = useAppSelector(
    (state) => state.wishlist,
  );
  return (
    <WishlistButtonWrapper
      onClick={handleWishBtnClick(product, dispatch, wishlist!)}
    >
      <InWishlistButtonContent
        key={'in-wishlist'}
        animate={checkIfItemInWishlist(product, wishlist!) ? 'animate' : 'exit'}
        variants={variants.fadeOutSlideOut}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          УЖЕ В ИЗБРАННОЕ
        </motion.span>
      </InWishlistButtonContent>

      <NotWishlistButtonContent
        key={'not-in-wishlist'}
        animate={checkIfItemInWishlist(product, wishlist!) ? 'exit' : 'animate'}
        variants={variants.fadeOutSlideOut}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          В ИЗБРАННОЕ
        </motion.span>
      </NotWishlistButtonContent>
    </WishlistButtonWrapper>
  );
};

const CartButtonWrapper = styled(motion.button)`
  width: 180px;
  height: 50px;
  border-radius: 30px;
  background-color: ${color.buttonPrimary};
  transition: 150ms;
  cursor: pointer;
  span {
    color: ${color.textPrimary};
    font-family: ricordi;
  }

  &:active {
    background-color: ${color.backgroundPrimary};
    border: 1px solid;
    span {
      color: ${color.textSecondary};
    }
  }
`;

const NotWishlistButtonContent = styled(motion.button)`
  width: 180px;
  height: 50px;
  border-radius: 30px;
  background: linear-gradient(94deg, #f2d099 9.58%, #c6986a 106.37%);
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  span {
    color: ${color.textSecondary};
    font-family: ricordi;
  }

  &:active {
    background: #c1ab93;
  }
`;

const InWishlistButtonContent = styled(motion.div)`
  width: 180px;
  height: 50px;
  border-radius: 30px;
  background: linear-gradient(
    90deg,
    #cda172 -6.8%,
    #fef5ca 34.14%,
    #fff8d7 38.26%,
    #fdf3c8 66.52%,
    #cda172 107.04%
  );
  border: 1px solid;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  span {
    color: ${color.textSecondary};
    font-family: ricordi;
    font-size: 0.8rem;
  }

  &:active {
    background: #c1ab93;
    border: none;
  }
`;

const WishlistButtonWrapper = styled.div`
  background: transparent;
  width: 180px;
  height: 50px;
  position: relative;
`;
