import { Rating } from '@mui/material';
import ActionBtns from './ActionBtns';
import ColorPicker from './ColorPicker';
import { Basket, Product, ProductVariant } from 'swagger/services';
import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { useAppSelector } from 'redux/hooks';
import { TCartState } from 'redux/types';
import { QuestionSVG } from 'assets/icons/UI-icons';
import styles from '../../styles/detail.module.css';
type Props = {
  product?: Product;
  selectedIndex: number;
  reviewRef: MutableRefObject<any>;
  questionRef: MutableRefObject<any>;
  setFirstLoad: Dispatch<SetStateAction<boolean>>;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
  paginateImage: Dispatch<SetStateAction<number>>;
};

const Details: React.FC<Props> = ({
  product,
  selectedIndex,
  questionRef,
  reviewRef,
  setSelectedIndex,
  paginateImage,
  setFirstLoad,
}) => {
  const { variant } = useAppSelector<TCartState>((state) => state.cart);

  const cart: Basket = useAppSelector((state) => state.cart.cart);
  const orderProduct = cart?.orderProducts?.find(
    (orderProduct) => orderProduct.product?.id === product?.id,
  );

  const checkHasOldPrice = (productVariant: ProductVariant) => {
    if (productVariant?.oldPrice) return true;
    return false;
  };

  return (
    <div className={styles.DetailsContainer}>
      <div className={styles.UserSelectWrapper}>
        <div className={styles.product_title_wrapper}>
          <div className={styles.title_top_bar}></div>
          <h1 className={styles.product_header_1} itemProp="name">
            {product?.name}
          </h1>
        </div>

        <div className={styles.short_description_wrapper}>
          <p>
            <span itemProp="description">
              {product?.desc?.includes('|')
                ? product?.desc?.split('|')[0]?.length! > 150
                  ? product?.desc?.split('|')[0].slice(0, 150) + '...'
                  : product?.desc?.split('|')[0]
                : product?.desc?.length! > 150
                ? product?.desc?.slice(0, 150) + '...'
                : product?.desc?.slice(0, 150)}
            </span>
          </p>
        </div>
        <div className={styles.ConvoContainer}>
          <div className={styles.convo_contentWrapper}>
            <div className={styles.ConvoWrappers}>
              <Rating
                value={product?.rating?.avg}
                precision={0.5}
                size="medium"
                readOnly
              />
            </div>
            <div className={styles.ConvoWrappers}>
              <span
                className={styles.reviews_text_wrapper}
                onClick={() => {
                  reviewRef.current.click();
                  reviewRef.current.scrollIntoView();
                }}
              >
                <span>{product?.reviews?.length ?? 0}</span>
                <span>Отзыв(ов) об этом товаре</span>
              </span>
            </div>
            <div className={styles.ConvoWrappers}>
              <span>
                <QuestionSVG />
              </span>

              <span
                onClick={() => {
                  questionRef.current.click();
                  questionRef.current.scrollIntoView();
                }}
              >
                <span>{product?.questions?.length} вопрос(ов) о товаре</span>
              </span>
            </div>
          </div>
          <div className={styles.PriceWrapper}>
            <div className={styles.PriceItem}>
              {checkHasOldPrice(variant! ?? product?.productVariants![0])
                ? `${
                    variant?.oldPrice ?? product?.productVariants![0]?.oldPrice
                  } ₽`
                : ''}
            </div>
            <div className={styles.PriceItem}>
              {variant?.price ?? product?.productVariants![0]?.price} ₽
            </div>
          </div>
        </div>

        <div className={styles.SizePickerWrapper}>
          <div className={styles.info_size_wrapper}>
            <span className={styles.title}>Выберите артикул:</span>
          </div>
          <ColorPicker
            variantColor={variant?.color ?? product?.productVariants![0]?.color}
            productVariants={product?.productVariants}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            paginateImage={paginateImage}
            setFirstLoad={setFirstLoad}
          />
        </div>
      </div>

      <ActionBtns cart={cart} product={product!} />
    </div>
  );
};

export default Details;
