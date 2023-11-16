import { motion } from 'framer-motion';
import styled from 'styled-components';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { styleProps } from 'components/store/lib/types';
import InfoDropdown from './DropDownsParrent';
import DeleveryBox from '../../../../../assets/deleveryBox.svg';
import { devices } from 'components/store/lib/Devices';
import { ParameterProduct } from 'swagger/services';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'redux/hooks';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import DOMPurify from 'dompurify';
import { TProductInfoState } from 'redux/types';
import Loading from 'ui-kit/Loading';

type Props = {
  description?: any;
  parameterProducts?: ParameterProduct[];
};

const DropDowns: React.FC<Props> = ({ description, parameterProducts }) => {
  const { product, loading }: TProductInfoState = useAppSelector(
    (state) => state.productInfo,
  );
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );

  useEffect(() => {
    if (!loading && product?.desc!.length !== 0) {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(product?.desc!)),
        ),
      );
    }
  }, [description]);

  // _________________________ preview converter _______________________
  const [convertedContent, setConvertedContent] = useState(null);
  useEffect(() => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const htmlOutput = draftToHtml(rawContentState);
    setConvertedContent(htmlOutput);
  }, [editorState]);

  function createMarkup(html) {
    if (typeof window !== 'undefined') {
      const domPurify = DOMPurify(window);
      return {
        __html: domPurify.sanitize(html),
      };
    }
  }

  return (
    <InfoContainer
      key="info-product-page"
      custom={0.3}
      initial="init"
      whileInView="animate"
      exit={{ y: -20, opacity: 0, transition: { delay: 0.2 } }}
      viewport={{ once: true }}
      variants={variants.fadInSlideUp}
      margintop="-35px"
    >
      <InfoDropdown title="Описание">
        {loading ? (
          <Loading />
        ) : (
          <div dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>
        )}
      </InfoDropdown>
      <InfoDropdown title="Характеристики">
        <SpecsContainer>
          <SpecsKeyValueWrapper>
            {parameterProducts?.map((item, index) => {
              return (
                <span key={`dropdown-below-key-${index}`}>
                  {item.value == '_' ||
                  item.value == '-' ||
                  item.value == '' ? (
                    ''
                  ) : (
                    <li
                      className="wrapper-key-vlaue"
                      key={`parameter-product-label-${index}`}
                    >
                      <span id="key-specs">{item.parameter?.name}: </span>
                      <span id="value-specs">{item.value}</span>
                    </li>
                  )}
                </span>
              );
            })}
          </SpecsKeyValueWrapper>
        </SpecsContainer>
      </InfoDropdown>
      <InfoDropdown title="Подробнее о доставке">
        <h3>КАКОВА СТОИМОСТЬ И ВАРИАНТЫ ДОСТАВКИ?</h3>
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
      <InfoDropdown borderBottom="none" title="Гарантия и возврат товара">
        <Contents>
          На товары и услуги, представленные в интернет-магазине FinGarden,
          предоставляется гарантия качества от производителя товара. Условия
          гарантии действуют в рамках законодательства о защите прав потребителя
          и регулируются законодательством РФ..
        </Contents>
        <Headers>Обмен и возврат продукции надлежащего качества</Headers>
        <Contents>
          Продавец гарантирует, что покупатель в течение 7 дней с момента
          приобретения товара может отказаться от товара надлежащего качества,
          если:
          <ListsDots>
            <li>
              товар не поступал в эксплуатацию и имеет товарный вид, находится в
              упаковке со всеми ярлыками, а также есть документы на приобретение
              товара;
            </li>
            <li>
              товар не входит в перечень продуктов надлежащего качества, не
              подлежащих возврату и обмену.
            </li>
          </ListsDots>
        </Contents>
        <Contents>
          Покупатель имеет право обменять товар надлежащего качество на другое
          торговое предложение этого товара или другой товар, идентичный по
          стоимости или на иной товар с доплатой или возвратом разницы в цене.
        </Contents>
        <Contents>
          При возврате товара надлежащего качества Покупателю возвращается
          стоимость товара. Стоимость доставки и обратной пересылки оплачивает
          Покупатель
        </Contents>
        <Headers>Обмен и возврат продукции ненадлежащего качества</Headers>
        <Contents>
          Если покупатель обнаружил недостатки товара после его приобретения, то
          он может потребовать замену у продавца. Замена должна быть произведена
          в течение 7 дней со дня предъявления требования. В случае, если будет
          назначена экспертиза на соответствие товара указанным нормам, то обмен
          должен быть произведён в течение 20 дней.
        </Contents>
        <Contents>
          Технически сложные товары ненадлежащего качества заменяются товарами
          той же марки или на аналогичный товар другой марки с перерасчётом
          стоимости. Возврат производится путем аннулирования договора
          купли-продажи и возврата суммы в размере стоимости товара.
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
  justify-content: center;
  align-items: flex-start;
  gap: 30px;
  .wrapper-key-vlaue {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 15px;
    span {
      font-size: 0.875rem;
    }
    #key-specs {
      width: 100%;

      color: ${color.textSecondary};
    }
    #value-specs {
      width: 50%;
    }
  }
`;

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

export default DropDowns;
