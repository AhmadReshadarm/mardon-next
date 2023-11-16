import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Rating } from '@mui/material'; // docs: https://mui.com/material-ui/api/rating/ *** https://mui.com/material-ui/react-rating/
import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import ActionBtns from './ActionBtns';
import ColorPicker from './ColorPicker';
import { UserSelectWrapper } from './common';
import Quastions from '../../../../../assets/quastions.svg';
import { Basket, Product, ProductVariant } from 'swagger/services';
import { Dispatch, MutableRefObject, SetStateAction, useEffect } from 'react';
import { checkIfItemInCart, handleCartBtnClick } from 'ui-kit/products/helpers';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { updateCart } from 'redux/slicers/store/cartSlicer';
import { devices } from 'components/store/lib/Devices';
import { TCartState } from 'redux/types';
import SizePicker from './SizePicker';
import { setproductSize } from 'redux/slicers/store/cartSlicer';
import { useState } from 'react';

type Props = {
  product?: Product;
  selectedIndex: number;
  reviewRef: MutableRefObject<any>;
  questionRef: MutableRefObject<any>;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
  paginateImage: Dispatch<SetStateAction<number>>;
};

const Details: React.FC<Props> = ({
  product,
  selectedIndex,
  questionRef,
  reviewRef,
  setSelectedIndex,
  paginateImage,
}) => {
  const dispatch = useAppDispatch();
  const { variant, productSize } = useAppSelector<TCartState>(
    (state) => state.cart,
  );

  const cart: Basket = useAppSelector((state) => state.cart.cart);
  const orderProduct = cart?.orderProducts?.find(
    (orderProduct) => orderProduct.product?.id === product?.id,
  );

  const checkHasOldPrice = (productVariant: ProductVariant) => {
    if (productVariant.oldPrice) return true;
    return false;
  };
  const onCountChange = (counter: number, product: Product) => {
    dispatch(
      updateCart({
        orderProducts: cart?.orderProducts
          ?.filter((orderProduct) => orderProduct.product?.id != product.id)
          ?.concat({
            product: { id: product.id },
            qty: counter,
            productVariantId: variant?.id!,
            productSize: productSize,
          } as any)
          .map((orderProduct) => ({
            productId: orderProduct.product?.id,
            qty: orderProduct.qty,
            productVariantId: orderProduct?.productVariant?.id,
            productSize: productSize,
          })),
      }),
    );
  };

  useEffect(() => {
    if (!product?.sizes) {
      dispatch(setproductSize('_'));
    }
  }, [product]);

  return (
    <DetailsContainer>
      <UserSelectWrapper>
        <motion.h3
          key="title-product-page"
          custom={0.1}
          initial="init"
          animate="animate"
          exit={{ y: -20, opacity: 0, transition: { delay: 0.05 } }}
          variants={variants.fadInSlideUp}
        >
          Общие характеристики:
        </motion.h3>
        <SpecsKeyValueWrapper>
          <li className="wrapper-key-vlaue">
            <span id="key-specs">Цвет: </span>
            <span id="value-specs">
              {variant?.color?.name ?? product?.productVariants![0].color?.name}
            </span>
          </li>
          {product?.parameterProducts?.map((item, index) => {
            return (
              <span key={`product-dropdown-${index}`}>
                {item.value == '_' || item.value == '-' || item.value == '' ? (
                  ''
                ) : (
                  <li
                    className="wrapper-key-vlaue"
                    key={`parameter-product-label-${index}`}
                  >
                    <span id="key-specs">{item.parameter?.name}: </span>
                    <span id="value-specs">{item.value}</span>
                  </li>
                )}
              </span>
            );
          })}
        </SpecsKeyValueWrapper>
        <div className="short-description-wrapper">
          <p>
            <span> {product?.shortDesc}</span>
          </p>
        </div>
        <ConvoContainer>
          <ConvoWrappers
            key="reveiws-product-page"
            custom={0.2}
            initial="init"
            animate="animate"
            exit={{ y: -20, opacity: 0, transition: { delay: 0.1 } }}
            variants={variants.fadInSlideUp}
          >
            <Rating value={product?.rating?.avg} size="small" readOnly />

            <span
              onClick={() => {
                reviewRef.current.click();
                reviewRef.current.scrollIntoView();
              }}
            >
              <span>{product?.reviews?.length ?? 0} Отзыв(ов)</span>
            </span>
          </ConvoWrappers>
          <ConvoWrappers
            key="quastions-product-page"
            custom={0.3}
            initial="init"
            animate="animate"
            exit={{ y: -20, opacity: 0, transition: { delay: 0.2 } }}
            variants={variants.fadInSlideUp}
          >
            <span>
              <Quastions />
            </span>

            <span
              onClick={() => {
                questionRef.current.click();
                questionRef.current.scrollIntoView();
              }}
            >
              <span>{product?.questions?.length} вопрос(ов)</span>
            </span>
          </ConvoWrappers>
        </ConvoContainer>
        <PriceWrapper
          key="prices-product-page"
          custom={0.35}
          initial="init"
          animate="animate"
          exit={{ y: -20, opacity: 0, transition: { delay: 0.1 } }}
          variants={variants.fadInSlideUp}
        >
          <PriceItem>Цена:</PriceItem>
          <PriceItem>
            {variant?.price ?? product?.productVariants![0].price}₽
          </PriceItem>

          <PriceItem>
            {checkHasOldPrice(variant! ?? product?.productVariants![0])
              ? `${variant?.oldPrice ?? product?.productVariants![0].oldPrice}₽`
              : ''}
          </PriceItem>
        </PriceWrapper>
        <SizePickerWrapper>
          <div className="info-size-wrapper">
            <span className="title">Выберите цвет:</span>
          </div>
          <ColorPicker
            variantColor={variant?.color ?? product?.productVariants![0].color}
            productVariants={product?.productVariants}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            paginateImage={paginateImage}
          />
        </SizePickerWrapper>

        {product?.sizes?.length == 0 ? (
          ''
        ) : (
          <SizePickerWrapper>
            <div className="info-size-wrapper">
              <span className="title">Выберите размер:</span>
            </div>
            <SizeItemsParent>
              <SizePicker sizes={product?.sizes} />
            </SizeItemsParent>
          </SizePickerWrapper>
        )}
      </UserSelectWrapper>

      <ActionBtns
        orderProduct={orderProduct}
        isInCart={checkIfItemInCart(product, cart)}
        onCartBtnClick={handleCartBtnClick(
          product!,
          dispatch,
          variant!,
          cart,
          productSize,
        )}
        onCountChange={onCountChange}
      />
    </DetailsContainer>
  );
};

const DetailsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  padding: 0 40px 130px 50px;
  @media ${devices.mobileL} {
    padding: 30px 10px 130px 10px;
  }
  @media ${devices.mobileM} {
    padding: 30px 10px 130px 10px;
  }
  @media ${devices.mobileS} {
    padding: 30px 10px 130px 10px;
  }
`;

const ConvoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;

  @media ${devices.laptopS} {
    display: block;
  }
`;

const SpecsKeyValueWrapper = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  .wrapper-key-vlaue {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 15px;
    span {
      font-size: 0.875rem;
    }
    #key-specs {
      color: ${color.textSecondary};
    }
  }
`;

const ConvoWrappers = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  span {
    font-size: 0.8rem;
    cursor: pointer;
    &:hover {
      color: ${color.hover};
    }
  }
`;

const PriceWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;

const PriceItem = styled.span`
  font-size: 2rem;
  font-weight: 200;
  &:nth-child(2) {
    font-weight: 400;
  }
  &:nth-child(3) {
    text-decoration: line-through;
    text-decoration-color: ${color.hover};
    color: ${color.textSecondary};
  }
`;

const SizePickerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 0;
  .info-size-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .title {
      color: ${color.textSecondary};
    }
  }
`;

const SizeItemsParent = styled.div`
  width: 100%;
  position: relative;
`;

export default Details;
