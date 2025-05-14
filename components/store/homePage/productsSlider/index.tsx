import { useEffect, useState } from 'react';
import { Product } from 'swagger/services';
import styles from '../styles/productSlider.module.css';
import SliderItems from './sliderItems';
type Props = {
  caroselProducts: Product[];
  base64Image: any;
};

const ProductsSlider: React.FC<Props> = ({ caroselProducts, base64Image }) => {
  // ------------------- UI hooks --------------------------------

  const [caroselIndex, setCaroselIndex] = useState<number>(0);
  const [isMouseHover, setISMouseHover] = useState<boolean>(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (caroselProducts.length - 1 > caroselIndex && !isMouseHover) {
        setCaroselIndex(caroselIndex + 1);
      }
      if (caroselProducts.length - 1 <= caroselIndex && !isMouseHover) {
        setCaroselIndex(0);
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, [caroselIndex, isMouseHover]);

  return (
    <div
      className={styles.Container}
      onMouseEnter={() => {
        setISMouseHover(true);
      }}
      onMouseLeave={() => {
        setISMouseHover(false);
      }}
      onTouchStart={() => {
        setISMouseHover(true);
        setISMouseHover(true);
      }}
      onTouchEnd={() => {
        setISMouseHover(false);
      }}
    >
      <div className={styles.Wrapper}>
        {caroselProducts.map((product, index) => {
          return (
            <SliderItems
              product={product}
              index={index}
              caroselIndex={caroselIndex}
              caroselProducts={caroselProducts}
              base64Image={base64Image}
              setCaroselIndex={setCaroselIndex}
              setISMouseHover={setISMouseHover}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductsSlider;
