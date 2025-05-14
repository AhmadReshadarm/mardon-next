import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from '../../lib/ui.colors';
import variants from '../../lib/variants';
import { devices } from 'components/store/lib/Devices';
import { Wrapper } from './common';
import { TCartState } from 'redux/types';
import { useAppSelector } from 'redux/hooks';
import Link from 'next/link';

const ProductDetails = () => {
  const { cart } = useAppSelector<TCartState>((state) => state.cart);

  return (
    <Wrapper style={{ gap: '20px' }}>
      <ProductWrapper
        custom={0.2}
        initial="init"
        whileInView="animate"
        viewport={{ once: true }}
        variants={variants.fadInSlideUp}
      >
        {cart?.orderProducts?.map((orderProduct) => {
          const { price, images, color } = orderProduct?.productVariant ?? {};

          return (
            <Product>
              <ProductImageWrapper>
                <ProductImage
                  src={`/api/images/${images?.split(', ')[0]}`}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = '/assets/images/img_error.png';
                  }}
                />
              </ProductImageWrapper>

              <div className="product_title_description_wrapper">
                <Link
                  href={`/product/${orderProduct!.product?.url}`}
                  prefetch={false}
                >
                  <h1 title={orderProduct!?.product!?.name}>
                    {orderProduct!?.product!?.name}
                  </h1>
                </Link>
                {/* ------------ rating --------------- */}
                <div
                  title={`${
                    Math.floor(Number(orderProduct!?.product?.reviewCount)) == 1
                      ? Math.floor(
                          Number(orderProduct!?.product?.reviewCount),
                        ) + ' Оценка'
                      : Math.floor(
                          Number(orderProduct!?.product?.reviewCount),
                        ) /
                          2 ==
                        0
                      ? Math.floor(
                          Number(orderProduct!?.product?.reviewCount),
                        ) + ' Оценки'
                      : Math.floor(
                          Number(orderProduct!?.product?.reviewCount),
                        ) + ' Оценок'
                  } `}
                  className="rating_wrapper"
                  style={{
                    display:
                      Number(orderProduct!?.product?.reviewCount) == 0
                        ? 'none'
                        : 'flex',
                  }}
                >
                  <span className="review_star">
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 11 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 9.64421L9.708 12L8.724 7.56L12 4.57263L7.686 4.18737L6 0L4.314 4.18737L0 4.57263L3.276 7.56L2.292 12L6 9.64421Z"
                        fill="#FAAF00"
                      />
                    </svg>
                  </span>
                  <span className="review_text">
                    {Math.floor(Number(orderProduct!?.product?.reviewCount)) ==
                    1
                      ? Math.floor(
                          Number(orderProduct!?.product?.reviewCount),
                        ) + ' Оценка'
                      : Math.floor(
                          Number(orderProduct!?.product?.reviewCount),
                        ) /
                          2 ==
                        0
                      ? Math.floor(
                          Number(orderProduct!?.product?.reviewCount),
                        ) + ' Оценки'
                      : Math.floor(
                          Number(orderProduct!?.product?.reviewCount),
                        ) + ' Оценок'}
                  </span>
                </div>
                {/* ------------- end of rating ---------------- */}
                {/* ----------- color ------------------- */}
                <div
                  style={{
                    alignItems: 'center',
                    display:
                      orderProduct?.productVariant?.color?.url == '-' ||
                      orderProduct?.productVariant?.color?.url == '_' ||
                      orderProduct?.productVariant?.color?.url == ''
                        ? 'none'
                        : 'flex',
                  }}
                  className="artical_wrapper"
                >
                  <span>Цвет : </span>

                  <span
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor:
                        orderProduct?.productVariant?.color?.code,
                      border: '1px solid rgb(129 129 129)',
                    }}
                    title={`Цвет: ${orderProduct?.productVariant?.color?.name}`}
                  />
                </div>
                {/* ---------- end of color ----------- */}
                {/* ----------- artical ------------------- */}
                <div className="artical_wrapper">
                  <span>Артикул: </span>

                  <span>
                    {orderProduct?.productVariant?.artical!.includes('|')
                      ? orderProduct?.productVariant
                          ?.artical!.split('|')[0]
                          .toUpperCase()
                      : orderProduct?.productVariant?.artical!.toUpperCase()}
                  </span>
                </div>
                {/* ---------- end of artical ----------- */}
              </div>
            </Product>
          );
        })}
      </ProductWrapper>
    </Wrapper>
  );
};

const ProductWrapper = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  flex-wrap: wrap;
  @media ${devices.laptopS} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${devices.tabletL} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${devices.tabletS} {
    grid-template-columns: repeat(1, 1fr);
  }
  @media ${devices.mobileL} {
    grid-template-columns: repeat(1, 1fr);
  }
  @media ${devices.mobileM} {
    grid-template-columns: repeat(1, 1fr);
  }
  @media ${devices.mobileS} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Product = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 6px 1px ${color.boxShadowBtn};
  transition: 300ms;
  &:hover {
    box-shadow: 1px 1px 6px 1px ${color.boxShadowBtn};
  }

  .product_title_description_wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 15px;
    a {
      padding: 0;
      h1 {
        font-size: 0.9rem;
      }
    }
    .rating_wrapper {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 2px;
      .review_star {
        width: 12px;
        height: 12px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
      }
      .review_text {
        font-size: 12px;
        color: #484848;
      }
    }
    .artical_wrapper {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 10px;
      span {
        font-size: 0.8rem;
      }
    }
  }
`;

const ProductImageWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 5px;
`;
// TODO: featurs will be adde for picking the date of delivery

export default ProductDetails;
