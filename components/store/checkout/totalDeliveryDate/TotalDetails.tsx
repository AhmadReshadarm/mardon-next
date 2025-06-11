import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from '../../lib/ui.colors';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TCartState, TStoreCheckoutState } from 'redux/types';
import {
  getTotalPrice,
  calculateIndvidualProductTotal,
  calculateIndvidualPercent,
  handlePayClick,
  handleCheckoutWithoutRegister,
} from './helpers';
import { useRouter } from 'next/router';
import { devices } from 'components/store/lib/Devices';
import { TAuthState } from 'redux/types';
import DropDowns from './DropDowns';
import { useMetrica, YandexMetricaProvider } from 'next-yandex-metrica';
import variants from 'components/store/lib/variants';
import Filters from 'components/store/product/reviewsAndQuastions/Filters';
import { paymentMethod } from 'common/constants';

const TotalDetails = ({
  comment,
  setLoading,
  paymentOption,
  setPaymentOption,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { reachGoal } = useMetrica();
  const { cart, isOneClickBuy } = useAppSelector<TCartState>(
    (state) => state.cart,
  );
  const { deliveryInfo } = useAppSelector<TStoreCheckoutState>(
    (state) => state.storeCheckout,
  );
  const { user } = useAppSelector<TAuthState>((state) => state.auth);
  const estimated_delivery_date = new Date().toISOString().split('T')[0];

  return (
    <>
      <YandexMetricaProvider
        tagID={96632717}
        initParameters={{
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
        }}
      >
        <Container>
          <Wrapper>
            <Content>
              <ItemColumn>
                <PlaceOrderButton
                  onClick={
                    isOneClickBuy
                      ? handleCheckoutWithoutRegister(
                          router,
                          cart!,
                          deliveryInfo!,
                          paymentOption,
                          setLoading,
                          reachGoal,
                          comment,
                        )
                      : handlePayClick(
                          router,
                          cart!,
                          deliveryInfo!,
                          paymentOption,
                          setLoading,
                          reachGoal,
                          comment,
                          user!,
                          dispatch,
                        )
                  }
                  whileHover="hover"
                  whileTap="tap"
                  variants={variants.boxShadow}
                >
                  <span>Завершить мой заказ</span>
                </PlaceOrderButton>
                <span className="user-agreement-text">
                  Нажимая на кнопку, вы соглашаетесь с{' '}
                  <Link href="/privacy">
                    <span>Политика безопасности</span>
                  </Link>
                  , а также с{' '}
                  <Link href="/user-agreement">
                    <span>Пользовательское соглашение</span>
                  </Link>
                </span>
              </ItemColumn>

              <ItemColumn style={{ borderBottom: 'none' }}>
                <span className="payment_method_title">
                  Выберите способ оплаты
                </span>
                <Filters
                  options={paymentMethod.slice(1, 4)}
                  value={paymentOption}
                  setValue={setPaymentOption}
                />
              </ItemColumn>

              <ItemRowWrapper>
                <ItemRow>
                  <h3>Ваш заказ</h3>
                  <span className="product-wheight">
                    {cart?.orderProducts?.length} товар(ов) •
                  </span>
                </ItemRow>
                {cart?.orderProducts?.map((product: any, index) => {
                  return (
                    <ItemRow key={index}>
                      <span title={product.product.name}>
                        {product.product?.name?.slice(0, 20)}..
                      </span>
                      <p className="product-price-mobile-wrapper">
                        <span>{product!.qty} шт</span> *{'  '}
                        <span>
                          {calculateIndvidualPercent(
                            paymentOption,
                            product.productVariant?.price,
                          )}{' '}
                          ₽
                        </span>
                        {'  '}
                        <span>=</span>
                        {'  '}
                        <span style={{ whiteSpace: 'nowrap' }}>
                          {calculateIndvidualProductTotal(
                            paymentOption,
                            product.productVariant?.price,
                            product.qty,
                          )}{' '}
                          ₽
                        </span>
                      </p>
                    </ItemRow>
                  );
                })}
              </ItemRowWrapper>
              <ItemRow>
                <h3 className="total">Итого</h3>
                <h3 className="total">
                  {getTotalPrice(cart, paymentOption)} ₽
                </h3>
              </ItemRow>
            </Content>

            <DropDowns />
          </Wrapper>
        </Container>
        <script
          src="https://apis.google.com/js/platform.js?onload=renderOptIn"
          async
          defer
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `  window.renderOptIn = function()
        {window.gapi.load('surveyoptin', function () {
          window.gapi.surveyoptin.render({
            merchant_id: 5338706929,
            order_id: ${cart?.id},
            email: ${isOneClickBuy ? deliveryInfo?.receiverEmail : user?.email},
            delivery_country: 'RU',
            estimated_delivery_date: ${estimated_delivery_date},
          });
        })}`,
          }}
        />
      </YandexMetricaProvider>
    </>
  );
};

const Container = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 30px;
  position: sticky;
  top: 0;
  .total-header {
    font-size: 1.5rem;
    color: ${color.textSecondary};
  }
  @media ${devices.tabletL} {
    width: 100%;
    position: unset;
  }
  @media ${devices.tabletS} {
    width: 100%;
    position: unset;
  }
  @media ${devices.mobileL} {
    width: 100%;
    position: unset;
  }
  @media ${devices.mobileM} {
    width: 100%;
    position: unset;
  }
  @media ${devices.mobileS} {
    width: 100%;
    position: unset;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
  border-radius: 20px;
  background-color: ${color.textPrimary};
  box-shadow: 0px 2px 6px ${color.boxShadow};
  gap: 20px;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  @media ${devices.tabletL} {
    gap: 0;
  }
  @media ${devices.tabletS} {
    gap: 0;
  }
  @media ${devices.mobileL} {
    gap: 0;
  }
  @media ${devices.mobileM} {
    gap: 0;
  }
  @media ${devices.mobileS} {
    gap: 0;
  }
`;

const ItemColumn = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid rgb(124 124 124 / 19%);
  position: relative;
  .user-agreement-text {
    width: 100%;
    a {
      color: ${color.textBase};
      &:hover {
        color: ${color.textSecondary};
      }
    }
  }
  .payment_method_title {
    font-weight: 600;
    font-size: 1.2rem;
  }
`;

const ItemRowWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  border-bottom: 1px solid rgb(124 124 124 / 19%);
  padding: 10px 0;
`;

const ItemRow = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  .self-pick-up {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    user-select: none;
    input {
      cursor: pointer;
    }
  }
  h3 {
    font-size: 1rem;
    font-weight: 500;
  }
  .product-wheight {
    color: ${color.textTertiary};
  }
  .total {
    font-size: 1.6rem;
    font-weight: 600;
  }
  @media ${devices.laptopS} {
    .product-price-mobile-wrapper {
      width: 100%;
      text-align: end;
    }
  }
  @media ${devices.tabletL} {
    .product-price-mobile-wrapper {
      width: 100%;
      text-align: end;
    }
  }
  @media ${devices.tabletS} {
    .product-price-mobile-wrapper {
      width: 100%;
      text-align: end;
    }
  }

  @media ${devices.mobileL} {
    .product-price-mobile-wrapper {
      width: 100%;
      text-align: end;
    }
  }
  @media ${devices.mobileM} {
    .product-price-mobile-wrapper {
      width: 100%;
      text-align: end;
    }
  }
  @media ${devices.mobileS} {
    .product-price-mobile-wrapper {
      width: 100%;
      text-align: end;
    }
  }
`;

const PlaceOrderButton = styled(motion.button)`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-radius: 30px;
  padding: 0 15px;
  gap: 20px;
  background-color: ${color.btnPrimary};
  span {
    color: ${color.textPrimary};
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
  }
`;

export default TotalDetails;
