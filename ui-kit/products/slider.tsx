import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { wrap } from 'popmotion';
import styled from 'styled-components';
import { Product } from 'swagger/services';
import { handleHistory, handlePagination } from './helpers';
import { UseImagePaginat } from 'components/store/storeLayout/helpers';
import { devices } from 'components/store/lib/Devices';

import { useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import {
  clearSearchProducts,
  clearSearchQuery,
} from 'redux/slicers/store/globalSlicer';
type Props = {
  url?: string;
  images: string[];
  product: Product;
};

const Slider: React.FC<Props> = ({ product, url, images }) => {
  const [page, direction, setPage, paginateImage] = UseImagePaginat();
  const imageIndex = wrap(0, images.length, page);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const dispatch = useAppDispatch();
  return (
    <>
      <ImageSliderWrapper>
        <Link
          onClick={() => {
            handleHistory(product.id);
            dispatch(clearSearchQuery());
            dispatch(clearSearchProducts());
          }}
          href={`/product/${url}`}
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
                y: {
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                },
                opacity: { duration: 0.4 },
              }}
              // drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={1}
              // onDragEnd={handleDragEnd(
              //   paginateImage,
              //   SWIPE_CONFIDENCE_THRESHOLD,
              // )}
              // whileHover={{ scale: 1.2 }}
              // whileTap={{ scale: 1 }}
              alt={product.name}
              src={`/api/images/${images[imageIndex]}`}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = '/img_not_found.png';
                currentTarget.className = 'not-found';
              }}
            />
          </AnimatePresence>
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
        </Link>
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
    min-height: 300px;
    max-height: 300px;
    min-width: 300px;
    max-width: 300px;
  }

  @media ${devices.laptopS} {
    min-height: 365px;
    max-height: 365px;
    min-width: 365px;
    max-width: 365px;
  }

  @media ${devices.tabletL} {
    min-height: 210px;
    max-height: 210px;
    min-width: 210px;
    max-width: 210px;
  }
  @media ${devices.tabletS} {
    min-height: 150px;
    max-height: 150px;
    min-width: 150px;
    max-width: 150px;
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

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 1;
  padding: 15px;
  background: ${color.glassmorphismSeconderBG};
  backdrop-filter: blur(9px);
  border-radius: 8px;
  span {
    color: ${color.textPrimary};
    font-weight: 200;
  }
`;

export default Slider;
