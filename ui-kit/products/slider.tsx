import Image from 'next/image';
import variants from 'components/store/lib/variants';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { wrap } from 'popmotion';
import styled from 'styled-components';
import { Product } from 'swagger/services';
import { handlePagination } from './helpers';
import {
  UseImagePaginat,
  handleDragEnd,
} from 'components/store/storeLayout/helpers';
import { sizesNum } from 'components/store/lib/Devices';

import { useEffect, useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import {
  clearSearchProducts,
  clearSearchQuery,
} from 'redux/slicers/store/globalSlicer';
import { SWIPE_CONFIDENCE_THRESHOLD } from './constants';
import ZoomFullScreen from 'ui-kit/ZoomFullScreen';

type Props = {
  url?: string;
  images: string[];
  product: Product;
  windowWidth: number;
  zoom?: boolean;
  setZoom?: any;
  imageIndex?: any;
  setZoomImgSrc?: any;
  zoomImgSrc?: string;
};

const Slider: React.FC<Props> = ({ product, url, images, windowWidth }) => {
  const [page, direction, setPage, paginateImage] = UseImagePaginat();
  const imageIndex = wrap(0, images.length, page);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const dispatch = useAppDispatch();
  const [zoomImgSrc, setZoomImgSrc] = useState(images[imageIndex]);
  const [zoom, setZoom] = useState(false);
  const [loadingComplet, setLoadingComplet] = useState(false);
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
          minMaxheight: windowWidth - 100,
          minMaxWidth: windowWidth - 100,
          width: 100,
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
  useEffect(() => {
    setWrapperSizes({
      minMaxWidth: calculateImageSize(windowWidth).minMaxWidth,
      minMaxheight: calculateImageSize(windowWidth).minMaxheight,
      width: calculateImageSize(windowWidth).width,
    });
  }, [windowWidth]);

  return (
    <>
      <ImageSliderWrapper
        style={{
          minWidth: `${wrapperSizes.minMaxWidth}px`,
          maxWidth: `${wrapperSizes.minMaxWidth}px`,
          minHeight: `${wrapperSizes.minMaxheight}px`,
          maxHeight: `${wrapperSizes.minMaxheight}px`,
          width: `${wrapperSizes.width}%`,
        }}
      >
        <Link
          onClick={() => {
            // handleHistory(product.id);
            dispatch(clearSearchQuery());
            dispatch(clearSearchProducts());
          }}
          href={`/product/${url}`}
          aria-label={product.name}
          prefetch={false}
        >
          <AnimatePresence initial={false} custom={direction}>
            <ImageSliderSlide
              key={`slider-image${imageIndex}`}
              custom={direction}
              variants={variants.slider}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={handleDragEnd(
                paginateImage,
                SWIPE_CONFIDENCE_THRESHOLD,
              )}
            >
              <LoaderMask
                style={{ display: loadingComplet ? 'none' : 'flex' }}
              />
              <ImageSlider
                style={{
                  opacity: loadingComplet ? 1 : 0,
                  position: loadingComplet ? 'inherit' : 'absolute',
                  zIndex: loadingComplet ? 1 : -1,
                }}
                alt={`${product.name}`}
                src={`/api/images/${images[imageIndex]}`}
                width={0}
                height={0}
                sizes="100vw"
                loading="lazy"
                priority={false}
                onLoadingComplete={() => setLoadingComplet(true)}
              />
            </ImageSliderSlide>
          </AnimatePresence>

          {windowWidth > 1024 ? (
            <ul className="image-scroll-wrapper">
              {images.map((images, index) => {
                return (
                  <li
                    onMouseOver={() =>
                      handlePagination(
                        index,
                        currentSlide,
                        setCurrentSlide,
                        paginateImage,
                      )
                    }
                    key={index}
                    className="image-index"
                  ></li>
                );
              })}
            </ul>
          ) : (
            <ul className="image-indecator-mobile">
              {images.map((image, index) => {
                return (
                  <li
                    key={index}
                    className="indecator"
                    style={{
                      backgroundColor:
                        imageIndex == index ? '#000000' : 'transparent',
                    }}
                  ></li>
                );
              })}
            </ul>
          )}
        </Link>
        <ZoomFullScreen
          images={images}
          imageIndex={imageIndex}
          zoom={zoom}
          setZoom={setZoom}
          zoomImgSrc={zoomImgSrc}
          setZoomImgSrc={setZoomImgSrc}
          zoomStyles="bottom: 0; right: 0; justify-content: flex-end; align-items: center; padding: 0 5px 5px 0;"
        />
      </ImageSliderWrapper>
    </>
  );
};

const LoaderMask = styled.div`
  width: 100%;
  height: 100%;
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

export const ImageSliderWrapper = styled(motion.div)`
  height: 100%;
  position: relative;
  overflow: hidden;
  .image-scroll-wrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: transparent;
    z-index: 2;
    .image-index {
      width: 100%;
      height: 100%;
      background: transparent;
    }
  }

  .image-indecator-mobile {
    width: 100%;
    position: absolute;
    bottom: 5px;
    left: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: transparent;
    gap: 5px;
    z-index: 2;
    .indecator {
      width: 6px;
      height: 6px;
      border: 1px solid;
      border-radius: 50%;
    }
  }
  a {
    display: flex;
    width: 100%;
    height: 100%;
  }

  .not-found {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: contain;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
`;

export const ImageSliderSlide = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageSlider = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default Slider;
