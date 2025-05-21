import { ColumnsType } from 'antd/lib/table';
import { OrderProduct } from 'swagger/services';
import ActionButtons from '../generalComponents/ActionButtons';
import { handleDeleteCheckout, handleRedirectCheckout } from './helpers';
import moment from 'moment';
import { CheckoutStatus } from 'common/enums/checkoutStatus.enum';
import color from 'components/store/lib/ui.colors';
import Image from 'next/image';

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
    width: '10%',
  },
  {
    title: 'Пользователь',
    dataIndex: 'user',
    render: (_, record: any) => {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
          }}
        >
          <span>
            ID:{record.user.id} - {record.user.firstName}
          </span>
          <span>Имя получателя: {record.address.receiverName}</span>
        </div>
      );
    },
    width: '8%',
  },
  {
    title: 'Артикул',
    dataIndex: 'size',
    render: (_, record) => {
      return (
        <ul
          style={{
            display: 'inline-grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            columnGap: '3px',
            rowGap: '3px',
          }}
        >
          {record.basket.orderProducts.map((variant, index) => {
            return (
              <li
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  gap: '2px',
                }}
                key={`variant-${index}`}
              >
                <span>{index + 1}: </span>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',

                    border: '1px solid rgb(0 0 0 / 37%)',
                    borderRadius: '5px',
                    padding: '5px',
                  }}
                >
                  <Image
                    width={100}
                    height={100}
                    src={`/api/images/${
                      variant.productVariant?.images!?.split(', ')[0]
                    }`}
                    alt={variant.productVariant?.id!}
                    style={{ borderRadius: '5px' }}
                  />
                  <span>
                    Артикул: {variant.productVariant?.artical?.toUpperCase()}
                  </span>
                  <span>Кол-во: {variant.qty} шт</span>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      gap: '5px',
                    }}
                  >
                    {variant.productVariant?.color?.url == '' ||
                    variant.productVariant?.color?.url == '-' ||
                    variant.productVariant?.color?.url == '_' ? (
                      <></>
                    ) : (
                      <>
                        <span>Цвет: </span>
                        <div
                          title={variant.productVariant?.color?.name}
                          style={{
                            width: '10px',
                            height: '10px',
                            minWidth: '10px',
                            minHeight: '10px',
                            borderRadius: '50%',
                            background: variant.productVariant?.color?.code,
                            border: '1px solid rgb(0 0 0 / 45%)',
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      );
    },
    width: '20%',
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
    width: '15%',
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
    width: '12%',
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
