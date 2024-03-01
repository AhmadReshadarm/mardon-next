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
import { useAppSelector } from 'redux/hooks';
import { TGlobalState } from 'redux/types';
const ReturnPolicy = () => {
  const { categories } = useAppSelector<TGlobalState>((state) => state.global);
  return (
    <>
      <SEOstatic
        page={{
          realName:
            'NBHOZ - интернет магазин хозтовары оптом. по выгодным ценам',
          name: 'NBHOZ - интернет магазин хозтовары оптом. по выгодным ценам',
          url: '/',
          desc: `NBHOZ, Дешевые хозтовары оптом в интернет магазине nbhoz в Москве и все Россия, купить ${categories.map(
            (category) => `${category.name}, `,
          )}`,
          keywords:
            'nbhoz, nbhoz.ru, Товары для сервировки стола,купить Кухонная утварь, Товары для ванной комнаты, Дешевые хозтовары',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }}
        image={`${baseUrl}/static/favicon.png`}
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
            <Headers>Как работает возврат?</Headers>
            <Contents>
              Наши продукты тестируются и проверяются по заводским стандартам,
              хотя в некоторых случаях могут быть некоторые дефекты, и в этом
              случае мы даем нашим клиентам возможность проверить свой товар при
              получении товара, если клиенты увидят какие-либо дефекты на товар,
              они могут отказаться от получения доставленного товара и вернуть
              его нам, и мы вышлем покупателю замену этого товара. также клиент
              может отменить свой заказ до того, как он получит свой заказ (
              <span style={{ color: color.hoverBtnBg }}>
                кнопка отмены заказа будет доступна для пользователя на странице
                заказов в течение 24 часов после оплаты, через 24 часов кнопка
                исчезнет, и отменить заказ будет невозможно
              </span>
              )
            </Contents>
            <Headers>Каковы правила возврата?</Headers>
            <ListNumbers>
              <li>
                Для клиентов, которые получили товар и проверили его состояние,
                возврат товара невозможен.
              </li>
              <li>
                Если клиент запрашивает возврат средств вместо замены товара
                после получения дефектного товара, клиент несет ответственность
                за оплату стоимости доставки и получит возмещение после оплаты
                стоимости доставки.
              </li>
              <li>Изменение заказа после получения заказа невозможно</li>
            </ListNumbers>
          </Content>
        </Wrapper>
      </Container>
    </>
  );
};

const Headers = styled.h1`
  width: 100%;
  text-align: start;
  font-family: 'Anticva';
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
  color: ${color.yellow};
  &:hover {
    color: ${color.hover};
  }
`;

const ListsDots = styled.ul`
  width: 80%;
  text-align: start;
  padding-left: 15px;
  line-height: 1.5rem;
  font-size: 1rem;
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
  li {
    list-style-type: number;
  }
  @media ${devices.mobileL} {
    width: 100%;
  }
`;

ReturnPolicy.PageLayout = StoreLayout;

export default ReturnPolicy;
