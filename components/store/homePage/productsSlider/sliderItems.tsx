import { useEffect, useState } from 'react';
import { Product } from 'swagger/services';
import { useAppSelector } from 'redux/hooks';
import { AddToCart, AddToWishlist } from 'ui-kit/ProductActionBtns';
import { findCartQTY } from 'ui-kit/HeaderProductItems/helpers';
import { TCartState } from 'redux/types';
import Link from 'next/link';
import styles from '../styles/productSlider.module.css';
import Image from 'next/image';
import { FALLBACK_BLUR_DATA_URL } from 'common/constant';

type Props = {
  // product: Product;
  // index: number;
  caroselIndex: number;
  caroselProducts: Product[];
  base64Image: any;
  setCaroselIndex: any;
  setISMouseHover: any;
};

const SliderItems: React.FC<Props> = ({
  // product,
  // index,
  caroselIndex,
  caroselProducts,
  base64Image,
  setCaroselIndex,
  setISMouseHover,
}) => {
  const [imageIndex, setImageIndex] = useState<number>(0);
  const { cart } = useAppSelector<TCartState>((state) => state.cart);
  const [currentSlide, setCurrentSlide] = useState(
    caroselProducts[caroselIndex],
  );
  const [variant, setVariant] = useState(currentSlide.productVariants![0]);
  const [images, setImages] = useState(variant.images?.split(', ') ?? []);
  const [colors, setColors] = useState(
    currentSlide.productVariants?.map(() => {
      if (variant.color?.url !== '-') {
        return variant.color?.code!;
      }
    }) ?? [],
  );

  useEffect(() => {
    setCurrentSlide(caroselProducts[caroselIndex]);
  }, [caroselIndex]);
  useEffect(() => {
    const colorsArray: string[] = [];
    currentSlide.productVariants!.map((variant) => {
      if (variant.color?.url !== '-') {
        colorsArray.push(variant.color?.code!);
      }
    });
    setColors(colorsArray);
    setVariant(currentSlide.productVariants![0]);
  }, [currentSlide]);

  useEffect(() => {
    setImages(variant.images?.split(', ') ?? []);
  }, [variant]);

  // -------- remove dub articals -------------
  const getArticals = (currentSlide) =>
    currentSlide.productVariants?.map((variant) => variant.artical);

  const filterArticals = (articals) =>
    articals!.filter(function (value, index, array) {
      return array.indexOf(value) === index;
    });
  // -------------------------------------------
  const currentVariant = (artical) =>
    currentSlide.productVariants?.find((variant) => variant.artical == artical);
  const safeBlurDataURL = base64Image || FALLBACK_BLUR_DATA_URL;
  return (
    <>
      {/* {caroselIndex === index ? ( */}
      <div className={styles.Content}>
        <div className={styles.product_cart_wrapper}>
          <div className={styles.cart_title_n_action_buttons_wrapper}>
            <div className={styles.cart_title_n_action_buttons_content}>
              <div className={styles.title_n_index_indecator_top_wrapper}>
                <div className={styles.index_indecator_top} />
                <Link
                  href={`/product/${currentSlide?.url}`}
                  prefetch={false}
                  title={`Перейти к товар ${currentSlide.name}`}
                >
                  <h1 title={currentSlide?.name}>{`${
                    currentSlide?.name?.length! > 40
                      ? currentSlide?.name?.slice(0, 40) + '...'
                      : currentSlide?.name
                  }`}</h1>
                </Link>
              </div>
              <div className={styles.description_mobile}>
                <p>
                  {currentSlide?.desc?.includes('|')
                    ? currentSlide?.desc?.split('|')[0]?.length! > 150
                      ? currentSlide?.desc?.split('|')[0].slice(0, 150) + '...'
                      : currentSlide?.desc?.split('|')[0]
                    : currentSlide?.desc?.length! > 150
                    ? currentSlide?.desc?.slice(0, 150) + '...'
                    : currentSlide?.desc?.slice(0, 150)}
                </p>
              </div>
              <div className={styles.cart_price_n_action_button_wrapper}>
                {/* ----------- aritcale ---------- */}
                <div
                  style={{
                    alignItems:
                      filterArticals(getArticals(currentSlide)).length > 2
                        ? 'flex-start'
                        : 'center',
                  }}
                  className={styles.artical_wrapper}
                >
                  <span>Артикул(ы) : </span>
                  <div className={styles.artical_content_wrapper}>
                    {filterArticals(getArticals(currentSlide)).map(
                      (artical, index) => {
                        return (
                          <button
                            onClick={() => {
                              const currentVariant =
                                currentSlide.productVariants?.find(
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
                            key={`${artical}-${index}`}
                            type="button"
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
                      },
                    )}
                  </div>
                </div>
                {/* ----------- end of articale ------------ */}
                {/* ----------- color ------------------- */}
                <div
                  style={{
                    display:
                      colors.filter(function (value, index, array) {
                        return array.indexOf(value) === index;
                      }).length !== 0
                        ? 'flex'
                        : 'none',
                  }}
                  className={styles.artical_wrapper}
                >
                  <span>Цвет(а) : </span>
                  {colors
                    .filter(function (value, index, array) {
                      return array.indexOf(value) === index;
                    })
                    .map((color, index) => {
                      return (
                        <span
                          style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: color,
                            border: '1px solid rgb(129 129 129)',
                          }}
                          key={`${color}-${index}`}
                        />
                      );
                    })}
                </div>
                {/* ---------- end of color ----------- */}
                {/* ------------ rating --------------- */}
                <div
                  title={`${
                    Math.floor(currentSlide.reviews?.length!) == 1
                      ? Math.floor(currentSlide.reviews?.length!) + ' Оценка'
                      : Math.floor(currentSlide.reviews?.length!) / 2 == 0
                      ? Math.floor(currentSlide.reviews?.length!) + ' Оценки'
                      : Math.floor(currentSlide.reviews?.length!) + ' Оценок'
                  } `}
                  className={styles.rating_wrapper}
                  style={{
                    display:
                      currentSlide.reviews?.length! == 0 ? 'none' : 'flex',
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
                    {Math.floor(currentSlide.reviews?.length!) == 1
                      ? Math.floor(currentSlide.reviews?.length!) + ' Оценка'
                      : Math.floor(currentSlide.reviews?.length!) / 2 == 0
                      ? Math.floor(currentSlide.reviews?.length!) + ' Оценки'
                      : Math.floor(currentSlide.reviews?.length!) + ' Оценок'}
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
                  <AddToWishlist product={currentSlide!} />
                  <AddToCart
                    product={currentSlide}
                    qty={findCartQTY(currentSlide, cart!, variant)}
                    variant={variant}
                  />
                </div>
              </div>
              <div className={styles.dots_indecator_wrapper}>
                {caroselProducts.map((product, index) => {
                  const thumbnailImage =
                    product.productVariants![0].images!.split(', ')[0] ?? [];

                  return (
                    <span
                      className={`${styles.dots_indecator}`}
                      onClick={() => {
                        setCaroselIndex(index);
                        setISMouseHover(true);
                      }}
                      key={`${product.name}-${index}`}
                    >
                      <div className={`${styles.thumbnaiImage_wrapper} `}>
                        <Image
                          className={`${styles.slider_thumbnailImage} ${
                            caroselIndex == index ? styles.active : ''
                          }`}
                          src={`/api/images/${thumbnailImage}`}
                          alt={product?.name!}
                          width={80}
                          height={80}
                          priority={true}
                          placeholder="blur"
                          blurDataURL={safeBlurDataURL}
                        />
                      </div>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
          <Link
            href={`/product/${currentSlide?.url}`}
            prefetch={false}
            title={`Перейти к товар ${currentSlide.name}`}
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
                      key={`${image}-${index}`}
                    ></li>
                  );
                })}
              </ul>
              <Image
                className="product-slider-img"
                src={`/api/images/${images[imageIndex]}`}
                alt={currentSlide?.name!}
                width={1080}
                height={1080}
                priority={true}
                placeholder="blur"
                blurDataURL={safeBlurDataURL}
              />
            </div>
          </Link>
        </div>
        <div className={styles.product_description_wrapper}>
          <div className={styles.indecator_wrapper}>
            <div className={styles.index_indecator_top}></div>
          </div>
          <Link
            href={`/product/${currentSlide?.url}`}
            prefetch={false}
            title={`Перейти к товар ${currentSlide.name}`}
          >
            <h1 title={currentSlide?.name}>{`${
              currentSlide?.name?.length! > 40
                ? currentSlide?.name?.slice(0, 40) + '...'
                : currentSlide?.name
            }`}</h1>
          </Link>
          <span>
            {currentSlide?.desc?.includes('|')
              ? currentSlide?.desc?.split('|')[0]?.length! > 150
                ? currentSlide?.desc?.split('|')[0].slice(0, 150) + '...'
                : currentSlide?.desc?.split('|')[0]
              : currentSlide?.desc?.length! > 150
              ? currentSlide?.desc?.slice(0, 150) + '...'
              : currentSlide?.desc?.slice(0, 150)}
          </span>
        </div>
      </div>
      {/* ) : (
        ''
      )} */}
    </>
  );
};

export default SliderItems;
