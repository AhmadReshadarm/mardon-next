import {
  addToCart,
  removeFromCart,
  setOneClickBy,
  updateCart,
  updateCartQty,
} from 'redux/slicers/store/cartSlicer';
import { AppDispatch } from 'redux/store';
import { Basket, Product, ProductVariant, Wishlist } from 'swagger/services';
import { updateWishlist } from 'redux/slicers/store/wishlistSlicer';
import { Dispatch, SetStateAction } from 'react';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import { openErrorNotification } from 'common/helpers';
const getAnimationDelay = (length: number) => {
  let delay = 0.8;
  const passDelay: number[] = [];

  for (let i = 0; i < length; i++) {
    switch (delay) {
      case 0.2:
        delay = 0.4;
        break;
      case 0.4:
        delay = 0.6;
        break;
      case 0.6:
        delay = 0.8;
        break;
      default:
        delay = 0.2;
        break;
    }
    passDelay.push(delay);
  }

  return passDelay;
};

const handleAddToCartBtnClick =
  (
    product: Product,
    dispatch: AppDispatch,
    variant: ProductVariant,
    cart?: Basket,
  ) =>
  async () => {
    if (!variant.available) {
      openErrorNotification('Товар нет в наличии');
      return;
    }
    if (variant.price == 1) {
      openErrorNotification('К сожалению, цена товара не указана.');
      return;
    }
    const curOrderProduct = cart?.orderProducts?.find(
      (orderProduct) => orderProduct.productVariant?.id == variant?.id,
    );
    if (!curOrderProduct) {
      openSuccessNotification(
        `Товар ${
          product.name
        } с артикул ${variant?.artical?.toLocaleUpperCase()} добавлены в корзину`,
      );

      dispatch(
        addToCart({
          productId: product.id,
          qty: 1,
          productVariantId: variant.id,
        }),
      );
    }
  };

const handleProductCartQty = (
  counter: number,
  product: Product,
  dispatch: AppDispatch,
  cart?: Basket,
  variant?: ProductVariant,
) => {
  const curOrderProduct = cart?.orderProducts?.find(
    (orderProduct) => orderProduct.productVariant?.id == variant?.id,
  );

  dispatch(
    updateCartQty({
      id: curOrderProduct?.id,
      productId: product.id,
      qty: counter,
      productPrice: curOrderProduct?.productPrice,
      basketId: cart?.id,
      productVariantId: curOrderProduct?.productVariant?.id,
    }),
  );
};

const handleRemoveFromCartBtnClick =
  (
    product: Product,
    dispatch: AppDispatch,
    variant: ProductVariant,
    cart?: Basket,
  ) =>
  async () => {
    const curOrderProduct = cart?.orderProducts?.find(
      (orderProduct) => orderProduct.productVariant?.id == variant?.id,
    );
    if (curOrderProduct) {
      openSuccessNotification(
        `Товар ${
          product.name
        } с артикул ${variant?.artical?.toLocaleUpperCase()} удален из корзины`,
      );
      const payload = {
        id: curOrderProduct.id,
      };

      dispatch(removeFromCart(payload));
    }
  };

const handleCartBtnClick =
  (
    product: Product,
    dispatch: AppDispatch,
    variant: ProductVariant,
    cart?: Basket,
  ) =>
  async () => {
    if (!variant.available) {
      openErrorNotification('Товар нет в наличии');
      return;
    }
    if (variant.price == 1) {
      openErrorNotification('К сожалению, цена товара не указана.');
      return;
    }
    const curOrderProduct = cart?.orderProducts?.find(
      (orderProduct) => orderProduct.product?.id == product?.id,
    );
    if (!curOrderProduct) {
      openSuccessNotification(
        `Вы выбрали артикул: ${variant?.artical?.toLocaleUpperCase()}`,
      );

      dispatch(
        updateCart({
          orderProducts: cart?.orderProducts
            ?.concat({ product: { id: product?.id }, qty: 1 })
            .map((orderProduct) => ({
              productId: orderProduct.product?.id,
              qty: orderProduct.qty,
              productVariantId: variant?.id!,
            })),
        }),
      );
    }
    if (curOrderProduct) {
      dispatch(setOneClickBy(false));
      dispatch(
        updateCart({
          orderProducts: cart?.orderProducts
            ?.filter((orderProduct) => orderProduct.product?.id != product?.id)
            .map((orderProduct) => ({
              productId: orderProduct.product?.id?.toString(),
              qty: orderProduct.qty,
              productVariantId: variant?.id!,
            })),
        }),
      );

      return;
    }
  };

const handleWishBtnClick =
  (product: Product | undefined, dispatch: AppDispatch, wishlist?: Wishlist) =>
  async () => {
    const curItem = wishlist?.items?.find(
      (wishlistProduct) => wishlistProduct.productId == product?.id,
    );

    if (curItem) {
      dispatch(
        updateWishlist({
          items: wishlist?.items
            ?.filter((item) => item.productId != product?.id)
            .map((item) => ({
              productId: item.productId?.toString(),
            })),
        }),
      );

      return;
    }

    dispatch(
      updateWishlist({
        items: wishlist?.items
          ?.concat({ productId: product?.id })
          .map((orderProduct) => ({
            productId: orderProduct.productId,
          })),
      }),
    );
  };

const checkIfItemInCart = (
  product: Product | undefined,
  cart: Basket | undefined,
) =>
  !!cart?.orderProducts?.find(
    (orderProduct) => orderProduct.product?.id == product?.id,
  );

const checkIfItemInWishlist = (
  product: Product | undefined,
  wishlist: Wishlist | undefined,
) => !!wishlist?.items?.find((item) => item.productId == product?.id);

const handlePagination = (
  index: number,
  currentSlide: number,
  setCurrentSlide: Dispatch<SetStateAction<number>>,
  paginateImage: any,
) => {
  setCurrentSlide(index);
  if (index > currentSlide) {
    paginateImage(1);
  }
  if (index < currentSlide) {
    paginateImage(-1);
  }
};

export {
  getAnimationDelay,
  handleCartBtnClick,
  handleWishBtnClick,
  checkIfItemInCart,
  checkIfItemInWishlist,
  // handleHistory,
  handlePagination,
  handleAddToCartBtnClick,
  handleRemoveFromCartBtnClick,
  handleProductCartQty,
};
