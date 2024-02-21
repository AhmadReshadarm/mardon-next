import { useEffect, useState } from 'react';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { ArrowBtns, ArrowSpan } from 'ui-kit/ArrowBtns';
import { paginateHandler } from 'components/store/storeLayout/helpers';
import { ProductFlex, ContentWrapper, BtnsWrapper } from './common';
import { HeaderWrapper } from '../common';
import { Product, ProductService } from 'swagger/services';
import ArrowWhite from '../../../../assets/arrow_white.svg';

type Props = {
  product: Product;
};

const BuyTogether: React.FC<Props> = ({ product }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = (await ProductService.getProducts({
        limit: 4,
        categories: [product?.category?.url!],
      })) as unknown as { rows: Product[]; length: number };
      // .tags?.map((tag: any) => tag.url)
      const offset = Math.floor(Math.random() * response.length) - 5;
      const buyTogether = (await ProductService.getProducts({
        limit: 4,
        offset: `${offset < 5 ? 0 : offset}`,
        categories: [product?.category?.url!],
      })) as unknown as { rows: Product[]; length: number };
      //  tags: product?.tags?.map((tag: any) => tag.url),
      setProducts(buyTogether.rows.filter((item) => item.id != product.id));
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
