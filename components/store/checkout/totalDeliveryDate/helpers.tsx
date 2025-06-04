import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { PaymentMethod } from 'common/enums/paymentMethod.enum';
import { openErrorNotification } from 'common/helpers';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import color from 'components/store/lib/ui.colors';
import { NextRouter } from 'next/router';
import { createCart, fetchCart } from 'redux/slicers/store/cartSlicer';
import { TDeliveryInfo } from 'redux/types';
import {
  AddressService,
  Basket,
  CheckoutDTO,
  CheckoutService,
  OrderProduct,
  OrderProductDTO,
  User,
} from 'swagger/services';

const DeliveryTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: color.textPrimary,
    color: color.btnPrimary,
    maxWidth: 400,
    fontSize: theme.typography.pxToRem(14),
    boxShadow: `0px 2px 6px ${color.boxShadowBtn}`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '20px',
    borderRadius: '15px',
    padding: '15px',
    userSelect: 'none',
  },
}));

const getFormatedDate = () => {
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

  let deliveryDueIntial = new Date();
  deliveryDueIntial.setDate(deliveryDueIntial.getDate() + 5);

  return `${deliveryDueIntial.getDate()} ${
    months[deliveryDueIntial.getMonth() + 1]
  }`;
};

const getOldPrice = (cart: Basket | null): number => {
  return cart?.orderProducts?.reduce((accum, item) => {
    accum +=
      Number(item.qty) *
      Number(item.productVariant?.oldPrice ?? item.productVariant?.price);
    return accum;
  }, 0)!;
};

const getDiscount = (cart: Basket | null) => {
  const oldPrice = getOldPrice(cart);
  const totalAmount = cart?.orderProducts?.reduce((accum, item) => {
    return accum + Number(item.qty) * Number(item.productVariant?.price);
  }, 0)!;

  return oldPrice - totalAmount;
};

const getTotalPrice = (cart: Basket | null, selectedMethod: string) => {
  const totalAmount = cart?.orderProducts?.reduce((accum, item) => {
    return accum + Number(item.qty) * Number(item.productVariant?.price);
  }, 0)!;

  // return totalAmount;
  switch (selectedMethod) {
    case 'Наличные +0%':
      return totalAmount;
    case 'Без наличных +5%':
      return totalAmount + (totalAmount * 5) / 100;
    case 'Расчётный счёт +12%':
      return totalAmount + (totalAmount * 12) / 100;
    default:
      return totalAmount;
  }
};

const getTotalPriceSuperUser = (
  cart: Basket | null,
  withDliver: boolean | any,
) => {
  const totalAmount = cart?.orderProducts?.reduce((accum, item) => {
    return (
      accum + Number(item.qty) * Number(item.productVariant!.wholeSalePrice)
    );
  }, 0)!;

  if (!withDliver) {
    return totalAmount;
  }
  if (withDliver) {
    return totalAmount + 500;
  }
};

const calculateIndvidualProductTotal = (
  selectedMethod: string,
  productPrice: number,
  qty: number,
) => {
  switch (selectedMethod) {
    case 'Наличные +0%':
      return productPrice * qty;
    case 'Без наличных +5%':
      return (productPrice + (productPrice * 5) / 100) * qty;
    case 'Расчётный счёт +12%':
      return (productPrice + (productPrice * 12) / 100) * qty;
    default:
      return productPrice * qty;
  }
};

const calculateIndvidualPercent = (
  selectedMethod: string,
  productPrice: number,
) => {
  switch (selectedMethod) {
    case 'Наличные +0%':
      return productPrice;
    case 'Без наличных +5%':
      return (productPrice * 5) / 100 + productPrice;
    case 'Расчётный счёт +12%':
      return (productPrice * 12) / 100 + productPrice;
    default:
      return productPrice;
  }
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

interface templetDTO {
  receiverName?: string;
  receiverPhone?: string;
  receiverEmail?: string;
  address?: string;
  roomOrOffice?: string;
  door?: string;
  floor?: string;
  rignBell?: string;
  zipCode?: string;
  comment?: string;
  cart: Basket | null;
}

const generateInvoiceTemplet = (
  payload: templetDTO,
  cidImageMap: Record<string, string>,
  paymentOption: string,
) => {
  return `
    <!DOCTYPE html>
    <html lang="ru">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Заказ ${payload.receiverName} | NBHOZ</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
      <!-- Main container -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#eee8dc">
        <tr>
          <td align="center" style="padding: 30px 0;">
            <!-- Content container -->
            <table width="100%" max-width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="border-collapse: collapse; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr style="background-color:#eee8dc; height:100px;">
                <td align="center" style="padding: 20px; border-bottom: 1px solid #eeeeee;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="50%" align="left" style="font-size: 24px; font-weight: bold; color: #000000;">NBHOZ</td>
                      <td width="50%" align="right" style="font-size: 20px; color: #000000;">Счет-фактура</td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Customer Info -->
              <tr>
                <td style="padding: 20px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td colspan="2" style="font-size: 18px; font-weight: bold; padding-bottom: 10px; border-bottom: 2px solid #0000004a; margin-bottom: 15px;">
                        Данные получателя
                      </td>
                    </tr>
                    <tr>
                      <td width="30%" style="padding: 5px 0; font-weight: bold; color: #7f8c8d;">Имя и фамилия:</td>
                      <td width="70%" style="padding: 5px 0;">${
                        payload.receiverName
                      }</td>
                    </tr>
                    <tr>
                      <td style="padding: 5px 0; font-weight: bold; color: #7f8c8d;">Телефон:</td>
                      <td style="padding: 5px 0;">${payload.receiverPhone}</td>
                    </tr>
                    <tr>
                      <td style="padding: 5px 0; font-weight: bold; color: #7f8c8d;">Эл. почта:</td>
                      <td style="padding: 5px 0;">${payload.receiverEmail}</td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Delivery Address -->
              <tr>
                <td style="padding: 0 20px 20px 20px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td colspan="2" style="font-size: 18px; font-weight: bold; padding-bottom: 10px; border-bottom: 2px solid #0000004a; margin-bottom: 15px;">
                        Адрес доставки
                      </td>
                    </tr>
                    <tr>
                      <td width="30%" style="padding: 5px 0; font-weight: bold; color: #7f8c8d;">Адрес:</td>
                      <td width="70%" style="padding: 5px 0;">${
                        payload.address
                      }</td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Order Items -->
              <tr>
                <td style="padding: 0 20px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="font-size: 18px; font-weight: bold; padding-bottom: 10px; border-bottom: 2px solid #0000004a;">
                        Детали заказа
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              ${payload.cart?.orderProducts
                ?.map((orderproduct: OrderProduct) => {
                  const productImageCid = `productImage_${orderproduct.productVariant?.artical}`;
                  cidImageMap[productImageCid] = productImageCid;

                  return `
                  <tr>
                    <td style="padding: 10px;">
                      <table style="padding: 10px; border: 1px solid #0000004a; border-radius: 15px;" width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td width="120" valign="top" style="padding-right: 15px;">
                            <a href="https://nbhoz.ru/product/${
                              orderproduct.product?.url
                            }">
                              <img 
                                src="cid:${productImageCid}" 
                                alt="${orderproduct.product?.name}" 
                                style="display: block; width: 120px; height: 120px; border: 1px solid #00000014; border-radius: 10px;"
                              />
                            </a>
                          </td>
                          <td valign="top">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                              <tr>
                                <td style="padding-bottom: 5px;">
                                  <a href="https://nbhoz.ru/product/${
                                    orderproduct.product?.url
                                  }" style="color: #000000; text-decoration: none; font-weight: bold; font-size: 16px;">
                                    ${
                                      orderproduct.product?.name?.split('(')[0]
                                    } 
                                    ${
                                      orderproduct?.productVariant?.artical?.includes(
                                        '|',
                                      )
                                        ? orderproduct?.productVariant?.artical
                                            ?.split('|')[0]
                                            .toUpperCase()
                                        : orderproduct?.productVariant?.artical?.toUpperCase()
                                    }
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <td style="font-size: 14px; color: #7f8c8d; padding-bottom: 10px;">
                                  Артикул: ${orderproduct.productVariant?.artical?.toUpperCase()}
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                      <td style="font-size: 14px;">
                                        ${
                                          orderproduct!.qty
                                        } × ${calculateIndvidualPercent(
                    paymentOption,
                    orderproduct.productVariant?.price!,
                  )}₽
                                      </td>
                                      <td align="right" style="font-weight: bold; color: #27ae60; font-size: 16px;">
                                        ${calculateIndvidualProductTotal(
                                          paymentOption,
                                          orderproduct.productVariant?.price!,
                                          orderproduct.qty!,
                                        )}₽
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  `;
                })
                .join('')}
              
              <!-- Order Total -->
              <tr>
                <td style="padding: 20px; background-color: #f8f9fa;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="70%" align="right" style="padding: 5px 0; font-weight: bold; font-size: 16px;">Общая сумма заказа:</td>
                      <td width="30%" align="right" style="padding: 5px 0; font-weight: bold; font-size: 24px; color: #e74c3c;">
                        ${getTotalPrice(payload.cart, paymentOption)}₽
                      </td>
                    </tr>
                    <tr>
                      <td align="right" style="padding: 5px 0; color: #7f8c8d;">Способ оплаты:</td>
                      <td align="right" style="padding: 5px 0; font-weight: bold; white-space: nowrap; padding-left:10px;">${paymentOption}</td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Order Comment -->
              ${
                payload.comment
                  ? `
              <tr>
                <td style="padding: 20px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="font-size: 18px; font-weight: bold; padding-bottom: 10px; border-bottom: 2px solid #3498db;">
                        Комментарий к заказу
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-top: 15px;">
                        ${payload.comment}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              `
                  : ''
              }
              
              <!-- Footer -->
              <tr>
                <td style="padding: 20px; background-color: #eee8dc; color: #000000;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td align="center" style="padding: 10px 0; font-size: 14px;">
                        Спасибо за ваш заказ!
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="padding: 5px 0; font-size: 12px;">
                        Телефон поддержки: +7 925-486-54-44 | Email: info@nbhoz.ru
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="padding: 5px 0; font-size: 12px;">
                        © ${new Date().getFullYear()} NBHOZ. Все права защищены.
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

const handlePayClick =
  (
    router: NextRouter,
    cart: Basket,
    deliveryInfo: TDeliveryInfo,
    paymentMethod: string,
    setLoading: any,
    reachGoal: any,
    comment: string,
    user: User,
    dispatch: any,
  ) =>
  async () => {
    if (paymentMethod == 'Не выбрано') {
      openErrorNotification('Выберите способ оплаты');
      return;
    }
    setLoading(true);
    reachGoal('cta-click-order');

    const payload = {
      comment,
    };

    if (deliveryInfo && payload && cart) {
      try {
        const responseAdress = await AddressService.createAddress({
          body: {
            receiverName: deliveryInfo.receiverName,
            receiverPhone: deliveryInfo.receiverPhone,
            address: deliveryInfo.address,
            roomOrOffice: deliveryInfo.roomOrOffice,
            door: deliveryInfo.door,
            floor: deliveryInfo.floor,
            rignBell: deliveryInfo.rignBell,
            zipCode: deliveryInfo.zipCode,
          },
        });

        const findPaymentMethod = (paymentMethod: string) => {
          switch (paymentMethod) {
            case 'Наличные +0%':
              return PaymentMethod.Cash;
            case 'Без наличных +5%':
              return PaymentMethod.NoCash;
            case 'Расчётный счёт +12%':
              return PaymentMethod.BankTransfer;
            default:
              return PaymentMethod.Cash;
          }
        };

        await CheckoutService.createCheckout({
          body: {
            address: responseAdress,
            basket: cart,
            totalAmount: getTotalPrice(cart, paymentMethod),
            comment: payload.comment,
            userId: user?.id,
            paymentMethod: findPaymentMethod(paymentMethod),
          } as CheckoutDTO,
        });

        await dispatch(createCart());

        const basketId = localStorage.getItem('basketId') ?? '';

        dispatch(fetchCart(basketId));
        openSuccessNotification('Ваш Заказ успешно');

        router.push('/orders');
        setLoading(false);
      } catch (error) {
        setLoading(false);
        openErrorNotification('Ваш Заказ не прошел');
      }

      return;
    }
  };

interface EmbeddedImage {
  filename: string;
  href: string;
  cid: string;
}

const handleCheckoutWithoutRegister =
  (
    router: NextRouter,
    cart: Basket,
    deliveryInfo: TDeliveryInfo,
    paymentMethod: string,
    setLoading: any,
    reachGoal: any,
    comment: string,
  ) =>
  async () => {
    if (paymentMethod == 'Не выбрано') {
      openErrorNotification('Выберите способ оплаты');
      return;
    }
    setLoading(true);
    reachGoal('cta-click-order');
    const payload = {
      receiverName: deliveryInfo?.receiverName,
      receiverPhone: deliveryInfo?.receiverPhone,
      receiverEmail: deliveryInfo?.receiverEmail,
      address: deliveryInfo?.address,
      roomOrOffice: deliveryInfo?.roomOrOffice,
      door: deliveryInfo?.door,
      floor: deliveryInfo?.floor,
      rignBell: deliveryInfo?.rignBell,
      zipCode: deliveryInfo?.zipCode,
      comment,
      cart,
    };

    const cidImageMap: Record<string, string> = {};

    const productAttachments: EmbeddedImage[] = [];
    if (payload.cart?.orderProducts) {
      for (const orderproduct of payload.cart.orderProducts) {
        const imageName = orderproduct.productVariant?.images?.split(', ')[0];
        if (imageName) {
          const imageUrl = `https://nbhoz.ru/api/images/${imageName}`; // Construct product image URL
          const productImageCid = `productImage_${orderproduct.productVariant?.artical}`;

          productAttachments.push({
            filename: imageName,
            href: imageUrl, // URL for product image
            cid: productImageCid,
          });
        }
      }
    }

    const generatedHtml = generateInvoiceTemplet(
      payload,
      cidImageMap,
      paymentMethod,
    );

    if (deliveryInfo && payload && cart) {
      try {
        await CheckoutService.createCheckoutWithoutRegister({
          body: {
            to: payload.receiverEmail,
            subject: `Заказ ${payload.receiverName}`,
            html: `${generatedHtml}`,
            attachments: productAttachments,
          },
        });

        openSuccessNotification('Ваш Заказ успешно');
        router.push('/checkout/after-checkout');
        setLoading(false);
      } catch (error) {
        setLoading(false);
        openErrorNotification('Ваш Заказ не прошел, Попробуйте еще раз');
      }
    }
  };

export {
  DeliveryTooltip,
  getFormatedDate,
  getOldPrice,
  getDiscount,
  getTotalPrice,
  findTotalWheight,
  getTotalPriceSuperUser,
  generateInvoiceTemplet,
  calculateIndvidualProductTotal,
  calculateIndvidualPercent,
  handlePayClick,
  handleCheckoutWithoutRegister,
};
