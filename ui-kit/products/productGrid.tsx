import { devices } from 'components/store/lib/Devices';
import styled from 'styled-components';
import { getAnimationDelay } from './helpers';
import ProductItem from './productItem';
import { LoaderItem } from './Loader';
import { emptyLoading } from 'common/constants';
import { useAppSelector } from 'redux/hooks';
import { TCatalogState } from 'redux/types';

const ProductGrid = () => {
  const { products, loading } = useAppSelector<TCatalogState>(
    (state) => state.catalog,
  );
  const delay = getAnimationDelay(products.length);

  return (
    <>
      {products.length !== 0 && !loading ? (
        <Grid>
          <>
            {!loading
              ? products.map((product, index) => {
                  return (
                    <ProductItem
                      key={`product-item-${index}`}
                      product={product}
                      custom={delay[index]}
                    />
                  );
                })
              : emptyLoading.map((item, index) => {
                  return <LoaderItem index={index} />;
                })}
          </>
        </Grid>
      ) : products.length === 0 && !loading ? (
        <EmptyProductsTitle>
          <h3>
            Слишком много фильтров. Пожалуйста, сбросьте фильтры и попробуйте
            еще раз.
          </h3>
        </EmptyProductsTitle>
      ) : (
        <Grid>
          {emptyLoading.map((item, index) => {
            return <LoaderItem index={index} />;
          })}
        </Grid>
      )}
    </>
  );
};

export const Grid = styled.ul`
  width: 100%;
  display: inline-grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 50px;
  row-gap: 30px;
  padding: 10px;
  justify-items: center;

  @media ${devices.laptopL} {
    grid-template-columns: repeat(3, 1fr);
  }
  @media ${devices.laptopM} {
    grid-template-columns: repeat(3, 1fr);
    column-gap: 40px;
  }
  @media ${devices.laptopS} {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 20px;
  }
  @media ${devices.tabletL} {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 15px;
  }
  @media ${devices.tabletS} {
    grid-template-columns: repeat(1, 1fr);
    column-gap: 10px;
  }
  @media ${devices.mobileL} {
    grid-template-columns: repeat(1, 1fr);
    column-gap: 10px;
  }
  @media ${devices.mobileM} {
    grid-template-columns: repeat(1, 1fr);
  }
  @media ${devices.mobileS} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const EmptyProductsTitle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding-top: 100px;
  h3 {
    font-size: 1.8rem;
    text-align: center;
  }
  @media ${devices.tabletL} {
    h3 {
      font-size: 1.5rem;
    }
  }
  @media ${devices.tabletS} {
    h3 {
      font-size: 1.2rem;
    }
  }
  @media ${devices.mobileL} {
    h3 {
      font-size: 1rem;
    }
  }
  @media ${devices.mobileM} {
    h3 {
      font-size: 1rem;
    }
  }
  @media ${devices.mobileS} {
    h3 {
      font-size: 1rem;
    }
  }
`;

export default ProductGrid;
