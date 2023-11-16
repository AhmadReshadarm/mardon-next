import {
  Container,
  Content,
  Wrapper,
} from 'components/store/storeLayout/common';
import CheckoutContent from 'components/store/checkout';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import Head from 'next/head';
import Footer from 'components/store/checkout/Footer';
import { useEffect } from 'react';
import { session } from 'redux/slicers/authSlicer';
import { useAppDispatch } from 'redux/hooks';
import { YMaps } from 'react-yandex-maps';
import { fetchCart } from 'redux/slicers/store/cartSlicer';
const Checkout = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(session());
  }, []);
  const createdCardId = localStorage.getItem('basketId');
  if (createdCardId) {
    dispatch(fetchCart(createdCardId));
  }
  return (
    <>
      <YMaps
        query={{
          apikey: '92d38bbd-1ea5-438f-b3bc-6a74d7658532',
          lang: 'ru_RU',
        }}
      >
        <Head>
          <title>Оформить заказ | Fingarden</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>

        <Container
          key="container-checkout"
          flex_direction="row"
          justify_content="center"
          align_items="center"
          padding="20px 0"
          bg_color={color.bgProduct}
          initial="start"
          animate="middle"
          exit="exit"
          variants={variants.fadInOut}
        >
          <Wrapper gap={'20px'}>
            <Content
              flex_direction="column"
              justify_content="space-between"
              align_items="center"
            >
              <CheckoutContent />
            </Content>
          </Wrapper>
        </Container>
        <Footer />
      </YMaps>
    </>
  );
};

export default Checkout;
