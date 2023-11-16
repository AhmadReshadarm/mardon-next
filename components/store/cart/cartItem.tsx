import { getProductVariantsImages } from 'common/helpers/getProductVariantsImages.helper';
import variants from 'components/store/lib/variants';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styled from 'styled-components';
import { Basket, OrderProduct, Product, Wishlist } from 'swagger/services';
import CloseSVG from '../../../assets/close_black.svg';
import { devices } from '../lib/Devices';
import { Rating } from '@mui/material';
import { useAppDispatch } from 'redux/hooks';
import { AppDispatch } from 'redux/store';
import color from '../lib/ui.colors';
import { TrigerhandleWishBtnClick } from '../storeLayout/utils/SearchBar/helpers';
import { ArrowBtns } from 'ui-kit/ArrowBtns';
import { AddToWishlist } from 'ui-kit/ProductActionBtns';
import {
  checkIfItemInWishlist,
  handleWishBtnClick,
} from 'ui-kit/products/helpers';
import { handleItemCountChange } from './helpers';
import { useState } from 'react';
type Props = {
  item: OrderProduct;
  cart: Basket;
  onRemove: (product: Product, dispatch: AppDispatch, cart: Basket) => void;
  wishlist: Wishlist;
};

const CartItem: React.FC<Props> = ({ item, cart, onRemove, wishlist }) => {
  const dispatch = useAppDispatch();

  const { name, url } = item.product!;

  const curVariant = item.productVariant
    ? item.productVariant
    : item.product?.productVariants![0]
    ? item.product?.productVariants![0]
    : ({} as any);

  const images = getProductVariantsImages(item.product?.productVariants);

  const handleRemoveClick = (product: Product) => () => {
    onRemove(product, dispatch, cart);
  };

  const [itemCounter, setItemCounter] = useState(item.qty!);
  return (
    <Item>
      <div className="item-container">
        <ImageWrapper>
          <motion.img
            whileHover="hover"
            whileTap="tap"
            custom={1.05}
            variants={variants.grow}
            src={`/api/images/${images[0]}`}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = '/img_not_found.png';
            }}
          />
          <div className="wishlist-btn-container">
            <ArrowBtns
              style={{
                background: color.glassmorphismSeconderBG,
                backdropFilter: 'blur(9px)',
                position: 'relative',
              }}
              onClick={TrigerhandleWishBtnClick(
                item.product!,
                handleWishBtnClick(item.product!, dispatch, wishlist),
              )}
            >
              <AddToWishlist
                checkIfItemInWishlist={checkIfItemInWishlist}
                product={item.product!}
                wishlist={wishlist}
              />
            </ArrowBtns>
          </div>
        </ImageWrapper>
        <ItemDetails>
          <Link className="product-title" href={`/product/${url}`}>
            <h4>{name}</h4>
          </Link>
          <div className="product-price-wrapper">
            <span>Цена: </span>
            <h3>{curVariant.price} ₽</h3>
          </div>
          <div className="review-and-rating-Wrapper">
            <Rating value={item.product?.rating?.avg} size="small" readOnly />
            <span className="reviews">
              {item.product?.reviews?.length} отзывов
            </span>
          </div>

          <div className="item-action-btns-wrapper">
            <div className="in-cart-sign">
              <span>УЖЕ В КОРЗИНЕ</span>
              <img src="/icons/vector.png" alt="in cart sign" />
            </div>
            <ItemCounterWrapper onClick={(e) => e.preventDefault()}>
              <motion.button
                className="left-btn"
                whileHover="hover"
                whileTap="tap"
                variants={variants.boxShadow}
                onClick={
                  () =>
                    handleItemCountChange(
                      item.qty! > 1 ? item.qty! - 1 : item.qty!,
                      item.product!,
                      dispatch,
                      cart,
                    )

                  // setItemCounter((prev) => {
                  //   if (prev == 1) return prev;
                  //   const itemCounter = prev - 1;
                  //   handleItemCountChange(
                  //     itemCounter,
                  //     item.product!,
                  //     dispatch,
                  //     cart,
                  //   );

                  //   return itemCounter;
                  // })
                }
              >
                <span>-</span>
              </motion.button>
              <span>{item.qty} шт</span>
              <motion.button
                className="right-btn"
                whileHover="hover"
                whileTap="tap"
                variants={variants.boxShadow}
                onClick={
                  () =>
                    handleItemCountChange(
                      item.qty! + 1,
                      item.product!,
                      dispatch,
                      cart,
                    )
                  // setItemCounter((prev) => {
                  //   const itemCounter = prev + 1;
                  //   handleItemCountChange(
                  //     item.qty! + 1,
                  //     item.product!,
                  //     dispatch,
                  //     cart,
                  //   );

                  //   return itemCounter;
                  // })
                }
              >
                <span>+</span>
              </motion.button>
            </ItemCounterWrapper>
          </div>
        </ItemDetails>
        <motion.button
          className="remove-btn"
          custom={1.2}
          whileTap="tap"
          whileHover="hover"
          variants={variants.grow}
          onClick={handleRemoveClick(item.product!)}
        >
          <CloseSVG />
        </motion.button>
      </div>
    </Item>
  );
};

const Item = styled.li`
  padding: 10px 0;
  .item-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    position: relative;
    background-color: ${color.bgProduct};
    box-shadow: 0px 5px 10px 0px ${color.boxShadowBtn};
    border-radius: 10px;
    gap: 50px;
    .remove-btn {
      width: 30px;
      height: 30px;
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;
    }
  }
  @media ${devices.laptopS} {
    .item-container {
      flex-direction: column;
    }
  }

  @media ${devices.mobileL} {
    .item-container {
      flex-direction: column;
    }
  }
  @media ${devices.mobileM} {
    .item-container {
      flex-direction: column;
    }
  }
  @media ${devices.mobileS} {
    .item-container {
      flex-direction: column;
    }
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  cursor: pointer;
  img {
    width: 220px;
    height: 220px;
    border-radius: 5px;
    object-fit: cover;
  }
  .wishlist-btn-container {
    position: absolute;
    bottom: 20px;
    left: 20px;
  }
  @media ${devices.mobileL} {
  }
`;

const ItemDetails = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  .product-title {
    width: 100%;
    h4 {
      text-align: left;
      font-family: 'Anticva';
      font-size: 1.8rem;
      font-weight: 400;
      &:hover {
        text-decoration: underline 1px;
        color: ${color.hoverBtnBg};
      }
    }
  }
  .product-price-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-left;
    align-items: center;
    gap: 20px;
    h3 {
      font-family: 'Jost';
      font-size: 2rem;
      font-weight: 400;
    }
    span {
      font-family: 'Jost';
      font-size: 2rem;
      font-weight: 300;
    }
  }
  .review-and-rating-Wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-left;
    align-items: center;
    gap: 5px;
    span {
      font-family: 'Jost';
      font-size: 14px;
    }
    .reviews {
      color: ${color.hoverBtnBg};
    }
  }
  .item-action-btns-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-left;
    align-items: center;
    gap: 20px;
    .in-cart-sign {
      width: 200px;
      height: 40px;
      border: 1px solid;
      border-radius: 4px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }
  }

  @media ${devices.laptopS} {
    .product-title {
      h4 {
        text-align: center;
      }
    }
    .item-action-btns-wrapper {
      flex-direction: column;
      align-items: flex-start;
      .in-cart-sign {
        width: 100%;
      }
    }
  }

  @media ${devices.mobileL} {
    .product-title {
      h4 {
        text-align: center;
      }
    }
    .item-action-btns-wrapper {
      flex-direction: column;
      align-items: flex-start;
      .in-cart-sign {
        width: 100%;
      }
    }
  }
  @media ${devices.mobileM} {
    .product-title {
      h4 {
        text-align: center;
      }
    }
    .item-action-btns-wrapper {
      flex-direction: column;
      align-items: flex-start;
      .in-cart-sign {
        width: 100%;
      }
    }
  }
  @media ${devices.mobileS} {
    .product-title {
      h4 {
        text-align: center;
      }
    }
    .item-action-btns-wrapper {
      flex-direction: column;
      align-items: flex-start;
      .in-cart-sign {
        width: 100%;
      }
    }
  }
`;

const ItemCounterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
  box-shadow: 0px 5px 10px 0px ${color.boxShadowBtn};
  font-family: 'Jost';
  font-size: 1rem;
  border-radius: 4px;
  .left-btn {
    border-radius: 4px 0 0 4px;
  }
  .right-btn {
    border-radius: 0 4px 4px 0;
  }
  button {
    width: 40px;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${color.btnSecondery};
    span {
      width: 100%;
      height: 100%;
      font-family: 'Jost';
      font-size: 2rem;
      font-weight: 200;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  }

  span {
    width: 50px;
    background-color: transparent;
    user-select: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-family: 'Jost';
  }
`;

export default CartItem;
