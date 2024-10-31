import styled from 'styled-components';
import { Rating } from '@mui/material';
import color from 'components/store/lib/ui.colors';
import ActionBtns from './ActionBtns';
import ColorPicker from './ColorPicker';
import { UserSelectWrapper } from './common';
import { Basket, Product, ProductVariant } from 'swagger/services';
import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { useAppSelector } from 'redux/hooks';
import { devices } from 'components/store/lib/Devices';
import { TCartState } from 'redux/types';
import { QuestionSVG } from 'assets/icons/UI-icons';

type Props = {
  product?: Product;
  selectedIndex: number;
  reviewRef: MutableRefObject<any>;
  questionRef: MutableRefObject<any>;
  setFirstLoad: Dispatch<SetStateAction<boolean>>;
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
  setFirstLoad,
}) => {
  const { variant } = useAppSelector<TCartState>((state) => state.cart);

  const cart: Basket = useAppSelector((state) => state.cart.cart);
  const orderProduct = cart?.orderProducts?.find(
    (orderProduct) => orderProduct.product?.id === product?.id,
  );

  const checkHasOldPrice = (productVariant: ProductVariant) => {
    if (productVariant?.oldPrice) return true;
    return false;
  };

  return (
    <DetailsContainer>
      <UserSelectWrapper textWidth={product?.name?.length!}>
        <div className="product-title-wrapper">
          <div className="title-top-bar"></div>
          <h1 className="product-header-1" itemProp="name">
            {product?.name}
          </h1>
        </div>

        <div className="short-description-wrapper">
          <p>
            <span itemProp="description">
              {product?.desc?.includes('|')
                ? product?.desc?.split('|')[0]?.length! > 150
                  ? product?.desc?.split('|')[0].slice(0, 150) + '...'
                  : product?.desc?.split('|')[0]
                : product?.desc?.length! > 150
                ? product?.desc?.slice(0, 150) + '...'
                : product?.desc?.slice(0, 150)}
            </span>
          </p>
        </div>
        <ConvoContainer>
          <div className="convo-contentWrapper">
            <ConvoWrappers>
              <Rating
                value={product?.rating?.avg}
                precision={0.5}
                size="medium"
                readOnly
              />
            </ConvoWrappers>
            <ConvoWrappers>
              <span
                className="reviews-text-wrapper"
                onClick={() => {
                  reviewRef.current.click();
                  reviewRef.current.scrollIntoView();
                }}
              >
                <span>{product?.reviews?.length ?? 0}</span>
                <span>Отзыв(ов) об этом товаре</span>
              </span>
            </ConvoWrappers>
            <ConvoWrappers>
              <span>
                <QuestionSVG />
              </span>

              <span
                onClick={() => {
                  questionRef.current.click();
                  questionRef.current.scrollIntoView();
                }}
              >
                <span>{product?.questions?.length} вопрос(ов) о товаре</span>
              </span>
            </ConvoWrappers>
          </div>
          <PriceWrapper>
            <PriceItem>
              {checkHasOldPrice(variant! ?? product?.productVariants![0])
                ? `${
                    variant?.oldPrice ?? product?.productVariants![0]?.oldPrice
                  } ₽`
                : ''}
            </PriceItem>
            <PriceItem>
              {variant?.price ?? product?.productVariants![0]?.price} ₽
            </PriceItem>
          </PriceWrapper>
        </ConvoContainer>

        <SizePickerWrapper>
          <div className="info-size-wrapper">
            <span className="title">Выберите артикул:</span>
          </div>
          <ColorPicker
            variantColor={variant?.color ?? product?.productVariants![0]?.color}
            productVariants={product?.productVariants}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            paginateImage={paginateImage}
            setFirstLoad={setFirstLoad}
          />
        </SizePickerWrapper>
      </UserSelectWrapper>

      <ActionBtns orderProduct={orderProduct} cart={cart} product={product!} />
    </DetailsContainer>
  );
};

export const DetailsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  padding: 0 40px 0 50px;
  @media ${devices.tabletS} {
    padding: 0;
  }
  @media ${devices.mobileL} {
    padding: 0;
  }
  @media ${devices.mobileM} {
    padding: 0;
  }
  @media ${devices.mobileS} {
    padding: 0;
  }
`;

export const ConvoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  padding: 30px 0;
  .convo-contentWrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;
  }
  @media ${devices.tabletL} {
    flex-direction: column;
  }
  @media ${devices.tabletS} {
    flex-direction: column;
  }
  @media ${devices.mobileL} {
    flex-direction: column;
  }
  @media ${devices.mobileM} {
    flex-direction: column;
  }
  @media ${devices.mobileS} {
    flex-direction: column;
  }
`;

export const ConvoWrappers = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  .reviews-text-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 5px;
  }
  span {
    cursor: pointer;
    &:hover {
      color: ${color.textBase};
    }
  }
`;

export const PriceWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 25px;
  @media ${devices.tabletL} {
    justify-content: flex-start;
  }
  @media ${devices.tabletS} {
    justify-content: flex-start;
  }
  @media ${devices.mobileL} {
    justify-content: flex-start;
  }
  @media ${devices.mobileM} {
    justify-content: flex-start;
  }
  @media ${devices.mobileS} {
    justify-content: flex-start;
  }
`;

const PriceItem = styled.span`
  font-size: 1.5rem;
  font-family: var(--font-ricordi);
  &:nth-child(1) {
    font-size: 1rem;
    text-decoration: line-through;
    color: ${color.textBase};
  }
  &:nth-child(2) {
    font-weight: 600;
  }
`;

export const SizePickerWrapper = styled.div`
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

export default Details;
