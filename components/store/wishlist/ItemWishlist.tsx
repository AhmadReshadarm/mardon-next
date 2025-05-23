import Link from 'next/link';
import { Product } from 'swagger/services';
import { useAppSelector } from 'redux/hooks';
import { TCartState } from 'redux/types';
import { AddToCart, AddToWishlist } from 'ui-kit/ProductActionBtns';
import { findCartQTY } from 'ui-kit/HeaderProductItems/helpers';
import styles from './wishlistStyles.module.css';
import { useState } from 'react';
type Props = {
  product: Product;
  index: number;
};

const ItemWishlist: React.FC<Props> = ({ product, index }) => {
  const { cart } = useAppSelector<TCartState>((state) => state.cart);
  const [variant, setVariant] = useState(product.productVariants![0]);

  const colors: string[] = [];
  product!?.productVariants!.map((variant) => {
    if (variant.color?.url !== '-') {
      colors.push(variant.color?.code!);
    }
  });
  // remove the repated product colors from array to only show in UI once
  const filteredColors = colors.filter(function (value, index, array) {
    return array.indexOf(value) === index;
  });

  const articals = product!.productVariants?.map((variant) => variant.artical);
  // remove the repated product artical from array to only show in UI once
  const filteredArticals = articals!.filter(function (value, index, array) {
    return array.indexOf(value) === index;
  });

  const currentVariant = (artical) =>
    product.productVariants?.find((variant) => variant.artical == artical);

  return (
    <li className={styles.ProductItemWrapper} key={index}>
      <>
        <Link href={`/product/${product?.url}`} prefetch={false}>
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
            <Link href={`/product/${product?.url}`} prefetch={false}>
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
                display: filteredColors.length !== 0 ? 'flex' : 'none',
              }}
              className={styles.artical_wrapper}
            >
              <span>Цвет(а) : </span>
              {filteredColors.map((color, index) => {
                return (
                  <span
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: color,
                      border: '1px solid rgb(129 129 129)',
                    }}
                    key={index}
                  />
                );
              })}
            </div>
            {/* ---------- end of color ----------- */}
            <div className={styles.artical_wrapper}>
              <span>Артикул(ы):</span>
              <ul className={styles.artical_data_wrapper}>
                {filteredArticals.map((artical, index) => {
                  return (
                    <button
                      className={styles.artical_variant_selector}
                      key={index}
                      onClick={() => {
                        const currentVariant = product!.productVariants?.find(
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
          </div>

          <div className={styles.price_sperator_wrapper}>
            <div className={styles.old_new_price_wrapper}>
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

export default ItemWishlist;
