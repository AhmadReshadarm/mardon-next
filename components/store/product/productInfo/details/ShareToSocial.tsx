import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import color from 'components/store/lib/ui.colors';
import {
  VKShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from 'next-share';
import { outsideClickListner } from 'components/store/storeLayout/helpers';
import { useCopyToClipboard, handleMobileShare } from './helpers';
import { PopupDisplay } from 'components/store/storeLayout/constants';
import { useInViewportNoDelay } from 'components/store/storeLayout/useInViewport';
import styles from '../../styles/shareToSocial.module.css';
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
    <div className={styles.SocialParent}>
      <div className={styles.product_artical_wrapper}>
        <span>{`Артикул товара: ${artical?.toLocaleUpperCase()}`}</span>
      </div>
      <button
        className={styles.share_btn_pc}
        ref={btnNode}
        onClick={() => closeHandler()}
        title="Поделиться в социальных сетях"
        type="button"
      >
        <ShareSVG />
        <span>Поделиться</span>
      </button>
      <button
        className={styles.share_btn_mobile}
        onClick={() => handleMobileShare(shareData)}
        onTouchStart={() => handleMobileShare(shareData)}
        title="Поделиться в социальных сетях"
        type="button"
      >
        <ShareSVG />
        <span>Поделиться</span>
      </button>
      <div
        ref={menuNode}
        style={{ display: display }}
        className={styles.ShareToSocialWrapper}
      >
        <ul ref={ref}>
          {isInViewport ? (
            <>
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
                <button className={styles.copy_url_btn}>
                  <span style={{ display: !isCopied ? 'flex' : 'none' }}>
                    Скопировать ссылку
                  </span>
                  <span
                    style={{
                      color: color.textBase,
                      display: isCopied ? 'flex' : 'none',
                    }}
                  >
                    Ссылка скопирована
                  </span>
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
                  <span className={styles.social_name}>ВКонтакте</span>
                </VKShareButton>
              </li>
              <li>
                <Link href="/" prefetch={false}>
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
                    <span className={styles.social_name}>Whatsapp</span>
                  </WhatsappShareButton>
                </Link>
              </li>
              <li>
                <Link href="/" prefetch={false}>
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
                    <span className={styles.social_name}>Telegram</span>
                  </TelegramShareButton>
                </Link>
              </li>
              <li>
                <Link href="/" prefetch={false}>
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
                    <span className={styles.social_name}>Twitter</span>
                  </TwitterShareButton>
                </Link>
              </li>
            </>
          ) : (
            ''
          )}
        </ul>
      </div>
    </div>
  );
};

export default ShareToSocial;
