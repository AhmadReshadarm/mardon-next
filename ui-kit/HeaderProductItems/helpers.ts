import { Basket, Product, ProductVariant } from 'swagger/services';

const findCartQTY = (
  product: Product | undefined,
  cart: Basket | undefined,
  variant?: ProductVariant,
) => {
  let qty = 1;
  cart?.orderProducts?.find((orderProduct) => {
    if (orderProduct.productVariant?.id == variant?.id) {
      qty = orderProduct.qty!;
    }
  });
  return qty;
};

export { findCartQTY };
