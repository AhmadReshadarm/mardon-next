import styled from 'styled-components';
import Link from 'next/link';
import variants from '../lib/variants';
import color from '../lib/ui.colors';
import { Container } from './common';
import { devices } from '../lib/Devices';
import { CloseSVGBlack } from '../../../assets/icons/UI-icons';
import { handleCookiesClick, acceptedCookies } from './helpers';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'redux/hooks';
import { TGlobalState } from 'redux/types';
import {
  LocationPointerSVG,
  MailSVG,
  PhoneSVG,
  WatchSVG,
} from 'assets/icons/UI-icons';
import { content } from './constants';
import { useInViewport } from './useInViewport';
import Image from 'next/image';
const Footer = (): JSX.Element => {
  const { categories } = useAppSelector<TGlobalState>((state) => state.global);
  const copyRighYear = new Date().getFullYear();
  const [isOpen, setOpen] = useState(true);
  const [showCookiesNotifi, setShowCookiesNotifi] = useState(false);
  const { isInViewport, ref } = useInViewport();
  useEffect(() => {
    acceptedCookies(setOpen);
  }, []);

  const [isClient, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
    setTimeout(() => {
      setShowCookiesNotifi(true);
    }, 10000);
  }, []);

  return (
    <>
      {isClient ? (
        <>
          <Container
            variants={variants.fadInOut}
            key="header"
            initial="start"
            animate="middle"
            exit="end"
            flex_direction="row"
            justify_content="space-evenly"
            padding="100px 0"
            bg_color={color.backgroundSecondery}
            ref={ref}
          >
            {isInViewport && (
              <Wrapper>
                <FooterContentWrapper>
                  <FooterTopContentWrapper>
                    <FooterLeftContentWrapper>
                      <div className="footer-columns-wrapper">
                        <span className="columns-header">Каталог </span>
                        {categories.map((category, index) => {
                          return (
                            <Link
                              aria-label={category.name}
                              key={`${category.url}-${index}`}
                              href={`/catalog?categories=${category.url}`}
                            >
                              <span>{category.name}</span>
                            </Link>
                          );
                        })}
                      </div>
                      {/* <div className="footer-columns-wrapper">
                  <span className="columns-header">Услуги</span>
                  {content.services.map((service, index) => {
                    return (
                      <Link
                        key={`${service.url}-${index}`}
                        href={`${service.url}`}
                      >
                        <span>{service.text}</span>
                      </Link>
                    );
                  })}
                </div> */}
                      <div className="footer-columns-wrapper">
                        <span className="columns-header">О нас</span>
                        {content.aboutUs.map((service, index) => {
                          return (
                            <Link
                              aria-label={service.text}
                              key={`${service.url}-${index}`}
                              href={`${service.url}`}
                            >
                              <span>{service.text}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </FooterLeftContentWrapper>
                    <FooterRightContentWrapper>
                      <div className="right-column-content">
                        <PhoneSVG />
                        <div className="call-row-wrapper">
                          <Link
                            aria-label="позвонить 89254865444"
                            href="tel:+79254865444"
                          >
                            <span title="позвонить 8-925-486-54-44">
                              8-925-486-54-44
                            </span>
                          </Link>
                          <span className="call-saperator">|</span>
                          <Link
                            aria-label="позвонить 89266999952"
                            href="tel:89266999952"
                          >
                            <span title="позвонить 8-926-699-99-52">
                              8-926-699-99-52
                            </span>
                          </Link>
                          <span className="call-saperator">|</span>
                          <Link
                            aria-label="позвонить 89268999954"
                            href="tel:89268999954"
                          >
                            <span title="позвонить 8-926-899-99-54">
                              8-926-899-99-54
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div className="right-column-content">
                        <MailSVG />
                        <div className="call-row-wrapper">
                          <Link
                            aria-label="отправьте письмо по адресу info@nbhoz.ru"
                            href="mailto:info@nbhoz.ru"
                          >
                            <span title="отправьте письмо по адресу info@nbhoz.ru">
                              info@nbhoz.ru
                            </span>
                          </Link>
                          <span className="call-saperator">|</span>
                          <Link
                            aria-label="отправьте письмо по адресу exelon@hoz-mardon.ru"
                            href="mailto:exelon@hoz-mardon.ru"
                          >
                            <span title="отправьте письмо по адресу exelon@hoz-mardon.ru">
                              exelon@hoz-mardon.ru
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div className="right-column-content">
                        <div className="call-row-wrapper">
                          <Link
                            href="https://vk.com/nbhoz"
                            target="__blank"
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'flex-start',
                              justifyContent: 'flex-start',
                              gap: '5px',
                            }}
                            title="Подпишитесь на нас в ВКонтакте"
                          >
                            <Image
                              src="/icons/vk.png"
                              alt="nbhoz vk"
                              width={0}
                              height={0}
                              sizes="100vw"
                              loading="lazy"
                            />
                            <span>/nbhoz</span>
                          </Link>
                          <span className="call-saperator">|</span>
                          <Link
                            href="https://t.me/nbhoz"
                            target="__blank"
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'flex-start',
                              justifyContent: 'flex-start',
                              gap: '5px',
                            }}
                            title="Подпишитесь на нас в Telegram"
                          >
                            <Image
                              src="/icons/telegram.png"
                              alt="nbhoz telegram"
                              width={0}
                              height={0}
                              sizes="100vw"
                              loading="lazy"
                            />
                            <span>/nbhoz</span>
                          </Link>
                        </div>
                      </div>
                      <div className="right-column-content">
                        <WatchSVG />
                        <span title="график работы понедельник-суббота с 10:00 до 21:00">
                          Понедельник-Суббота с 10:00 до 21:00
                        </span>
                      </div>
                      <div className="right-column-content">
                        <LocationPointerSVG />
                        <span title="адрес г. Москва, Каширское шоссе">
                          г. Москва, Каширское шоссе
                        </span>
                      </div>
                    </FooterRightContentWrapper>
                  </FooterTopContentWrapper>
                  <FooterBottomContentWrapper>
                    <div className="bottom-left-wrapper">
                      <Link
                        aria-label="Пользовательское соглашение"
                        href="/user-agreement"
                      >
                        <span>Пользовательское соглашение</span>
                      </Link>
                      <Link aria-label="Политика безопасности" href="/privacy">
                        <span>Политика безопасности</span>
                      </Link>
                    </div>
                    <div className="bottom-right-wrapper">
                      <span>
                        Nbhoz. All rights reserved. Все права защищены ©{' '}
                        {copyRighYear}
                      </span>
                    </div>
                  </FooterBottomContentWrapper>
                </FooterContentWrapper>
              </Wrapper>
            )}
          </Container>
          {showCookiesNotifi ? (
            <CookiesNotification style={{ display: isOpen ? 'flex' : 'none' }}>
              <div className="close-cookies">
                <span
                  onClick={() => {
                    setOpen(false);
                    localStorage.setItem('agree-cookies', '0');
                  }}
                  className="close-btn-wrapper"
                >
                  <CloseSVGBlack />
                </span>
              </div>
              <div className="notification-cookies">
                <span>
                  При нажимая «Принять все файлы cookie», вы соглашаетесь, что
                  NBHOZ может сохранять файлы cookie на вашем устройстве и
                  раскрывать информацию в соответствии с нашей{' '}
                  <Link
                    style={{ color: color.hoverBtnBg }}
                    href="/privacy#cookies"
                  >
                    <span>Политикой использования файлов cookies.</span>
                  </Link>
                </span>
              </div>
              <button
                className="accept-cookies"
                onClick={() => handleCookiesClick(setOpen)}
                title="Принять все файлы cookies"
              >
                Принять все файлы cookies
              </button>
            </CookiesNotification>
          ) : (
            ''
          )}
        </>
      ) : (
        ''
      )}
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  max-width: 1500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FooterContentWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 50px;
`;

const FooterTopContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  @media ${devices.laptopS} {
    flex-direction: column;
    gap: 30px;
  }
  @media ${devices.tabletL} {
    flex-direction: column;
    gap: 30px;
  }
  @media ${devices.tabletS} {
    flex-direction: column;
    gap: 30px;
  }
  @media ${devices.mobileL} {
    flex-direction: column;
    gap: 30px;
  }
  @media ${devices.mobileM} {
    flex-direction: column;
    gap: 30px;
  }
  @media ${devices.mobileS} {
    flex-direction: column;
    gap: 30px;
  }
`;

const FooterLeftContentWrapper = styled.div`
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 100px;
  .footer-columns-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 15px;
    .columns-header {
      font-size: 1.4rem;
      padding: 0 0 25px 0;
    }
  }
  @media ${devices.laptopS} {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  @media ${devices.tabletL} {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  @media ${devices.tabletS} {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  @media ${devices.mobileL} {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  @media ${devices.mobileM} {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
  }
  @media ${devices.mobileS} {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
  }
`;

const FooterRightContentWrapper = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-item: flex-start;
  gap: 30px;
  .right-column-content {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    svg {
      min-width: 25px;
      min-height: 25px;
    }
    .call-row-wrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      gap: 20px;
      span {
        text-wrap: nowrap;
      }
      .call-saperator {
        font-size: 1.5rem;
      }
      a {
        img {
          width: 25px;
          height: 25px;
        }
      }
    }
  }
  @media ${devices.laptopM} {
    .right-column-content {
      .call-row-wrapper {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        .call-saperator {
          display: none;
        }
      }
    }
  }
  @media ${devices.laptopS} {
    width: 100%;
  }
  @media ${devices.tabletL} {
    width: 100%;
    .right-column-content {
      .call-row-wrapper {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        .call-saperator {
          display: none;
        }
      }
    }
  }
  @media ${devices.tabletS} {
    width: 100%;
    .right-column-content {
      .call-row-wrapper {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        .call-saperator {
          display: none;
        }
      }
    }
  }
  @media ${devices.mobileL} {
    width: 100%;
    .right-column-content {
      .call-row-wrapper {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        .call-saperator {
          display: none;
        }
      }
    }
  }
  @media ${devices.mobileM} {
    width: 100%;
    .right-column-content {
      .call-row-wrapper {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        .call-saperator {
          display: none;
        }
      }
    }
  }
  @media ${devices.mobileS} {
    width: 100%;
    .right-column-content {
      .call-row-wrapper {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        .call-saperator {
          display: none;
        }
      }
    }
  }
`;

const FooterBottomContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  .bottom-left-wrapper {
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
  }
  .bottom-right-wrapper {
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
  }
  @media ${devices.laptopS} {
    flex-direction: column;
    gap: 30px;
    .bottom-left-wrapper {
      width: 100%;
    }
    .bottom-right-wrapper {
      width: 100%;
    }
  }
  @media ${devices.tabletL} {
    flex-direction: column;
    gap: 30px;
    .bottom-left-wrapper {
      width: 100%;
    }
    .bottom-right-wrapper {
      width: 100%;
    }
  }
  @media ${devices.tabletS} {
    flex-direction: column;
    gap: 30px;
    .bottom-left-wrapper {
      width: 100%;
    }
    .bottom-right-wrapper {
      width: 100%;
    }
  }
  @media ${devices.mobileL} {
    flex-direction: column;
    gap: 30px;
    .bottom-left-wrapper {
      width: 100%;
    }
    .bottom-right-wrapper {
      width: 100%;
    }
  }
  @media ${devices.mobileM} {
    flex-direction: column;
    gap: 30px;
    .bottom-left-wrapper {
      width: 100%;
    }
    .bottom-right-wrapper {
      width: 100%;
    }
  }
  @media ${devices.mobileS} {
    flex-direction: column;
    gap: 30px;
    .bottom-left-wrapper {
      width: 100%;
    }
    .bottom-right-wrapper {
      width: 100%;
    }
  }
`;

const CookiesNotification = styled.div`
  width: 350px;
  height: 350px;
  border-raidus: 40px;
  background-color: ${color.glassmorphismBg};
  -webkit-backdrop-filter: blur(9px);
  backdrop-filter: blur(9px);
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 9999;
  border-radius: 40px;
  padding: 10px 15px 20px 10px;
  box-shadow: 0 0 4px 0 ${color.textBase};
  .close-cookies {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    .close-btn-wrapper {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 10px;
      cursor: pointer;
      transition: 300ms;
      &:hover {
        transform: scale(1.2);
      }
    }
  }
  .notification-cookies {
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 30px;
  }
  .accept-cookies {
    width: 200px;
    height: 50px;
    border-radius: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${color.textSecondary};
    color: ${color.textPrimary};
    cursor: pointer;

    &:active {
      background-color: ${color.backgroundPrimary};
      color: ${color.textSecondary};
      border: 1px solid;
    }
    span {
      font-family: ricordi;
    }
  }

  @media ${devices.laptopS} {
    width: 50%;
    height: 250px;
    bottom: 0;
    right: 0;
  }
  @media ${devices.tabletL} {
    width: 100%;
    height: 250px;
    bottom: 0;
    right: 0;
  }
  @media ${devices.tabletS} {
    width: 100%;
    height: 250px;
    bottom: 0;
    right: 0;
  }
  @media ${devices.mobileL} {
    width: 100%;
    height: 300px;
    bottom: 0;
    right: 0;
  }
  @media ${devices.mobileM} {
    width: 100%;
    bottom: 0;
    right: 0;
  }
  @media ${devices.mobileS} {
    width: 100%;
    bottom: 0;
    right: 0;
  }
`;

export default Footer;
