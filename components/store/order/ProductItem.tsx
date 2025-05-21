import Link from 'next/link';
import { OrderProduct } from 'swagger/services';
type Props = {
  orderProduct: OrderProduct;
};
const ProductItem: React.FC<Props> = ({ orderProduct }) => {
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
        />
      </Link>
      <div className="product-info-wrapper">
        <Link
          className="product-title-wrapper"
          href={`/product/${orderProduct.product?.url}`}
        >
          <h1>{orderProduct.product?.name}</h1>
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
            {orderProduct.productVariant?.price!} ₽ x {orderProduct.qty} шт ={' '}
            {orderProduct.productVariant?.price! * orderProduct.qty!} ₽
          </span>
        </div>
      </div>
    </li>
  );
};

export default ProductItem;
