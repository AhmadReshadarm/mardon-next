import styled from 'styled-components';
import { motion } from 'framer-motion';
import variants from 'components/store/lib/variants';
import { Product } from 'swagger/services';
import ProductItem from 'ui-kit/products/productItem';
import Loading from 'ui-kit/Loading';
type Props = {
  products: Product[];
  children?: JSX.Element;
  width?: any;
  widthRef?: any;
  slideTo?: number;
  loading: boolean;
};
const ProductFlex: React.FC<Props> = ({
  products,
  width,
  widthRef,
  slideTo,
  loading,
}) => {
  return (
    <FlexWrapper>
      <SliderWrapper
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        ref={widthRef}
        custom={slideTo}
        animate="animate"
        variants={variants.sliderX}
      >
        {!loading ? (
          products?.map((product, index) => {
            return (
              <ProductItem
                key={`product-item-${index}`}
                product={product}
                custom={index * 0.05}
                name={
                  product.sizes![0] == undefined ? '' : product.sizes![0].name!
                }
              />
            );
          })
        ) : (
          <Loading />
        )}
      </SliderWrapper>
    </FlexWrapper>
  );
};

const FlexWrapper = styled(motion.div)`
  width: 100%;
  overflow: hidden;
`;

const SliderWrapper = styled(motion.ul)`
  width: 100%;
  display: flex;
  padding-top: 5px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  aling-items: center;
  gap: 20px;
`;
const HeaderWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  h3 {
    font-family: 'Anticva';
    font-size: 1.2rem;
  }
`;

const BtnsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 30px;
`;

export { ProductFlex, ContentWrapper, HeaderWrapper, BtnsWrapper };
