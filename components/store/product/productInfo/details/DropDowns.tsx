import InfoDropdown from './DropDownsParrent';
import { ParameterProduct } from 'swagger/services';
import { useAppSelector } from 'redux/hooks';
import { TProductInfoState } from 'redux/types';
import Link from 'next/link';
import InfoDropdownReturn from './DropDownsParrentReturn';
import styles from '../../styles/dropDowns.module.css';
import Image from 'next/image';
type Props = {
  parameterProducts?: ParameterProduct[];
};

const DropDowns: React.FC<Props> = ({ parameterProducts }) => {
  const { product, loading }: TProductInfoState = useAppSelector(
    (state) => state.productInfo,
  );

  return (
    <div className={styles.InfoContainer}>
      <InfoDropdown title="Описание">
        <p>
          {!loading
            ? product?.desc?.includes('|')
              ? product?.desc
                  ?.split('|')[1]
                  .split(`\n`)
                  .map((text) => (
                    <>
                      {text}
                      <br />
                    </>
                  ))
              : product?.desc?.split(`\n`).map((text) => (
                  <>
                    {text}
                    <br />
                  </>
                ))
            : ''}
        </p>
        <span className={styles.title} style={{ color: '#B30000' }}>
          Товар в коробке по цветам не продаются, там микс цвета в коробке идут
        </span>
      </InfoDropdown>
      <InfoDropdown title="Характеристики">
        <div className={styles.SpecsContainer}>
          <ul className={styles.SpecsKeyValueWrapper}>
            {parameterProducts?.map((item, index) => {
              if (item.value == '_' || item.value == '-' || item.value == '') {
                return <></>;
              }
              return (
                <li
                  className={styles.wrapper_key_vlaue}
                  key={`parameter-product-label-${index}`}
                >
                  <span
                    title={item.parameter?.name}
                    className={styles.key_wrapper}
                  >
                    {item.parameter?.name}:{' '}
                  </span>
                  <span title={item.value}>{item.value}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </InfoDropdown>
      <InfoDropdown title="Подробнее о доставке">
        <h3 className={styles.dilevery_title}>
          КАКОВА СТОИМОСТЬ И ВАРИАНТЫ ДОСТАВКИ?
        </h3>

        <span className={styles.Content}>
          Бесплатная доставка по Москве и в любую транспортную компанию при
          заказе от 70 000 рублей.
        </span>
        <span className={styles.Content}>
          При меньшей сумме заказа возможен самовывоз или платная доставка.
        </span>
        <span className={styles.Content}>
          Стоимость платной доставки определяется после оформления заказа. Наш
          менеджер свяжется с вами, чтобы уточнить адрес доставки и цену.
        </span>
        <h3 className="dilevery_title">ГДЕ НАХОДЯТСЯ НАШИ СКЛАДЫ?</h3>
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
      </InfoDropdown>
      <InfoDropdownReturn
        title="Политика возврата товаров НБХОЗ (info@nbhoz.ru, +7-925-486-54-44)"
        borderBottom="none"
      >
        <span className={styles.Content}>
          НБХОЗ осуществляет продажу товаров{' '}
          <strong>исключительно оптом</strong> юридическим лицам и
          индивидуальным предпринимателям. Приобретая товар, Покупатель
          подтверждает, что покупка совершается{' '}
          <strong>для коммерческой деятельности</strong>.
        </span>

        <h3>Общие условия</h3>
        <ul className={styles.ListsDots}>
          <li>
            После передачи товара ответственность за его сохранность, хранение,
            транспортировку и реализацию полностью переходит к Покупателю.
          </li>
          <li>
            Закон РФ «О защите прав потребителей» не применяется к данным
            правоотношениям.
          </li>
        </ul>

        <h3>Возврат товара надлежащего качества</h3>
        <span className={styles.Content}>
          Товар надлежащего качества <strong>возврату не подлежит</strong>,
          включая следующие случаи:
        </span>
        <ul className={styles.ListsDots}>
          <li>товар не был реализован;</li>
          <li>товар не подошёл для перепродажи;</li>
          <li>изменился спрос или рыночная ситуация;</li>
          <li>
            Покупатель ошибся с ассортиментом, количеством или характеристиками
            товара.
          </li>
        </ul>

        <span className={styles.Content}>
          Возврат возможен{' '}
          <strong>только по предварительному письменному согласованию</strong> с
          НБХОЗ и при одновременном соблюдении всех условий:
        </span>
        <ul className={styles.ListsDots}>
          <li>товар не использовался;</li>
          <li>упаковка и короба не вскрывались;</li>
          <li>сохранены заводская упаковка, маркировка и комплектация.</li>
        </ul>

        <span className={styles.Content}>
          Все расходы, связанные с возвратом товара надлежащего качества, несёт
          Покупатель.
        </span>

        <h3>Возврат товара ненадлежащего качества</h3>
        <span className={styles.Content}>
          Претензии по качеству принимаются{' '}
          <strong>в течение 3 рабочих дней</strong> с момента получения товара и
          только при наличии:
        </span>
        <ul className={styles.ListsDots}>
          <li>фото- и видеоподтверждения дефекта;</li>
          <li>оригинальной заводской упаковки и коробов;</li>
          <li>возможности идентификации товара как отгруженного НБХОЗ.</li>
        </ul>

        <span className={styles.Content}>
          НБХОЗ вправе отказать в возврате, если дефект возник вследствие
          хранения, транспортировки, вскрытия упаковки, эксплуатации или подмены
          товара.
        </span>

        <h3>
          ⚠️ Вскрытые короба, реализованный товар и товары, переданные конечным
          покупателям, возврату не подлежат
        </h3>

        <h3>Подмена товара и злоупотребления</h3>
        <span className={styles.Content}>
          В случае выявления подмены товара, возврата продукции третьих лиц или
          вложения дефектных товаров в оригинальные короба НБХОЗ:
        </span>
        <ul className={styles.ListsDots}>
          <li>возврат не принимается;</li>
          <li>компенсация не производится;</li>
          <li>
            НБХОЗ оставляет за собой право отказать в дальнейшем сотрудничестве.
          </li>
        </ul>

        <h3>Порядок обращения</h3>
        <span className={styles.Content}>
          Все возвраты принимаются{' '}
          <strong>только по предварительному согласованию</strong>. Для
          обращения свяжитесь с нами:
        </span>
        <span className={styles.Content}>
          по электронной почте info@nbhoz.ru или по телефону{' '}
          <p style={{ whiteSpace: 'nowrap' }}>+7-925-486-54-44</p>
        </span>

        <span className={styles.Content}>
          Возвраты, отправленные без предварительного согласования, не
          принимаются.
        </span>
      </InfoDropdownReturn>
    </div>
  );
};

export default DropDowns;
