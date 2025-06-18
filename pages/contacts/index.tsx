import StoreLayout from 'components/store/storeLayout/layouts';
import SEOstatic from 'components/store/SEO/SEOstatic';
import Link from 'next/link';
import Subscribers from 'ui-kit/Subscribers';
import { baseUrl } from 'common/constant';
import MapContainer from 'components/store/addressContactUs';
import styles from 'components/store/addressContactUs/addressContactUs.module.css';
const Contacts = () => {
  return (
    <>
      <SEOstatic
        page={{
          realName:
            'NBHOZ - интернет магазин хозтовары оптом. Email: info@nbhoz.ru | Тел.: 8-925-486-54-44',
          name: 'NBHOZ - интернет магазин хозтовары оптом. Email: info@nbhoz.ru | Тел.: 8-925-486-54-44',
          url: '/',
          desc: `NBHOZ, Дешевые хозтовары оптом в интернет магазине nbhoz в Москве и все Россия. Адресс: г. Москва, Каширское шоссе | Рабочее время: Пн-Все 10.00-21.00 | Отправить письмо: info@nbhoz.ru | тел.: 8-925-486-54-44`,
          keywords:
            'nbhoz, nbhoz.ru, Товары для сервировки стола ,купить Кухонная утварь, Товары для ванной комнаты, Дешевые хозтовары',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }}
        image={`${baseUrl}/static/logo_800x800.png`}
      />

      <div className={styles.Container}>
        <div className={styles.BackToMain}>
          <Link className={styles.back_to_main} href="/">
            <img src="/icons/back_arrow.png" alt="кнопка «назад»" />
            <span>Обратно на главную</span>
          </Link>
        </div>

        <div className={styles.Wrapper}>
          <div className={styles.Content}>
            <MapContainer />
          </div>
        </div>
      </div>
      <Subscribers />
    </>
  );
};

Contacts.PageLayout = StoreLayout;

export default Contacts;
