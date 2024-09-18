import variants from 'components/store/lib/variants';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { wrap } from 'popmotion';
import styled from 'styled-components';
import { Product } from 'swagger/services';
import { handleHistory, handlePagination } from './helpers';
import {
  UseImagePaginat,
  handleDragEnd,
} from 'components/store/storeLayout/helpers';
import { devices } from 'components/store/lib/Devices';

import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import {
  clearSearchProducts,
  clearSearchQuery,
} from 'redux/slicers/store/globalSlicer';
import { SWIPE_CONFIDENCE_THRESHOLD } from './constants';
import { Image } from 'antd';
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

type StyleProps = {
  cardWidth: number;
};

const Slider: React.FC<Props> = ({ product, url, images, windowWidth }) => {
  const [page, direction, setPage, paginateImage] = UseImagePaginat();
  const imageIndex = wrap(0, images.length, page);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const dispatch = useAppDispatch();
  const [zoomImgSrc, setZoomImgSrc] = useState(images[imageIndex]);
  const [zoom, setZoom] = useState(false);

  return (
    <>
      <ImageSliderWrapper cardWidth={windowWidth}>
        <Link
          onClick={() => {
            handleHistory(product.id);
            dispatch(clearSearchQuery());
            dispatch(clearSearchProducts());
          }}
          href={`/product/${url}`}
          aria-label={product.name}
        >
          <AnimatePresence initial={false} custom={direction}>
            <ImageSlider
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
              alt={product.shortDesc}
              src={`/api/images/${images[imageIndex]}`}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = '/img_not_found.png';
                currentTarget.className = 'not-found';
              }}
            />
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
const ImageSliderWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  min-height: 300px;
  min-width: 300px;
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

  @media ${devices.laptopM} {
    min-height: calc(${(p: StyleProps) => p.cardWidth / 3}px - 90px);
    max-height: calc(${(p: StyleProps) => p.cardWidth / 3}px - 90px);
    min-width: calc(${(p: StyleProps) => p.cardWidth / 3}px - 70px);
    max-width: calc(${(p: StyleProps) => p.cardWidth / 3}px - 70px);
  }

  @media ${devices.laptopS} {
    min-height: calc(${(p: StyleProps) => p.cardWidth / 2}px - 90px);
    max-height: calc(${(p: StyleProps) => p.cardWidth / 2}px - 90px);
    min-width: calc(${(p: StyleProps) => p.cardWidth / 2}px - 70px);
    max-width: calc(${(p: StyleProps) => p.cardWidth / 2}px - 70px);
  }

  @media ${devices.tabletL} {
    min-height: calc(${(p: StyleProps) => p.cardWidth / 2}px - 90px);
    max-height: calc(${(p: StyleProps) => p.cardWidth / 2}px - 90px);
    min-width: calc(${(p: StyleProps) => p.cardWidth / 2}px - 70px);
    max-width: calc(${(p: StyleProps) => p.cardWidth / 2}px - 70px);
  }
  @media ${devices.tabletS} {
    // min-height: calc(${(p: StyleProps) => p.cardWidth / 2}px - 70px);
    // max-height: calc(${(p: StyleProps) => p.cardWidth / 2}px - 70px);
    // min-width: calc(${(p: StyleProps) => p.cardWidth / 2}px - 50px);
    // max-width: calc(${(p: StyleProps) => p.cardWidth / 2}px - 50px);
    min-height: unset;
    max-height: unset;
    min-width: unset;
    max-width: unset;
    width: 95%;
  }

  @media ${devices.mobileL} {
    min-height: unset;
    max-height: unset;
    min-width: unset;
    max-width: unset;
    width: 95%;
  }
  @media ${devices.mobileM} {
    min-height: unset;
    max-height: unset;
    min-width: unset;
    max-width: unset;
    width: 95%;
  }

  @media ${devices.mobileS} {
    min-height: unset;
    max-height: unset;
    min-width: unset;
    max-width: unset;
    width: 95%;
  }
`;

const ImageSlider = styled(motion.img)`
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Slider;
