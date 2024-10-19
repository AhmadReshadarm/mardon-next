import { useEffect, useState } from 'react';
import variants from 'components/store/lib/variants';
import { ContentWrapper } from './common';
import { HeaderWrapper } from '../common';
import { Product, ProductService } from 'swagger/services';
import { useInViewportNoDelay } from 'components/store/storeLayout/useInViewport';
import dynamic from 'next/dynamic';
const ProductFlex = dynamic(() =>
  import('./common').then((module) => module.ProductFlex),
);
const ProductFlexEmpty = dynamic(() =>
  import('./common').then((module) => module.ProductFlexEmpty),
);
const WeRecomend = ({ product }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { isInViewport, ref } = useInViewportNoDelay();
  useEffect(() => {
    if (isInViewport) {
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
    }
  }, [isInViewport]);

  return (
    <>
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
          products.length !== 0 ? (
            <ProductFlex products={products} loading={loading} />
          ) : (
            <ProductFlexEmpty />
          )
        ) : (
          <ProductFlexEmpty />
        )}
      </ContentWrapper>
    </>
  );
};

export default WeRecomend;
