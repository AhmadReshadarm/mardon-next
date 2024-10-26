import { getProductVariantsImages } from 'common/helpers/getProductVariantsImages.helper';
import { devices, sizesNum } from 'components/store/lib/Devices';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styled from 'styled-components';
import { Product } from 'swagger/services';
import Slider from './slider';
import { handleHistory } from './helpers';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { Basket } from 'swagger/services';
import { AddToCart, AddToWishlist } from 'ui-kit/ProductActionBtns';
import { findCartQTY } from 'ui-kit/HeaderProductItems/helpers';
import {
  clearSearchProducts,
  clearSearchQuery,
} from 'redux/slicers/store/globalSlicer';
import { useEffect, useState } from 'react';
import { StarSmallYellowSVG } from 'assets/icons/UI-icons';
type Props = {
  product: Product;
  custom: number;
};

const ProductItem: React.FC<Props> = ({ product, custom }) => {
  const images = getProductVariantsImages(product.productVariants);
  const cart: Basket = useAppSelector((state) => state.cart.cart);
  const dispatch = useAppDispatch();

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

  const calculateImageSizeContainer = (windowWidth: number) => {
    switch (true) {
      // laptopM
      case sizesNum.laptopS < windowWidth && windowWidth < sizesNum.laptopM:
        return {
          minMaxWidth: windowWidth / 3 - 50,
        };
      // laptopS
      case sizesNum.tabletL < windowWidth && windowWidth < sizesNum.laptopS:
        return {
          minMaxWidth: windowWidth / 2 - 50,
        };
      // tabletL
      case sizesNum.tabletS < windowWidth && windowWidth < sizesNum.tabletL:
        return {
          minMaxWidth: windowWidth / 2 - 50,
        };
      // tabletS, mobileL, mobileM, mobileS, mobileES
      case sizesNum.mobileES < windowWidth && windowWidth < sizesNum.tabletS:
        return {
          minMaxWidth: windowWidth - 80,
        };
      default:
        return {
          minMaxWidth: 330,
        };
    }
  };

  const [wrapperSizes, setWrapperSizes] = useState({
    minMaxWidth: calculateImageSizeContainer(windowWidth).minMaxWidth,
  });
  useEffect(() => {
    setWrapperSizes({
      minMaxWidth: calculateImageSizeContainer(windowWidth).minMaxWidth,
    });
  }, [windowWidth]);

  return (
    <ItemContainer
      custom={custom}
      initial="init"
      whileInView="animate"
      viewport={{ once: true }}
      variants={variants.fadInSlideUp}
      style={{
        minWidth: `${wrapperSizes.minMaxWidth}px`,
        maxWidth: `${wrapperSizes.minMaxWidth}px`,
      }}
    >
      <ItemWrapper>
        <Slider
          product={product}
          images={images}
          url={product.url}
          windowWidth={windowWidth}
        />
        <div className="product-title-add-to-card-wrapper">
          <Link
            className="product-title"
            onClick={() => {
              handleHistory(product.id);
              dispatch(clearSearchQuery());
              dispatch(clearSearchProducts());
            }}
            href={`/product/${product.url}`}
            aria-label={product.name}
            prefetch={false}
          >
            <span title={product.name?.length! > 40 ? product.name : ''}>
              {product.name?.length! > 40
                ? `${product.name?.slice(0, 40)}...`
                : product.name}
            </span>
          </Link>
          <div className="artical-wrapper">
            <span>Артикул : </span>
            <span>
              {product
                ?.productVariants![0]?.artical?.slice(0, 15)
                .toLocaleUpperCase()}
            </span>
          </div>
          <div
            title={`${
              Math.floor(product.reviews?.length!) == 1
                ? Math.floor(product.reviews?.length!) + ' Оценка'
                : Math.floor(product.reviews?.length!) / 2 == 0
                ? Math.floor(product.reviews?.length!) + ' Оценки'
                : Math.floor(product.reviews?.length!) + ' Оценок'
            } `}
            className="rating-wrapper"
            style={{ display: product.reviews?.length! == 0 ? 'none' : 'flex' }}
          >
            <span className="review-star">
              <StarSmallYellowSVG />
            </span>
            <span className="review-text">
              {Math.floor(product.reviews?.length!) == 1
                ? Math.floor(product.reviews?.length!) + ' Оценка'
                : Math.floor(product.reviews?.length!) / 2 == 0
                ? Math.floor(product.reviews?.length!) + ' Оценки'
                : Math.floor(product.reviews?.length!) + ' Оценок'}
            </span>
          </div>
          <div className="product-description-wrapper">
            <span title="Нажмите на карточку товара, чтобы узнать больше">
              {product?.desc?.includes('|')
                ? product?.desc?.split('|')[0]?.length! > 60
                  ? product?.desc?.split('|')[0].slice(0, 60) + '...'
                  : product?.desc?.split('|')[0]
                : product?.desc?.length! > 60
                ? product?.desc?.slice(0, 60) + '...'
                : product?.desc?.slice(0, 60)}
            </span>
          </div>
          <div className="product-price-wrapper">
            {product.productVariants![0]?.oldPrice ? (
              <span className="old-price">
                {product.productVariants![0]?.oldPrice} ₽
              </span>
            ) : (
              ''
            )}
            <span>{product.productVariants![0]?.price} ₽</span>
          </div>
          <div className="action-buttons-wrapper">
            <AddToWishlist product={product} />
            <AddToCart
              product={product}
              qty={findCartQTY(product, cart)}
              variant={product?.productVariants![0]}
            />
          </div>
        </div>
      </ItemWrapper>
    </ItemContainer>
  );
};

export const ItemContainer = styled(motion.li)`
  width: 100%;
  height: 700px;
  background-color: ${color.productCart};
  padding: 10px;
  border: 1px solid #e5e2d9;
`;

export const ItemWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .product-title-add-to-card-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .product-title {
      width: 100%;
      padding: 10px 0 20px 0;
      span {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        font-size: 0.9rem;
        font-family: ricordi;
        &:hover {
          color: ${color.textBase};
        }
      }
    }
    .product-description-wrapper {
      width: 100%;
      padding: 30px 0;
      span {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
      }
    }
    .product-price-wrapper {
      width: 100%;
      padding: 5px 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 20px;
      border-top: 1px solid;
      border-bottom: 1px solid;
      span {
        font-size: 1.5rem;
        user-select: none;
      }
      .old-price {
        text-decoration: line-through;
        font-size: 0.9rem;
        color: ${color.textBase};
      }
    }
    .action-buttons-wrapper {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
      flex-basis: 100%;
    }
    .artical-wrapper {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      gap: 10px;
      span {
        font-size: 0.8rem;
      }
    }
    .rating-wrapper {
      width: 100%;
      display: flex;
      flex-dierction: row;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 2px;
      .review-star {
        width: 12px;
        height: 12px;
        display: flex;
        flex-dierction: row;
        justify-content: flex-start;
        align-items: center;
      }
      .review-text {
        font-size: 10px;
        color: #484848;
      }
    }
  }
  @media ${devices.laptopS} {
    .product-title-add-to-card-wrapper {
      .product-description-wrapper {
        padding: 5px 0;
      }
    }
  }
  @media ${devices.tabletL} {
    .product-title-add-to-card-wrapper {
      .product-description-wrapper {
        padding: 5px 0;
      }
      .action-buttons-wrapper {
        flex-direction: column;
        justify-content: center;
        gap: 15px;
      }
    }
  }
  @media ${devices.tabletS} {
    .product-title-add-to-card-wrapper {
      .product-title {
        line-break: anywhere;
        span {
          font-size: 0.8rem;
        }
      }
      .product-description-wrapper {
        padding: 5px 0;
      }
      .action-buttons-wrapper {
        flex-direction: column;
        justify-content: center;
        gap: 15px;
      }
      // .artical-wrapper {
      //   flex-direction: column;
      //   align-items: flex-start;
      // }
    }
  }
  @media ${devices.mobileL} {
    .product-title-add-to-card-wrapper {
      .product-title {
        line-break: anywhere;
        span {
          font-size: 0.8rem;
        }
      }
      .product-description-wrapper {
        padding: 5px 0;
      }
      .action-buttons-wrapper {
        flex-direction: column;
        justify-content: center;
        gap: 15px;
      }
    }
  }
  @media ${devices.mobileM} {
    .product-title-add-to-card-wrapper {
      .product-title {
        line-break: anywhere;
        span {
          font-size: 0.8rem;
        }
      }
      .product-description-wrapper {
        padding: 5px 0;
      }
      .action-buttons-wrapper {
        flex-direction: column;
        justify-content: center;
        gap: 15px;
      }
    }
  }

  @media ${devices.mobileS} {
    .product-title-add-to-card-wrapper {
      .product-title {
        line-break: anywhere;
        span {
          font-size: 0.8rem;
        }
      }
      .product-description-wrapper {
        padding: 5px 0;
      }
      .action-buttons-wrapper {
        flex-direction: column;
        justify-content: center;
        gap: 15px;
      }
      // .artical-wrapper {
      //   flex-direction: column;
      //   align-items: flex-start;
      // }
    }
  }
`;

export default ProductItem;
