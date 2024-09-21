import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { AnimatePresence, motion } from 'framer-motion';
import { wrap } from 'popmotion';
import { memo, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
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
import Image from 'next/image';
import { ArrowSVG } from 'assets/icons/UI-icons';

type Props = {
  slides: Slide[];
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
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <SliderWrapper key="slider-home-banners" imgHeight={`${imgHeight}`}>
      <Link
        href={slides![imageIndex]?.link!}
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
          <SliderSlide
            key={page}
            custom={direction}
            variants={variants.slider}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: {
                type: 'spring',
                stiffness: 300,
                damping: 30,
                duration: 0.1,
              },
              opacity: { duration: 0.3 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd(paginateImage, SWIPE_CONFIDENCE_THRESHOLD)}
          >
            <ImageLoader
              style={{
                display: imageLoaded ? 'none' : 'flex',
              }}
            />
            <Slider
              style={{ display: imageLoaded ? 'block' : 'none' }}
              ref={imgRef}
              alt={`${slides[imageIndex]?.link}`}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = '/img_not_found.png';
                currentTarget.className = 'error_img';
              }}
              src={`/api/images/${slides[imageIndex]?.image}`}
              isDisplay={
                isCatalogOpen ||
                isSearchFormActive ||
                isWishlistOpen ||
                isBasketOpen ||
                isAuthFormOpen ||
                !!searchQuery
              }
              width={0}
              height={0}
              sizes="100vw"
              onLoadingComplete={(img) =>
                img.naturalWidth ? setImageLoaded(true) : setImageLoaded(false)
              }
              priority={true}
            />
          </SliderSlide>
        </AnimatePresence>
        <div className="banner-arrows-wrapper">
          <ArrowBtns
            whileHover="hover"
            whileTap="tap"
            custom={1.1}
            variants={variants.grow}
            boxshadow="transparent"
            bgcolor={color.glassmorphismSeconderBG}
            filterdropback="blur"
            onClick={(e) => {
              e.preventDefault();
              paginateImage(1);
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
            boxshadow="transparent"
            bgcolor={color.glassmorphismSeconderBG}
            filterdropback="blur"
            onClick={(e) => {
              e.preventDefault();
              paginateImage(-1);
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
        {slides
          ? slides!.map((slideImg, index) => {
              return (
                <span
                  className={`dots-indecator ${
                    imageIndex == index ? 'active' : ''
                  }`}
                ></span>
              );
            })
          : ''}
      </div>
    </SliderWrapper>
  );
};

const ImageLoader = styled.div`
  width: 100vw;
  height: 80vh;
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
  @media ${devices.laptopL} {
    height: 50vh;
  }
  @media ${devices.laptopM} {
    height: 50vh;
  }
  @media ${devices.laptopS} {
    height: 50vh;
  }
  @media ${devices.tabletL} {
    height: 50vh;
  }
  @media ${devices.tabletS} {
    height: 50vh;
  }
  @media ${devices.mobileL} {
    height: 50vh;
  }
  @media ${devices.mobileM} {
    height: 50vh;
  }
  @media ${devices.mobileS} {
    height: 50vh;
  }
`;

const SliderWrapper = styled.div<StyleProps>`
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
// const img = styled(motion(Image));
const SliderSlide = styled(motion.div)`
  width: 100%;
  height: 100%;
`;
const Slider = styled(Image)<StyleProps>`
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
