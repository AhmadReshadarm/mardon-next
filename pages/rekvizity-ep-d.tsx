import styled from 'styled-components';
import StoreLayout from 'components/store/storeLayout/layouts';
import color from 'components/store/lib/ui.colors';
import { styleProps } from 'components/store/lib/types';
import {
  Container,
  Wrapper,
  Content,
} from 'components/store/storeLayout/common';
import variants from 'components/store/lib/variants';
import Link from 'next/link';
const InfoDelivery = () => {
  return (
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
        {/* <Content
          flex_direction="column"
          justify_content="flex-start"
          gap="30px"
        >
          <h1>Реквизиты ИП «Зиаудин Д.»</h1>
          <h2>Основные реквизиты</h2>
          <TableWrapper>
            <thead>
              <tr>
                <th className="key-header">Полное наименование</th>
                <th className="value-header">Карточка Организации</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="key">Юридический адрес</td>
                <td className="value">
                  140003, Московская обл., Люберцы г., 23 км Новорязанского
                  шоссе, д. 221А
                </td>
              </tr>
              <tr>
                <td className="key">Фактический адрес</td>
                <td className="value">
                  140003, Московская обл., Люберцы г., 23 км Новорязанского
                  шоссе, д. 221А
                </td>
              </tr>
              <tr>
                <td className="key">№ ОГРН</td>
                <td className="value">321508100366863</td>
              </tr>
              <tr>
                <td className="key">ИНН</td>
                <td className="value">772776348545</td>
              </tr>
              <tr>
                <td className="key">ОКВЭД</td>
                <td className="value">
                  47.91.3, 47.91.5, 47.29.35, 47.19.2, 47.91.1, 47.71.4,
                  47.71.4, 47.29.33, 47.19, 47.91, 47.71.3, 47.11, 47.71.2,
                  47.29, 47.89.2, 47.71, 47.26, 47.89, 47.65, 47.25.2
                </td>
              </tr>
              <tr>
                <td className="key">Расчетный счет</td>
                <td className="value">
                  40802810740000197882 в ПАО «СБЕРБАНК» г. Москва
                </td>
              </tr>
              <tr>
                <td className="key">Корреспондентский счет</td>
                <td className="value">30101810400000000225</td>
              </tr>
              <tr>
                <td className="key">БИК</td>
                <td className="value">044525225</td>
              </tr>
              <tr>
                <td className="key">Генеральный директор</td>
                <td className="value">Зиаудин Джамшид</td>
              </tr>
            </tbody>
          </TableWrapper>
          <span>
            Адрес электронной почты для направления заявлений о нарушении
            авторских и (или) смежных прав __{'  '}
            <Link href="mailto:help@wuluxe.ru">
              <a style={{ color: color.yellow }}>help@wuluxe.ru</a>
            </Link>
          </span>
        </Content> */}
      </Wrapper>
    </Container>
  );
};

const TableWrapper = styled.table`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  user-select: none;
  tr {
    border-bottom: 1px solid ${color.textSecondary};
  }
  td {
    border-left: 1px solid ${color.textSecondary};
    height: 100%;
  }
  thead {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #f5f7fa;
    tr {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      .key-header {
        width: 40%;
        border-right: 1px solid ${color.textSecondary};
        padding: 10px;
        border-top: 1px solid ${color.textSecondary};
        border-left: 1px solid ${color.textSecondary};
      }
      .value-header {
        width: 60%;
        padding: 10px;
        border-top: 1px solid ${color.textSecondary};
        border-right: 1px solid ${color.textSecondary};
      }
    }
  }
  tbody {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: space-between;
    tr {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .key {
        width: 40%;
        padding: 10px;
      }
      .value {
        width: 60%;
        padding: 10px;
        border-right: 1px solid ${color.textSecondary};
      }
    }
  }
`;

InfoDelivery.PageLayout = StoreLayout;
export default InfoDelivery;
