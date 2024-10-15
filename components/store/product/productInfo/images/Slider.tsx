import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import variants from 'components/store/lib/variants';
import { handleDragEnd } from './helpers';
import { SWIPE_CONFIDENCE_THRESHOLD } from '../../constants';
import { useEffect, useState } from 'react';
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
};

const Slider: React.FC<Props> = ({
  images,
  selectedIndex,
  setSelectedIndex,
  direction,
  page,
  paginateImage,
  alt,
}) => {
  const [zoomImgSrc, setZoomImgSrc] = useState(images[selectedIndex]);
  const [zoom, setZoom] = useState(false);

  const [loadingComplet, setLoadingComplet] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

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

  const [imageSrc, setImageSrc] = useState(
    `/api/images/compress/${images[selectedIndex]}?qlty=1&width=${
      windowWidth < 1024 ? windowWidth : 1080
    }&height=${windowWidth < 1024 ? windowWidth : 1080}&lossless=false`,
  );

  useEffect(() => {
    if (!firstLoad) {
      setImageSrc(`/api/images/${images[selectedIndex]}`);
    }
  }, [selectedIndex, firstLoad]);

  useEffect(() => {
    setTimeout(() => {
      setFirstLoad(false);
    }, 5000);
  }, []);

  return (
    <SliderWrapper>
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
          <LoaderMask style={{ display: loadingComplet ? 'none' : 'flex' }} />
          <SliderImage
            style={{ opacity: loadingComplet ? 1 : 0 }}
            src={imageSrc}
            alt={alt}
            itemProp="contentUrl"
            width={1080}
            height={1080}
            onLoadingComplete={() => {
              setLoadingComplet(true);
              setTimeout(() => {
                setFirstLoad(false);
              }, 2000);
            }}
            priority={true}
          />
        </SliderSlide>
      </AnimatePresence>

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

export const SliderWrapper = styled.div`
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
