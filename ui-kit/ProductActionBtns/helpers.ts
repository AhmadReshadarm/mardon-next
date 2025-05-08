import { Basket, Product, ProductVariant, Wishlist } from 'swagger/services';

const checkIfItemInCart = (
  product: Product | undefined,
  cart: Basket | undefined,
  variant?: ProductVariant,
) =>
  !!cart?.orderProducts?.find(
    (orderProduct) => orderProduct.productVariant?.id == variant?.id,
  );
// !!cart?.orderProducts?.find(
//   (orderProduct) => orderProduct.product?.id == product?.id,
// );

const checkIfItemInWishlist = (
  product: Product | undefined,
  wishlist: Wishlist | undefined,
) => !!wishlist?.items?.find((item) => item.productId == product?.id);

export { checkIfItemInCart, checkIfItemInWishlist };
