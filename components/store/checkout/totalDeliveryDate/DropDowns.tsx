import InfoDropdown from './DropDownsParrent';
import Link from 'next/link';
import Image from 'next/image';
import styles from 'components/store/product/styles/dropDowns.module.css';
const DropDowns = () => {
  return (
    <div className={styles.InfoContainer}>
      <InfoDropdown title="О доставке и оплате">
        <h3 className={styles.dilevery_title}>
          КАКОВА СТОИМОСТЬ И ВАРИАНТЫ ДОСТАВКИ?
        </h3>

        <span className={styles.Content}>
          Бесплатная доставка по Москве при заказе от 70 000 рублей.
        </span>
        <span className={styles.Content}>
          При меньшей сумме заказа возможен самовывоз или платная доставка.
        </span>
        <span className={styles.Content}>
          Стоимость платной доставки определяется после оформления заказа. Наш
          менеджер свяжется с вами, чтобы уточнить адрес доставки и цену.
        </span>
        <h3 className={styles.dilevery_title}>
          СКОЛЬКО СТОИТ ДОСТАВКА ДО ТРАНСПОРТНЫМ КОМПАНИЯМ?
        </h3>
        <span className={styles.Content}>
          Бесплатная доставка до любую транспортную компанию в Москве.
        </span>
        <h3 className={styles.dilevery_title}>
          С КАКИМИ ТРАНСПОРТНЫМИ КОМПАНИЯМИ ВЫ СОТРУДНИЧАЕТЕ?
        </h3>
        <span className={styles.Content}>
          Мы сотрудничаем с любыми транспортными компаниями, если у них есть
          представительство или филиал в Москве.
        </span>
        <span className={styles.Content}>
          Некоторые известные транспортные компании, с которыми мы периодически
          сотрудничаем (СДЭК, ПЭК, Деловые Линии, Мейджик транс).
        </span>
        <h3 className={styles.dilevery_title}>ГДЕ НАХОДЯТСЯ НАШИ СКЛАДЫ?</h3>
        <span className={styles.Content}>
          Наши склады находятся в разных районах Москвы. После оформления заказа
          мы свяжемся с вами, чтобы уточнить адрес доставки или самовывоза с
          ближайшего к вам склада.
        </span>
        <span className={styles.Content}>
          По дополнительным вопросам обращаться по номеру телефона:{' '}
          <Link
            title="По дополнительным вопросам обращаться по номеру телефона 8-925-486-54-44"
            href="tel:89254865444"
            prefetch={false}
          >
            <span
              style={{
                whiteSpace: 'nowrap',
              }}
            >
              8-925-486-54-44
            </span>
          </Link>
          .
        </span>
        <span style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
          Или по номеру:
          <Link
            href="https://wa.me/+79252909771"
            target="__blank"
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '5px',
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
        </span>
        <span className={styles.Content}>
          Дополнительная скидка рассчитывается индивидуально и зависит от
          количества заказанного товара.
        </span>
        <h3>Как можно оплатить?</h3>
        <span className={styles.Content}>
          Мы принимаем оплату через расчетный счет или наличными при доставке
          или самовывоз.
        </span>
      </InfoDropdown>
    </div>
  );
};

export default DropDowns;
