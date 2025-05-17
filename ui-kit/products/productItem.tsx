import { sizesNum } from 'components/store/lib/Devices';
import Link from 'next/link';
import { Product } from 'swagger/services';
import Slider from './slider';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { Basket } from 'swagger/services';
import { AddToCart, AddToWishlist } from 'ui-kit/ProductActionBtns';
import { findCartQTY } from 'ui-kit/HeaderProductItems/helpers';
import {
  clearSearchProducts,
  clearSearchQuery,
} from 'redux/slicers/store/globalSlicer';
import { useEffect, useState } from 'react';
import styles from './styles/productItem.module.css';
type Props = {
  product: Product;
  custom: number;
};

const ProductItem: React.FC<Props> = ({ product }) => {
  const cart: Basket = useAppSelector((state) => state.cart.cart);
  const [variant, setVariant] = useState(product.productVariants![0]);
  const dispatch = useAppDispatch();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  const calculateImageSizeContainer = (windowWidth: number) => {
    switch (true) {
      // laptopM
      case sizesNum.laptopS < windowWidth && windowWidth < sizesNum.laptopM:
        return {
          minMaxWidth: windowWidth / 3 - 50,
        };
      // laptopS
      case sizesNum.tabletL < windowWidth && windowWidth < sizesNum.laptopS:
        return {
          minMaxWidth: windowWidth / 2 - 50,
        };
      // tabletL
      case sizesNum.tabletS < windowWidth && windowWidth < sizesNum.tabletL:
        return {
          minMaxWidth: windowWidth / 2 - 50,
        };
      // tabletS, mobileL, mobileM, mobileS, mobileES
      case sizesNum.mobileES < windowWidth && windowWidth < sizesNum.tabletS:
        return {
          minMaxWidth: windowWidth - 80,
        };
      default:
        return {
          minMaxWidth: 330,
        };
    }
  };

  const [wrapperSizes, setWrapperSizes] = useState({
    minMaxWidth: calculateImageSizeContainer(windowWidth).minMaxWidth,
  });
  useEffect(() => {
    setWrapperSizes({
      minMaxWidth: calculateImageSizeContainer(windowWidth).minMaxWidth,
    });
  }, [windowWidth]);
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

  const currentVariant = (artical) =>
    product.productVariants?.find((variant) => variant.artical == artical);

  return (
    <li
      // key={key}
      className={styles.ItemContainer}
      style={{
        minWidth: `${wrapperSizes.minMaxWidth}px`,
        maxWidth: `${wrapperSizes.minMaxWidth}px`,
      }}
    >
      <div className={styles.ItemWrapper}>
        <Slider
          product={product}
          images={variant.images ? variant.images.split(', ') : []}
          // images={images}
          url={product.url}
          windowWidth={windowWidth}
          variant={variant}
        />
        <div className={styles.product_title_add_to_card_wrapper}>
          {/* ----------------- title start ------------------ */}
          <Link
            className={styles.product_title}
            onClick={() => {
              dispatch(clearSearchQuery());
              dispatch(clearSearchProducts());
            }}
            href={`/product/${product.url}`}
            aria-label={product.name}
            prefetch={false}
          >
            <span title={product.name}>
              {product.name?.length! > 80 && windowWidth > 1024
                ? `${product.name?.slice(0, 80)}...`
                : product.name}
            </span>
          </Link>
          {/* ------------ end of title ---------------- */}
          {/* ----------- aritcale ---------- */}
          <div
            style={{
              alignItems: filteredArticals.length > 2 ? 'flex-start' : 'center',
            }}
            className={styles.artical_wrapper}
          >
            <span>Артикул(ы) : </span>
            <div className={styles.artical_content_wrapper}>
              {filteredArticals.map((artical, index) => {
                return (
                  <button
                    onClick={() => {
                      const currentOrderVariant = product.productVariants?.find(
                        (variant) => variant.artical == artical,
                      );

                      if (currentOrderVariant) {
                        setVariant(currentOrderVariant);
                      }
                    }}
                    style={{
                      borderColor:
                        variant.artical == artical ? '#000' : '#00000029',
                    }}
                    className={styles.artical_variant_selector}
                    key={index}
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
            style={{ display: product.reviews?.length! == 0 ? 'none' : 'flex' }}
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
          <div className={styles.product_price_wrapper}>
            <span>{variant.price} ₽</span>
            {/* -------------- end of price --------------- */}
          </div>
          <div className={styles.action_buttons_wrapper}>
            <AddToWishlist product={product} />
            <AddToCart
              product={product}
              qty={findCartQTY(product, cart, variant)}
              variant={variant}
            />
          </div>
        </div>
      </div>
    </li>
  );
};

export default ProductItem;
