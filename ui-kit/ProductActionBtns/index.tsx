import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Product, ProductVariant } from 'swagger/services';
import variants from 'components/store/lib/variants';
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

type PropsCart = {
  product: Product;
  qty: number;
  variant: ProductVariant | undefined;
  windowWidth: number;
};

type StyleProps = {
  cardWidth: number;
};

export const AddToCart: React.FC<PropsCart> = ({
  product,
  qty,
  variant,
  windowWidth,
}) => {
  const { cart } = useAppSelector<TCartState>((state) => state.cart);
  const dispatch = useAppDispatch();
  return (
    <>
      {!checkIfItemInCart(product, cart!) ? (
        <CartButtonWrapper
          initial={{ height: '0px' }}
          animate={{ height: '50px' }}
          transition={{ duration: 0.004 }}
          onClick={handleCartBtnClick(product, dispatch, variant!, cart!)}
          cardWidth={windowWidth}
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
  windowWidth: number;
};

export const AddToWishlist: React.FC<PropsWishlist> = ({
  product,
  windowWidth,
}) => {
  const dispatch = useAppDispatch();
  const { wishlist }: TWishlistState = useAppSelector(
    (state) => state.wishlist,
  );
  return (
    <WishlistButtonWrapper
      onClick={handleWishBtnClick(product, dispatch, wishlist!)}
      cardWidth={windowWidth}
    >
      <InWishlistButtonContent
        key={'in-wishlist'}
        animate={checkIfItemInWishlist(product, wishlist!) ? 'animate' : 'exit'}
        variants={variants.fadeOutSlideOut}
        cardWidth={windowWidth}
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
        cardWidth={windowWidth}
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
  width: 150px;
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
  @media ${devices.laptopM} {
    width: 140px;
  }
  @media ${devices.tabletS} {
    width: calc(${(p: StyleProps) => p.cardWidth / 2}px - 50px);
  }
`;

const NotWishlistButtonContent = styled(motion.button)`
  width: 150px;
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
  @media ${devices.laptopM} {
    width: 140px;
  }
  @media ${devices.tabletS} {
    width: calc(${(p: StyleProps) => p.cardWidth / 2}px - 50px);
  }
`;

const InWishlistButtonContent = styled(motion.div)`
  width: 150px;
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
    font-size: 0.7rem;
  }

  &:active {
    background: #c1ab93;
    border: none;
  }
  @media ${devices.laptopM} {
    width: 140px;
  }
  @media ${devices.tabletS} {
    width: calc(${(p: StyleProps) => p.cardWidth / 2}px - 50px);
  }
`;

const WishlistButtonWrapper = styled.div`
  background: transparent;
  width: 150px;
  height: 50px;
  position: relative;
  overflow: hidden;
  @media ${devices.laptopM} {
    width: 140px;
  }
  @media ${devices.tabletS} {
    width: calc(${(p: StyleProps) => p.cardWidth / 2}px - 50px);
  }
`;
