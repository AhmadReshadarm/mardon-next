import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { wrap } from 'popmotion';
import styled from 'styled-components';
import { Product } from 'swagger/services';
import Arrow from '../../assets/arrow_white.svg';
import { ArrowBtns, ArrowSpan } from 'ui-kit/ArrowBtns';
import { handleHistory } from './helpers';
import { AddToWishlist } from 'ui-kit/ProductActionBtns';
import { TrigerhandleWishBtnClick } from 'components/store/storeLayout/utils/SearchBar/helpers';
import { UseImagePaginat } from 'components/store/storeLayout/helpers';
import { devices } from 'components/store/lib/Devices';
import { handleWishBtnClick, checkIfItemInWishlist } from './helpers';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { TWishlistState } from 'redux/types';
import { formatNumber } from 'common/helpers/number.helper';
type Props = {
  url?: string;
  images: string[];
  product: Product;
};

const Slider: React.FC<Props> = ({ product, url, images }) => {
  const [page, direction, setPage, paginateImage] = UseImagePaginat();
  const imageIndex = wrap(0, images.length, page);
  const dispatch = useAppDispatch();
  const { wishlist }: TWishlistState = useAppSelector(
    (state) => state.wishlist,
  );
  const loading = useAppSelector((state) => state.global.loading);
  const { price, oldPrice } = product.productVariants![0]
    ? product.productVariants![0]
    : ({} as any);
  return (
    <>
      <ImageSliderWrapper>
        <Link
          onClick={() => handleHistory(product.id)}
          href={`/product/${url}`}
        >
          <AnimatePresence initial={false} custom={direction}>
            <ImageSlider
              key={`slider-image${imageIndex}`}
              custom={direction}
              variants={variants.sliderProduct}
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
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 1 }}
              alt={product.name}
              src={`/api/images/${images[imageIndex]}`}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = '/img_not_found.png';
                currentTarget.className = 'not-found';
              }}
            />
          </AnimatePresence>
        </Link>
        <PriceWrapper>
          <span>Цена:</span>
          <span>{formatNumber(price)}₽</span>
          {oldPrice ? (
            <span
              style={{
                textDecoration: 'line-through',
                textDecorationColor: color.hover,
                textDecorationThickness: '1.5px',
                color: '#d6d7d7',
              }}
            >
              {formatNumber(oldPrice)}₽
            </span>
          ) : (
            <></>
          )}
        </PriceWrapper>
        <ArrowBtns
          whileHover="hover"
          whileTap="tap"
          custom={1.2}
          variants={variants.grow}
          top="200px"
          left="15px"
          topmobile="15px"
          position="absolute"
          style={{
            background: color.glassmorphismSeconderBG,
            backdropFilter: 'blur(9px)',
          }}
          onClick={TrigerhandleWishBtnClick(
            product,
            handleWishBtnClick(product, dispatch, wishlist!),
          )}
          disabled={loading ? true : false}
        >
          <AddToWishlist
            checkIfItemInWishlist={checkIfItemInWishlist}
            product={product}
            wishlist={wishlist!}
          />
        </ArrowBtns>

        <ArrowBtns
          whileHover="hover"
          whileTap="tap"
          custom={1.2}
          variants={variants.grow}
          top="150px"
          right="15px"
          topmobile="195px"
          position="absolute"
          style={{
            background: color.glassmorphismSeconderBG,
            backdropFilter: 'blur(9px)',
          }}
          onClick={() => paginateImage(1)}
        >
          <ArrowSpan rotate="-90">
            <Arrow />
          </ArrowSpan>
        </ArrowBtns>
        <ArrowBtns
          whileHover="hover"
          whileTap="tap"
          custom={1.2}
          variants={variants.grow}
          top="200px"
          topmobile="260px"
          right="15px"
          position="absolute"
          style={{
            background: color.glassmorphismSeconderBG,
            backdropFilter: 'blur(9px)',
          }}
          onClick={() => paginateImage(-1)}
        >
          <ArrowSpan rotate="90">
            <Arrow />
          </ArrowSpan>
        </ArrowBtns>
      </ImageSliderWrapper>
    </>
  );
};

const ImageSliderWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  min-height: 250px;
  background-color: ${color.textPrimary};
  border-radius: 10px 10px 0 0;
  position: relative;
  overflow: hidden;

  a {
    width: 100%;
    height: 100%;
  }

  @media ${devices.laptopS} {
    width: 220px;
  }

  @media ${devices.mobileL} {
    width: 100%;
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
`;

const ImageSlider = styled(motion.img)`
  width: 100%;
  height: 300px;
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
