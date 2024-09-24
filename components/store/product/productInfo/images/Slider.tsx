import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
// import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
// import { SliderImage } from '../../common';
import { handleDragEnd } from './helpers';
import { SWIPE_CONFIDENCE_THRESHOLD } from '../../constants';
import { Product } from 'swagger/services';
// import { ArrowBtns } from 'ui-kit/ArrowBtns';
import { Dispatch, SetStateAction, useState } from 'react';
import { PopupDisplay } from 'components/store/storeLayout/constants';
// import { handleMenuState } from 'components/store/storeLayout/helpers';
import { devices } from 'components/store/lib/Devices';
import ZoomFullScreen from 'ui-kit/ZoomFullScreen';
import Image from 'next/image';
type Props = {
  images: string[];
  selectedIndex: number;
  setSelectedIndex: any;
  direction: number;
  page: number;
  paginateImage: any;
  alt: any;
  // product?: Product;
  // setIsOpened: Dispatch<SetStateAction<boolean>>;
  // setDisplay: Dispatch<SetStateAction<PopupDisplay>>;
  // isOpened?: boolean;
};

const Slider: React.FC<Props> = ({
  images,
  selectedIndex,
  setSelectedIndex,
  direction,
  page,
  paginateImage,
  alt,
  // product,
  // setIsOpened,
  // setDisplay,
  // isOpened,
}) => {
  const [zoomImgSrc, setZoomImgSrc] = useState(images[selectedIndex]);
  const [zoom, setZoom] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <SliderWrapper
      key="slider-product-page"
      custom={0.3}
      initial="init"
      animate="animate"
      exit={{ y: -80, opacity: 0, transition: { delay: 0.1 } }}
      variants={variants.fadInSlideUp}
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
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={handleDragEnd(
            paginateImage,
            SWIPE_CONFIDENCE_THRESHOLD,
            images.length - 1,
            setSelectedIndex,
            selectedIndex,
          )}
        >
          <ImageLoader
            style={{
              display: imageLoaded ? 'none' : 'flex',
            }}
          />
          <SliderImage
            style={{ display: imageLoaded ? 'block' : 'none' }}
            src={`/api/images/${images[selectedIndex]}`}
            alt={alt}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = '/img_not_found.png';
            }}
            itemProp="contentUrl"
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

      {/* <div
        style={{ display: isOpened ? 'none' : '' }}
        className="fullscreen-btn-parrent"
      >
        <ArrowBtns
          style={{
            background: color.glassmorphismSeconderBG,
            backdropFilter: 'blur(9px)',
            position: 'relative',
          }}
          onClick={handleMenuState(setIsOpened, setDisplay)}
        >
          <img
            style={{ width: '50%' }}
            src="/icons/full_screen.png"
            alt="fullscreen mode"
          />
        </ArrowBtns>
      </div> */}
      <ul className="image-indecator-mobile">
        {images.map((image, index) => {
          return (
            <li
              key={index}
              className="indecator"
              style={{
                backgroundColor:
                  selectedIndex == index ? '#000000' : 'transparent',
              }}
            ></li>
          );
        })}
      </ul>
      <ZoomFullScreen
        images={images}
        imageIndex={selectedIndex}
        zoom={zoom}
        setZoom={setZoom}
        zoomImgSrc={zoomImgSrc}
        setZoomImgSrc={setZoomImgSrc}
        zoomStyles="bottom: 30px; left: 30px; justify-content: flex-start; align-items: center;"
      />
    </SliderWrapper>
  );
};

const ImageLoader = styled.div`
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

const SliderSlide = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  left: auto;
  top: auto;
`;

const SliderImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const SliderWrapper = styled(motion.div)`
  width: 600px;
  height: 600px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  overflow: hidden;

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
  .fullscreen-btn-parrent {
    position: absolute;
    bottom: 30px;
    left: 30px;
  }
  @media ${devices.laptopM} {
    width: 500px;
    height: 500px;
  }
  @media ${devices.laptopS} {
    width: 100%;
    height: 500px;
  }
  @media ${devices.tabletL} {
    width: 100%;
    height: 350px;
  }
  @media ${devices.tabletS} {
    width: 100%;
    height: 350px;
  }
  @media ${devices.mobileL} {
    width: 100%;
    height: 300px;
  }
  @media ${devices.mobileM} {
    width: 100%;
    height: 280px;
  }
  @media ${devices.mobileS} {
    width: 100%;
    height: 280px;
  }
`;

export default Slider;
