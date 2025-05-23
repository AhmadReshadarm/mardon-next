import Link from 'next/link';
import { useAppSelector } from 'redux/hooks';
import { TCartState } from 'redux/types';
import { Color, Product } from 'swagger/services';
import { AddToCart, AddToWishlist } from 'ui-kit/ProductActionBtns';
import { findCartQTY } from 'ui-kit/HeaderProductItems/helpers';
import styles from 'ui-kit/HeaderProductItems/headerProductItems.module.css';
import { useEffect, useState } from 'react';

type Props = {
  product: Product;
  handleMenuState?: () => void;
};

const HeaderProductItmesHistory: React.FC<Props> = ({
  product,
  handleMenuState,
}) => {
  const { cart } = useAppSelector<TCartState>((state) => state.cart);
  const [variant, setVariant] = useState(product.productVariants![0]);

  const articals = product.productVariants?.map((variant) => variant.artical);
  // remove the repated product artical from array to only show in UI once
  const filteredArticals = articals!.filter(function (value, index, array) {
    return array.indexOf(value) === index;
  });

  const colors: Color[] = [];
  product!?.productVariants!.map((variant) => {
    if (
      variant.color?.url == '' ||
      variant.color?.url == '-' ||
      variant.color?.url == '_'
    ) {
      return;
    }
    if (variant.color?.url !== '-') {
      colors.push(variant.color!);
    }
  });

  // remove the repated product colors from array to only show in UI once
  const filteredColors = colors.filter(
    (o, index, arr) =>
      arr.findIndex((item) => JSON.stringify(item) === JSON.stringify(o)) ===
      index,
  );

  useEffect(() => {
    setVariant(product.productVariants![0]);
  }, [product]);

  const currentVariant = (artical) =>
    product.productVariants?.find((variant) => variant.artical == artical);

  return (
    <li className={styles.ProductItemWrapper}>
      <>
        <Link
          onClick={() => (handleMenuState ? handleMenuState() : '')}
          href={`/product/${product?.url}`}
          prefetch={false}
        >
          <img
            src={`/api/images/${
              variant.images ? variant.images.split(', ')[0] : ''
            }`}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = '/img_not_found.png';
            }}
            className={styles.product_img}
          />
        </Link>
        <div className={styles.product_details_wrapper}>
          <div className={styles.product_title_description_wrapper}>
            <Link
              onClick={() => (handleMenuState ? handleMenuState() : '')}
              href={`/product/${product?.url}`}
              prefetch={false}
            >
              <h1 title={product!?.name}>
                {product!?.name?.length! > 18
                  ? product!?.name?.slice(0, 18) + ' ...'
                  : product!?.name}
              </h1>
            </Link>
            {/* ------------ rating --------------- */}
            <div
              title={`${
                Math.floor(product!?.reviews?.length!) == 1
                  ? Math.floor(product!?.reviews?.length!) + ' Оценка'
                  : Math.floor(product!?.reviews?.length!) / 2 == 0
                  ? Math.floor(product!?.reviews?.length!) + ' Оценки'
                  : Math.floor(product!?.reviews?.length!) + ' Оценок'
              } `}
              className={styles.rating_wrapper}
              style={{
                display: product!?.reviews?.length! == 0 ? 'none' : 'flex',
              }}
            >
              <span className={styles.review_star}>
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9.64421L9.708 12L8.724 7.56L12 4.57263L7.686 4.18737L6 0L4.314 4.18737L0 4.57263L3.276 7.56L2.292 12L6 9.64421Z"
                    fill="#FAAF00"
                  />
                </svg>
              </span>
              <span className={styles.review_text}>
                {Math.floor(product!?.reviews?.length!) == 1
                  ? Math.floor(product!?.reviews?.length!) + ' Оценка'
                  : Math.floor(product!?.reviews?.length!) / 2 == 0
                  ? Math.floor(product!?.reviews?.length!) + ' Оценки'
                  : Math.floor(product!?.reviews?.length!) + ' Оценок'}
              </span>
            </div>
            {/* ------------- end of rating ---------------- */}
            {/* ----------- color ------------------- */}
            <div
              style={{
                alignItems: 'center',
              }}
              className={styles.artical_wrapper}
            >
              <span
                style={{
                  display: filteredColors.length > 0 ? 'block' : 'none',
                }}
              >
                Цвет{`(а)`} :{' '}
              </span>
              {filteredColors.map((color, index) => {
                return (
                  <span
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: color.code,
                      border: '1px solid rgb(129 129 129)',
                    }}
                    key={index}
                    title={`Цвет: ${color.name}`}
                  />
                );
              })}
            </div>
            {/* ---------- end of color ----------- */}
            {/* -------------- articals ----------- */}
            <div className={styles.artical_wrapper}>
              <span>Артикул(ы):</span>
              <ul className={styles.artical_data_wrapper}>
                {filteredArticals.map((artical, index) => {
                  return (
                    <button
                      className={styles.artical_variant_selector}
                      key={index}
                      onClick={() => {
                        const currentVariant = product.productVariants?.find(
                          (variant) => variant.artical == artical,
                        );
                        if (currentVariant) {
                          setVariant(currentVariant);
                        }
                      }}
                      style={{
                        borderColor:
                          variant.artical == artical ? '#000' : '#00000029',
                      }}
                    >
                      {artical!.includes('|')
                        ? artical!.split('|')[0].toUpperCase()
                        : artical!.toUpperCase()}
                      {!currentVariant(artical)?.available ? (
                        <div className={styles.NotInStockWrapper}>
                          <div className={styles.NotInStockLineThrough} />
                        </div>
                      ) : (
                        <></>
                      )}
                    </button>
                  );
                })}
              </ul>
            </div>
            {/* ---------------- end of artical --------------- */}
          </div>

          <div className={styles.price_sperator_wrapper}>
            <div className={styles.old_new_price_wrapper}>
              {/* <span
                style={{
                  display: variant.oldPrice ? 'none' : 'flex',
                }}
                className={styles.old_price}
              >
                {variant.oldPrice} ₽
              </span> */}
              <span>{variant.price} ₽</span>
            </div>
          </div>
        </div>
        <div className={styles.action_buttons_wrapper}>
          <AddToWishlist product={product} />
          <AddToCart
            product={product}
            qty={findCartQTY(product, cart!, variant)}
            variant={variant}
          />
        </div>
      </>
    </li>
  );
};

export default HeaderProductItmesHistory;
