import { getProductVariantsImages } from 'common/helpers/getProductVariantsImages.helper';
import Link from 'next/link';
import styled from 'styled-components';
import { OrderProduct, Product } from 'swagger/services';
import { devices } from '../lib/Devices';
import color from '../lib/ui.colors';
import { AddToCart, AddToWishlist } from 'ui-kit/ProductActionBtns';
import { useEffect, useState } from 'react';
type Props = {
  orderProduct: OrderProduct;
  product?: Product;
};

const CartItem: React.FC<Props> = ({ orderProduct, product }) => {
  const images = getProductVariantsImages(
    orderProduct.product?.productVariants,
  );

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
    <ProductItemWrapper>
      <a href={`/product/${orderProduct!.product?.url}`}>
        <img
          src={`/api/images/${images[0]}`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = '/img_not_found.png';
          }}
        />
      </a>
      <div className="product-details-wrapper">
        <div className="product-title-description-wrapper">
          <Link href={`/product/${orderProduct!.product?.url}`}>
            <h1>
              {orderProduct!?.product!?.name?.length! > 18
                ? orderProduct!?.product!?.name?.slice(0, 18) + ' ...'
                : orderProduct!?.product!?.name}
            </h1>
          </Link>

          <span>
            {orderProduct!?.product?.desc?.includes('|')
              ? orderProduct!?.product?.desc?.split('|')[0]?.length! > 60
                ? orderProduct!?.product?.desc?.split('|')[0].slice(0, 60) +
                  '...'
                : orderProduct!?.product?.desc?.split('|')[0]
              : orderProduct!?.product?.desc?.length! > 60
              ? orderProduct!?.product?.desc?.slice(0, 60) + '...'
              : orderProduct!?.product?.desc?.slice(0, 60)}
          </span>
        </div>

        <div className="price-sperator-wrapper">
          <div className="old-new-price-wrapper">
            {orderProduct!.productVariant?.oldPrice ? (
              <span className="old-price">
                {orderProduct!?.productVariant?.oldPrice} ₽
              </span>
            ) : (
              ''
            )}
            <span>{orderProduct!?.productVariant?.price} ₽</span>
          </div>
          <span className="total-price-wrapper">
            {orderProduct!?.qty! * orderProduct!?.productVariant?.price!} ₽
          </span>
        </div>
      </div>
      <div className="action-buttons-wrapper">
        <AddToWishlist
          product={orderProduct!?.product!}
          windowWidth={windowWidth}
        />
        <AddToCart
          product={orderProduct!?.product!}
          qty={orderProduct!?.qty!}
          variant={product?.productVariants![0]}
          windowWidth={windowWidth}
        />
      </div>
    </ProductItemWrapper>
  );
};

const ProductItemWrapper = styled.div`
  width: 100%;
  height: 200px;
  max-hight: 200px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  padding: 10px;
  background-color: ${color.backgroundPrimary};
  border: 1px solid #e5e2d9;

  img {
    min-width: 180px;
    width: 180px;
    height: 180px;
    object-fit: cover;
  }

  .product-details-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 10px 0;
    .product-title-description-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 15px;

      a {
        padding: 0;
        h1 {
          font-family: ricordi;
          font-size: 1.3rem;
        }
      }
    }

    .price-sperator-wrapper {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 40px;
      .old-new-price-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
        span {
          color: ${color.textBase};
        }
        .old-price {
          text-decoration: line-through;
          font-size: 0.8rem;
        }
      }
      .old-new-price-wishlist-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        gap: 20px;
        span {
          color: ${color.textSecondary};
          font-size: 1.5rem;
        }
        .old-price {
          text-decoration: line-through;
          font-size: 0.8rem;
          color: ${color.textBase};
        }
      }
      .total-price-wrapper {
        font-size: 1.5rem;
      }
    }
  }

  .action-buttons-wrapper {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 0 10px 10px 0;
    gap: 20px;
  }

  @media ${devices.laptopS} {
    flex-direction: column;
    height: unset;
    img {
      width: 100%;
      height: 100%;
      min-width: unset;
      min-height: unset;
    }
    .action-buttons-wrapper {
      justify-content: flex-start;
    }
  }
  @media ${devices.tabletL} {
    flex-direction: column;
    height: unset;
    img {
      width: 100%;
      height: 100%;
      min-width: unset;
      min-height: unset;
    }
    .action-buttons-wrapper {
      justify-content: flex-start;
    }
  }
  @media ${devices.tabletS} {
    flex-direction: column;
    height: unset;
    img {
      width: 100%;
      height: 100%;
      min-width: unset;
      min-height: unset;
    }
    .action-buttons-wrapper {
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
    }
  }
  @media ${devices.mobileL} {
    flex-direction: column;
    height: unset;
    img {
      width: 100%;
      height: 100%;
      min-width: unset;
      min-height: unset;
    }
    .action-buttons-wrapper {
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
    }
  }
  @media ${devices.mobileM} {
    flex-direction: column;
    height: unset;
    img {
      width: 100%;
      height: 100%;
      min-width: unset;
      min-height: unset;
    }
    .action-buttons-wrapper {
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
    }
  }
  @media ${devices.mobileS} {
    flex-direction: column;
    height: unset;
    img {
      width: 100%;
      height: 100%;
      min-width: unset;
      min-height: unset;
    }
    .action-buttons-wrapper {
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
    }
  }
`;

export default CartItem;
