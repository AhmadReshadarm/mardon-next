import { CheckoutStatus } from 'common/enums/checkoutStatus.enum';
import { motion } from 'framer-motion';
import moment from 'moment';
import React from 'react';
import { useAppSelector } from 'redux/hooks';
import { TAuthState } from 'redux/types';
import styled from 'styled-components';
import { devices } from '../lib/Devices';
import color from '../lib/ui.colors';
import variants from '../lib/variants';
import ProductItem from './ProductItem';
import { Role } from 'common/enums/roles.enum';
import { paymentMethod } from 'common/constants';

type Props = {
  checkout: any;
  index: number;
};

const Orders: React.FC<Props> = ({ checkout, index }) => {
  const { user } = useAppSelector<TAuthState>((state) => state.auth);

  return (
    <React.Fragment key={index}>
      <Items
        custom={index * 0.05}
        initial="init"
        animate="animate"
        exit={{
          y: -60,
          opacity: 0,
          transition: { delay: index * 0.05 },
        }}
        variants={variants.fadInSlideUp}
      >
        <div className="order-status-wrapper">
          <Header>
            <span> Заказ № {checkout.id}.</span>
            <div className="price-wrapper">
              <Price>ИТОГО: </Price>
              <Price>{(checkout as any)?.totalAmount} ₽</Price>
            </div>
          </Header>
          <div className="order-status">
            <span
              style={{
                backgroundColor:
                  checkout.status !== CheckoutStatus.Completed
                    ? checkout.status === CheckoutStatus.Canceled
                      ? color.hover
                      : color.yellow
                    : color.ok,
              }}
            ></span>
            <h2>
              {checkout.status === CheckoutStatus.New && 'Новый заказ'}
              {checkout.status === CheckoutStatus.InDelivery && 'В пути'}
              {checkout.status === CheckoutStatus.Completed && 'Завершен'}
              {checkout.status === CheckoutStatus.Canceled && 'Отменено'}
            </h2>
          </div>
        </div>
        <div className="order-details-wrapper">
          <ul className="product-wrapper">
            {checkout.basket?.orderProducts?.map((orderProduct, index) => (
              <ProductItem
                key={`product-${index}`}
                orderProduct={orderProduct}
                checkout={checkout}
              />
            ))}
          </ul>
          <div className="order-full-info-wrapper">
            <div className="order-placed-date">
              <div className="order-key-value">
                <span className="key">Дата оформления:</span>
                <span className="value">
                  {moment(checkout.createdAt).format('DD.MM.YYYY')}
                </span>
              </div>
              <span>При получении может потребоваться паспорт</span>
            </div>
            <h3 className="order-key-value-header">Способ оплаты</h3>
            <div className="order-key-value">
              <span className="key">Сумма к оплату:</span>
              <span className="value">
                {(checkout as any)?.totalAmount}
                ₽, {checkout.paidFor ? 'Оплачено' : 'Не оплачено'}
              </span>
            </div>
            <div className="order-key-value">
              <span className="key">Тип оплаты:</span>
              <span className="value">
                {paymentMethod[checkout.paymentMethod + 1]}
              </span>
            </div>
            <h3 className="order-key-value-header">Способ получения</h3>
            <div className="order-key-value">
              <span className="key">Адрес доставки:</span>
              <span className="value">{`${checkout.address?.address}`}</span>
            </div>
            <div className="order-key-value">
              <span className="key">Получатель:</span>
              <span className="value">
                <span className="value-content">
                  {checkout.address?.receiverName},
                </span>
                <span className="value-content">
                  тел. {checkout.address?.receiverPhone}
                </span>
                {Role.Admin === user?.role ? (
                  <span className="value-content">
                    эл. ад. {checkout.user.email}
                  </span>
                ) : (
                  ''
                )}
              </span>
            </div>
          </div>
        </div>
      </Items>
    </React.Fragment>
  );
};

const Items = styled(motion.li)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 20px;
  box-shadow: 0px 5px 10px 0px ${color.boxShadowBtn};
  .order-status-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 15px;
    padding: 30px;
    border-radius: 15px 15px 0 0;
    background-color: ${color.bgProduct};
    box-shadow: 0px -3px 6px #62626233;
    span {
      color: ${color.textSecondary};
      font-size: 1rem;
    }
    .order-status {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 15px;
      span {
        width: 25px;
        height: 25px;
        border-radius: 50%;
      }
      h2 {
        font-weight: 300;
        font-size: 1.2rem;
      }
    }
  }
  .order-details-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 30px;
    gap: 20px;

    .product-wrapper {
      width: 100%;
      display: grid;
      gap: 20px;
      grid-template-columns: repeat(2, 1fr);
      height: 75vh;
      align-items: flex-start;
      overflow-y: scroll;
      padding: 30px;
      &::-webkit-scrollbar {
        width: 5px;
      }
      .product {
        display: flex;
        width: 260px;
        flex-direction: column;
        -webkit-box-pack: start;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
        border-radius: 15px;
        padding: 10px;
        box-shadow: 0px 5px 10px 0px ${color.boxShadowBtn};
        .image-wrapper {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          img {
            width: 100%;
            height: 260px;
            border-radius: 15px;
            object-fit: cover;
          }
        }

        .product-info-wrapper {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          padding: 10px 15px;
          gap: 10px;
          .product-title-wrapper {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            h1 {
              font-size: 0.9rem;
              &:hover {
                font-weight: 600;
              }
            }
            &:hover {
              color: #000;
            }
          }

          .total-numbers {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            gap: 10px;
            span {
              font-weight: 600;
            }
          }
          .color-wrapper {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            gap: 10px;
          }
        }
      }
    }

    .order-full-info-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 30px;

      .order-placed-date {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 10px;
      }

      .order-key-value {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 10px;

        span {
          color: ${color.textSecondary};
        }
        .key {
          width: 100%;
          white-space: nowrap;
        }
        .value {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 5px;
          color: ${color.btnPrimary};
          .value-content {
            white-space: nowrap;
            color: ${color.btnPrimary};
          }
        }
      }
      .order-action-btns {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        button {
          width: 100%;
          height: 45px;
          border-radius: 10px;
          text-align: center;
          background-color: ${color.btnPrimary};
          color: ${color.textPrimary};
        }
        .danger {
          background-color: ${color.hover};
        }
      }
    }
  }

  @media ${devices.laptopS} {
    .order-details-wrapper {
      .product-wrapper {
        grid-template-columns: repeat(1, 1fr);
        padding: 8px;
        .product {
          width: 100%;
        }
      }
    }
  }
  @media ${devices.tabletL} {
    .order-details-wrapper {
      flex-direction: column;
      padding: 10px;
      .product-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding: 8px;
        .product {
          width: 100%;
        }
      }
    }
  }
  @media ${devices.tabletS} {
    .order-details-wrapper {
      flex-direction: column;
      padding: 10px;
      .product-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding: 8px;
        .product {
          width: 100%;
        }
      }
    }
  }
  @media ${devices.mobileL} {
    .order-details-wrapper {
      flex-direction: column;
      padding: 10px;
      .product-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding: 8px;
        .product {
          width: 100%;
        }
      }
    }
  }
  @media ${devices.mobileM} {
    .order-details-wrapper {
      flex-direction: column;
      padding: 10px;
      .product-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding: 8px;
        .product {
          width: 100%;
        }
      }
    }
  }
  @media ${devices.mobileS} {
    .order-details-wrapper {
      flex-direction: column;
      padding: 10px;
      .product-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding: 8px;
        .product {
          width: 100%;
        }
      }
    }
  }
`;

const Header = styled.span`
  display: flex;
  width: 100%;
  justify-content: space-between;
  .price-wrapper {
    display: flex;
    flex-direction: row;
    aling-items: center;
    gap: 5px;
  }
`;

const Price = styled.span`
  font-size: 1.5rem !important;
`;

export default Orders;
