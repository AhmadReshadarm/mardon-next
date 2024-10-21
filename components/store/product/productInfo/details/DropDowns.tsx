import styled from 'styled-components';
import color from 'components/store/lib/ui.colors';
import { styleProps } from 'components/store/lib/types';
import InfoDropdown from './DropDownsParrent';
import { devices } from 'components/store/lib/Devices';
import { ParameterProduct } from 'swagger/services';
import { useAppSelector } from 'redux/hooks';
import { TProductInfoState } from 'redux/types';
import Link from 'next/link';
import InfoDropdownReturn from './DropDownsParrentReturn';
import { Contents, ListsDots } from 'components/store/storeLayout/common';

type Props = {
  parameterProducts?: ParameterProduct[];
};

const DropDowns: React.FC<Props> = ({ parameterProducts }) => {
  const { product, loading }: TProductInfoState = useAppSelector(
    (state) => state.productInfo,
  );

  return (
    <InfoContainer>
      <InfoDropdown title="Описание">
        <p>
          {!loading
            ? product?.desc?.includes('|')
              ? product?.desc
                  ?.split('|')[1]
                  .split(`\n`)
                  .map((text) => (
                    <>
                      {text}
                      <br />
                    </>
                  ))
              : product?.desc?.split(`\n`).map((text) => (
                  <>
                    {text}
                    <br />
                  </>
                ))
            : ''}
        </p>
      </InfoDropdown>
      <InfoDropdown title="Характеристики">
        <SpecsContainer>
          <SpecsKeyValueWrapper>
            {parameterProducts?.map((item, index) => {
              return (
                <>
                  {item.value == '_' ||
                  item.value == '-' ||
                  item.value == '' ? (
                    ''
                  ) : (
                    <li
                      className="wrapper-key-vlaue"
                      key={`parameter-product-label-${index}`}
                    >
                      <span
                        title={item.parameter?.name}
                        className="key-wrapper"
                      >
                        {item.parameter?.name}:{' '}
                      </span>
                      <span title={item.value}>{item.value}</span>
                    </li>
                  )}
                </>
              );
            })}
          </SpecsKeyValueWrapper>
        </SpecsContainer>
      </InfoDropdown>
      <InfoDropdown title="Подробнее о доставке">
        <h3 className="dilevery-title">
          КАКОВА СТОИМОСТЬ И ВАРИАНТЫ ДОСТАВКИ?
        </h3>

        <Contents>
          Бесплатная доставка по Москве и в любую транспортную компанию при
          заказе от 70 000 рублей.
        </Contents>
        <Contents>
          При меньшей сумме заказа возможен самовывоз или платная доставка.
        </Contents>
        <Contents>
          Стоимость платной доставки определяется после оформления заказа. Наш
          менеджер свяжется с вами, чтобы уточнить адрес доставки и цену.
        </Contents>
        <h3 className="dilevery-title">ГДЕ НАХОДЯТСЯ НАШИ СКЛАДЫ?</h3>
        <Contents>
          Наши склады находятся в разных районах Москвы. После оформления заказа
          мы свяжемся с вами, чтобы уточнить адрес доставки или самовывоза с
          ближайшего к вам склада.
        </Contents>
        <Contents>
          По дополнительным вопросам обращаться по номеру телефона:{' '}
          <Link
            title="По дополнительным вопросам обращаться по номеру телефона 8-925-486-54-44"
            style={{ color: color.ok }}
            href="tel:89254865444"
            prefetch={false}
          >
            <span>8-925-486-54-44</span>
          </Link>
          .
        </Contents>
        <Contents>
          Дополнительная скидка рассчитывается индивидуально и зависит от
          количества заказанного товара.
        </Contents>
      </InfoDropdown>
      <InfoDropdownReturn
        title="Политика возврата товаров в НБХОЗ (info@nbhoz.ru, +7-925-486-54-44)"
        borderBottom="none"
      >
        <Contents>
          НБХОЗ стремится обеспечить своих клиентов высококачественной
          продукцией и безупречным сервисом. Мы понимаем, что иногда может
          возникнуть необходимость вернуть товар. Данная политика возврата
          товаров поможет вам легко и быстро осуществить возврат.
        </Contents>
        <h3>Право на возврат товара надлежащего качества</h3>
        <Contents>
          В соответствии с Законом РФ "О защите прав потребителей" (статья 26.1)
          вы имеете право вернуть товар надлежащего качества в течение 7 дней с
          момента его получения при соблюдении следующих условий:
        </Contents>
        <ListsDots>
          <li>Сохранены потребительские свойства товара.</li>
          <li>
            Сохранен товарный вид, включая все заводские упаковки, ярлыки и
            бирки.
          </li>
          <li>
            Имеются документы, подтверждающие покупку товара (чек, товарная
            накладная).
          </li>
        </ListsDots>
        <h3>
          Возврат товара надлежащего качества осуществляется за счет покупателя.
        </h3>
        <h3>Товары, не подлежащие возврату надлежащего качества</h3>
        <Contents>
          Согласно Постановлению Правительства РФ от 31.12.2020 N 2463, не
          подлежат возврату товары надлежащего качества, такие как:
        </Contents>
        <ListsDots>
          <li>
            Товары для профилактики и лечения заболеваний в домашних условиях.
          </li>
          <li>Предметы личной гигиены.</li>
          <li>Парфюмерно-косметические товары.</li>
          <li>Текстильные товары (отрезные ткани).</li>
          <li>
            Швейные и трикотажные изделия (белье, чулочно-носочные изделия).
          </li>
          <li>
            Изделия и материалы, контактирующие с пищевыми продуктами (посуда,
            столовые приборы, емкости для хранения продуктов).
          </li>
          <li>Товары бытовой химии.</li>
          <li>Ювелирные изделия и изделия из драгоценных металлов.</li>
          <li>Автомобили и мототовары.</li>
          <li>
            Технически сложные товары бытового назначения на гарантии не менее 1
            года.
          </li>
          <li>Животные и растения.</li>
          <li>Непериодические издания (книги, брошюры).</li>
        </ListsDots>
        <h3>Возврат товара ненадлежащего качества</h3>
        <Contents>
          В случае обнаружения товара ненадлежащего качества, вы, в соответствии
          со статьей 18 ФЗ "О защите прав потребителей", вправе требовать от
          продавца:
        </Contents>
        <ListsDots>
          <li>Замены на товар аналогичной марки (модели).</li>
          <li>
            Замены на такой же товар другой марки (модели) с перерасчетом
            стоимости.
          </li>
          <li>Уменьшения покупной цены товара, соразмерно его недостаткам.</li>
          <li>
            Возврата полной стоимости товара и возмещения расходов на его
            доставку.
          </li>
          <li>
            Безвозмездного устранения недостатков товара или возмещения расходов
            на их устранение.
          </li>
        </ListsDots>
        <h3>Как оформить возврат</h3>
        <Contents>
          Для оформления возврата товара, пожалуйста,свяжитесь с нашей службой
          поддержки клиентов по электронной почте info@nbhoz.ru или по телефону
          <p style={{ whiteSpace: 'nowrap' }}>+7-925-486-54-44.</p>
        </Contents>

        <h3>В своем обращении укажите:</h3>
        <ListsDots>
          <li>Номер вашего заказа.</li>
          <li>Причину возврата.</li>
          <li>Информацию о товаре, который вы хотите вернуть.</li>
        </ListsDots>
        <h3>
          После получения вашего запроса наш менеджер свяжется с вами для
          уточнения деталей и предоставит дальнейшие инструкции.
        </h3>
        <h3>Обратите внимание:</h3>
        <ListsDots>
          <li>
            Возврат товара осуществляется по адресу, который будет предоставлен
            менеджером службы поддержки клиентов.
          </li>
          <li>
            Товар должен быть возвращен в полной комплектации, в оригинальной
            упаковке, с сохранением всех этикеток и ярлыков.
          </li>
          <li>
            Возврат денежных средств за товар надлежащего качества
            осуществляется в течение 14 дней с момента получения товара на
            складе НБХОЗ.
          </li>
          <li>
            Возврат денежных средств за товар ненадлежащего качества
            осуществляется в течение 14 дней с момента предъявления
            соответствующего требования.
          </li>
        </ListsDots>
        <h3>
          Мы надеемся, что данная информация поможет вам легко оформить возврат.
          Если у вас возникнут какие-либо вопросы, пожалуйста, не стесняйтесь
          обращаться к нашей службе поддержки клиентов.
        </h3>
      </InfoDropdownReturn>
    </InfoContainer>
  );
};

const InfoContainer = styled.div`
  width: 95%;
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

const SpecsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;

const SpecsKeyValueWrapper = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  .wrapper-key-vlaue {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 15px;
    padding-bottom: 15px;
    .key-wrapper {
      white-space: nowrap;
    }
    span {
      font-size: 0.9rem;
    }
  }
  @media ${devices.tabletS} {
    .wrapper-key-vlaue {
      span {
        font-size: 0.7rem;
      }
    }
  }
  @media ${devices.mobileL} {
    .wrapper-key-vlaue {
      span {
        font-size: 0.7rem;
      }
    }
  }
  @media ${devices.mobileM} {
    .wrapper-key-vlaue {
      span {
        font-size: 0.6rem;
      }
    }
  }
  @media ${devices.mobileS} {
    .wrapper-key-vlaue {
      span {
        font-size: 0.6rem;
      }
    }
  }
`;

// const Contents = styled.span`
//   width: 80%;
//   text-align: start;
//   line-height: 1.5rem;
//   font-size: 1rem;
//   @media ${devices.mobileL} {
//     width: 100%;
//   }
// `;

// const ListsDots = styled.ul`
//   width: 80%;
//   text-align: start;
//   padding-left: 15px;
//   line-height: 1.5rem;
//   font-size: 1rem;
//   li {
//     list-style-type: circle;
//   }
//   @media ${devices.mobileL} {
//     width: 100%;
//   }
// `;

export default DropDowns;
