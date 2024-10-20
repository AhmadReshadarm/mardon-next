import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { devices } from 'components/store/lib/Devices';
import { getFlatVariantImages, ImageTooltip } from './helpers';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Color, ProductVariant } from 'swagger/services';
import { useAppDispatch } from 'redux/hooks';
import { setVariant } from 'redux/slicers/store/cartSlicer';
import Image from 'next/image';

type StyleProps = {
  backgroundColor?: string;
  width?: string;
};
type Props = {
  variantColor: Color | undefined;
  productVariants: ProductVariant[] | undefined;
  selectedIndex: number;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
  paginateImage: Dispatch<SetStateAction<number>>;
  setFirstLoad: Dispatch<SetStateAction<boolean>>;
};

const ColorPicker: React.FC<Props> = ({
  variantColor,
  productVariants,
  selectedIndex,
  setSelectedIndex,
  paginateImage,
  setFirstLoad,
}) => {
  const dispatch = useAppDispatch();

  const handleImageChange =
    (
      variant: ProductVariant,
      index: number,
      selectedIndex: number,
      setSelectedIndex: (index: number) => void,
      paginateImage: (index: number) => void,
    ) =>
    () => {
      setFirstLoad(false);
      dispatch(setVariant(variant));
      setSelectedIndex(index);

      if (index != selectedIndex) {
        paginateImage(selectedIndex > index ? -1 : 1);
      }
    };

  const variantImages = getFlatVariantImages(productVariants);

  const [initialVariant, setInitialVariant] = useState(productVariants![0]);
  useEffect(() => {
    dispatch(setVariant(initialVariant));
  }, []);
  const [loadingComplet, setLoadingComplet] = useState(false);

  return (
    <ColorPickerContainer>
      <ColorPickerList>
        {variantImages?.map((variant, colIndex) => {
          if (!initialVariant) setInitialVariant(variant);
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
                    src={`/api/images/${variant.image}`}
                    alt={`${variant.image}`}
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
                    ''
                  ) : (
                    <ColorPickerSpan
                      style={{
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center',
                      }}
                    >
                      <span>Цвет:</span>
                      <ColorItem backgroundColor={variant.color.code!} />
                    </ColorPickerSpan>
                  )}
                  <ArticalWrapper>
                    <span>Артикул:</span>
                    <span>
                      {variant.artical.includes('|')
                        ? variant.artical.split('|')[0].toLocaleUpperCase()
                        : variant.artical.toLocaleUpperCase()}
                    </span>
                  </ArticalWrapper>
                  {variant.artical.includes('|') ? (
                    <ArticalWrapper>
                      <span>
                        {variant.artical.split('|')[1].toLocaleUpperCase()}
                      </span>
                    </ArticalWrapper>
                  ) : (
                    ''
                  )}
                  {!variant.available ? (
                    <ColorPickerSpan>Нет в наличии</ColorPickerSpan>
                  ) : (
                    <ColorPickerPriceWrapper>
                      <ColorPickerSpan>{variant.price} ₽</ColorPickerSpan>
                    </ColorPickerPriceWrapper>
                  )}
                </React.Fragment>
              }
            >
              <ColorPickerThumbnailWrapper>
                <ColorPickerItems
                  key="prices-product-page"
                  custom={0.05 * colIndex}
                  initial="init"
                  animate="animate"
                  exit={{
                    y: -20,
                    opacity: 0,
                    transition: { delay: 0.05 * colIndex },
                  }}
                  variants={variants.fadInSlideUp}
                  onClick={handleImageChange(
                    variant,
                    colIndex,
                    selectedIndex,
                    setSelectedIndex,
                    paginateImage,
                  )}
                  onTouchStart={handleImageChange(
                    variant,
                    colIndex,
                    selectedIndex,
                    setSelectedIndex,
                    paginateImage,
                  )}
                  style={{
                    border:
                      selectedIndex == colIndex
                        ? `solid 1px ${color.searchBtnBg}`
                        : 'none',
                  }}
                >
                  <LoaderMask
                    style={{ display: loadingComplet ? 'none' : 'flex' }}
                  />
                  <Image
                    style={{
                      width: selectedIndex == colIndex ? '48px' : '50px',
                      height: selectedIndex == colIndex ? '48px' : '50px',

                      opacity: loadingComplet ? 1 : 0,
                      position: loadingComplet ? 'inherit' : 'absolute',
                      zIndex: loadingComplet ? 1 : -1,
                    }}
                    src={`/api/images/compress/${variant.image}?qlty=10&width=50&height=50&lossless=true`} // `/api/images/${variant.image}`
                    alt={variant.image}
                    width={50}
                    height={50}
                    loading="lazy"
                    priority={false}
                    onLoadingComplete={() => setLoadingComplet(true)}
                  />
                  {!variant.available ? (
                    <div className="not-available-mask">
                      <div className="inner-not-available-mask"></div>
                    </div>
                  ) : (
                    ''
                  )}
                </ColorPickerItems>
                <span className="preview-artical">
                  {variant.artical.includes('|')
                    ? variant.artical.split('|')[0].toLocaleUpperCase()
                    : variant.artical.includes(' ')
                    ? variant.artical.split(' ')[0].toLocaleUpperCase()
                    : variant.artical.toLocaleUpperCase()}
                </span>
              </ColorPickerThumbnailWrapper>
            </ImageTooltip>
          );
        })}
      </ColorPickerList>
    </ColorPickerContainer>
  );
};

const LoaderMask = styled.div`
  width: 50px;
  height: 50px;
  background: #cccccca3;
  position: relative;
  overflow: hidden;
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    transform: translateX(-100px);
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    animation: loading 0.8s infinite;
  }

  @keyframes loading {
    100% {
      transform: translateX(100%);
    }
  }
`;

const ColorPickerThumbnailWrapper = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  .preview-artical {
    font-size: 0.7rem;
  }
`;

export const ColorPickerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  jusitfy-content: flex-start;
  align-items: flex-start;
  gap: 20px;
`;
const ArticalWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
  span {
    font-size: 0.8rem;
  }
`;
export const ColorPickerList = styled.ul`
  width: ${(p: StyleProps) => p.width};
  display: inline-grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 15px;
  grid-row-gap: 15px;
  justify-content: center;
  align-items: center;
  justify-items: flex-start;
  @media ${devices.laptopS} {
    grid-template-columns: repeat(4, 1fr);
  }
  @media ${devices.tabletL} {
    grid-template-columns: repeat(4, 1fr);
  }
  @media ${devices.tabletS} {
    grid-template-columns: repeat(4, 1fr);
  }
  @media ${devices.mobileL} {
    grid-template-columns: repeat(4, 1fr);
  }
  @media ${devices.mobileM} {
    grid-template-columns: repeat(3, 1fr);
  }
  @media ${devices.mobileS} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const ColorPickerItems = styled(motion.div)`
  max-width: 50px;
  min-width: 50px;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 5px;

  box-shadow: 0px 5px 10px 0px ${color.boxShadowBtn};
  cursor: pointer;
  overflow: hidden;
  .not-available-mask {
    width: 100%;
    height: 100%;
    background-color: #ffffff82;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    .inner-not-available-mask {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      transform: translate(25px, -18px);
      &:after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        width: 1px;
        height: 170%;
        background-color: #000;
        transform: rotate(45deg);
      }
    }
  }
  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 3px;
  }
`;

const ColorPickerPriceWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const ColorPickerSpan = styled.span`
  font-size: 1rem;
  font-weight: 500;

  &:nth-child(2) {
    font-size: 1rem;
    text-decoration: line-through;
    color: ${color.textBase};
  }
`;

const ColorItem = styled.div`
  background-color: ${(props: StyleProps) => props.backgroundColor};
  width: 15px;
  height: 15px;
  border-radius: 50%;
`;

export default ColorPicker;
