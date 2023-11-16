import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { AnimatePresence, motion } from 'framer-motion';
import { wrap } from 'popmotion';
import { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import ArrowSVG from '../../../../assets/arrow_white.svg';
import { ArrowBtns, ArrowSpan } from 'ui-kit/ArrowBtns';
import { SWIPE_CONFIDENCE_THRESHOLD } from './constants';
import Link from 'next/link';
import {
  UseImagePaginat,
  handleDragEnd,
} from 'components/store/storeLayout/helpers';
import { Slide } from 'swagger/services';
import { devices } from 'components/store/lib/Devices';

type Props = {
  slides: Slide[] | undefined;
};

const ImageBanner: React.FC<Props> = ({ slides }) => {
  const [page, direction, setPage, paginateImage] = UseImagePaginat();
  const imageIndex = wrap(0, Number(slides?.length), page);
  const [userIntract, setUserIntract] = useState(false);
  let timer;
  useEffect(() => {
    if (!userIntract) {
      timer = setTimeout(() => {
        paginateImage(1);
        setImageIndexForDots(imageIndex);
      }, 10000);
    }
    return () => {
      if (userIntract) window.clearTimeout(timer);
    };
  });
  const [imageIndexForDots, setImageIndexForDots] = useState(0);
  return (
    <SliderWrapper
      key="slider-home-banners"
      custom={0.3}
      initial="init"
      animate="animate"
      exit={{ y: -80, opacity: 0, transition: { delay: 0.02 } }}
      variants={variants.fadInSlideUp}
    >
      <Link
        href={
          slides && slides[imageIndex]?.link ? slides[imageIndex]?.link! : ''
        }
      >
        <AnimatePresence initial={false} custom={direction}>
          <Slider
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = '/img_not_found.png';
              currentTarget.className = 'error_img';
            }}
            key={page}
            src={slides ? `/api/images/${slides[imageIndex]?.image}` : ''}
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
            onDragEnd={handleDragEnd(paginateImage, SWIPE_CONFIDENCE_THRESHOLD)}
            onDrag={() => setUserIntract(true)}
          />
        </AnimatePresence>
      </Link>
      <ArrowBtns
        whileHover="hover"
        whileTap="tap"
        custom={1.1}
        variants={variants.grow}
        right="10%"
        top="auto"
        position="absolute"
        boxshadow="transparent"
        bgcolor={color.glassmorphismSeconderBG}
        filterdropback="blur"
        onClick={() => {
          paginateImage(1);
          setUserIntract(true);
          setImageIndexForDots(imageIndex);
        }}
      >
        <ArrowSpan rotate="0">
          <ArrowSVG />
        </ArrowSpan>
      </ArrowBtns>
      <ArrowBtns
        whileHover="hover"
        whileTap="tap"
        custom={1.1}
        variants={variants.grow}
        left="10%"
        top="auto"
        position="absolute"
        boxshadow="transparent"
        bgcolor={color.glassmorphismSeconderBG}
        filterdropback="blur"
        onClick={() => {
          paginateImage(-1);
          setUserIntract(true);
          setImageIndexForDots(imageIndex);
        }}
      >
        <ArrowSpan rotate="180">
          <ArrowSVG />
        </ArrowSpan>
      </ArrowBtns>
      <div className="dots-wrapper">
        {slides?.map((item, index) => {
          return (
            <span
              className="image-dots"
              key={index}
              style={{
                backgroundColor:
                  index == imageIndexForDots ? '#606060' : '#d0d3cb',
              }}
            ></span>
          );
        })}
      </div>
    </SliderWrapper>
  );
};

const SliderWrapper = styled(motion.div)`
  width: 100%;
  height: 500px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .error_img {
    object-fit: contain;
    height: 400px;
  }
  .dots-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 15px;
    position: absolute;
    bottom: -30px;
    z-index: 2;
    .image-dots {
      padding: 3px;
      border-radius: 50%;
      background-color: #d0d3cb;
    }
  }
`;

const Slider = styled(motion.img)`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  object-fit: cover;
`;

export default memo(ImageBanner);
