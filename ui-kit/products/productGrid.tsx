import { devices } from 'components/store/lib/Devices';
import styled from 'styled-components';
import { Product } from 'swagger/services';
import Loading from 'ui-kit/Loading';
import { getAnimationDelay } from './helpers';
import ProductItem from './productItem';

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
            <Grid
              laptopGridTemplateAreas={gridStyle?.laptopGridTemplateAreas}
              laptopSGridTemplateAreas={gridStyle?.laptopSGridTemplateAreas}
              laptopGridTemplateColumns={gridStyle?.laptopGridTemplateColumns}
              laptopColumnGap={gridStyle?.laptopColumnGap}
              laptopSColumnGap={gridStyle?.laptopSColumnGap}
              style={gridStyle}
            >
              {children}

              {products.map((product, index) => {
                return (
                  <ProductItem
                    key={`product-item-${index}`}
                    product={product}
                    custom={delay[index]}
                    name={
                      product.sizes![0] == undefined
                        ? ''
                        : product.sizes![0].name!
                    }
                  />
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

const Grid = styled.ul<any>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 50px;
  row-gap: 30px;
  padding: 10px;
  @media ${devices.laptopM} {
    column-gap: ${(props) => props.laptopColumnGap ?? '90px'};
    grid-template-areas: ${(props) => props.laptopGridTemplateAreas ?? ''};
    grid-template-columns: ${(props) =>
      props.laptopGridTemplateColumns ?? 'repeat(3, 1fr)'};
  }

  @media ${devices.laptopS} {
    grid-template-columns: ${(props) =>
      props.laptopGridTemplateColumns ?? 'repeat(3, 1fr)'};
    column-gap: ${(props) => props.laptopSColumnGap ?? '34px'};
    grid-template-areas: ${(props) => props.laptopSGridTemplateAreas ?? ''};
  }

  @media ${devices.mobileL} {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
  }
  @media ${devices.mobileM} {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
  }
  @media ${devices.mobileS} {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
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
    font-family: 'Anticva';
  }
`;

export default ProductGrid;
