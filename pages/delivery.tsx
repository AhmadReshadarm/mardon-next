import styled from 'styled-components';
import StoreLayout from 'components/store/storeLayout/layouts';
import color from 'components/store/lib/ui.colors';
import {
  Container,
  Wrapper,
  Content,
} from 'components/store/storeLayout/common';
import variants from 'components/store/lib/variants';
import { devices } from 'components/store/lib/Devices';
import Head from 'next/head';
const InfoDelivery = () => {
  return (
    <>
      <Head>
        <title>Доставка | Fingarden</title>
      </Head>
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
            <Headers>Доставка курьером по Санкт-Петербургу и Москве</Headers>
            <Contents>
              Срок: 2-3 рабочих дней (при наличии товара на складе, в случае
              отсутствия товара, сроки доставки уточняются отдельно).
            </Contents>
            <Headers>
              Доставка по Москве и Санкт-Петербургу в пределах МКАД, КАД
            </Headers>
            <Contents>
              Осуществляется бесплатно до подъезда при общей сумме заказа от 50
              000р. Стоимость доставки заказов меньшей стоимости составляет
              750р.
            </Contents>
            <Contents>
              Стоимость доставки подвесного кресла «кокон» составляет 1500 р
            </Contents>
            <Contents>
              Подъем, занос и сборка осуществляется на договорной основе.
            </Contents>
            <Headers>Доставка по Московской и Ленинградской области</Headers>
            <Contents>
              Доставка малогабаритного груза осуществляется по тарифам доставки
              по Москве и Санкт- Петербургу плюс 40 р/км от КАД.
            </Contents>
            <Contents>
              Доставка крупногабаритного груза осуществляется по тарифам
              доставки по Москве и Санкт-Петербургу плюс:
            </Contents>
            <ListsDots>
              <li>До 10 км – 1000 руб</li>
              <li>10-30 км – 2000 руб</li>
              <li>30-50 км – 3000 руб</li>
              <li>50-100 км – 4000 руб</li>
            </ListsDots>
            <Contents>
              Самовывоз осуществляется со склада в Санкт-Петербурге только по
              согласованию с менеджером. Стоимость самовывоза 0 руб.
            </Contents>
            <Headers>Доставка товара по России</Headers>
            <Contents>
              Производится по тарифам транспортных компаний и осуществляется на
              условиях 100% предоплаты за товар.
            </Contents>
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

InfoDelivery.PageLayout = StoreLayout;
export default InfoDelivery;
