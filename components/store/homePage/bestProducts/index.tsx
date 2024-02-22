import { devices } from 'components/store/lib/Devices';
import { useEffect } from 'react';
import { useAppSelector } from 'redux/hooks';

import { TGlobalState } from 'redux/types';
import styled from 'styled-components';
import { getAnimationDelay } from 'ui-kit/products/helpers';
import ProductItem from 'ui-kit/products/productItem';
import Loading from 'ui-kit/Loading';
type Props = {};

const BestProduct: React.FC<Props> = () => {
  let delay: number[] = [];
  const { bestProduct, loading } = useAppSelector<TGlobalState>(
    (state) => state.global,
  );

  useEffect(() => {
    if (bestProduct) {
      delay = getAnimationDelay(bestProduct.length);
    }
  }, [bestProduct]);

  return (
    <>
      {!loading ? (
        <Container>
          <Wrapper>
            <div className="section-title-wrapper">
              <h1>{`лучшие товары`.toUpperCase()}</h1>
            </div>
            <ul className="best-product-grid-wrapper">
              {bestProduct.map((product, index) => {
                return <ProductItem product={product} custom={delay[index]} />;
              })}
            </ul>
          </Wrapper>
        </Container>
      ) : (
        <Loading />
      )}
    </>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 80px 0;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .section-title-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 0 50px 0;
    h1 {
      font-size: 3rem;
      font-family: ricordi;
      text-align: center;
    }
  }
  .best-product-grid-wrapper {
    width: 100%;
    display: inline-grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 50px;
    row-gap: 30px;
    padding: 10px;
    justify-items: center;
  }
  @media ${devices.laptopL} {
    max-width: 1230px;
    .best-product-grid-wrapper {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media ${devices.laptopM} {
    max-width: 1230px;
    .best-product-grid-wrapper {
      grid-template-columns: repeat(3, 1fr);
      column-gap: 40px;
    }
  }
  @media ${devices.laptopS} {
    max-width: unset;
    .best-product-grid-wrapper {
      grid-template-columns: repeat(2, 1fr);
      column-gap: 5px;
    }
  }
  @media ${devices.tabletL} {
    max-width: unset;
    .best-product-grid-wrapper {
      grid-template-columns: repeat(2, 1fr);
      column-gap: 10px;
    }
  }
  @media ${devices.tabletS} {
    max-width: unset;
    .best-product-grid-wrapper {
      grid-template-columns: repeat(2, 1fr);
      column-gap: 10px;
    }
  }
  @media ${devices.mobileL} {
    max-width: unset;
    .best-product-grid-wrapper {
      grid-template-columns: repeat(1, 1fr);
      column-gap: 10px;
    }
  }
  @media ${devices.mobileM} {
    max-width: unset;
    .best-product-grid-wrapper {
      grid-template-columns: repeat(1, 1fr);
    }
  }
  @media ${devices.mobileS} {
    max-width: unset;
    .best-product-grid-wrapper {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;

export default BestProduct;
