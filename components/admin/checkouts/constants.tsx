import { ColumnsType } from 'antd/lib/table';
import { OrderProduct } from 'swagger/services';
import ActionButtons from '../generalComponents/ActionButtons';
import { handleDeleteCheckout, handleRedirectCheckout } from './helpers';
import moment from 'moment';
import { CheckoutStatus } from 'common/enums/checkoutStatus.enum';
import color from 'components/store/lib/ui.colors';

interface CheckoutsTableData {
  id: string;
  user: { id: string; firstName: string; email: string };
  basket: { orderProducts: OrderProduct[] };
  createdAt: Date;
  address: { address: string; receiverPhone: string };
  status: number;
}

//  initialState.checkout.basket?.orderProducts[0].productSize
const columns: ColumnsType<CheckoutsTableData> = [
  {
    title: 'Заказ №',
    dataIndex: 'id',
    width: '5%',
  },
  {
    title: 'status',
    render: (_, record) => {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '15px',
          }}
        >
          <span
            style={{
              backgroundColor:
                record.status !== CheckoutStatus.Completed
                  ? record.status === CheckoutStatus.Canceled
                    ? color.hover
                    : color.yellow
                  : color.ok,
              borderRadius: '50%',
              width: '10px',
              height: '10px',
            }}
          ></span>
          <span>
            {record.status === CheckoutStatus.New && 'Новый заказ'}
            {record.status === CheckoutStatus.InDelivery && 'В пути'}
            {record.status === CheckoutStatus.Completed && 'Завершен'}
            {record.status === CheckoutStatus.Canceled && 'Отменено'}
          </span>
        </div>
      );
    },
  },
  {
    title: 'Пользователь',
    dataIndex: 'user',
    render: (_, record) => {
      return (
        <p>
          ID:{record.user.id} - Имя:{record.user.firstName}
        </p>
      );
    },
    width: '10%',
  },
  {
    title: 'Цвет(ы)',
    dataIndex: 'color',
    render: (_, record) => {
      return (
        <ul>
          {record.basket.orderProducts.map((variant, index) => {
            return (
              <li key={`color-${index}`}>
                {variant.productVariant?.color!.name != ''
                  ? `${index + 1}: ${variant.productVariant?.color!.name}`
                  : ''}
              </li>
            );
          })}
        </ul>
      );
    },
    width: '10%',
  },
  {
    title: 'Артикул',
    dataIndex: 'size',
    render: (_, record) => {
      return (
        <ul>
          {record.basket.orderProducts.map((variant, index) => {
            return (
              <li key={`variant-${index}`}>
                {`${index + 1}: ${variant.productVariant?.artical}`}
              </li>
            );
          })}
        </ul>
      );
    },
    width: '10%',
  },
  {
    title: 'Адрес, Тел',
    dataIndex: 'address',
    render: (_, record) => {
      return (
        <>
          <p>Адрес: {record.address.address}</p>
          <p>Тел: {record.address.receiverPhone}</p>
        </>
      );
    },
    width: '20%',
  },
  {
    title: 'Дата создания',
    dataIndex: 'createdAt',
    render: (_, record) => {
      return (
        <p>
          {moment(record.createdAt).format('DD.MM.YYYY')} |{' '}
          {moment(record.createdAt).format('hh:mm a')}
        </p>
      );
    },
    width: '25%',
  },
  {
    title: 'Действия',
    render: (_, record) => {
      return (
        <ActionButtons
          id={record.id as string}
          handleDelete={handleDeleteCheckout}
          handleRedirect={handleRedirectCheckout}
          option={'checkouts'}
          title="заказ"
        />
      );
    },
    width: '10%',
  },
];

export { columns };
