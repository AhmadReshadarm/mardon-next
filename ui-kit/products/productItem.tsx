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
import { checkIfItemInCart, handleCartBtnClick } from 'ui-kit/products/helpers';
import { TrigerhandleCartBtnClick } from 'components/store/storeLayout/utils/SearchBar/helpers';
import { AddToCart, AddToWishlist } from 'ui-kit/ProductActionBtns';
import { findCartQTY } from 'ui-kit/HeaderProductItems/helpers';
import {
  clearSearchProducts,
  clearSearchQuery,
} from 'redux/slicers/store/globalSlicer';
type Props = {
  product: Product;
  custom: number;
  // name: string;
};
//  name
const ProductItem: React.FC<Props> = ({ product, custom }) => {
  const images = getProductVariantsImages(product.productVariants);
  const cart: Basket = useAppSelector((state) => state.cart.cart);
  const dispatch = useAppDispatch();
  const { price, oldPrice } = product.productVariants![0];

  // dispatch(clearSearchQuery());
  // dispatch(clearSearchProducts());

  return (
    <ItemContainer
      custom={custom}
      initial="init"
      whileInView="animate"
      viewport={{ once: true }}
      variants={variants.fadInSlideUp}
    >
      <ItemWrapper>
        <Slider product={product} images={images} url={product.url} />
        <div className="product-title-add-to-card-wrapper">
          <Link
            className="product-title"
            onClick={() => {
              handleHistory(product.id);
              dispatch(clearSearchQuery());
              dispatch(clearSearchProducts());
            }}
            href={`/product/${product.url}`}
          >
            <span>
              {product.name?.length! > 40
                ? `${product.name?.slice(0, 40)}...`
                : product.name}
            </span>
          </Link>
          <div className="artical-wrapper">
            <span style={{ fontFamily: 'ricordi' }}>Артикул : </span>
            <span>
              {product?.productVariants![0]?.artical?.toLocaleUpperCase()}
            </span>
          </div>
          <div className="product-description-wrapper">
            <span>
              {product.shortDesc?.length! > 100
                ? `${product.shortDesc?.slice(0, 100)}...`
                : product.shortDesc}
            </span>
          </div>
          <div className="product-price-wrapper">
            {oldPrice ? <span className="old-price">{oldPrice} ₽</span> : ''}
            <span>{price} ₽</span>
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
  height: 650px;
  background-color: ${color.productCart};
  padding: 10px;
  border: 1px solid #e5e2d9;

  @media ${devices.laptopM} {
    max-width: 310px;
    min-width: 310px;
  }

  @media ${devices.laptopS} {
    max-width: 375px;
    min-width: 375px;
  }

  @media ${devices.tabletL} {
    min-width: 220px;
    max-width: 220px;
  }
  @media ${devices.tabletS} {
    min-width: 160px;
    max-width: 160px;
  }
  @media ${devices.tabletS} {
    min-width: 170px;
    max-width: 170px;
  }
  @media ${devices.mobileL} {
    min-width: 95vw;
    max-width: 95vw;
  }
  @media ${devices.mobileM} {
    min-width: 95vw;
    max-width: 95vw;
  }

  @media ${devices.mobileS} {
    min-width: 95vw;
    max-width: 95vw;
  }
`;

const ItemWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  // padding: 0 0 20px 0;

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
        font-size: 1.3rem;
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
    }
    .artical-wrapper {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      gap: 10px;
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
