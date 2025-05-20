import color from 'components/store/lib/ui.colors';
import { ImageTooltip } from './helpers';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Color, ProductVariant } from 'swagger/services';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setVariant } from 'redux/slicers/store/cartSlicer';
import Image from 'next/image';
import styles from '../../styles/detail.module.css';
import { TCartState } from 'redux/types';

type Props = {
  variantColor: Color | undefined;
  productVariants: ProductVariant[] | undefined;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
};

const ColorPicker: React.FC<Props> = ({
  variantColor,
  productVariants,
  setSelectedIndex,
}) => {
  const [loadingComplet, setLoadingComplet] = useState(false);
  const dispatch = useAppDispatch();
  const SelectedVariant = useAppSelector<TCartState>(
    (state) => state.cart.variant,
  );
  const handleImageChange =
    (variant: ProductVariant, setSelectedIndex: (index: number) => void) =>
    () => {
      dispatch(setVariant(variant));
      setSelectedIndex(0);
    };

  const [initialVariant, setInitialVariant] = useState(productVariants![0]);
  useEffect(() => {
    dispatch(setVariant(initialVariant));
  }, []);

  return (
    <div className={styles.ColorPickerContainer}>
      <ul className={styles.ColorPickerList}>
        {productVariants?.map((variant, colIndex) => {
          if (!initialVariant) setInitialVariant(variant);
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
                    src={`/api/images/${images[0]}`}
                    alt={`${images[0]}`}
                    width={0}
                    height={0}
                    sizes="100vw"
                    loading="lazy"
                    priority={false}
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
                // style={{
                //   border:
                //     variant === SelectedVariant
                //       ? '1px solid #00000075'
                //       : 'none',
                // }}
                className={styles.ColorPickerThumbnailWrapper}
                onClick={handleImageChange(
                  variant,

                  setSelectedIndex,
                )}
                onTouchStart={handleImageChange(
                  variant,

                  setSelectedIndex,
                )}
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
                  <div
                    style={{ display: loadingComplet ? 'none' : 'flex' }}
                    className={styles.LoaderMask}
                  />
                  <Image
                    style={{
                      width: variant === SelectedVariant ? '48px' : '50px',
                      height: variant === SelectedVariant ? '48px' : '50px',

                      opacity: loadingComplet ? 1 : 0,
                      position: loadingComplet ? 'inherit' : 'absolute',
                      zIndex: loadingComplet ? 1 : -1,
                    }}
                    src={`/api/images/compress/${images[0]}?qlty=10&width=50&height=50&lossless=true`}
                    alt={variant.artical!}
                    width={50}
                    height={50}
                    loading="lazy"
                    priority={false}
                    onLoadingComplete={() => setLoadingComplet(true)}
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
