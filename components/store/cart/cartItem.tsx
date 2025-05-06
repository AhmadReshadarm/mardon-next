import { getProductVariantsImages } from 'common/helpers/getProductVariantsImages.helper';
import Link from 'next/link';
import { OrderProduct, Product } from 'swagger/services';
import { AddToCart, AddToWishlist } from 'ui-kit/ProductActionBtns';
import styles from './cartStyles.module.css';
type Props = {
  orderProduct: OrderProduct;
  product?: Product;
};

const CartItem: React.FC<Props> = ({ orderProduct, product }) => {
  const images = getProductVariantsImages(
    orderProduct.product?.productVariants,
  );

  return (
    <li className={styles.ProductItemWrapper}>
      <a href={`/product/${orderProduct!.product?.url}`}>
        <img
          src={`/api/images/${images[0]}`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = '/img_not_found.png';
          }}
          className={styles.product_img}
        />
      </a>
      <div className={styles.product_details_wrapper}>
        <div className={styles.product_title_description_wrapper}>
          <Link href={`/product/${orderProduct!.product?.url}`}>
            <h1 title={orderProduct!?.product!?.name}>
              {orderProduct!?.product!?.name?.length! > 18
                ? orderProduct!?.product!?.name?.slice(0, 18) + ' ...'
                : orderProduct!?.product!?.name}
            </h1>
          </Link>

          {/* ------------ rating --------------- */}
          <div
            title={`${
              Math.floor(orderProduct!?.product!?.reviews?.length!) == 1
                ? Math.floor(orderProduct!?.product!?.reviews?.length!) +
                  ' Оценка'
                : Math.floor(orderProduct!?.product!?.reviews?.length!) / 2 == 0
                ? Math.floor(orderProduct!?.product!?.reviews?.length!) +
                  ' Оценки'
                : Math.floor(orderProduct!?.product!?.reviews?.length!) +
                  ' Оценок'
            } `}
            className={styles.rating_wrapper}
            style={{
              display:
                orderProduct!?.product!?.reviews?.length! == 0
                  ? 'none'
                  : 'flex',
            }}
          >
            <span className={styles.review_star}>
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 9.64421L9.708 12L8.724 7.56L12 4.57263L7.686 4.18737L6 0L4.314 4.18737L0 4.57263L3.276 7.56L2.292 12L6 9.64421Z"
                  fill="#FAAF00"
                />
              </svg>
            </span>
            <span className={styles.review_text}>
              {Math.floor(orderProduct!?.product!?.reviews?.length!) == 1
                ? Math.floor(orderProduct!?.product!?.reviews?.length!) +
                  ' Оценка'
                : Math.floor(orderProduct!?.product!?.reviews?.length!) / 2 == 0
                ? Math.floor(orderProduct!?.product!?.reviews?.length!) +
                  ' Оценки'
                : Math.floor(orderProduct!?.product!?.reviews?.length!) +
                  ' Оценок'}
            </span>
          </div>
          {/* ------------- end of rating ---------------- */}
          {/* ----------- color ------------------- */}
          <div
            style={{
              alignItems: 'center',
              display:
                orderProduct?.productVariant?.color?.url == '-' ||
                orderProduct?.productVariant?.color?.url == '_' ||
                orderProduct?.productVariant?.color?.url == ''
                  ? 'none'
                  : 'flex',
            }}
            className={styles.artical_wrapper}
          >
            <span>Цвет : </span>
            {
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: orderProduct?.productVariant?.color?.code,
                  border: '1px solid rgb(129 129 129)',
                }}
              />
            }
          </div>
          {/* ---------- end of color ----------- */}
          {/* ----------- artical ------------------- */}
          <div className={styles.artical_wrapper}>
            <span>Артикул: </span>

            <span>
              {orderProduct?.productVariant?.artical!.includes('|')
                ? orderProduct?.productVariant
                    ?.artical!.split('|')[0]
                    .toUpperCase()
                : orderProduct?.productVariant?.artical!.toUpperCase()}
            </span>
          </div>
          {/* ---------- end of artical ----------- */}
        </div>

        <div className={styles.price_sperator_wrapper}>
          <div className={styles.old_new_price_wrapper}>
            <span
              style={{
                display: !orderProduct!.productVariant?.oldPrice
                  ? 'none'
                  : 'flex',
              }}
              className={styles.old_price}
            >
              {orderProduct!?.productVariant?.oldPrice} ₽
            </span>
            <span>
              {orderProduct!?.qty!}шт x {orderProduct!?.productVariant?.price} ₽
            </span>
          </div>
          <span className={styles.total_price_wrapper}>
            Итого:{orderProduct!?.qty! * orderProduct!?.productVariant?.price!}{' '}
            ₽
          </span>
        </div>
      </div>
      <div className={styles.action_buttons_wrapper}>
        <AddToWishlist product={orderProduct!?.product!} />
        <AddToCart
          product={orderProduct!?.product!}
          qty={orderProduct!?.qty!}
          variant={product?.productVariants![0]}
        />
      </div>
    </li>
  );
};

export default CartItem;
