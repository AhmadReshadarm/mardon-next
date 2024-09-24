import { useEffect, useState } from 'react';
import variants from 'components/store/lib/variants';
import { ProductFlex, ContentWrapper, ProductFlexEmpty } from './common';
import { HeaderWrapper } from '../common';
import { Product, ProductService } from 'swagger/services';
import { useInViewportNoDelay } from 'components/store/storeLayout/useInViewport';
const WeRecomend = ({ product }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = (await ProductService.getProducts({
        limit: 4,
        parent: product?.category.parent?.url,
      })) as unknown as { rows: Product[]; length: number };
      const offset = Math.floor(Math.random() * response.length) - 5;
      const weRecomend = (await ProductService.getProducts({
        limit: 4,
        offset: `${offset < 5 ? 0 : offset}`,
        parent: product?.category.parent?.url,
      })) as unknown as { rows: Product[]; length: number };
      setProducts(weRecomend.rows.filter((item) => item.id != product.id));
      setLoading(false);
    })();
  }, []);

  const { isInViewport, ref } = useInViewportNoDelay();

  return (
    <>
      {products.length !== 0 ? (
        <ContentWrapper ref={ref}>
          <HeaderWrapper
            custom={0.2}
            initial="init"
            whileInView="animate"
            viewport={{ once: true }}
            variants={variants.fadInSlideUp}
          >
            <h3>Рекомендуем также</h3>
          </HeaderWrapper>

          {isInViewport ? (
            <ProductFlex products={products} loading={loading} />
          ) : (
            <ProductFlexEmpty />
          )}
        </ContentWrapper>
      ) : (
        ''
      )}
    </>
  );
};

export default WeRecomend;
