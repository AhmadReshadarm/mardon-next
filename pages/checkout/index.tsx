import {
  Container,
  Content,
  Wrapper,
} from 'components/store/storeLayout/common';
import StoreLayout from 'components/store/storeLayout/layouts';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { YMaps } from 'react-yandex-maps';
import { baseUrl } from 'common/constant';
import { fetchCart } from 'redux/slicers/store/cartSlicer';
import dynamic from 'next/dynamic';
import { LoaderMask } from 'ui-kit/generalLoaderMask';
const CheckoutContent = dynamic(() => import('components/store/checkout'), {
  ssr: false,
  loading: () => <LoaderMask />,
});

const Checkout = () => {
  const dispatch = useAppDispatch();
  const [isClient, setClient] = useState(false);
  const getBasketId = () => {
    return localStorage.getItem('basketId');
  };

  useEffect(() => {
    const basketId: any = getBasketId();
    dispatch(fetchCart(basketId));
  }, [isClient]);
  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <>
      <YMaps
        query={{
          apikey: '92d38bbd-1ea5-438f-b3bc-6a74d7658532',
          lang: 'ru_RU',
        }}
      >
        <Head>
          <title>Оформить заказ | Nbhoz</title>
          <meta
            property="og:image"
            name="og:image"
            content={`${baseUrl}/static/logo_800x800.png`}
          />
        </Head>

        {isClient ? (
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
        ) : (
          <LoaderMask />
        )}
      </YMaps>
    </>
  );
};

Checkout.PageLayout = StoreLayout;
export default Checkout;
