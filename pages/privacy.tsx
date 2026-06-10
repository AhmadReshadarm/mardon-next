import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import {
  Container,
  Wrapper,
  Content,
} from 'components/store/storeLayout/common';
import StoreLayout from 'components/store/storeLayout/layouts';
import SEOstatic from 'components/store/SEO/SEOstatic';
import { baseUrl } from '../common/constant';
import dynamic from 'next/dynamic';
import { LoaderMask } from 'ui-kit/generalLoaderMask';
const PrivacyPolicy = dynamic(
  () => import('components/store/privacy/privacyPolicy'),
  {
    ssr: true,
    loading: () => <LoaderMask />,
  },
);
const Policy = () => {
  return (
    <>
      <SEOstatic
        page={{
          realName:
            'Условия интернет-магазина | NBHOZ - хозтовары оптом в Москве',
          name: 'Условия доставки, возврата и использования сайта | NBHOZ',
          url: '/privacy',
          desc: `Условия использования интернет-магазина хозтоваров NBHOZ. Правила доставки по Москве (бесплатно при заказе от 70 000₽ внутри МКАД, от 1 500₽ за МКАД), возврата товара, оплаты и публикации отзывов. Интернет-магазин хозтоваров оптом в Москве.`,
          keywords:
            'условия интернет-магазина, доставка хозтоваров Москва, бесплатная доставка МКАД, возврат товара, оплата хозтоваров, nbhoz, nbhoz.ru, хозтовары оптом, Москва, правила магазина, оферта, самовывоз хозтоваров',
          createdAt: '2023-10-18T00:00:00Z',
          updatedAt: new Date().toISOString(),
        }}
        image={`${baseUrl}/static/logo_800x800.png`}
      />
      <Container
        variants={variants.fadInOut}
        key="profile-page"
        initial="start"
        animate="middle"
        exit="end"
        flex_direction="column"
        justify_content="center"
        align_items="center"
        padding="200px 0"
        bg_color={color.textPrimary}
      >
        <Wrapper>
          <Content
            flex_direction="column"
            justify_content="flex-start"
            gap="30px"
          >
            <PrivacyPolicy />
          </Content>
        </Wrapper>
      </Container>
    </>
  );
};

Policy.PageLayout = StoreLayout;

export default Policy;
