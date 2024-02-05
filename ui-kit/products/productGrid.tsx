import { devices } from 'components/store/lib/Devices';
import styled from 'styled-components';
import { Product } from 'swagger/services';
import Loading from 'ui-kit/Loading';
import { getAnimationDelay } from './helpers';
import ProductItem from './productItem';
import { ErrorBoundary } from 'react-error-boundary';
import FallbackRender from 'ui-kit/FallbackRenderer';

type Props = {
  products: Product[];
  loading?: boolean;
  gridStyle?: any;
  emptyProductsTitle?: string;
  children?: JSX.Element;
};

const ProductGrid: React.FC<Props> = ({
  products,
  emptyProductsTitle,
  gridStyle,
  children,
  loading,
}) => {
  const delay = getAnimationDelay(products.length);

  return (
    <>
      {!loading ? (
        <>
          {!!products.length ? (
            <Grid>
              {children}

              {products.map((product, index) => {
                return (
                  <ErrorBoundary fallbackRender={FallbackRender}>
                    <ProductItem
                      key={`product-item-${index}`}
                      product={product}
                      custom={delay[index]}
                    />
                  </ErrorBoundary>
                );
              })}
            </Grid>
          ) : (
            <EmptyProductsTitle>
              <h3>{emptyProductsTitle ?? 'Список продуктов пуст'}</h3>
            </EmptyProductsTitle>
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

const Grid = styled.ul`
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
    column-gap: 5px;
  }
  @media ${devices.tabletL} {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 10px;
  }
  @media ${devices.tabletS} {
    grid-template-columns: repeat(2, 1fr);
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
    font-size: 2rem;
    font-family: ricordi;
  }
`;

export default ProductGrid;
