import { useState } from 'react';
import { Product } from 'swagger/services';
import { useAppSelector } from 'redux/hooks';
import { AddToCart, AddToWishlist } from 'ui-kit/ProductActionBtns';
import { findCartQTY } from 'ui-kit/HeaderProductItems/helpers';
import { TCartState } from 'redux/types';
import Link from 'next/link';
import styles from '../styles/productSlider.module.css';
import Image from 'next/image';

type Props = {
  product: Product;
  index: number;
  caroselIndex: number;
  caroselProducts: Product[];
  base64Image: any;
  setCaroselIndex: any;
  setISMouseHover: any;
};

const SliderItems: React.FC<Props> = ({
  product,
  index,
  caroselIndex,
  caroselProducts,
  base64Image,
  setCaroselIndex,
  setISMouseHover,
}) => {
  const [imageIndex, setImageIndex] = useState<number>(0);
  const { cart } = useAppSelector<TCartState>((state) => state.cart);
  const [variant, setVariant] = useState(product.productVariants![0]);
  const images = variant.images?.split(', ') ?? [];

  const articals = product.productVariants?.map((variant) => variant.artical);
  // remove the repated product artical from array to only show in UI once
  const filteredArticals = articals!.filter(function (value, index, array) {
    return array.indexOf(value) === index;
  });
  const colors: string[] = [];
  product.productVariants!.map((variant) => {
    if (variant.color?.url !== '-') {
      colors.push(variant.color?.code!);
    }
  });
  // remove the repated product colors from array to only show in UI once
  const filteredColors = colors.filter(function (value, index, array) {
    return array.indexOf(value) === index;
  });

  return (
    <>
      {caroselIndex === index ? (
        <div className={styles.Content}>
          <div className={styles.product_cart_wrapper}>
            <div className={styles.cart_title_n_action_buttons_wrapper}>
              <div className={styles.cart_title_n_action_buttons_content}>
                <div className={styles.title_n_index_indecator_top_wrapper}>
                  <div className={styles.index_indecator_top} />
                  <Link
                    href={`/product/${product?.url}`}
                    prefetch={false}
                    title={`Перейти к товар ${product.name}`}
                  >
                    <h1 title={product?.name}>{`${
                      product?.name?.length! > 40
                        ? product?.name?.slice(0, 40) + '...'
                        : product?.name
                    }`}</h1>
                  </Link>
                </div>
                <div className={styles.description_mobile}>
                  <p>
                    {product?.desc?.includes('|')
                      ? product?.desc?.split('|')[0]?.length! > 150
                        ? product?.desc?.split('|')[0].slice(0, 150) + '...'
                        : product?.desc?.split('|')[0]
                      : product?.desc?.length! > 150
                      ? product?.desc?.slice(0, 150) + '...'
                      : product?.desc?.slice(0, 150)}
                  </p>
                </div>
                <div className={styles.cart_price_n_action_button_wrapper}>
                  {/* ----------- aritcale ---------- */}
                  <div
                    style={{
                      alignItems:
                        filteredArticals.length > 2 ? 'flex-start' : 'center',
                    }}
                    className={styles.artical_wrapper}
                  >
                    <span>Артикул(ы) : </span>
                    <div className={styles.artical_content_wrapper}>
                      {filteredArticals.map((artical, index) => {
                        return (
                          <button
                            onClick={() => {
                              const currentVariant =
                                product.productVariants?.find(
                                  (variant) => variant.artical == artical,
                                );
                              if (currentVariant) {
                                setVariant(currentVariant);
                              }
                            }}
                            style={{
                              borderColor:
                                variant.artical == artical
                                  ? '#000'
                                  : '#00000029',
                            }}
                            className={styles.artical_variant_selector}
                            key={index}
                            type="button"
                          >
                            {artical!.includes('|')
                              ? artical!.split('|')[0].toUpperCase()
                              : artical!.toUpperCase()}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  {/* ----------- end of articale ------------ */}
                  {/* ----------- color ------------------- */}
                  <div
                    style={{
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
                  {/* ------------ rating --------------- */}
                  <div
                    title={`${
                      Math.floor(product.reviews?.length!) == 1
                        ? Math.floor(product.reviews?.length!) + ' Оценка'
                        : Math.floor(product.reviews?.length!) / 2 == 0
                        ? Math.floor(product.reviews?.length!) + ' Оценки'
                        : Math.floor(product.reviews?.length!) + ' Оценок'
                    } `}
                    className={styles.rating_wrapper}
                    style={{
                      display: product.reviews?.length! == 0 ? 'none' : 'flex',
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
                      {Math.floor(product.reviews?.length!) == 1
                        ? Math.floor(product.reviews?.length!) + ' Оценка'
                        : Math.floor(product.reviews?.length!) / 2 == 0
                        ? Math.floor(product.reviews?.length!) + ' Оценки'
                        : Math.floor(product.reviews?.length!) + ' Оценок'}
                    </span>
                  </div>
                  {/* ------------- end of rating ---------------- */}
                  <div className={styles.price_wrapper}>
                    {variant.oldPrice ? (
                      <span className={styles.old_price}>
                        {`${variant.oldPrice}`} ₽
                      </span>
                    ) : (
                      ''
                    )}
                    <span>{`${variant.price}`} ₽</span>
                  </div>
                  <div className={styles.action_buttons_wrapper}>
                    <AddToWishlist product={product!} />
                    <AddToCart
                      product={product}
                      qty={findCartQTY(product, cart!, variant)}
                      variant={variant}
                    />
                  </div>
                </div>
                <div className={styles.dots_indecator_wrapper}>
                  {caroselProducts.map((product, index) => {
                    return (
                      <span
                        className={`${styles.dots_indecator} ${
                          caroselIndex == index ? styles.active : ''
                        }`}
                        onClick={() => {
                          setCaroselIndex(index);
                          setISMouseHover(true);
                        }}
                      ></span>
                    );
                  })}
                </div>
              </div>
            </div>
            <Link
              href={`/product/${product?.url}`}
              prefetch={false}
              title={`Перейти к товар ${product.name}`}
            >
              <div className={styles.cart_image_wrapper}>
                <ul className={styles.images_scroll_wrapper}>
                  {images.map((image, index) => {
                    return (
                      <li
                        onMouseOver={() => {
                          setImageIndex(index);
                        }}
                        className={styles.image_index}
                      ></li>
                    );
                  })}
                </ul>
                <Image
                  className="product-slider-img"
                  src={`/api/images/${images[imageIndex]}`}
                  alt={product?.name!}
                  width={1080}
                  height={1080}
                  priority={true}
                  placeholder="blur"
                  blurDataURL={base64Image}
                />
              </div>
            </Link>
          </div>
          <div className={styles.product_description_wrapper}>
            <div className={styles.indecator_wrapper}>
              <div className={styles.index_indecator_top}></div>
            </div>
            <Link
              href={`/product/${product?.url}`}
              prefetch={false}
              title={`Перейти к товар ${product.name}`}
            >
              <h1 title={product?.name}>{`${
                product?.name?.length! > 40
                  ? product?.name?.slice(0, 40) + '...'
                  : product?.name
              }`}</h1>
            </Link>
            <span>
              {product?.desc?.includes('|')
                ? product?.desc?.split('|')[0]?.length! > 150
                  ? product?.desc?.split('|')[0].slice(0, 150) + '...'
                  : product?.desc?.split('|')[0]
                : product?.desc?.length! > 150
                ? product?.desc?.slice(0, 150) + '...'
                : product?.desc?.slice(0, 150)}
            </span>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default SliderItems;
