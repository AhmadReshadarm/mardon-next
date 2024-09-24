import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Product } from 'swagger/services';
import ProductItem from 'ui-kit/products/productItem';
import Loading from 'ui-kit/Loading';
import { devices } from 'components/store/lib/Devices';
import { LoaderItem } from 'ui-kit/products/Loader';
import { useEffect, useState } from 'react';
import { emptyLoading } from 'common/constants';
type Props = {
  products: Product[];
  loading: boolean;
};
const ProductFlex: React.FC<Props> = ({ products, loading }) => {
  return (
    <FlexWrapper>
      <SliderWrapper>
        {!loading
          ? products?.map((product, index) => {
              return (
                <ProductItem
                  key={`product-item-${index}`}
                  product={product}
                  custom={index * 0.05}
                />
              );
            })
          : emptyLoading.map((item, index) => {
              return <Loader index={index} />;
            })}
      </SliderWrapper>
    </FlexWrapper>
  );
};

const ProductFlexEmpty = () => {
  emptyLoading.pop();
  return (
    <FlexWrapper>
      <SliderWrapper>
        {emptyLoading.map((item, index) => {
          return <Loader index={index} />;
        })}
      </SliderWrapper>
    </FlexWrapper>
  );
};

const Loader = ({ index }) => {
  return (
    <FlexWrapper key={index}>
      <SliderWrapper>
        <LoaderItem index={index} />
      </SliderWrapper>
    </FlexWrapper>
  );
};

const FlexWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  @media ${devices.laptopL} {
    &::after {
      content: '';
      box-shadow: inset -35px 0px 20px -18px #595959;
      width: 100px;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0px;
    }
  }
  @media ${devices.laptopL} {
    &::after {
      content: '';
      box-shadow: inset -35px 0px 20px -18px #595959;
      width: 100px;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0px;
    }
  }
  @media ${devices.laptopM} {
    &::after {
      content: '';
      box-shadow: inset -35px 0px 20px -18px #595959;
      width: 100px;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0px;
    }
  }
  @media ${devices.laptopS} {
    &::after {
      content: '';
      box-shadow: inset -35px 0px 20px -18px #595959;
      width: 100px;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0px;
    }
  }
  @media ${devices.tabletL} {
    &::after {
      content: '';
      box-shadow: inset -35px 0px 20px -18px #595959;
      width: 100px;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0px;
    }
  }
  @media ${devices.tabletS} {
    &::after {
      content: '';
      box-shadow: inset -35px 0px 20px -18px #595959;
      width: 70px;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0px;
    }
  }
  @media ${devices.mobileL} {
    &::after {
      content: '';
      box-shadow: inset -35px 0px 20px -18px #595959;
      width: 50px;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0px;
    }
  }
  @media ${devices.mobileM} {
    &::after {
      content: '';
      box-shadow: inset -35px 0px 20px -18px #595959;
      width: 50px;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0px;
    }
  }
  @media ${devices.mobileS} {
    &::after {
      content: '';
      box-shadow: inset -35px 0px 20px -18px #595959;
      width: 50px;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0px;
    }
  }
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

  @media ${devices.laptopL} {
    overflow-x: scroll;
    overflow-y: hidden;
  }
  @media ${devices.laptopM} {
    overflow-x: scroll;
    overflow-y: hidden;
  }
  @media ${devices.laptopS} {
    overflow-x: scroll;
    overflow-y: hidden;
  }
  @media ${devices.tabletL} {
    overflow-x: scroll;
    overflow-y: hidden;
  }
  @media ${devices.tabletS} {
    overflow-x: scroll;
    overflow-y: hidden;
  }
  @media ${devices.mobileL} {
    overflow-x: scroll;
    overflow-y: hidden;
  }
  @media ${devices.mobileM} {
    overflow-x: scroll;
    overflow-y: hidden;
  }
  @media ${devices.mobileS} {
    overflow-x: scroll;
    overflow-y: hidden;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  aling-items: center;
  gap: 60px;
`;
const HeaderWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  h3 {
    font-family: ricordi;
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

export {
  ProductFlex,
  ProductFlexEmpty,
  ContentWrapper,
  HeaderWrapper,
  BtnsWrapper,
};
