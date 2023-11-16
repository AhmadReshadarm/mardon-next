import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import variants from '../lib/variants';
import color from '../lib/ui.colors';
import { Container, Wrapper, Content } from './common';
import { devices } from '../lib/Devices';
import VKSVG from '../../../assets/vkcolored.svg';
import TelegraSVG from '../../../assets/telegramcolored.svg';
import WhatsappSVG from '../../../assets/whatsappcolored.svg';
import CloseSVg from '../../../assets/close_black.svg';
import { handleCookiesClick, acceptedCookies } from './helpers';
import { content } from './utils/ExtraNav/helpers';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'redux/hooks';
import { TGlobalState } from 'redux/types';
const Footer = (): JSX.Element => {
  const { categories } = useAppSelector<TGlobalState>((state) => state.global);
  const copyRighYear = new Date().getFullYear();
  const [isOpen, setOpen] = useState(true);

  useEffect(() => {
    acceptedCookies(setOpen);
  }, []);

  return (
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
        bg_color={color.bgFooter}
      >
        <Wrapper
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FooterContentWrapper>
            <FooterTopContentWrapper>
              <FooterLeftContentWrapper>
                <div className="footer-columns-wrapper">
                  <span className="columns-header">Каталог </span>
                  {categories.map((category, index) => {
                    return (
                      <Link
                        key={`${category.url}-${index}`}
                        href={`/catalog?categories=${category.url}`}
                      >
                        <span>{category.name}</span>
                      </Link>
                    );
                  })}
                </div>
                <div className="footer-columns-wrapper">
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
                </div>
                <div className="footer-columns-wrapper">
                  <span className="columns-header">О нас</span>
                  {content.aboutUs.map((service, index) => {
                    return (
                      <Link
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
                  <img src="/icons/call_phone_dark.png" alt="call fingarden" />
                  <Link href="tel:+78124253130">
                    <span>+7 812 425 31 30</span>
                  </Link>
                </div>
                <div className="right-column-content">
                  <img
                    src="/icons/work_hours_dark.png"
                    alt="fingarden work hours"
                  />
                  <span>Пн-Все 10.00-22.00</span>
                </div>
                <div className="right-column-content">
                  <img
                    src="/icons/location_dark.png"
                    alt="fingarden location"
                  />
                  <span>
                    Санкт-Петербург, ТЦ Villa ул. Савушкина д.119, корп.3, 2
                    этаж, В-59
                  </span>
                </div>
              </FooterRightContentWrapper>
            </FooterTopContentWrapper>
            <FooterBottomContentWrapper>
              <div className="bottom-left-wrapper">
                <Link href="/user-agreement">
                  <span>Пользовательское соглашение</span>
                </Link>
                <Link href="/privacy">
                  <span>Политика безопасности</span>
                </Link>
              </div>
              <div className="bottom-right-wrapper">
                <span>
                  Fingarden. All rights reserved. Все права защищены ©{' '}
                  {copyRighYear}
                </span>
              </div>
            </FooterBottomContentWrapper>
          </FooterContentWrapper>
        </Wrapper>
      </Container>
      <CookiesNotification style={{ display: isOpen ? 'flex' : 'none' }}>
        <div className="close-cookies">
          <span
            onClick={() => {
              setOpen(false);
              localStorage.setItem('agree-cookies', '0');
            }}
            className="close-btn-wrapper"
          >
            <CloseSVg />
          </span>
        </div>
        <div className="notification-cookies">
          <span>
            При нажимая «Принять все файлы cookie», вы соглашаетесь, что
            Fingarden может сохранять файлы cookie на вашем устройстве и
            раскрывать информацию в соответствии с нашей{' '}
            <Link style={{ color: color.hoverBtnBg }} href="/privacy#cookies">
              <span>Политикой использования файлов cookie.</span>
            </Link>
          </span>
          <button
            className="accept-cookies"
            onClick={() => handleCookiesClick(setOpen)}
          >
            Принять все файлы cookie
          </button>
        </div>
      </CookiesNotification>
    </>
  );
};

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
  width: 70%;
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
    gap: 5px;
    .columns-header {
      font-weight: 700;
      padding: 0 0 25px 0;
    }
  }
  @media ${devices.laptopS} {
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
    grid-template-columns: 1fr 1fr;
  }
  @media ${devices.mobileS} {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

const FooterRightContentWrapper = styled.div`
  width: 30%;
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
  }
  @media ${devices.laptopS} {
    width: 100%;
  }
  @media ${devices.mobileL} {
    width: 100%;
  }
  @media ${devices.mobileM} {
    width: 100%;
  }
  @media ${devices.mobileS} {
    width: 100%;
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
  width: 100%;
  background-color: ${color.textPrimary};
  position: sticky;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  z-index: 99999;
  padding: 0 0 20px 0;
  .close-cookies {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 10px 10px 0 0;
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
    .accept-cookies {
      width: 270px;
      height: 40px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      border-radius: 3px;
      background-color: ${color.btnSecondery};
      cursor: pointer;
      transition: 300ms;
      &:hover {
        background-color: ${color.btnPrimary};
        color: ${color.textPrimary};
        transform: scale(1.02);
      }
      &:active {
        transform: scale(1);
      }
      span {
        font-family: 'Jost';
        font-size: 1rem;
      }
    }
  }
  @media ${devices.laptopS} {
    .notification-cookies {
      flex-direction: column;
    }
  }
  @media ${devices.mobileL} {
    .notification-cookies {
      flex-direction: column;
    }
  }
  @media ${devices.mobileM} {
    .notification-cookies {
      flex-direction: column;
    }
  }
  @media ${devices.mobileS} {
    .notification-cookies {
      flex-direction: column;
    }
  }
`;

export default Footer;
