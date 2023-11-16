import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from '../../lib/ui.colors';
import variants from '../../lib/variants';
import { devices } from 'components/store/lib/Devices';
import { Wrapper } from './common';
import { TCartState } from 'redux/types';
import { useAppSelector } from 'redux/hooks';
import { getProductVariantsImages } from 'common/helpers/getProductVariantsImages.helper';

const ProductDetails = () => {
  const { cart } = useAppSelector<TCartState>((state) => state.cart);

  return (
    <Wrapper style={{ gap: '20px' }}>
      <ProudctHeaderWrapper
        custom={0.1}
        initial="init"
        whileInView="animate"
        viewport={{ once: true }}
        variants={variants.fadInSlideUp}
      ></ProudctHeaderWrapper>
      <ProductWrapper
        custom={0.2}
        initial="init"
        whileInView="animate"
        viewport={{ once: true }}
        variants={variants.fadInSlideUp}
      >
        {cart?.orderProducts?.map((orderProduct) => {
          const { price } = orderProduct?.productVariant ?? {};

          const images = getProductVariantsImages(
            orderProduct.product?.productVariants,
          );
          return (
            <Product>
              <ProductImageWrapper>
                <ProductImage
                  src={`/api/images/${images ? images[0] : ''}`}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = '/assets/images/img_error.png';
                  }}
                />
              </ProductImageWrapper>
              <div className="product-name-wrapper">
                <span>{orderProduct.product?.name}</span>
                <b style={{ whiteSpace: 'nowrap' }}>{price} ₽</b>
              </div>
            </Product>
          );
        })}
      </ProductWrapper>
    </Wrapper>
  );
};

const ProudctHeaderWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 5px;

  h3 {
    font-size: 1.2rem;
    font-weight: 800;
  }
  span {
    color: ${color.textSecondary};
  }
`;

const ProductWrapper = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  flex-wrap: wrap;
  @media ${devices.laptopS} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${devices.mobileL} {
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
  .product-name-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
  }
`;

const ProductImageWrapper = styled.div`
  display: flex;
  width: 100%;
  max-height: 130px;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
// TODO: featurs will be adde for picking the date of delivery

export default ProductDetails;
