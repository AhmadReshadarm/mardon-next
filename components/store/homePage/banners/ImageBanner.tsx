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
import { useAppSelector } from 'redux/hooks';
import { TGlobalUIState, TGlobalState } from 'redux/types';
import { devices } from 'components/store/lib/Devices';

type Props = {
  slides: Slide[] | undefined;
};
interface StyleProps {
  isDisplay: boolean;
}
const ImageBanner: React.FC<Props> = ({ slides }) => {
  const [page, direction, setPage, paginateImage] = UseImagePaginat();
  const imageIndex = wrap(0, Number(slides?.length), page);
  const [userIntract, setUserIntract] = useState(false);
  let timer;
  useEffect(() => {
    if (!userIntract) {
      timer = setTimeout(() => {
        paginateImage(1);
        // setImageIndexForDots(imageIndex);
      }, 10000);
    }
    return () => {
      if (userIntract) window.clearTimeout(timer);
    };
  });
  // const [imageIndexForDots, setImageIndexForDots] = useState(0);
  const {
    isCatalogOpen,
    isSearchFormActive,
    isWishlistOpen,
    isBasketOpen,
    isAuthFormOpen,
  } = useAppSelector<TGlobalUIState>((state) => state.globalUI);
  const { searchQuery } = useAppSelector<TGlobalState>((state) => state.global);
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
            alt={slides![imageIndex]?.link}
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
            isDisplay={
              isCatalogOpen ||
              isSearchFormActive ||
              isWishlistOpen ||
              isBasketOpen ||
              isAuthFormOpen ||
              !!searchQuery
            }
          />
        </AnimatePresence>
      </Link>
      <div className="banner-arrows-wrapper">
        <ArrowBtns
          whileHover="hover"
          whileTap="tap"
          custom={1.1}
          variants={variants.grow}
          right="0"
          top="50%"
          position="absolute"
          boxshadow="transparent"
          bgcolor={color.glassmorphismSeconderBG}
          filterdropback="blur"
          onClick={() => {
            paginateImage(1);
            setUserIntract(true);
            // setImageIndexForDots(imageIndex);
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
          left="0"
          top="50%"
          position="absolute"
          boxshadow="transparent"
          bgcolor={color.glassmorphismSeconderBG}
          filterdropback="blur"
          onClick={() => {
            paginateImage(-1);
            setUserIntract(true);
            // setImageIndexForDots(imageIndex);
          }}
        >
          <ArrowSpan rotate="180">
            <ArrowSVG />
          </ArrowSpan>
        </ArrowBtns>
      </div>
    </SliderWrapper>
  );
};

const SliderWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  over-flow: hidden;
  .error_img {
    object-fit: cover;
    height: 400px;
  }
  .banner-arrows-wrapper {
    width: 100%;
    height: 100%;
    max-width: 1500px;
    position: relative;
  }
  @media ${devices.laptopL} {
    .banner-arrows-wrapper {
      max-width: 1230px;
    }
  }
  @media ${devices.laptopM} {
    .banner-arrows-wrapper {
      width: 95%;
      max-width: unset;
    }
  }
  @media ${devices.laptopS} {
    .banner-arrows-wrapper {
      width: 95%;
      max-width: unset;
    }
  }
  @media ${devices.tabletL} {
    .banner-arrows-wrapper {
      width: 95%;
      max-width: unset;
    }
  }
  @media ${devices.tabletS} {
    .banner-arrows-wrapper {
      width: 95%;
      max-width: unset;
    }
  }
  @media ${devices.mobileL} {
    .banner-arrows-wrapper {
      width: 95%;
      max-width: unset;
    }
  }
  @media ${devices.mobileM} {
    .banner-arrows-wrapper {
      width: 95%;
      max-width: unset;
    }
  }
  @media ${devices.mobileS} {
    .banner-arrows-wrapper {
      width: 95%;
      max-width: unset;
    }
  }
`;

const Slider = styled(motion.img)<StyleProps>`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  object-fit: cover;
  ${(props) => {
    if (props.isDisplay) {
      return `
         -webkit-filter: grayscale(100%);
        filter: grayscale(100%);
      `;
    }
  }}
  @media ${devices.laptopL} {
    object-fit: contain;
  }
  @media ${devices.laptopM} {
    object-fit: contain;
  }
  @media ${devices.laptopS} {
    object-fit: contain;
  }
  @media ${devices.tabletL} {
    object-fit: contain;
  }
  @media ${devices.tabletS} {
    object-fit: contain;
  }
  @media ${devices.mobileL} {
    object-fit: contain;
  }
  @media ${devices.mobileM} {
    object-fit: contain;
  }
  @media ${devices.mobileS} {
    object-fit: contain;
  }
`;

export default memo(ImageBanner);
