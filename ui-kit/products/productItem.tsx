import { getProductVariantsImages } from 'common/helpers/getProductVariantsImages.helper';
import { devices } from 'components/store/lib/Devices';
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
import { TWishlistState } from 'redux/types';
type Props = {
  product: Product;
  custom: number;
};

type StyleProps = {
  cardWidth: number;
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

  return (
    <ItemContainer
      custom={custom}
      initial="init"
      whileInView="animate"
      viewport={{ once: true }}
      variants={variants.fadInSlideUp}
      cardWidth={windowWidth}
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
          >
            <span title={product.name?.length! > 40 ? product.name : ''}>
              {product.name?.length! > 40
                ? `${product.name?.slice(0, 40)}...`
                : product.name}
            </span>
          </Link>
          <div className="artical-wrapper">
            <span style={{ fontFamily: 'ricordi' }}>Артикул : </span>
            <span>
              {product
                ?.productVariants![0]?.artical?.slice(0, 15)
                .toLocaleUpperCase()}
            </span>
          </div>
          <div className="product-description-wrapper">
            <span>
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

const ItemContainer = styled(motion.li)`
  width: 100%;
  min-width: 330px;
  max-width: 330px;
  height: 700px;
  background-color: ${color.productCart};
  padding: 10px;
  border: 1px solid #e5e2d9;

  @media ${devices.laptopM} {
    min-width: calc(${(p: StyleProps) => p.cardWidth / 3}px - 50px);
    max-width: calc(${(p: StyleProps) => p.cardWidth / 3}px - 50px);
  }

  @media ${devices.laptopS} {
    min-width: calc(${(p: StyleProps) => p.cardWidth / 2}px - 50px);
    max-width: calc(${(p: StyleProps) => p.cardWidth / 2}px - 50px);
  }

  @media ${devices.tabletL} {
    min-width: calc(${(p: StyleProps) => p.cardWidth / 2}px - 50px);
    max-width: calc(${(p: StyleProps) => p.cardWidth / 2}px - 50px);
  }
  @media ${devices.tabletS} {
    min-width: calc(${(p: StyleProps) => p.cardWidth}px - 80px);
    max-width: calc(${(p: StyleProps) => p.cardWidth}px - 80px);
  }
  @media ${devices.mobileL} {
    min-width: calc(${(p: StyleProps) => p.cardWidth}px - 80px);
    max-width: calc(${(p: StyleProps) => p.cardWidth}px - 80px);
  }
  @media ${devices.mobileM} {
    min-width: calc(${(p: StyleProps) => p.cardWidth}px - 80px);
    max-width: calc(${(p: StyleProps) => p.cardWidth}px - 80px);
  }

  @media ${devices.mobileS} {
    min-width: calc(${(p: StyleProps) => p.cardWidth}px - 80px);
    max-width: calc(${(p: StyleProps) => p.cardWidth}px - 80px);
  }
`;

const ItemWrapper = styled.div`
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
        font-size: 1rem;
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
        font-size: 0.9rem;
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
      }
      .product-description-wrapper {
        padding: 5px 0;
      }
      .action-buttons-wrapper {
        flex-direction: column;
        justify-content: center;
        gap: 15px;
      }
      .artical-wrapper {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  }
  @media ${devices.mobileL} {
    .product-title-add-to-card-wrapper {
      .product-title {
        line-break: anywhere;
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
      }
      .product-description-wrapper {
        padding: 5px 0;
      }
      .action-buttons-wrapper {
        flex-direction: column;
        justify-content: center;
        gap: 15px;
      }
      .artical-wrapper {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  }
`;

export default ProductItem;
