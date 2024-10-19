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
import { PopupDisplay } from 'components/store/storeLayout/constants';
import { devices } from 'components/store/lib/Devices';
import { useInViewportNoDelay } from 'components/store/storeLayout/useInViewport';
import dynamic from 'next/dynamic';
const CopySVG = dynamic(() =>
  import('assets/icons/UI-icons').then((mod) => mod.CopySVG),
);
const ShareSVG = dynamic(() =>
  import('assets/icons/UI-icons').then((mod) => mod.ShareSVG),
);
const TelegramSVG = dynamic(() =>
  import('assets/icons/UI-icons').then((mod) => mod.TelegramSVG),
);
const TwitterSVG = dynamic(() =>
  import('assets/icons/UI-icons').then((mod) => mod.TwitterSVG),
);
const VKSVG = dynamic(() =>
  import('assets/icons/UI-icons').then((mod) => mod.VKSVG),
);
const WhatsappSVG = dynamic(() =>
  import('assets/icons/UI-icons').then((mod) => mod.WhatsappSVG),
);

type Props = {
  productId?: string;
  image?: string;
  title?: string;
  artical?: string;
};

const ShareToSocial: React.FC<Props> = ({ image, title, artical }) => {
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
    url: `${baseUrl}${router.asPath}`,
  };

  const { isInViewport, ref } = useInViewportNoDelay();

  return (
    <SocialParent>
      <div className="product-artical-wrapper">
        <span className="product-code">{`Артикул товара: ${artical?.toLocaleUpperCase()}`}</span>
      </div>
      <motion.button
        className="share-btn-pc"
        ref={btnNode}
        custom={1.05}
        whileHover="hover"
        whileTap="tap"
        variants={variants.grow}
        onClick={() => closeHandler()}
      >
        <ShareSVG />
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
        <ShareSVG />
        <span>Поделиться</span>
      </motion.button>
      <ShareToSocialWrapper
        ref={menuNode}
        style={{ display: display }}
        animate={isOpen ? 'open' : 'close'}
        variants={variants.fadeInReveal}
      >
        <ul ref={ref}>
          {isInViewport ? (
            <>
              {' '}
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
                  <CopySVG />
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
                    style={{ color: color.textBase }}
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
                    <VKSVG />
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
                    separator=":"
                  >
                    <span>
                      <WhatsappSVG />
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
                      <TelegramSVG />
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
                      <TwitterSVG />
                    </span>
                    <span className="social-name">Twitter</span>
                  </TwitterShareButton>
                </Link>
              </li>
            </>
          ) : (
            ''
          )}
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
  .product-artical-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 20px;
    .product-code {
      color: ${color.textSecondary};
    }
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
  @media ${devices.tabletL} {
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
  @media ${devices.tabletS} {
    margin-bottom: -40px;
    justify-content: space-between;
    align-items: flex-start;
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
    .product-artical-wrapper {
      flex-direction: column;
      gap: 10px;
      align-items: flex-start;
    }
  }
  @media ${devices.mobileL} {
    margin-bottom: -40px;
    justify-content: space-between;
    flex-direction: column;
    align-items: flex-start;
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
    .product-artical-wrapper {
      flex-direction: column;
      gap: 10px;
      align-items: flex-start;
    }
  }
  @media ${devices.mobileM} {
    margin-bottom: -40px;
    justify-content: space-between;
    flex-direction: column;
    align-items: flex-start;
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
    .product-artical-wrapper {
      flex-direction: column;
      gap: 10px;
      align-items: flex-start;
    }
  }
  @media ${devices.mobileS} {
    margin-bottom: -40px;
    justify-content: space-between;
    flex-direction: column;
    align-items: flex-start;
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
    .product-artical-wrapper {
      flex-direction: column;
      gap: 10px;
      align-items: flex-start;
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
          color: ${color.textBase};
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
            color: ${color.textBase};
          }
        }
      }
    }
  }
`;

export default ShareToSocial;
