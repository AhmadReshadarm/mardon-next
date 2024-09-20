import { Container } from 'components/store/storeLayout/common';
import styled from 'styled-components';
import color from 'components/store/lib/ui.colors';
import Link from 'next/link';
import { devices } from 'components/store/lib/Devices';
import {
  LocationPointerSVG,
  MailSVG,
  PhoneSVG,
  WatchSVG,
} from 'assets/icons/UI-icons';
import { useInViewport } from 'components/store/storeLayout/useInViewport';

const ContactsMainPage = (): JSX.Element => {
  const { isInViewport, ref } = useInViewport();
  return (
    <Container
      flex_direction="column"
      justify_content="center"
      align_items="center"
      padding="80px 0"
      bg_color={color.backgroundPrimary}
      ref={ref}
    >
      {isInViewport ? (
        <Wrapper>
          <ContactContentWrapper>
            <div className="header-wrapper">
              <h1>НАШИ КОНТАКТЫ</h1>
            </div>
            <div className="contact-info-wrapper">
              <div className="contents-rows">
                <span className="icons-wrapper">
                  <PhoneSVG />
                </span>
                <div className="call-wrapper">
                  <Link href="tel:+79254865444">
                    <span title="позвонить 8-925-486-54-44">
                      8-925-486-54-44
                    </span>
                  </Link>
                  <span className="call-saperator">|</span>
                  <Link href="tel:89266999952">
                    <span title="позвонить 8-926-699-99-52">
                      8-926-699-99-52
                    </span>
                  </Link>
                  <span className="call-saperator">|</span>
                  <Link href="tel:89268999954">
                    <span title="позвонить 8-926-899-99-54">
                      8-926-899-99-54
                    </span>
                  </Link>
                </div>
              </div>
              <div className="contents-rows">
                <span className="icons-wrapper">
                  <MailSVG />
                </span>
                <div className="call-wrapper">
                  <Link href="mailto:info@nbhoz.ru">
                    <span title="отправьте письмо по адресу info@nbhoz.ru">
                      info@nbhoz.ru
                    </span>
                  </Link>
                  <span className="call-saperator">|</span>
                  <Link href="mailto:exelon@hoz-mardon.ru">
                    <span title="отправьте письмо по адресу exelon@hoz-mardon.ru">
                      exelon@hoz-mardon.ru
                    </span>
                  </Link>
                </div>
              </div>
              <div className="contents-rows">
                <span className="icons-wrapper">
                  <LocationPointerSVG />
                </span>
                <span title="адрес г. Москва, Каширское шоссе">
                  г. Москва, Каширское шоссе
                </span>
              </div>
              <div className="contents-rows">
                <span className="icons-wrapper">
                  <WatchSVG />
                </span>
                <span title="график работы понедельник-суббота с 10:00 до 21:00">
                  Понедельник-Суббота с 10:00 до 21:00
                </span>
              </div>
            </div>
          </ContactContentWrapper>
        </Wrapper>
      ) : (
        <LoaderMask></LoaderMask>
      )}
    </Container>
  );
};

const LoaderMask = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: cneter;
  @media ${devices.laptopL} {
    max-width: 1230px;
  }

  @media ${devices.laptopM} {
    max-width: 1230px;
  }
  @media ${devices.laptopS} {
    width: 90%;
    max-width: unset;
  }
  @media ${devices.tabletL} {
    width: 90%;
    max-width: unset;
  }
  @media ${devices.tabletS} {
    width: 90%;
    max-width: unset;
  }
  @media ${devices.mobileL} {
    width: 90%;
    max-width: unset;
  }
  @media ${devices.mobileM} {
    width: 90%;
    max-width: unset;
  }
  @media ${devices.mobileS} {
    width: 90%;
    max-width: unset;
  }
`;

const ContactContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 90px;
  .header-wrapper {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    h1 {
      font-size: 3rem;
      font-family: ricordi;
      text-align: left;
    }
  }
  .contact-info-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 15px;
    .contents-rows {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 10px;
      .call-saperator {
        font-size: 1.5rem;
      }
      .icons-wrapper {
        width: 30px;
        height: 30px;
      }
      .call-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 15px;
        .call-saperator {
          font-size: 1.5rem;
        }
      }
    }
  }
  @media ${devices.tabletL} {
    .contact-info-wrapper {
      .contents-rows {
        .call-wrapper {
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          .call-saperator {
            display: none;
          }
        }
      }
    }
  }
  @media ${devices.tabletS} {
    .header-wrapper {
      h1 {
        font-size: 2rem;
      }
    }
    .contact-info-wrapper {
      .contents-rows {
        .call-wrapper {
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          .call-saperator {
            display: none;
          }
        }
      }
    }
  }
  @media ${devices.mobileL} {
    .header-wrapper {
      h1 {
        font-size: 1.5rem;
      }
    }
    .contact-info-wrapper {
      .contents-rows {
        .call-wrapper {
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          .call-saperator {
            display: none;
          }
        }
      }
    }
  }
  @media ${devices.mobileM} {
    .header-wrapper {
      h1 {
        font-size: 1.3rem;
      }
    }
    .contact-info-wrapper {
      .contents-rows {
        .call-wrapper {
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          .call-saperator {
            display: none;
          }
        }
      }
    }
  }
  @media ${devices.mobileS} {
    .header-wrapper {
      h1 {
        font-size: 1rem;
      }
    }
    .contact-info-wrapper {
      .contents-rows {
        .call-wrapper {
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          .call-saperator {
            display: none;
          }
        }
      }
    }
  }
`;

export default ContactsMainPage;
