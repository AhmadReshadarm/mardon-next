import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import color from 'components/store/lib/ui.colors';
import { Basket } from 'swagger/services';

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

const getTotalPrice = (cart: Basket | null, withDliver: boolean | any) => {
  const totalAmount = cart?.orderProducts?.reduce((accum, item) => {
    return accum + Number(item.qty) * Number(item.productVariant?.price);
  }, 0)!;

  // if (!withDliver) {
  return totalAmount;
  // }
  // if (withDliver) {
  //   return totalAmount + 150;
  // }
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

const generateInvoiceTemplet = (payload: templetDTO) => {
  return `  <div>
        <h1>Данные получателя</h1>
      </div>
      <div>
        <span>Имя и фамилия: </span> <span>${payload.receiverName}</span>
      </div>
      <div>
        <span>Телефон: </span> <span>${payload.receiverPhone}</span>
      </div>
      <div>
        <span>Ад. эл.: </span> <span>${payload.receiverEmail}</span>
      </div>
      <div>
        <h1>Адрес доставки</h1>
      </div>
      <div>
        <span>Адрес: </span> <span>${payload.address}</span>
      </div>
      <div>
        <span>Квартира/офис: </span> <span>${payload.roomOrOffice}</span>
      </div>
      <div>
        <span>Индекс: </span> <span>${payload.zipCode}</span>
      </div>
      <div>
        <span>Подъезд: </span> <span>${payload.door}</span>
      </div>
      <div>
        <span>Этаж: </span> <span>${payload.floor}</span>
      </div>
      <div>
        <span>Домофон: </span> <span>${payload.rignBell}</span>
      </div>
      <div>
        <h1>Заказ покупателя</h1>
      </div>
      ${payload.cart?.orderProducts?.map(
        (orderproduct) =>
          ` <div>
            <span>${orderproduct.product?.name}</span>
            <span>${orderproduct!.qty} шт</span>
            <span>*</span>
            <span>${orderproduct.productVariant?.price}₽</span>
            <span>=</span>
            <span>${
              orderproduct.productVariant?.price! * orderproduct.qty!
            }₽</span>
          </div>
          <div>
            <span>Цвет:</span>
            <span>${orderproduct.productVariant?.color?.name}</span>
          </div>
          <div>
            <span>Размер:</span>
            <span>${orderproduct.productSize}</span>
          </div>
       `,
      )}
      <div>
        <span>
          <h3>Итого:</h3>
        </span>
        <span>${getTotalPrice(payload.cart, true)}₽</span>
      </div>
      <div>
        <h1>Комментарий</h1>
      </div>
       <div>
         <span>${payload.comment}</span>
      </div>
      `;
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
};
