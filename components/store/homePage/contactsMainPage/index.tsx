import { Container, Wrapper } from 'components/store/storeLayout/common';
import styled from 'styled-components';
import color from 'components/store/lib/ui.colors';
import Link from 'next/link';
import { devices } from 'components/store/lib/Devices';

const ContactsMainPage = (): JSX.Element => {
  return (
    <Container
      flex_direction="column"
      justify_content="center"
      padding="130px 0"
      bg_color={color.bgPrimary}
      position="relative"
    >
      <HeaderWrapper>
        <div className="header-title-wrapper">
          <span>Наши контакты</span>
        </div>
        <div className="header-divder-wrapper"></div>
      </HeaderWrapper>
      <Wrapper
        gap="100px"
        style={{ padding: '50px 0', flexDirection: 'column' }}
      >
        <ContactsHeaderWrapper>
          <h2>Интернет-магазин fingarden товаров для загородной жизни</h2>
        </ContactsHeaderWrapper>
        <ContactContentWrapper>
          <div className="first-column">
            <div className="first-column-content-wrapper">
              <img src="/icons/location.png" alt="location" />
              <span>
                Санкт-Петербург, ТЦ Villa - ул. Савушкина д.119, корп.3, 2 этаж,
                В-59
              </span>
            </div>
            <div className="first-column-content-wrapper">
              <img src="/icons/available_time.png" alt="working hours" />
              <span>Пн-Все 10.00-22.00</span>
            </div>
            <div className="first-column-content-wrapper">
              <img src="/icons/email.png" alt="mail to" />
              <span>
                <Link target="_blank" href="mailto:info@fingarden.ru">
                  info@fingarden.ru
                </Link>
              </span>
            </div>
            <div className="first-column-last-content">
              <span>ИНН: 7814726563</span>
              <span>ОГРН: 1187847112111</span>
            </div>
          </div>
          <div className="second-column">
            <div className="second-column-content-wrapper">
              <img src="/icons/phone_call.png" alt="call fingarden via phone" />
              <span>
                <Link target="_blank" href="tel:+78124253130">
                  +7 812 425-31-30
                </Link>
              </span>
            </div>
            <div className="second-column-content-wrapper">
              <img
                src="/icons/whatsApp_call.png"
                alt="call fingarden via WhatsApp"
              />
              <span>
                <Link target="_blank" href="https://wa.me/0079313539004">
                  +7 931 353-90-04
                </Link>
              </span>
            </div>
            <div className="second-column-last-content">
              <Link href="/contacts" className="goto-contact-page-btn">
                <span>ОТКРЫТЬ КАРТЫ</span>
              </Link>
            </div>
          </div>
        </ContactContentWrapper>
      </Wrapper>
    </Container>
  );
};

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  border-bottom: 1px solid ${color.textSecondary};
  position: relative;
  .header-title-wrapper {
    max-width: 1230px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 0 0 20px 30px;
    border-bottom: 1px solid ${color.textSecondary};
    z-index: 2;
    margin-bottom: -1px;
    span {
      font-family: Baskerville;
      font-size: 1.5rem;
    }
  }
  .header-divder-wrapper {
    width: 50%;
    align-self: flex-start;
    border-bottom: 20px solid ${color.textPrimary};
    z-index: 1;
    position: absolute;
    top: 40px;
    left: 0;
  }
`;

const ContactsHeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 0;
  h2 {
    width: 55%;
    font-family: Anticva;
    font-weight: 100;
    line-height: 2.5rem;
  }

  @media ${devices.laptopS} {
    h2 {
      width: 100%;
      font-size: 1.2rem;
    }
  }
  @media ${devices.mobileL} {
    h2 {
      width: 100%;
      font-size: 1.2rem;
    }
  }
  @media ${devices.mobileM} {
    h2 {
      width: 100%;
      font-size: 1.2rem;
    }
  }
  @media ${devices.mobileS} {
    h2 {
      width: 100%;
      font-size: 1.2rem;
    }
  }
`;

const ContactContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0 0 0 30%;
  gap: 90px;
  span {
    font-weight: 600;
  }
  .first-column {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;
    .first-column-content-wrapper {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 15px;
      span {
        width: 70%;
      }
    }
    .first-column-last-content {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 20px;
    }
  }

  .second-column {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;
    width: 50%;
    .second-column-content-wrapper {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 15px;
    }
    .second-column-last-content {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding-top: 40px;
      .goto-contact-page-btn {
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
          font-weight: 400;
        }
      }
    }
  }
  @media ${devices.laptopS} {
    padding: 0;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 30px;
    .first-column {
      width: 100%;
    }
    .second-column {
      width: 100%;
    }
  }

  @media ${devices.mobileL} {
    padding: 0;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 30px;
    .first-column {
      width: 100%;
    }
    .second-column {
      width: 100%;
    }
  }
  @media ${devices.mobileM} {
    padding: 0;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 30px;
    .first-column {
      width: 100%;
    }
    .second-column {
      width: 100%;
    }
  }

  @media ${devices.mobileS} {
    padding: 0;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 30px;
    .first-column {
      width: 100%;
    }
    .second-column {
      width: 100%;
    }
  }
`;

export default ContactsMainPage;
