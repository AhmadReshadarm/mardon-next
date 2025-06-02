import Link from 'next/link';
import { Checkout, OrderProduct } from 'swagger/services';
import {
  calculateIndvidualPercent,
  calculateIndvidualProductTotal,
} from './helpers';
type Props = {
  orderProduct: OrderProduct;
  checkout: Checkout;
};
const ProductItem: React.FC<Props> = ({ orderProduct, checkout }) => {
  return (
    <li className="product">
      <Link
        href={`/product/${orderProduct.product?.url}`}
        className="image-wrapper"
      >
        <img
          src={`/api/images/${
            orderProduct.productVariant?.images?.split(', ')[0]
          }`}
          alt={orderProduct.product?.name}
          title={orderProduct!?.product!?.name}
        />
      </Link>
      <div className="product-info-wrapper">
        <Link
          className="product-title-wrapper"
          href={`/product/${orderProduct.product?.url}`}
          title={orderProduct!?.product!?.name}
        >
          <h1>
            {orderProduct!?.product!?.name?.split('(')[0]}{' '}
            {orderProduct?.productVariant?.artical!.includes('|')
              ? orderProduct?.productVariant
                  ?.artical!.split('|')[0]
                  .toUpperCase()
              : orderProduct?.productVariant?.artical!.toUpperCase()}
          </h1>
        </Link>

        {orderProduct.productVariant?.color?.name === '_' ||
        orderProduct.productVariant?.color?.name === '-' ||
        orderProduct.productVariant?.color?.name === ' ' ? (
          <></>
        ) : (
          <div className="color-wrapper">
            <span>Цвет: </span>
            <span
              style={{
                backgroundColor: `${orderProduct.productVariant?.color?.code}`,
                borderRadius: '50%',
                padding: '5px',
                width: '10px',
                height: '10px',
                minWidth: '10px',
                minHeight: '10px',
              }}
              title={orderProduct.productVariant?.color?.name}
            ></span>
          </div>
        )}
        {
          <div className="selected-sizes">
            <span>
              Артикул: {orderProduct.productVariant?.artical?.toUpperCase()}
            </span>
          </div>
        }
        <div className="total-numbers">
          <span>
            {orderProduct.productVariant?.price!} ₽ x {orderProduct.qty}
            {calculateIndvidualPercent(
              checkout.paymentMethod,
              orderProduct.productVariant?.price!,
            )}{' '}
            шт ={' '}
            {calculateIndvidualProductTotal(
              checkout.paymentMethod,
              orderProduct.productVariant?.price!,
              orderProduct.qty!,
            )}{' '}
            ₽
          </span>
        </div>
      </div>
    </li>
  );
};

export default ProductItem;
