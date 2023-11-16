import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import {
  VKShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from 'next-share';
import { outsideClickListner } from 'components/store/storeLayout/helpers';
import { useCopyToClipboard, handleMobileShare } from './helpers';
import Share from '../../../../../assets/share.svg';
import Copy from '../../../../../assets/copy.svg';
import Telegram from '../../../../../assets/telegram.svg';
import Vk from '../../../../../assets/vk.svg';
import Whatsapp from '../../../../../assets/whatsapp.svg';
import Twitter from '../../../../../assets/twitter.svg';
import { PopupDisplay } from 'components/store/storeLayout/constants';
import { devices } from 'components/store/lib/Devices';

type Props = {
  productId?: string;
  image?: string;
  title?: string;
  description?: string;
};

const ShareToSocial: React.FC<Props> = ({
  productId,
  image,
  title,
  description,
}) => {
  const router = useRouter();
  const [isCopied, setCopied, copy] = useCopyToClipboard();
  // _______________socila menu hooks _______________
  const [isOpen, setOpen] = useState(false);
  const [display, setDisplay] = useState(PopupDisplay.None);
  const [menuRef, setMenuRef] = useState(null);
  const [btnRef, setBtnRef] = useState(null);
  const [listening, setListening] = useState(false);
  const [baseUrl, setBaseUrl] = useState('');
  const menuNode = useCallback((node: any) => {
    setMenuRef(node);
  }, []);
  const btnNode = useCallback((node: any) => {
    setBtnRef(node);
  }, []);

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  useEffect(
    outsideClickListner(
      listening,
      setListening,
      menuRef,
      btnRef,
      setOpen,
      setDisplay,
    ),
  );
  const closeHandler = () => {
    setOpen(!isOpen);
    setTimeout(() => {
      setDisplay(
        display === PopupDisplay.None ? PopupDisplay.Flex : PopupDisplay.None,
      );
    }, 100);
  };

  const shareData = {
    title: title,
    // text: description,
    url: `${baseUrl}${router.asPath}`,
  };

  return (
    <SocialParent
      key="social-product-page"
      custom={0.2}
      initial="init"
      animate="animate"
      exit={{ y: -30, opacity: 0, transition: { delay: 0.2 } }}
      variants={variants.fadInSlideUp}
    >
      <span id="product-code">{`Код товара: ${productId}`}</span>
      <motion.button
        className="share-btn-pc"
        ref={btnNode}
        custom={1.05}
        whileHover="hover"
        whileTap="tap"
        variants={variants.grow}
        onClick={() => closeHandler()}
      >
        <Share />
        <span>Поделиться</span>
      </motion.button>
      <motion.button
        className="share-btn-mobile"
        custom={1.05}
        whileHover="hover"
        whileTap="tap"
        variants={variants.grow}
        onClick={() => handleMobileShare(shareData)}
        onTouchStart={() => handleMobileShare(shareData)}
      >
        <Share />
        <span>Поделиться</span>
      </motion.button>
      <ShareToSocialWrapper
        ref={menuNode}
        style={{ display: display }}
        animate={isOpen ? 'open' : 'close'}
        variants={variants.fadeInReveal}
      >
        <ul>
          <li
            onTouchStart={() => {
              copy(`${baseUrl}${router.asPath}`);
              setTimeout(() => {
                setCopied(false);
              }, 800);
            }}
            onClick={() => {
              copy(`${baseUrl}${router.asPath}`);
              setTimeout(() => {
                setCopied(false);
              }, 800);
            }}
          >
            <span style={{ width: '20px' }}>
              <Copy />
            </span>
            <button className="copy-url-btn">
              <motion.span
                animate={!isCopied ? 'animate' : 'exit'}
                variants={variants.fadeOutSlideOut}
              >
                Скопировать ссылку
              </motion.span>
              <motion.span
                animate={isCopied ? 'animate' : 'exit'}
                variants={variants.fadeInSlideIn}
                style={{ color: color.ok }}
              >
                Ссылка скопирована
              </motion.span>
            </button>
          </li>
          <li>
            <VKShareButton
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '15px',
              }}
              url={`${baseUrl}${router.asPath}`}
              image={image}
            >
              <span>
                <Vk />
              </span>
              <span className="social-name">ВКонтакте</span>
            </VKShareButton>
          </li>
          <li>
            <Link href="/">
              <WhatsappShareButton
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  gap: '15px',
                }}
                url={`${baseUrl}${router.asPath}`}
                title={title}
                separator=":: "
              >
                <span>
                  <Whatsapp />
                </span>
                <span className="social-name">Whatsapp</span>
              </WhatsappShareButton>
            </Link>
          </li>
          <li>
            <Link href="/">
              <TelegramShareButton
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  gap: '15px',
                }}
                url={`${baseUrl}${router.asPath}`}
                title={title}
              >
                <span>
                  <Telegram />
                </span>
                <span className="social-name">Telegram</span>
              </TelegramShareButton>
            </Link>
          </li>
          <li>
            <Link href="/">
              <TwitterShareButton
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  gap: '15px',
                }}
                url={`${baseUrl}${router.asPath}`}
                title={title}
              >
                <span>
                  <Twitter />
                </span>
                <span className="social-name">Twitter</span>
              </TwitterShareButton>
            </Link>
          </li>
        </ul>
      </ShareToSocialWrapper>
    </SocialParent>
  );
};

const SocialParent = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  position: relative;
  #product-code {
    color: ${color.textSecondary};
  }
  .share-btn-pc {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5px;
    color: ${color.yellow};
    cursor: pointer;
  }

  .share-btn-mobile {
    display: none;
  }

  @media ${devices.laptopS} {
    justify-content: flex-start;
  }

  @media ${devices.mobileL} {
    margin-bottom: -40px;
    justify-content: space-between;
    .share-btn-pc {
      display: none;
    }
    .share-btn-mobile {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 5px;
      color: ${color.yellow};
      cursor: pointer;
    }
  }
  @media ${devices.mobileM} {
    margin-bottom: -40px;
    justify-content: space-between;
    .share-btn-pc {
      display: none;
    }
    .share-btn-mobile {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 5px;
      color: ${color.yellow};
      cursor: pointer;
    }
  }
  @media ${devices.mobileS} {
    margin-bottom: -40px;
    justify-content: space-between;
    .share-btn-pc {
      display: none;
    }
    .share-btn-mobile {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 5px;
      color: ${color.yellow};
      cursor: pointer;
    }
  }
`;

const ShareToSocialWrapper = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  top: 35px;
  right: 0;
  padding: 20px;
  border-radius: 15px;
  background-color: ${color.textPrimary};
  box-shadow: 0px 2px 6px ${color.boxShadowBtn};
  z-index: 9;
  ul {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    li {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 15px;
      padding: 5px 0;
      cursor: pointer;
      .social-name {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 15px;
        color: ${color.textTertiary};
        &:hover {
          color: ${color.hover};
        }
      }
      .copy-url-btn {
        width: 140px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        color: ${color.textTertiary};
        span {
          position: absolute;
          cursor: pointer;
          &:hover {
            color: ${color.hover};
          }
        }
      }
    }
  }
`;

export default ShareToSocial;
