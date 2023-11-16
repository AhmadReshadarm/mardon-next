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
import Link from 'next/link';
const Guarantee = () => {
  return (
    <>
      <Head>
        <title>Гарантии | Fingarden</title>
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
            <Headers>Гарантия и возврат товара</Headers>
            <Contents>
              На товары и услуги, представленные в интернет-магазине FinGarden,
              предоставляется гарантия качества от производителя товара. Условия
              гарантии действуют в рамках законодательства о защите прав
              потребителя и регулируются законодательством РФ..
            </Contents>
            <Headers>Обмен и возврат продукции надлежащего качества</Headers>
            <Contents>
              Продавец гарантирует, что покупатель в течение 7 дней с момента
              приобретения товара может отказаться от товара надлежащего
              качества, если:
              <ListsDots>
                <li>
                  товар не поступал в эксплуатацию и имеет товарный вид,
                  находится в упаковке со всеми ярлыками, а также есть документы
                  на приобретение товара;
                </li>
                <li>
                  товар не входит в перечень продуктов надлежащего качества, не
                  подлежащих возврату и обмену.
                </li>
              </ListsDots>
            </Contents>
            <Contents>
              Покупатель имеет право обменять товар надлежащего качество на
              другое торговое предложение этого товара или другой товар,
              идентичный по стоимости или на иной товар с доплатой или возвратом
              разницы в цене.
            </Contents>
            <Contents>
              При возврате товара надлежащего качества Покупателю возвращается
              стоимость товара. Стоимость доставки и обратной пересылки
              оплачивает Покупатель
            </Contents>
            <Headers>Обмен и возврат продукции ненадлежащего качества</Headers>
            <Contents>
              Если покупатель обнаружил недостатки товара после его
              приобретения, то он может потребовать замену у продавца. Замена
              должна быть произведена в течение 7 дней со дня предъявления
              требования. В случае, если будет назначена экспертиза на
              соответствие товара указанным нормам, то обмен должен быть
              произведён в течение 20 дней.
            </Contents>
            <Contents>
              Технически сложные товары ненадлежащего качества заменяются
              товарами той же марки или на аналогичный товар другой марки с
              перерасчётом стоимости. Возврат производится путем аннулирования
              договора купли-продажи и возврата суммы в размере стоимости
              товара.
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

Guarantee.PageLayout = StoreLayout;
export default Guarantee;
