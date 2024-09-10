import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { AnimatePresence, motion } from 'framer-motion';
import { wrap } from 'popmotion';
import { memo, useEffect, useRef, useState } from 'react';
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
  isDisplay?: boolean;
  imgHeight?: string;
}
const ImageBanner: React.FC<Props> = ({ slides }) => {
  const [page, direction, setPage, paginateImage] = UseImagePaginat();
  const imageIndex = wrap(0, Number(slides?.length), page);
  // const [userIntract, setUserIntract] = useState(false);
  const imgRef = useRef<HTMLDivElement | any>(null);

  // let timer;
  // useEffect(() => {
  //   if (!userIntract) {
  //     timer = setTimeout(() => {
  //       paginateImage(1);
  //     }, 10000);
  //   }

  //   return () => {
  //     if (userIntract) window.clearTimeout(timer);
  //   };
  // });

  const [imgHeight, setImgHeight] = useState();

  useEffect(() => {
    setImgHeight(imgRef.current.clientHeight);
    const handleWindowResize = () => {
      setImgHeight(imgRef.current.clientHeight);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

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
      imgHeight={`${imgHeight}`}
    >
      <Link
        href={
          slides && slides[imageIndex]?.link ? slides[imageIndex]?.link! : ''
        }
        className="banner-image-link-wrapper"
        onClick={(evt) => {
          isCatalogOpen ||
          isSearchFormActive ||
          isWishlistOpen ||
          isBasketOpen ||
          isAuthFormOpen ||
          !!searchQuery
            ? evt.preventDefault()
            : '';
        }}
      >
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <Slider
            ref={imgRef}
            alt={slides![imageIndex]?.link}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = '/img_not_found.png';
              currentTarget.className = 'error_img';
            }}
            key={page}
            src={`/api/images/${slides![imageIndex]?.image}`}
            custom={direction}
            variants={variants.slider}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30, duration: 0.1 },
              opacity: { duration: 0.4 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd(paginateImage, SWIPE_CONFIDENCE_THRESHOLD)}
            // onDrag={() => {
            //   setUserIntract(true);
            //   setTimeout(() => {
            //     setUserIntract(false);
            //   }, 10000);
            // }}
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
        <div className="banner-arrows-wrapper">
          <ArrowBtns
            whileHover="hover"
            whileTap="tap"
            custom={1.1}
            variants={variants.grow}
            // right="0"
            // top="50%"
            // position="absolute"
            boxshadow="transparent"
            bgcolor={color.glassmorphismSeconderBG}
            filterdropback="blur"
            onClick={(e) => {
              e.preventDefault();
              paginateImage(1);
              // setUserIntract(true);
              // setTimeout(() => {
              //   setUserIntract(false);
              // }, 10000);
              // setImageIndexForDots(imageIndex);
            }}
            title="следующий слайд"
            aria-label="следующий слайд"
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
            // left="0"
            // top="50%"
            // position="absolute"
            boxshadow="transparent"
            bgcolor={color.glassmorphismSeconderBG}
            filterdropback="blur"
            onClick={(e) => {
              e.preventDefault();
              paginateImage(-1);
              // setUserIntract(true);
              // setTimeout(() => {
              //   setUserIntract(false);
              // }, 10000);
              // setImageIndexForDots(imageIndex);
            }}
            title="предыдущий слайд"
            aria-label="предыдущий слайд"
          >
            <ArrowSpan rotate="180">
              <ArrowSVG />
            </ArrowSpan>
          </ArrowBtns>
        </div>
      </Link>
      <div className="dots-indecator-wrapper">
        {slides!.map((slideImg, index) => {
          return (
            <span
              className={`dots-indecator ${
                imageIndex == index ? 'active' : ''
              }`}
            ></span>
          );
        })}
      </div>
    </SliderWrapper>
  );
};

const SliderWrapper = styled(motion.div)<StyleProps>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  .banner-image-link-wrapper {
    width: 100%;
    height: 100%;
    ${(props) => {
      return `
      min-height:${props.imgHeight}px;
      `;
    }}
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    .error_img {
      object-fit: contain;
      width: 90%;
      height: 100%;
    }

    .banner-arrows-wrapper {
      width: 100%;
      height: 100%;
      max-width: 1500px;
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      justify-content: space-between;
      position: absolute;
    }
  }

  .dots-indecator-wrapper {
    width: 100%;
    display: none;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 10px;
    .dots-indecator {
      width: 6px;
      height: 6px;
      border: 1px solid;
      border-radius: 50%;
    }
    .active {
      background-color: ${color.activeIcons};
    }
  }

  @media ${devices.laptopL} {
    .banner-image-link-wrapper {
      .banner-arrows-wrapper {
        max-width: 1230px;
      }
    }
  }
  @media ${devices.laptopM} {
    .banner-image-link-wrapper {
      .banner-arrows-wrapper {
        width: 95%;
        max-width: unset;
      }
    }
  }
  @media ${devices.laptopS} {
    .banner-image-link-wrapper {
      .banner-arrows-wrapper {
        width: 95%;
        max-width: unset;
      }
    }
  }
  @media ${devices.tabletL} {
    .banner-image-link-wrapper {
      .banner-arrows-wrapper {
        display: none;
      }
    }
    .dots-indecator-wrapper {
      display: flex;
    }
  }
  @media ${devices.tabletS} {
    .banner-image-link-wrapper {
      .banner-arrows-wrapper {
        display: none;
      }
    }
    .dots-indecator-wrapper {
      display: flex;
    }
  }
  @media ${devices.mobileL} {
    .banner-image-link-wrapper {
      .banner-arrows-wrapper {
        display: none;
      }
    }
    .dots-indecator-wrapper {
      display: flex;
    }
  }
  @media ${devices.mobileM} {
    .banner-image-link-wrapper {
      .banner-arrows-wrapper {
        display: none;
      }
    }
    .dots-indecator-wrapper {
      display: flex;
    }
  }
  @media ${devices.mobileS} {
    .banner-image-link-wrapper {
      .banner-arrows-wrapper {
        display: none;
      }
    }
    .dots-indecator-wrapper {
      display: flex;
    }
  }
`;

const Slider = styled(motion.img)<StyleProps>`
  width: 100%;
  height: 100%;
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
