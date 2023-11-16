import Link from 'next/link';
import styled from 'styled-components';
import { Basket } from 'swagger/services';
import { motion } from 'framer-motion';
import { getTotalPrice } from './helpers';
import color from 'components/store/lib/ui.colors';
import variants from '../lib/variants';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TAuthState } from 'redux/types';
import { devices } from '../lib/Devices';
import { setOneClickBy } from 'redux/slicers/store/cartSlicer';
type Props = {
  cart: Basket | null;
};

const CartFooter: React.FC<Props> = ({ cart }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector<TAuthState>((state) => state.auth);
  const handleGoToCart = () => {
    dispatch(setOneClickBy(false));
  };
  return (
    <Wrapper>
      <CartTotalPrice>
        <span className="total-text">Ваша корзина</span>
        <span>Итого: {getTotalPrice(cart?.orderProducts!, user)} ₽</span>
      </CartTotalPrice>
      <div className="footer-spliter">
        <div className="footer-no-border"></div>
        <div className="footer-border"></div>
      </div>
      {/* <StoreLocationWrapper>
        <img src="/icons/location-basket.png" alt="fingarden location" />
        <span>
          Санкт-Петербург, <br /> ул. Заозерного д.10{' '}
        </span>
      </StoreLocationWrapper> */}
      <CheckoutBtnWrapper>
        <Link href={cart?.totalAmount == 0 ? '/cart' : '/checkout'}>
          <CheckoutBtn
            whileHover="hover"
            whileTap="tap"
            variants={variants.boxShadow}
            onClick={handleGoToCart}
          >
            сохранить изменения и продолжить
          </CheckoutBtn>
        </Link>
        <Link href="/catalog?page=1">
          <CheckoutBtn
            whileHover="hover"
            whileTap="tap"
            variants={variants.boxShadow}
          >
            Продолжить покупки
          </CheckoutBtn>
        </Link>
      </CheckoutBtnWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .footer-spliter {
    width: 100%;
    display: flex;
    .footer-border {
      width: 95%;
      border-top: 1px solid;
    }
    .footer-no-border {
      width: 5%;
    }
  }
`;

const CartTotalPrice = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 30px;
  gap: 50px;
  span {
    font-family: 'Jost';
    font-size: 2.5rem;
  }
  .total-text {
    font-weight: 300;
  }
  @media ${devices.mobileL} {
    .total-text {
      font-size: 1.8rem;
    }
    span {
      font-size: 1.8rem;
    }
  }
  @media ${devices.mobileM} {
    .total-text {
      font-size: 1.8rem;
    }
    span {
      font-size: 1.8rem;
    }
  }
  @media ${devices.mobileS} {
    .total-text {
      font-size: 1.8rem;
    }
    span {
      font-size: 1.8rem;
    }
  }
`;

const StoreLocationWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 30px;
  gap: 10px;
  span {
    font-weight: 500;
  }
`;

const CheckoutBtnWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 30px;
  gap: 50px;
  @media ${devices.mobileL} {
    flex-direction: column;
    gap: 20px;
    a {
      width: 100%;
    }
  }
  @media ${devices.mobileM} {
    flex-direction: column;
    gap: 20px;
    a {
      width: 100%;
    }
  }
  @media ${devices.mobileS} {
    flex-direction: column;
    gap: 20px;
    a {
      width: 100%;
    }
  }
`;

const CheckoutBtn = styled(motion.button)`
  background: ${color.btnPrimary};
  color: ${color.textPrimary};
  font-size: 18px;
  padding: 12px 81px;
  border-radius: 5px;
  cursor: pointer;
  @media ${devices.mobileL} {
    width: 100%;
    padding: 10px;
    font-size: 0.8rem;
  }
  @media ${devices.mobileM} {
    width: 100%;
    padding: 10px;
    font-size: 0.8rem;
  }
  @media ${devices.mobileS} {
    width: 100%;
    padding: 10px;
    font-size: 0.8rem;
  }
`;

export default CartFooter;
