import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Basket, Product, Wishlist } from 'swagger/services';
import variants from 'components/store/lib/variants';
import WishlistNormalSVG from '../../assets/wishlist_normal.svg';
import WishlistPressedSVG from '../../assets/wishlilst_pressed.svg';
import BasketNortmalWhite from '../../assets/basket_normal_white.svg';
import BasketPressedWhite from '../../assets/basket_pressed_white.svg';

type PropsCart = {
  checkIfItemInCart: any;
  product: Product;
  cart: Basket;
};
export const AddToCart: React.FC<PropsCart> = ({
  checkIfItemInCart,
  product,
  cart,
}) => {
  return (
    <>
      <ItemActionBtnIconsWrapper
        key={'basket-pressed'}
        animate={checkIfItemInCart(product, cart) ? 'animate' : 'exit'}
        variants={variants.fadeOutSlideOut}
        className="search-absolute-position"
      >
        <BasketPressedWhite />
      </ItemActionBtnIconsWrapper>
      <ItemActionBtnIconsWrapper
        key={'basket-normal'}
        animate={checkIfItemInCart(product, cart) ? 'exit' : 'animate'}
        variants={variants.fadeOutSlideOut}
        className="search-absolute-position"
      >
        <BasketNortmalWhite />
      </ItemActionBtnIconsWrapper>
    </>
  );
};

type PropsWishlist = {
  checkIfItemInWishlist: any;
  product: Product;
  wishlist: Wishlist;
};

export const AddToWishlist: React.FC<PropsWishlist> = ({
  checkIfItemInWishlist,
  product,
  wishlist,
}) => {
  return (
    <>
      <ItemActionBtnIconsWrapper
        key={'wishlist-pressed'}
        animate={checkIfItemInWishlist(product, wishlist) ? 'animate' : 'exit'}
        variants={variants.fadeOutSlideOut}
        className="search-absolute-position"
      >
        <WishlistPressedSVG />
      </ItemActionBtnIconsWrapper>
      <ItemActionBtnIconsWrapper
        key={'wishlist-normal'}
        animate={checkIfItemInWishlist(product, wishlist) ? 'exit' : 'animate'}
        variants={variants.fadeOutSlideOut}
        className="search-absolute-position"
      >
        <WishlistNormalSVG />
      </ItemActionBtnIconsWrapper>
    </>
  );
};

const ItemActionBtnIconsWrapper = styled(motion.span)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
