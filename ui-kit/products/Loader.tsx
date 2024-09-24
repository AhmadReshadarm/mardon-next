import { emptyLoading } from 'common/constants';
import { sizesNum } from 'components/store/lib/Devices';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ItemContainer, ItemWrapper } from 'ui-kit/products/productItem';
import { ImageSliderSlide, ImageSliderWrapper } from 'ui-kit/products/slider';

const Loader = () => {
  return (
    <>
      <div className="section-title-wrapper">
        <LoaderMask style={{ width: '150px', height: '50px' }} />
        <ul className="best-product-grid-wrapper">
          {emptyLoading.map((item, index) => {
            return <LoaderItem index={index} />;
          })}
        </ul>
      </div>
    </>
  );
};

export const LoaderItem = ({ index }) => {
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

  const calculateImageSize = (windowWidth: number) => {
    switch (true) {
      // laptopM
      case sizesNum.laptopS < windowWidth && windowWidth < sizesNum.laptopM:
        return {
          minMaxheight: windowWidth / 3 - 90,
          minMaxWidth: windowWidth / 3 - 70,
          width: 100,
        };
      // laptopS
      case sizesNum.tabletL < windowWidth && windowWidth < sizesNum.laptopS:
        return {
          minMaxheight: windowWidth / 2 - 90,
          minMaxWidth: windowWidth / 2 - 70,
          width: 100,
        };
      // tabletL
      case sizesNum.tabletS < windowWidth && windowWidth < sizesNum.tabletL:
        return {
          minMaxheight: windowWidth / 2 - 90,
          minMaxWidth: windowWidth / 2 - 70,
          width: 100,
        };
      // tabletS, mobileL, mobileM, mobileS, mobileES
      case sizesNum.mobileES < windowWidth && windowWidth < sizesNum.tabletS:
        return {
          minMaxheight: '',
          minMaxWidth: '',
          width: 95,
        };
      default:
        return {
          minMaxWidth: 300,
          minMaxheight: 300,
          width: 100,
        };
    }
  };

  const [wrapperSizes, setWrapperSizes] = useState({
    minMaxWidth: calculateImageSize(windowWidth).minMaxWidth,
    minMaxheight: calculateImageSize(windowWidth).minMaxheight,
    width: calculateImageSize(windowWidth).width,
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

  const [wrapperSizesContainer, setWrapperSizesContainer] = useState({
    minMaxWidth: calculateImageSizeContainer(windowWidth).minMaxWidth,
  });
  useEffect(() => {
    setWrapperSizes({
      minMaxWidth: calculateImageSize(windowWidth).minMaxWidth,
      minMaxheight: calculateImageSize(windowWidth).minMaxheight,
      width: calculateImageSize(windowWidth).width,
    });
    setWrapperSizesContainer({
      minMaxWidth: calculateImageSizeContainer(windowWidth).minMaxWidth,
    });
  }, [windowWidth]);

  return (
    <ItemContainer
      key={index}
      style={{
        minWidth: `${wrapperSizesContainer.minMaxWidth}px`,
        maxWidth: `${wrapperSizesContainer.minMaxWidth}px`,
      }}
    >
      <ItemWrapper>
        <ImageSliderWrapper
          style={{
            minWidth: `${wrapperSizes.minMaxWidth}px`,
            maxWidth: `${wrapperSizes.minMaxWidth}px`,
            minHeight: `${wrapperSizes.minMaxheight}px`,
            maxHeight: `${wrapperSizes.minMaxheight}px`,
            width: `${wrapperSizes.width}%`,
          }}
        >
          <ImageSliderSlide>
            <LoaderMask style={{ width: '100%', height: '100%' }} />
          </ImageSliderSlide>
        </ImageSliderWrapper>
        <div className="product-title-add-to-card-wrapper">
          <span>
            {<LoaderMask style={{ width: '100%', height: '20px' }} />}
          </span>
          <div className="artical-wrapper">
            <span>
              {<LoaderMask style={{ width: '100px', height: '15px' }} />}
            </span>
          </div>
          <div className="product-description-wrapper">
            <span style={{ display: 'flex', gap: '10px' }}>
              <LoaderMask style={{ width: '100%', height: '15px' }} />

              <LoaderMask style={{ width: '100%', height: '15px' }} />
            </span>
          </div>
          <div className="product-price-wrapper">
            <span>
              <LoaderMask style={{ width: '80px', height: '15px' }} />
            </span>
          </div>
          <div className="action-buttons-wrapper">
            <LoaderMask
              style={{
                width: '150px',
                height: '50px',
                borderRadius: '30px',
              }}
            />
            <LoaderMask
              style={{
                width: '150px',
                height: '50px',
                borderRadius: '30px',
              }}
            />
          </div>
        </div>
      </ItemWrapper>
    </ItemContainer>
  );
};

export const LoaderMask = styled.div`
  border-radius: 5px;
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

export default Loader;
