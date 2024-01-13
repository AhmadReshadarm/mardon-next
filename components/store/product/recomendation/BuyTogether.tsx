import { useEffect, useState } from 'react';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { ArrowBtns, ArrowSpan } from 'ui-kit/ArrowBtns';
import { paginateHandler } from 'components/store/storeLayout/helpers';
import { ProductFlex, ContentWrapper, BtnsWrapper } from './common';
import { HeaderWrapper } from '../common';
import { Product, ProductService } from 'swagger/services';
import ArrowWhite from '../../../../assets/arrow_white.svg';

const BuyTogether = ({ product }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = (await ProductService.getProducts({
        limit: 4,
        brands: [product?.brand.url],
        tags: product?.tags?.map((tag: any) => tag.url),
      })) as unknown as { rows: Product[]; length: number };
      setProducts(response.rows.filter((item) => item.id != product.id));
      setLoading(false);
    })();
  }, []);

  return (
    <>
      {products.length !== 0 ? (
        <ContentWrapper>
          <HeaderWrapper
            custom={0.2}
            initial="init"
            whileInView="animate"
            viewport={{ once: true }}
            variants={variants.fadInSlideUp}
          >
            <h3>Покупают вместе</h3>
          </HeaderWrapper>
          <ProductFlex products={products} loading={loading} />
        </ContentWrapper>
      ) : (
        ''
      )}
    </>
  );
};

export default BuyTogether;
