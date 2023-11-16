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
const HowToBuy = () => {
  return (
    <>
      <Head>
        <title>Как купить | Fingarden</title>
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
            <Headers>Как купить товар</Headers>
            <Headers>Как купить</Headers>
            <Contents>
              Заказы через сайт мы принимаем круглосуточно. Заказ, оформленный
              через сайт в выходные дни, мы начинаем обрабатывать в понедельник.
            </Contents>
            <Contents>
              Заказы по телефону +7 (812) 425-31-30  принимаются с понедельника
              по воскресенье с 10.00 до 20.00
            </Contents>
            <Contents>
              Все материалы и цены, размещенные на веб-сайте, носят справочный
              характер и не являются публичной офертой, определяемой положениями
              Статьи 437 (2) Гражданского кодекса Российской Федерации.
              Действующий договор оферты постоянно доступен на странице: 
              <Link href="https://fingarden.ru/offerta">
                <Links>Публичная оферта</Links>
              </Link>
            </Contents>
            <Contents>
              Оставьте Ваш номер телефона и/или адрес электронной почты и наш
              менеджер оперативно свяжется с Вами для уточнения параметров
              заказа и выбора формы оплаты.  Выбирайте любую удобную форму
              оплаты:
            </Contents>
            <ListsDots>
              <li>Оплата банковской картой на сайте</li>
              <li>
                Оплата банковской картой при получении через систему
                Cloudpayment
              </li>
              <li>
                Оплата наличными в шоу-руме по адресу ул. Савушкина д.119 корп.
                3 (по предварительному согласованию)
              </li>
              <li>Оплата по безналичному расчету для юридических лиц</li>
              <li>Оплата в рассрочку на срок до 6 месяцев</li>
            </ListsDots>
            <Headers>Платежи. Оплата банковской картой онлайн</Headers>
            <Contents>
              Наш сайт подключен к интернет-эквайрингу, и Вы можете оплатить
              Товар банковской картой Visa, MasterCard, Maestro и МИР. После
              подтверждения выбранного Товара, на Вашу электронную почту
              поступит ссылка для осуществления оплаты. Пройдя по данной ссылке,
              далее  откроется защищенное окно с платежной страницей
              процессингового центра CloudPayments, где Вам необходимо ввести
              данные Вашей банковской карты. Для дополнительной аутентификации
              держателя карты используется протокол 3D Secure. Если Ваш Банк
              поддерживает данную технологию, Вы будете перенаправлены на его
              сервер для дополнительной идентификации. Информацию о правилах и
              методах дополнительной идентификации уточняйте в Банке, выдавшем
              Вам банковскую карту.
            </Contents>
            <Headers>Гарантии безопасности</Headers>
            <Contents>
              Процессинговый центр CloudPayments защищает и обрабатывает данные
              Вашей банковской карты по стандарту безопасности PCI DSS 3.2.
              Передача информации в платежный шлюз происходит с применением
              технологии шифрования SSL. Дальнейшая передача информации
              происходит по закрытым банковским сетям, имеющим наивысший уровень
              надежности. CloudPayments не передает данные Вашей карты нам и
              иным третьим лицам. Для дополнительной аутентификации держателя
              карты используется протокол 3D Secure.
            </Contents>
            <Contents>
              В случае, если у Вас есть вопросы по совершенному платежу, Вы
              можете обратиться в службу поддержки клиентов 
              <Link href="mailto:info@fingarden.ru">
                <Links>info@fingarden.ru</Links>
              </Link>
            </Contents>
            <Headers>Безопасность онлайн платежей</Headers>
            <Contents>
              Предоставляемая Вами персональная информация (имя, адрес, телефон,
              e-mail, номер кредитной карты) является конфиденциальной и не
              подлежит разглашению. Данные Вашей кредитной карты передаются
              только в зашифрованном виде и не сохраняются на нашем Web-сервере.
            </Contents>
            <Contents>
              Мы рекомендуем вам проверить, что ваш браузер достаточно безопасен
              для проведения платежей онлайн, на 
              <Link target="_blank" href="https://my.cloudpayments.ru/">
                <Links>специальной странице</Links>
              </Link>
              .
            </Contents>
            <Contents>
              Безопасность обработки Интернет-платежей гарантирует ООО
              «КлаудПэйментс». Все операции с платежными картами происходят в
              соответствии с требованиями VISA International, MasterCard и
              других платежных систем. При передаче информации используются
              специальные технологии безопасности карточных онлайн-платежей,
              обработка данных ведется на безопасном высокотехнологичном сервере
              процессинговой компании.
            </Contents>
            <img
              src="/paysystems.jpg"
              alt="available payments"
              style={{ width: '100%', objectFit: 'contain' }}
            />
            <Headers>Платежи. Безналичный расчет</Headers>
            <Contents>
              При заказе Товара укажите все необходимые реквизиты для выписки
              счета. Счет будет отправлен Вам  на указанную электронную почту.
              Доставка товара будет произведена только после поступления денег
              на расчетный счет компании на условиях 100% предоплаты.
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

const Links = styled.span`
  color: ${color.hoverBtnBg};
  &:hover {
    color: ${color.ok};
  }
`;

HowToBuy.PageLayout = StoreLayout;
export default HowToBuy;
