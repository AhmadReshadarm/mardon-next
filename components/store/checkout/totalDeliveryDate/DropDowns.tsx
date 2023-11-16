import { motion } from 'framer-motion';
import styled from 'styled-components';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { styleProps } from 'components/store/lib/types';
import InfoDropdown from './DropDownsParrent';
import { devices } from 'components/store/lib/Devices';

const DropDowns = () => {
  return (
    <InfoContainer
      key="info-product-page"
      custom={0.3}
      initial="init"
      whileInView="animate"
      exit={{ y: -20, opacity: 0, transition: { delay: 0.2 } }}
      viewport={{ once: true }}
      variants={variants.fadInSlideUp}
    >
      <InfoDropdown title="О Доставка">
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
          000р. Стоимость доставки заказов меньшей стоимости составляет 750р.
        </Contents>
        <Contents>
          Стоимость доставки подвесного кресла «кокон» составляет 1500 р
        </Contents>
        <Contents>
          Подъем, занос и сборка осуществляется на договорной основе.
        </Contents>
        <Headers>Доставка по Московской и Ленинградской области</Headers>
        <Contents>
          Доставка малогабаритного груза осуществляется по тарифам доставки по
          Москве и Санкт- Петербургу плюс 40 р/км от КАД.
        </Contents>
        <Contents>
          Доставка крупногабаритного груза осуществляется по тарифам доставки по
          Москве и Санкт-Петербургу плюс:
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
      </InfoDropdown>
    </InfoContainer>
  );
};

const InfoContainer = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-itmes: flex-start;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${color.textPrimary};
  margin-top: ${(P: styleProps) => P.margintop};
  user-select: none;
`;

const Headers = styled.h1`
  width: 100%;
  text-align: start;
  font-family: 'Anticva';
  font-size: 1rem;
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

export default DropDowns;
