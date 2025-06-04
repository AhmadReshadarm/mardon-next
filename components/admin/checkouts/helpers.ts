import {
  deleteCheckout,
  fetchCheckoutsAll,
} from 'redux/slicers/checkoutsSlicer';
import { AppDispatch } from 'redux/store';
import { Page, paths } from 'routes/constants';
import { NextRouter } from 'next/router';
import {
  Product,
  UserService,
  AddressService,
  CheckoutService,
  BasketService,
  BasketDTO,
  OrderProductDTO,
  Basket,
  User,
  CheckoutDTO,
} from 'swagger/services';
import { ManageCheckoutFields } from './ManageCheckoutFields.enum';
import { getTotalPrice } from 'components/store/checkout/totalDeliveryDate/helpers';
import { openErrorNotification } from 'common/helpers';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import { generateInvoiceTemplet } from 'components/store/checkout/totalDeliveryDate/helpers';
import { PaymentMethod } from 'common/enums/paymentMethod.enum';

interface EmbeddedImage {
  filename: string;
  href: string; // Use href for URLs
  cid: string;
}

const handleDeleteCheckout =
  (id: string, dispatch: AppDispatch, setVisible: any, offset: number) =>
  async () => {
    const isSaved: any = await dispatch(deleteCheckout(id));
    if (!isSaved.error) {
      dispatch(
        fetchCheckoutsAll({
          offset: String(offset),
          limit: '20',
        }),
      );
      setVisible((prev) => !prev);
    }
  };

const handleRedirectCheckout = (id: string, router: NextRouter) => () => {
  router.push(`${paths[Page.ADMIN_CHECKOUTS]}/${id}`);
};

const getFormatedDate = (date: any) => {
  const months = {
    1: 'января',
    2: 'февраля',
    3: 'марта',
    4: 'апреля',
    5: 'мая',
    6: 'июня',
    7: 'июля',
    8: 'августа',
    9: 'сентября',
    10: 'октября',
    11: 'ноября',
    12: 'декабря',
  };

  let deliveryDueIntial = new Date(date);
  deliveryDueIntial.setDate(deliveryDueIntial.getDate() + 5);

  return `${deliveryDueIntial.getDate()} ${
    months[deliveryDueIntial.getMonth() + 1]
  }`;
};

const handleSearchItemClick = (
  basketList: Product[],
  setBasketList,
  product: Product,
) => {
  if (!!basketList.length) {
    const isInBasket = basketList.find(
      (productInbasket) => productInbasket.id === product.id,
    );
    if (!isInBasket) {
      setBasketList([...basketList, product]);
    }
  } else {
    setBasketList([product]);
  }
};

const checkVariantInputs = (basketList: Product[], form: any) => {
  let hasError = false;
  let hasProductWithoutVariant = false;
  let productErroredOn;
  // First pass: Check if every product has at least one variant added
  basketList.forEach((product, productIndex) => {
    let productHasVariantAdded = false;

    product.productVariants?.forEach((_, variantIndex) => {
      const key = `${ManageCheckoutFields.IsAddToCart}[${productIndex}][${variantIndex}]`;
      if (form[key]) {
        productHasVariantAdded = true;
      }
    });

    if (!productHasVariantAdded) {
      productErroredOn = productIndex + 1;
      hasProductWithoutVariant = true;
      hasError = true;
    }
  });

  // If any product has no variants added, show error and continue checking
  if (hasProductWithoutVariant) {
    openErrorNotification(`Выберите вариант для: ${productErroredOn} товар`);
    // return true;
  }

  // Second pass: Validate added variants
  basketList.forEach((product, productIndex) => {
    product.productVariants?.forEach((variant, variantIndex) => {
      const key = `${ManageCheckoutFields.IsAddToCart}[${productIndex}][${variantIndex}]`;
      const variantKey = `${ManageCheckoutFields.Variant}[${productIndex}][${variantIndex}]`;

      if (form[key]) {
        const variantValue = form[variantKey];
        if (!variantValue) {
          openErrorNotification(
            `Вариант ${variant.artical} не выбран в товаре ${productIndex + 1}`,
          );
          hasError = true;
        }
      }
    });
  });

  return hasError;
};

// ---------------------

// Optimized sleep function with callback support
const withProgress = async (
  message: string,
  action: () => Promise<any>,
  delay = 0,
) => {
  openErrorNotification(message);
  if (delay > 0) await new Promise((resolve) => setTimeout(resolve, delay));
  const result = await action();
  return result;
};

// Optimized basket data conversion
const convertBasketData = (
  basketList: Product[],
  form: any,
): OrderProductDTO[] => {
  return basketList.flatMap(
    (product, index) =>
      product.productVariants?.flatMap((variant, variantIndex) => {
        const qty =
          form[`${ManageCheckoutFields.Qty}[${index}][${variantIndex}]`];
        const variantId =
          form[`${ManageCheckoutFields.Variant}[${index}][${variantIndex}]`];

        if (!qty || !variantId) return [];

        return {
          productId: product.id!,
          qty: Number(qty),
          productVariantId: variantId,
          product,
          productVariant: variant,
        };
      }) || [],
  );
};

// Optimized checkout handler
const handleFormSubmitCheckout =
  (
    router: NextRouter,
    basketList: Product[],
    setSaveLoading: (loading: boolean) => void,
  ) =>
  async (form: any) => {
    setSaveLoading(true);

    if (basketList.length == 0) {
      setSaveLoading(false);
      openErrorNotification('Добавить товары в корзину');
      return;
    }
    if (checkVariantInputs(basketList, form)) {
      setSaveLoading(false);
      return;
    }

    try {
      if (!form.checkoutType) {
        return await handleGuestCheckout(
          router,
          basketList,
          form,
          setSaveLoading,
        );
      } else {
        return await handleRegisteredCheckout(
          router,
          basketList,
          form,
          setSaveLoading,
        );
      }
    } catch (error) {
      openErrorNotification(`${error}`);
      setSaveLoading(false);
    }
  };

// Guest checkout handler
const handleGuestCheckout = async (
  router: NextRouter,
  basketList: Product[],
  form: any,
  setSaveLoading: (loading: boolean) => void,
) => {
  const basket: Basket = { orderProducts: convertBasketData(basketList, form) };

  const payload = {
    receiverName: form.receiverName,
    receiverPhone: form.receiverPhone,
    receiverEmail: form.receiverEmail,
    address: form.address,
    comment: '',
    cart: basket,
  };

  const productAttachments = basket.orderProducts!.flatMap((orderproduct) => {
    const imageName = orderproduct.productVariant?.images?.split(',')[0];
    return imageName
      ? [
          {
            filename: imageName,
            href: `https://nbhoz.ru/api/images/${imageName}`,
            cid: `productImage_${orderproduct.productVariant?.artical}`,
          },
        ]
      : [];
  });

  const generatedHtml = generateInvoiceTemplet(
    payload,
    Object.fromEntries(productAttachments.map((a) => [a.cid, a.href])),
    form.paymentMethod,
  );

  await withProgress(
    'В процессе: Отправка счета-фактуры на заказ...',
    async () => {
      await CheckoutService.createCheckoutWithoutRegister({
        body: {
          to: payload.receiverEmail,
          subject: `Заказ ${payload.receiverName}`,
          html: generatedHtml,
          attachments: productAttachments,
        },
      });
      openSuccessNotification('Счет заказа отправлен');
      router.push('/admin/checkouts');
      setSaveLoading(false);
    },
    500,
  );
};

// Registered checkout handler
const handleRegisteredCheckout = async (
  router: NextRouter,
  basketList: Product[],
  form: any,
  setSaveLoading: (loading: boolean) => void,
) => {
  const user: User = await withProgress(
    'В процессе: Поиск пользователя...',
    async () => {
      const user: User = await UserService.findUserByEmail({
        email: form.userEmail,
      });
      if (!user) throw new Error('Пользователь не найден');
      openSuccessNotification('Успешный, пользователь найден');
      return user;
    },
    500,
  );

  const basketId = await withProgress(
    'В процессе: Создание корзины...',
    async () => {
      const basket = await BasketService.createBasket();
      openSuccessNotification('Корзина создана');
      return basket;
    },
    500,
  );

  const payload: BasketDTO = {
    orderProducts: convertBasketData(basketList, form),
  };

  await withProgress(
    'В процессе: Обновление корзины...',
    async () => {
      for (const orderProduct of payload.orderProducts || []) {
        await BasketService.addToCart({
          basketId: basketId.id,
          body: {
            productId: orderProduct.productId,
            productVariantId: orderProduct.productVariantId,
            qty: orderProduct.qty,
          },
        });
      }
      openSuccessNotification('Корзина обновлена');
    },
    500,
  );

  const basket: any = await BasketService.findBasketById({
    basketId: basketId.id,
  });

  const responseAddress = await withProgress(
    'В процессе: Сохранение адреса...',
    async () => {
      const address = await AddressService.createAddressDirect({
        body: {
          receiverName: form.receiverName,
          receiverPhone: form.receiverPhone,
          receiverEmail: form.receiverEmail,
          address: form.address,
          userId: user.id,
        },
      });
      openSuccessNotification('Адрес сохранен');
      return address;
    },
    500,
  );

  responseAddress.receiverEmail = user.email;

  const findPaymentMethod = (paymentMethod: string) => {
    switch (paymentMethod) {
      case 'Наличные +0%':
        return PaymentMethod.Cash;
      case 'По безналичному расчету +5%':
        return PaymentMethod.NoCash;
      case 'Расчётный счёт +12%':
        return PaymentMethod.BankTransfer;
      default:
        return PaymentMethod.Cash;
    }
  };

  await withProgress(
    'В процессе: Завершение заказа...',
    async () => {
      await CheckoutService.createCheckout({
        body: {
          address: responseAddress,
          basket: basket,
          totalAmount: getTotalPrice(basket, form.paymentMethod),
          comment: '',
          userId: user?.id,
          paymentMethod: findPaymentMethod(form.paymentMethod),
        } as CheckoutDTO,
      });
      openSuccessNotification('Заказ завершен');
      router.push('/admin/checkouts');
      setSaveLoading(false);
    },
    500,
  );
};

export {
  handleRedirectCheckout,
  handleDeleteCheckout,
  getFormatedDate,
  handleSearchItemClick,
  handleFormSubmitCheckout,
};
