import { PaymentMethod } from 'common/enums/paymentMethod.enum';

const timeCheck = (orderDate: any) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const currentDate = new Date().getTime();
  const dateOnDB = new Date(orderDate).getTime() + oneDay;
  return currentDate >= dateOnDB;
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

const calculateIndvidualProductTotal = (
  selectedMethod: number,
  productPrice: number,
  qty: number,
) => {
  switch (selectedMethod) {
    case PaymentMethod.Cash:
      return productPrice * qty;
    case PaymentMethod.NoCash:
      return (productPrice + (productPrice * 5) / 100) * qty;
    case PaymentMethod.BankTransfer:
      return (productPrice + (productPrice * 12) / 100) * qty;
    default:
      return productPrice * qty;
  }
};

const calculateIndvidualPercent = (
  selectedMethod: number,
  productPrice: number,
) => {
  switch (selectedMethod) {
    case PaymentMethod.Cash:
      return productPrice;
    case PaymentMethod.NoCash:
      return (productPrice * 5) / 100 + productPrice;
    case PaymentMethod.BankTransfer:
      return (productPrice * 12) / 100 + productPrice;
    default:
      return productPrice;
  }
};

export {
  timeCheck,
  getFormatedDate,
  calculateIndvidualProductTotal,
  calculateIndvidualPercent,
};
