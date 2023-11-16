import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { SliderImage } from '../../common';
import { handleDragEnd } from './helpers';
import { SWIPE_CONFIDENCE_THRESHOLD } from '../../constants';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { Product } from 'swagger/services';
import { TWishlistState } from 'redux/types';
import { ArrowBtns } from 'ui-kit/ArrowBtns';
import { AddToWishlist } from 'ui-kit/ProductActionBtns';
import { TrigerhandleWishBtnClick } from 'components/store/storeLayout/utils/SearchBar/helpers';
import {
  checkIfItemInWishlist,
  handleWishBtnClick,
} from 'ui-kit/products/helpers';
import { Dispatch, SetStateAction } from 'react';
import { PopupDisplay } from 'components/store/storeLayout/constants';
import { handleMenuState } from 'components/store/storeLayout/helpers';
import { devices } from 'components/store/lib/Devices';
type Props = {
  images: string[];
  selectedIndex: number;
  setSelectedIndex: any;
  direction: number;
  page: number;
  paginateImage: any;
  alt: any;
  product?: Product;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  setDisplay: Dispatch<SetStateAction<PopupDisplay>>;
  isOpened?: boolean;
};

const Slider: React.FC<Props> = ({
  images,
  selectedIndex,
  setSelectedIndex,
  direction,
  page,
  paginateImage,
  alt,
  product,
  setIsOpened,
  setDisplay,
  isOpened,
}) => {
  const { wishlist }: TWishlistState = useAppSelector(
    (state) => state.wishlist,
  );
  const dispatch = useAppDispatch();
  return (
    <SliderWrapper
      key="slider-product-page"
      custom={0.3}
      initial="init"
      animate="animate"
      exit={{ y: -80, opacity: 0, transition: { delay: 0.1 } }}
      variants={variants.fadInSlideUp}
    >
      <AnimatePresence initial={false} custom={direction}>
        <SliderImage
          key={page}
          src={`/api/images/${images[selectedIndex]}`}
          alt={alt}
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
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = '/img_not_found.png';
          }}
          style={{ objectFit: isOpened ? 'contain' : 'cover' }}
        />
      </AnimatePresence>
      <div
        style={{ left: isOpened ? '30px' : '40px' }}
        className="wishlist-btn-parrent"
      >
        <ArrowBtns
          style={{
            background: color.glassmorphismSeconderBG,
            backdropFilter: 'blur(9px)',
            position: 'relative',
          }}
          onClick={TrigerhandleWishBtnClick(
            product!,
            handleWishBtnClick(product!, dispatch, wishlist!),
          )}
        >
          <AddToWishlist
            checkIfItemInWishlist={checkIfItemInWishlist}
            product={product!}
            wishlist={wishlist!}
          />
        </ArrowBtns>
      </div>
      <div
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
      </div>
    </SliderWrapper>
  );
};

const SliderWrapper = styled(motion.div)`
  width: 80%;
  height: 400px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  overflow: hidden;
  .wishlist-btn-parrent {
    position: absolute;
    bottom: 30px;
  }
  .fullscreen-btn-parrent {
    position: absolute;
    bottom: 30px;
    left: 90px;
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
