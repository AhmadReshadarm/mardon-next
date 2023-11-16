import StoreLayout from 'components/store/storeLayout/layouts';
import { Container, Wrapper } from 'components/store/storeLayout/common';
import Head from 'next/head';
import { devices } from 'components/store/lib/Devices';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import styled from 'styled-components';
import Link from 'next/link';

const AfterCheckout = () => {
  return (
    <>
      <Head>
        <title>Заказ выполнен успешно | Fingarden</title>
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
        padding="50px 0"
        bg_color={color.textPrimary}
      >
        <BackToMain>
          <Link className="back-to-main" href="/">
            <img src="/icons/back_arrow.png" alt="back button" />
            <span>Обратно на главную</span>
          </Link>
        </BackToMain>

        <Wrapper
          flex_direction="column"
          gap="40px"
          style={{ flexDirection: 'column', padding: '50px 0' }}
        >
          <ContentWarpper>
            <h1>Ваш заказ был успешно офомрлен</h1>
            <span className="order-complet-text">
              Наш оператор свяжется с Вами в ближайшее время. Оператор
              проинформирует Вас о дальнейших действиях по Вашему заказу. Так же
              на Ваш почтовый адрес будет выслана выписка по оплате Ваших
              товаров.
            </span>
            <div className="back-to-catelog-btn-wrapper">
              <div className="back-to-catelog-text-wrapper">
                <span>
                  <b>Спасибо за Ваш выбор. </b>
                </span>
                <span>
                  <b>С Уважением, Ваш FINGARDEN</b>
                </span>
              </div>
              <Link href="/catalog">
                <button>СНОВА К ПОКУПКАМ</button>
              </Link>
            </div>
          </ContentWarpper>
        </Wrapper>
      </Container>
    </>
  );
};

const BackToMain = styled.div`
  width: 100%;
  max-width: 1230px;
  padding: 0 0 50px 0;
  .back-to-main {
    display: flex;
    felx-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    img {
      width: 40px;
    }
  }
  @media ${devices.laptopS} {
    width: 95%;
    max-width: unset;
  }

  @media ${devices.mobileL} {
    width: 95%;
    max-width: unset;
  }
  @media ${devices.mobileM} {
    width: 95%;
    max-width: unset;
  }

  @media ${devices.mobileS} {
    width: 95%;
    max-width: unset;
  }
`;

const ContentWarpper = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 30px;
  padding: 50px;
  box-shadow: 0px 5px 10px 0px ${color.boxShadowBtn};
  border-radius: 15px;
  h1 {
    font-family: Anticva;
  }
  .order-complet-text {
    width: 50%;
    color: #5a6445;
  }
  .back-to-catelog-btn-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 15px;
    .back-to-catelog-text-wrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 10px;
      color: #606060;
    }
    button {
      width: 200px;
      height: 40px;
      background-color: ${color.btnSecondery};
      cursor: pointer;
      transition: 300ms;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      border-radius: 3px;
      &:hover {
        background-color: ${color.searchBtnBg};

        transform: scale(1.02);
      }
      &:active {
        transform: scale(1);
        background-color: ${color.btnPrimary};
        color: ${color.textPrimary};
      }
      span {
        font-family: 'Jost';
        font-size: 1rem;
      }
    }
  }
`;

AfterCheckout.PageLayout = StoreLayout;

export default AfterCheckout;
