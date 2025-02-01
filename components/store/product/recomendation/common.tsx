import { Product } from 'swagger/services';
import ProductItem from 'ui-kit/products/productItem';
import { LoaderItem } from 'ui-kit/products/Loader';
import { emptyLoading } from 'common/constants';
import styles from '../styles/RecomendationSub.module.css';
import Link from 'next/link';
type Props = {
  products: Product[];
  loading: boolean;
  seeMoreUrl: string;
};
const ProductFlex: React.FC<Props> = ({ products, loading, seeMoreUrl }) => {
  return (
    <div className={styles.FlexWrapper}>
      <ul className={styles.SliderWrapper}>
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
              return <LoaderItem index={index} />;
            })}
      </ul>
      <div className={styles.seeMoreWrapper}>
        <Link href={seeMoreUrl}>
          <button className={styles.seeMoreButton}>
            <span>Смотреть больше</span>
            <span>
              <svg
                width="6"
                height="10"
                viewBox="0 0 6 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1.5L4.84375 5.53125L1.03125 9.34375"
                  stroke="#000"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

const ProductFlexEmpty = () => {
  return (
    <div className={styles.FlexWrapper}>
      <ul className={styles.SliderWrapper}>
        {emptyLoading.map((item, index) => {
          return <LoaderItem index={index} />;
        })}
      </ul>
    </div>
  );
};

export { ProductFlex, ProductFlexEmpty };
