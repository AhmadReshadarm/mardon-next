import Link from 'next/link';
import { useCopyToClipboard } from './helpers';
import { useEffect } from 'react';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import styles from './addressContactUs.module.css';
import {
  LocationPointerSVG,
  MailSVG,
  PhoneSVG,
  WatchSVG,
} from '../storeLayout/utils/headerIcons/SVGIconsFooter';
import Image from 'next/image';

const MapContainer = () => {
  const [copiedText, setCopiedText, copy] = useCopyToClipboard();
  useEffect(() => {
    if (copiedText) openSuccessNotification('Скопировано в буфер обмена');
  }, [copiedText]);
  return (
    <>
      <div className={styles.MapContainer}>
        <iframe
          src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=81234735012"
          width="100%"
          height="800"
          frameBorder="0"
        ></iframe>
      </div>
      <div className={styles.MapAndAddressWrapper}>
        <div className={styles.address_container}>
          <div className={styles.ContactsHeaderWrapper}>
            <h2>
              NBHOZ - Оптовая торговля хозяйственными товарами для дома и
              бизнеса
            </h2>
          </div>
          <div className={styles.ContactContentWrapper}>
            <div className={styles.first_column}>
              <div className={styles.first_column_content_wrapper}>
                <LocationPointerSVG />
                <span
                  className={styles.address_copied}
                  onClick={() => {
                    copy();
                    setTimeout(() => {
                      setCopiedText(false);
                    }, 1000);
                  }}
                  onTouchStart={() => {
                    copy();
                    setTimeout(() => {
                      setCopiedText(false);
                    }, 1000);
                  }}
                  title="Нажмите, чтобы скопировать адрес"
                >
                  г. Москва, Каширское шоссе
                </span>
              </div>
              <div className={styles.first_column_content_wrapper}>
                <WatchSVG />
                <span>Пн-Все 10.00-21.00</span>
              </div>
              <div className={styles.first_column_content_wrapper}>
                <MailSVG />
                <span>
                  <Link
                    target="_blank"
                    href="mailto:info@nbhoz.ru"
                    title="отправьте письмо по адресу info@nbhoz.ru"
                  >
                    info@nbhoz.ru
                  </Link>
                </span>
              </div>
              <div className={styles.first_column_content_wrapper}>
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
                  prefetch={false}
                >
                  <Image
                    src="/icons/vk.png"
                    alt="nbhoz vk"
                    width={25}
                    height={25}
                    sizes="100vw"
                    loading="lazy"
                  />
                  <span>/nbhoz</span>
                </Link>
              </div>
              <div className={styles.first_column_content_wrapper}>
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
                  prefetch={false}
                >
                  <Image
                    src="/icons/telegram.png"
                    alt="nbhoz telegram"
                    width={25}
                    height={25}
                    sizes="100vw"
                    loading="lazy"
                  />
                  <span>/nbhoz</span>
                </Link>
              </div>
            </div>
            <div className={styles.second_column}>
              <div className={styles.second_column_content_wrapper}>
                <PhoneSVG />
                <div className={styles.phone_number_wrapper}>
                  <Link href="tel:+79254865444">
                    <span title="позвонить 8-925-486-54-44">
                      8-925-486-54-44
                    </span>
                  </Link>
                  <Link href="tel:89268999954">
                    <span title="позвонить 8-926-899-99-54">
                      8-926-899-99-54
                    </span>
                  </Link>
                  <Link href="tel:89266999952">
                    <span title="позвонить 8-926-699-99-52">
                      8-926-699-99-52
                    </span>
                  </Link>
                </div>
              </div>
              <div className={styles.first_column_content_wrapper}>
                <Link
                  href="https://wa.me/+79252909771"
                  target="__blank"
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: '20px',
                  }}
                  title="Позвонить через WhatsApp"
                  prefetch={false}
                >
                  <Image
                    src="/icons/whatsapp.png"
                    alt="nbhoz whatsapp"
                    width={20}
                    height={20}
                    sizes="100vw"
                    loading="lazy"
                  />
                  <span>8-925-290-97-71</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MapContainer;
