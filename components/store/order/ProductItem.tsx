import { formatNumber } from 'common/helpers/number.helper';
import Link from 'next/link';
import { OrderProduct } from 'swagger/services';
import { TAuthState } from 'redux/types';
import { useAppSelector } from 'redux/hooks';
import { Role } from 'common/enums/roles.enum';
type Props = {
  orderProduct: OrderProduct;
};
const ProductItem: React.FC<Props> = ({ orderProduct }) => {
  const curVariant = orderProduct.productVariant
    ? orderProduct.productVariant
    : orderProduct.product?.productVariants![0]
    ? orderProduct.product?.productVariants![0]
    : ({} as any);

  const { user } = useAppSelector<TAuthState>((state) => state.auth);
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
          ''
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
            <span>Артикул: {orderProduct.productVariant?.artical}</span>
          </div>
        }
        <div className="total-numbers">
          <span>
            {user?.role === Role.SuperUser
              ? curVariant.wholeSalePrice
              : formatNumber(curVariant.price)}{' '}
            ₽ - {orderProduct.qty}шт
          </span>
        </div>
      </div>
    </li>
  );
};

export default ProductItem;
