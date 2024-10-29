import axios from 'axios';
import { openErrorNotification } from 'common/helpers';
import { useState } from 'react';
import {
  createSubscriber,
  sendAdminCallEmail,
} from 'redux/slicers/subscriberSlicer';
import { AppDispatch } from 'redux/store';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
const UsePagination = (): [
  number,
  string,
  (newDirection: number, newType: any) => void,
] => {
  const [direction, setPage]: [number, any] = useState(0);
  const [authType, setAuthType]: [any, any] = useState('call');

  const paginate = (newDirection: number, newType: any) => {
    setPage(newDirection);
    setAuthType(newType);
  };

  return [direction, authType, paginate];
};

const handleSubscriber =
  (name: string, email: string, dispatch: AppDispatch) => () => {
    if (isEmpty(email))
      return openErrorNotification(
        'адрес электронной почты не может быть пустым',
      );
    if (isEmpty(name)) return openErrorNotification('имя не может быть пустым');
    if (!isEmail(email))
      return openErrorNotification('Неверный адрес электронной почты');
    dispatch(createSubscriber({ name, email }));
  };

const getBase64Image = async (imageUrl) => {
  const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  const buffer = Buffer.from(response.data, 'binary');
  const base64Image = buffer.toString('base64');
  return `data:image/png;base64,${base64Image}`; // Adjust the MIME type as needed
};

const handleAdminCall =
  (name: string, phone: string, dispatch: AppDispatch) => async () => {
    if (isEmpty(phone))
      return openErrorNotification('Номер телефона не может быть пустым');
    if (isEmpty(name)) return openErrorNotification('имя не может быть пустым');
    // const imageUrl = 'https://nbhoz.ru/static/NBHOZ_LOGO.png';
    // // const imageUrl = 'http://localhost:3000/static/NBHOZ_LOGO.png';
    // const base64Image = await getBase64Image(imageUrl);
    dispatch(
      sendAdminCallEmail({
        to: 'info@nbhoz.ru',
        subject: `${name} просит перезвонить`,
        html: `
        <div style="width:100%; display: flex; flex-direction: row; align-items:center; justify-content:center; padding-top:30px; padding-bottom:30px; background-color:#FDE5AC; border-radius: 20px;">
        <a href="https://nbhoz.ru" target="__blank"><img src="https://nbhoz.ru/static/NBHOZ_LOGO.png" alt="NBHOZ"></a>
        </div>
        <div style="padding:20px 0px 20px 0px" >имя: ${name}, Номер телефона: ${phone}</div>`,
      }),
    );
  };

export { UsePagination, handleSubscriber, handleAdminCall };
