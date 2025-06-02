import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';
import color from 'components/store/lib/ui.colors';
import DeliveryDetails from './DeliveryDetails';
import TotalDetails from './TotalDetails';
import { devices } from 'components/store/lib/Devices';
import { getTotalPrice } from './helpers';
import { useAppSelector } from 'redux/hooks';
import { TCartState } from 'redux/types';
import { paymentMethod } from 'common/constants';

const TotalDeliveryDate = (props: any) => {
  const [comment, setComment] = useState('');
  const { cart } = useAppSelector<TCartState>((state) => state.cart);
  const [paymentOption, setPaymentOption] = useState(paymentMethod[0]);
  return (
    <Container>
      <div className="back-to-cart">
        <div className="sub-back-to-cart">
          <Link href="/cart">
            <span>Вернуться в корзину</span>
          </Link>
          <div className="total_mobile_wrapper">
            <h3 className="total">Итого:</h3>
            <h3 className="total">{getTotalPrice(cart, paymentOption)} ₽</h3>
          </div>
        </div>
        <h1>Подтверждение заказа</h1>
      </div>
      <Wrapper>
        <DeliveryDetails comment={comment} setComment={setComment} {...props} />
        <TotalDetails
          comment={comment}
          paymentOption={paymentOption}
          setPaymentOption={setPaymentOption}
          {...props}
        />
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  .back-to-cart {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 20px;
    .sub-back-to-cart {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      a {
        color: ${color.textBase};
        &:hover {
          color: ${color.textSecondary};
        }
      }
      .total_mobile_wrapper {
        display: none;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        gap: 5px;
        @media (min-width: 100px) and (max-width: 768px) {
          display: flex;
        }
      }
    }

    h1 {
      font-size: 1.5rem;
    }
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 0;
  gap: 30px;
  @media ${devices.tabletL} {
    flex-direction: column-reverse;
  }
  @media ${devices.tabletS} {
    flex-direction: column-reverse;
  }
  @media ${devices.mobileL} {
    flex-direction: column-reverse;
  }
  @media ${devices.mobileM} {
    flex-direction: column-reverse;
  }
  @media ${devices.mobileS} {
    flex-direction: column-reverse;
  }
`;

export default TotalDeliveryDate;
