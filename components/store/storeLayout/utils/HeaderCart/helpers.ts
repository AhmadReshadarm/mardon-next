import { Role } from 'common/enums/roles.enum';
import { Dispatch, SetStateAction } from 'react';
import { updateCart } from 'redux/slicers/store/cartSlicer';
import { AppDispatch } from 'redux/store';
import { Basket, Product, User } from 'swagger/services';
import { PopupDisplay } from '../../constants';

const decreaseCounter =
  (
    product: Product,
    setItemCounter: Dispatch<SetStateAction<number>>,
    onDecrease: (counter: number, product: Product) => void,
    user: User,
  ) =>
  () => {
    setItemCounter((prev) => {
      let itemCounter;
      if (user && user.role === Role.SuperUser) {
        itemCounter = prev < 11 ? 10 : prev - 1;
      }
      if (user && user.role !== Role.SuperUser) {
        itemCounter = prev < 2 ? 1 : prev - 1;
      }
      if (!user) {
        itemCounter = prev < 2 ? 1 : prev - 1;
      }
      onDecrease(itemCounter, product);

      return itemCounter;
    });
  };

const increaseCounter =
  (
    product: Product,
    setItemCounter: Dispatch<SetStateAction<number>>,
    onIncrease: (counter: number, product: Product) => void,
  ) =>
  () => {
    setItemCounter((prev) => {
      const itemCounter = prev + 1;
      onIncrease(itemCounter, product);

      return itemCounter;
    });
  };

const handleCartBtnClick =
  (
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    setDisplay: Dispatch<SetStateAction<PopupDisplay>>,
  ) =>
  (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpen((prev) => {
      setTimeout(() => {
        setDisplay(prev ? PopupDisplay.None : PopupDisplay.Flex);
      }, 100);
      return !prev;
    });
  };

const handleItemRemove =
  (dispatch: AppDispatch, cart?: Basket) => (product: Product) => {
    dispatch(
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

const handleItemCountChange =
  (dispatch: AppDispatch, cart?: Basket) =>
  (counter: number, product: Product) => {
    setTimeout(() => {
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
    }, 500);
  };

const handleRemoveClick =
  (product: Product, onRemove: (product: Product) => void) => () => {
    onRemove(product);
  };

export {
  decreaseCounter,
  increaseCounter,
  handleCartBtnClick,
  handleItemRemove,
  handleItemCountChange,
  handleRemoveClick,
};
