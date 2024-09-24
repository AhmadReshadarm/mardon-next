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
// import { useAppSelector } from 'redux/hooks';
// import { TAuthState } from 'redux/types';
// import { Role } from 'common/enums/roles.enum';
import Image from 'next/image';

type StyleProps = {
  backgroundColor?: string;
  width?: string;
};
// let variant = null;
type Props = {
  variantColor: Color | undefined;
  productVariants: ProductVariant[] | undefined;
  selectedIndex: number;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
  paginateImage: Dispatch<SetStateAction<number>>;
};

const ColorPicker: React.FC<Props> = ({
  variantColor,
  productVariants,
  selectedIndex,
  setSelectedIndex,
  paginateImage,
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
      // localStorage.setItem('userChoice', JSON.stringify(variant.color?.name));

      dispatch(setVariant(variant));
      setSelectedIndex(index);

      if (index != selectedIndex) {
        paginateImage(selectedIndex > index ? -1 : 1);
      }
    };

  const variantImages = getFlatVariantImages(productVariants);

  // const { user } = useAppSelector<TAuthState>((state) => state.auth);

  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // useEffect(() => {
  //   setWindowWidth(window.innerWidth);
  //   const handleWindowResize = () => {
  //     setWindowWidth(window.innerWidth);
  //   };

  //   window.addEventListener('resize', handleWindowResize);

  //   return () => {
  //     window.removeEventListener('resize', handleWindowResize);
  //   };
  // });
  const [initialVariant, setInitialVariant] = useState(productVariants![0]);
  useEffect(() => {
    dispatch(setVariant(initialVariant));
  }, []);
  return (
    <ColorPickerContainer>
      {/* <ColorPickerNameWrapper
        key="prices-product-page"
        custom={0.38}
        initial="init"
        animate="animate"
        exit={{ y: -20, opacity: 0, transition: { delay: 0.1 } }}
        variants={variants.fadInSlideUp}
      >
        {variantColor?.url != '_' ? (
          <ColorWrapper>
            <span>Цвет:</span>
            <ColorItem backgroundColor={variantColor?.code!} />
          </ColorWrapper>
        ) : (
          ''
        )}
      </ColorPickerNameWrapper> */}
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
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = '/img_not_found.png';
                    }}
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
                    <ColorPickerSpan>{'Нет в наличии'}</ColorPickerSpan>
                  ) : (
                    <ColorPickerPriceWrapper>
                      <ColorPickerSpan>{variant.price}₽</ColorPickerSpan>
                      {/* <ColorPickerSpan>
                      {`${
                        user?.role === Role.SuperUser
                          ? variant.wholeSalePrice
                          : variant.price
                      }₽`}
                      </ColorPickerSpan> */}
                      {/* {!variant.oldPrice ? (
                        ''
                      ) : (
                        <ColorPickerSpan>
                          {`${variant.oldPrice}₽`}
                        </ColorPickerSpan>
                      )} */}
                    </ColorPickerPriceWrapper>
                  )}
                </React.Fragment>
              }
            >
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
              >
                <Image
                  style={{
                    width: selectedIndex == colIndex ? '95%' : '100%',
                    height: selectedIndex == colIndex ? '95%' : '100%',
                  }}
                  src={`/api/images/${variant.image}`}
                  alt={variant.image}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = '/img_not_found.png';
                  }}
                  width={0}
                  height={0}
                  sizes="100vw"
                  loading="lazy"
                  priority={false}
                />
                {!variant.available ? <div></div> : ''}
              </ColorPickerItems>
            </ImageTooltip>
          );
        })}
      </ColorPickerList>
    </ColorPickerContainer>
  );
};

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

export const ColorPickerItems = styled(motion.li)`
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
  font-size: 1.1rem;
  font-family: ricordi;

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
