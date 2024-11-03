import { motion, AnimatePresence } from 'framer-motion';
import variants from 'components/store/lib/variants';
import { handleDragEnd } from './helpers';
import { SWIPE_CONFIDENCE_THRESHOLD } from '../../constants';
import { useEffect, useState } from 'react';
import ZoomFullScreen from 'ui-kit/ZoomFullScreen';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import styles from '../../styles/images.module.css';
import { ZoomSVG } from 'assets/icons/UI-icons';
type Props = {
  images: string[];
  selectedIndex: number;
  setSelectedIndex: any;
  direction: number;
  page: number;
  paginateImage: any;
  alt: any;
  firstLoad: boolean;
  setFirstLoad: Dispatch<SetStateAction<boolean>>;
  base64Image: any;
};

const Slider: React.FC<Props> = ({
  images,
  selectedIndex,
  setSelectedIndex,
  direction,
  page,
  paginateImage,
  alt,
  firstLoad,
  setFirstLoad,
  base64Image,
}) => {
  const [zoomImgSrc, setZoomImgSrc] = useState(images[selectedIndex]);
  const [zoom, setZoom] = useState(false);

  const [imageSrc, setImageSrc] = useState(base64Image);

  useEffect(() => {
    if (!firstLoad) {
      setImageSrc(images[selectedIndex]);
    }
  }, [selectedIndex, firstLoad]);

  // --------------------------------------------
  useEffect(() => {
    function hideOnClickOutside(element1, element2) {
      const outsideClickListener = (event) => {
        if (
          !element1.contains(event.target) &&
          !element2.contains(event.target) &&
          isVisible(element1) &&
          isVisible(element2)
        ) {
          setZoom(false);
        }
      };
      document.addEventListener('click', outsideClickListener);
    }

    const isVisible = (elem) =>
      !!elem &&
      !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);

    setTimeout(() => {
      if (zoom) {
        let zoomImg = document.querySelector('.ant-image-preview-img');
        let zoomCtr = document.querySelector('.ant-image-preview-operations');
        hideOnClickOutside(zoomImg, zoomCtr);
      }
    }, 300);
  }, [zoom]);

  return (
    <div
      className={styles.SliderWrapper}
      onTouchStart={() => setFirstLoad(false)}
    >
      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.div
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
          className={styles.SliderSlide}
        >
          <Image
            src={imageSrc}
            alt={alt}
            itemProp="contentUrl"
            width={1080}
            height={1080}
            priority={true}
            className={styles.SliderImage}
          />
        </motion.div>
      </AnimatePresence>

      <ul className={styles.image_indecator_mobile}>
        {images.map((image, index) => {
          return (
            <li
              key={index}
              className={styles.indecator}
              style={{
                backgroundColor:
                  selectedIndex == index ? '#000000' : 'transparent',
              }}
            ></li>
          );
        })}
      </ul>

      <div className={styles.ImageZoomButtonWrapper}>
        <button
          onClick={(e) => {
            e.preventDefault();
            setZoom(true);
            setZoomImgSrc(images[selectedIndex]);
            setTimeout(() => {
              const btnImg: any = document.querySelector('.hidden-image-zoom');
              btnImg.click();
            }, 300);
          }}
          className={styles.ImageZoomButton}
          title="Увеличить до полного экрана"
          type="button"
        >
          <ZoomSVG />
        </button>
      </div>
      {zoom ? <ZoomFullScreen zoomImgSrc={zoomImgSrc} /> : ''}
    </div>
  );
};

export default Slider;
