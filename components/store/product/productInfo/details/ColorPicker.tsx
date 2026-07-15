import color from 'components/store/lib/ui.colors';
import { ImageTooltip } from './helpers';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Product, ProductVariant } from 'swagger/services';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setVariant } from 'redux/slicers/store/cartSlicer';
import Image from 'next/image';
import styles from '../../styles/detail.module.css';
import { TCartState } from 'redux/types';
import { BRAND_BLUR_DATA_URL } from 'common/constant';

type Props = {
  setSelectedIndex: Dispatch<SetStateAction<number>>;
  product: Product | undefined;
};

const ColorPicker: React.FC<Props> = ({ setSelectedIndex, product }) => {
  const [loadingComplet, setLoadingComplet] = useState(false);
  const dispatch = useAppDispatch();
  const SelectedVariant = useAppSelector<TCartState>(
    (state) => state.cart.variant,
  );
  const productVariants = product?.productVariants;
  const variantColor = product?.productVariants![0].color;
  const handleImageChange =
    (variant: ProductVariant, setSelectedIndex: (index: number) => void) =>
    () => {
      dispatch(setVariant(variant));
      setSelectedIndex(0);
    };

  useEffect(() => {
    dispatch(setVariant(productVariants![0]));
  }, []);

  return (
    <div className={styles.ColorPickerContainer}>
      <ul className={styles.ColorPickerList}>
        {productVariants?.map((variant, colIndex) => {
          const images = variant.images ? variant.images.split(', ') : [];

          return (
            <ImageTooltip
              enterTouchDelay={0}
              leaveTouchDelay={5000}
              key={`image-item-${colIndex}`}
              title={
                <React.Fragment>
                  <Image
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                    }}
                    src={`/api/images/compress/${images[0]}?qlty=25&width=100&height=100&lossless=false`}
                    alt={`${images[0]}`}
                    width={100}
                    height={100}
                    sizes="100vw"
                    loading="lazy"
                    priority={false}
                    placeholder="blur"
                    blurDataURL={BRAND_BLUR_DATA_URL}
                  />
                  <hr
                    style={{
                      backgroundColor: color.textTertiary,
                      width: '100%',
                    }}
                  />
                  {variantColor?.url === '_' ||
                  variantColor?.url === '-' ||
                  variantColor?.url == ' ' ? (
                    <></>
                  ) : (
                    <span
                      style={{
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center',
                      }}
                      className={styles.ColorPickerSpan}
                    >
                      <span>Цвет:</span>
                      <div
                        style={{ backgroundColor: variant.color?.code }}
                        className={styles.ColorItem}
                      />
                    </span>
                  )}
                  <div className={styles.ArticalWrapper}>
                    <span>Артикул:</span>
                    <span>
                      {variant.artical?.includes('|')
                        ? variant.artical?.split('|')[0].toLocaleUpperCase()
                        : variant.artical?.toLocaleUpperCase()}
                    </span>
                  </div>

                  {variant.artical?.includes('|') ? (
                    <div className={styles.ArticalWrapper}>
                      <span>
                        {variant.artical.split('|')[1].toLocaleUpperCase()}
                      </span>
                    </div>
                  ) : (
                    <></>
                  )}
                  {!variant.available ? (
                    <span className={styles.ColorPickerSpan}>
                      Нет в наличии
                    </span>
                  ) : (
                    <div className={styles.ColorPickerPriceWrapper}>
                      <span className={styles.ColorPickerSpan}>
                        {variant.price} ₽
                      </span>
                    </div>
                  )}
                </React.Fragment>
              }
            >
              <li
                className={styles.ColorPickerThumbnailWrapper}
                onClick={handleImageChange(variant, setSelectedIndex)}
                onTouchStart={handleImageChange(variant, setSelectedIndex)}
                tabIndex={0}
                onKeyDown={(evt) => {
                  if (evt.key == 'Enter') {
                    handleImageChange(variant, setSelectedIndex)();
                  }
                }}
              >
                <div
                  className={styles.ColorPickerItems}
                  style={{
                    border:
                      variant === SelectedVariant
                        ? `solid 1px ${color.searchBtnBg}`
                        : 'none',
                  }}
                >
                  <Image
                    src={`/api/images/compress/${images[0]}?qlty=10&width=50&height=50&lossless=true`}
                    alt={`${
                      product?.name?.includes('(')
                        ? product.name.split('(')[0]
                        : product?.name
                    }- ${variant.artical!}`}
                    width={50}
                    height={50}
                    loading="lazy"
                    priority={false}
                    placeholder="blur"
                    blurDataURL={BRAND_BLUR_DATA_URL}
                  />
                  {!variant.available ? (
                    <div className={styles.not_available_mask}>
                      <div className={styles.inner_not_available_mask}></div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <span className={styles.preview_artical}>
                  {variant.artical?.includes('|')
                    ? variant.artical.split('|')[0].toLocaleUpperCase()
                    : variant.artical?.includes(' ')
                    ? variant.artical.split(' ')[0].toLocaleUpperCase()
                    : variant.artical?.toLocaleUpperCase()}
                </span>
              </li>
            </ImageTooltip>
          );
        })}
      </ul>
    </div>
  );
};

export default ColorPicker;
