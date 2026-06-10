import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import { devices } from 'components/store/lib/Devices';
import {
  Container,
  Wrapper,
  Content,
} from 'components/store/storeLayout/common';
import StoreLayout from 'components/store/storeLayout/layouts';
import styled from 'styled-components';
import SEOstatic from 'components/store/SEO/SEOstatic';
import { baseUrl } from '../common/constant';
import dynamic from 'next/dynamic';
import { LoaderMask } from 'ui-kit/generalLoaderMask';
const UserAgreement = dynamic(() => import('components/store/user-agreement'), {
  ssr: true,
  loading: () => <LoaderMask />,
});
const PrivacyNotic = () => {
  return (
    <>
      <SEOstatic
        page={{
          realName:
            'Пользовательское соглашение | NBHOZ - интернет-магазин хозтоваров оптом',
          name: 'Политика обработки персональных данных и условия использования | NBHOZ',
          url: '/user-agreement',
          desc: `Пользовательское соглашение и политика конфиденциальности интернет-магазина хозтоваров NBHOZ в Москве. Условия доставки, возврата, обработки персональных данных и использования аналитических сервисов Яндекс.Метрика и Google Analytics.`,
          keywords:
            'пользовательское соглашение, политика конфиденциальности, условия использования, nbhoz, nbhoz.ru, персональные данные, 152-ФЗ, доставка хозтоваров, Москва, хозтовары оптом, согласие на обработку данных, оферта',
          createdAt: '2023-10-18T00:00:00Z',
          updatedAt: new Date().toISOString(),
        }}
        image={`${baseUrl}/static/logo_800x800.png`}
      />
      <Container
        variants={variants.fadInOut}
        key="user-agreement-page"
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
            <UserAgreement />
          </Content>
        </Wrapper>
      </Container>
    </>
  );
};

const Headers = styled.h1`
  width: 100%;
  text-align: start;
  font-size: 1.5rem;
  @media ${devices.mobileL} {
    max-width: 95vw;
  }
`;

const Contents = styled.span`
  width: 80%;
  text-align: start;
  line-height: 1.5rem;
  font-size: 1rem;
  @media ${devices.mobileL} {
    width: 100%;
  }
`;

const Links = styled.span`
  color: ${color.hoverBtnBg};
  &:hover {
    color: ${color.ok};
  }
`;

const ListsDots = styled.ul`
  width: 80%;
  text-align: start;
  padding-left: 15px;
  line-height: 1.5rem;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  li {
    list-style-type: circle;
  }
  @media ${devices.mobileL} {
    width: 100%;
  }
`;
const ListNumbers = styled.ol`
  width: 80%;
  text-align: start;
  padding-left: 15px;
  line-height: 1.5rem;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  li {
    list-style-type: number;
  }
  @media ${devices.mobileL} {
    width: 100%;
  }
`;

PrivacyNotic.PageLayout = StoreLayout;

export default PrivacyNotic;
