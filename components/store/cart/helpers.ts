import {
  OrderProduct,
  Product,
  Basket,
  ProductVariant,
} from 'swagger/services';
import { Role } from 'common/enums/roles.enum';
import {
  updateCart,
  clearCart,
  updateCartQty,
} from 'redux/slicers/store/cartSlicer';
import { AppDispatch } from 'redux/store';
import { checkIfItemInCart } from 'ui-kit/ProductActionBtns/helpers';
import { fetchChosenProduct } from 'redux/slicers/productsSlicer';

const getTotalQuantity = (orderProducts: OrderProduct[]) => {
  return orderProducts?.reduce((accum, orderProduct) => {
    return accum + Number(orderProduct.qty);
  }, 0);
};

const getTotalPrice = (orderProducts: OrderProduct[], user: any) => {
  if (!user) {
    return orderProducts?.reduce((accum, orderProduct) => {
      return (
        accum + Number(orderProduct.qty) * Number(orderProduct.productPrice)
      );
    }, 0);
  }
  if (user.role === Role.SuperUser) {
    return orderProducts?.reduce((accum, orderProduct) => {
      return (
        accum +
        Number(orderProduct.qty) *
          Number(orderProduct.productVariant!.wholeSalePrice)
      );
    }, 0);
  }
  if (user.role === Role.User || user.role === Role.Admin) {
    return orderProducts?.reduce((accum, orderProduct) => {
      return (
        accum + Number(orderProduct.qty) * Number(orderProduct.productPrice)
      );
    }, 0);
  }
};

const getTotalDiscount = (orderProducts: OrderProduct[]) => {
  // const totalPrice = getTotalPrice(orderProducts);
  const totalOldPrice = orderProducts?.reduce((accum, orderProduct) => {
    return (
      accum +
      Number(orderProduct.qty) * Number(orderProduct.productVariant?.price)
    );
  }, 0);
  // return totalPrice - totalOldPrice;
};

const findTotalWheight = (cart: any) => {
  let totalWeight = 0;
  cart?.orderProducts?.map((product: any) =>
    product.product?.parameterProducts?.map((item: any) => {
      if (item.value.match(/(?:^|\W)грамм(?:$|\W)/)) {
        totalWeight =
          totalWeight + parseInt(item.value.match(/\d+/g)) * product.qty;
      }
    }),
  );
  if (totalWeight > 999) {
    totalWeight = 0.001 * totalWeight;
    return { totalWeight, in: 'kilo' };
  }
  return { totalWeight, in: 'gram' };
};

const handleItemRemove = async (
  product: Product,
  dispatch: AppDispatch,
  cart: Basket,
) => {
  if (!product) return;
  await dispatch(
    updateCart({
      orderProducts: cart?.orderProducts
        ?.filter((orderProduct) => orderProduct.product?.id != product.id)
        .map((orderProduct) => ({
          productId: orderProduct.product?.id?.toString(),
          qty: orderProduct.qty,
          productVariantId: orderProduct.productVariant?.id,
        })),
    }),
  );
};

const handleItemCountChange = (
  counter: number,
  product: Product,
  dispatch: AppDispatch,
  cart: Basket,
) => {
  dispatch(
    updateCart({
      orderProducts: cart?.orderProducts
        ?.filter((orderProduct) => orderProduct.product?.id != product.id)
        ?.concat({ product: { id: product.id }, qty: counter })
        .map((orderProduct) => ({
          productId: orderProduct.product?.id,
          qty: orderProduct.qty,
          productVariantId: orderProduct.productVariant?.id,
        })),
    }),
  );
};

const handleRemoveClick = (dispatch: AppDispatch) => {
  const basketId = localStorage.getItem('basketId');
  if (basketId) {
    dispatch(clearCart(basketId!));
  }
};

// -------------------------------- TEMPRORY SLUTION FOR CART DESCRIPENCY -------------------------------

const checkPriceMissMatch = (
  product: Product,
  cart: Basket,
  variant: ProductVariant,
) => {
  const variantToCheck = product.productVariants?.find(
    (productVariant) => productVariant.id === variant.id,
  );

  return !cart.orderProducts?.find(
    (product) => product.productPrice == variantToCheck?.price,
  );
};

const checkBoxMissMatch = (
  product: Product,
  cart: Basket,
  variant: ProductVariant,
) => {
  const variantToCheck = product.productVariants?.find(
    (productVariant) => productVariant.id === variant.id,
  );

  return (
    cart.orderProducts?.find(
      (orderProduct) => orderProduct.productVariant?.id == variantToCheck?.id,
    )?.qty! < variantToCheck?.minimumAllowedOrder!
  );
};

const fixPriceMissMatchOrBoxMissMatch = async (
  product: Product,
  cart: Basket,
  variant: ProductVariant,
  dispatch,
) => {
  if (checkIfItemInCart(product, cart!, variant)) {
    const fullRes: any = await dispatch(
      fetchChosenProduct(product.id as string),
    );
    const fullProduct: Product = fullRes?.payload;

    if (
      checkPriceMissMatch(fullProduct, cart, variant) ||
      checkBoxMissMatch(fullProduct, cart, variant)
    ) {
      const curOrderProduct = cart?.orderProducts?.find(
        (orderProduct) => orderProduct.productVariant?.id == variant?.id,
      );
      const serverValueToSet = fullProduct.productVariants?.find(
        (productVariant) => productVariant.id == variant.id,
      );
      dispatch(
        updateCartQty({
          id: curOrderProduct?.id,
          productId: product.id,
          qty: serverValueToSet!.minimumAllowedOrder, // update to new min order per box
          productPrice: serverValueToSet!.price, // update to new price
          basketId: cart?.id,
          productVariantId: curOrderProduct?.productVariant?.id,
        }),
      );
    }
  }
};

// ------------------------------------------------------------------------------------------------------

export {
  getTotalQuantity,
  getTotalPrice,
  getTotalDiscount,
  findTotalWheight,
  handleItemRemove,
  handleItemCountChange,
  handleRemoveClick,
  fixPriceMissMatchOrBoxMissMatch,
};
