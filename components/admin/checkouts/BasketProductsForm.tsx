import { Button, Form, Input, Select, Switch } from 'antd';
import { Product } from 'swagger/services';
import styles from './checkouts.module.scss';
import CloseSVG from '../../../assets/close_black.svg';
import { ManageCheckoutFields } from './ManageCheckoutFields.enum';
const { Option } = Select;
type Props = {
  product: Product;
  index: number;
  basketList: Product[];
  setBasketList: any;
};

const BasketProductForm: React.FC<Props> = ({
  product,
  index,
  basketList,
  setBasketList,
}) => {
  const handleRemove =
    (productId: string, basketList: Product[], setBasketList: any) => () => {
      const filtered = basketList.filter(
        (productInBasket) => productInBasket.id !== productId,
      );
      setBasketList(filtered);
    };
  return (
    <div key={`product-variant-${index}`} className={styles['product-variant']}>
      <h2 className={styles['product-variant__title']}>{`${index + 1}. ${
        product.name
      }`}</h2>
      <button
        type={'button'}
        className={styles['product-variant__remove']}
        onClick={handleRemove(product.id!, basketList, setBasketList)}
      >
        <CloseSVG />
      </button>
      {/* ----------------------COLORS---------------------- */}
      <Form.Item
        label="Вариант"
        name={`${ManageCheckoutFields.Variant}[${index}]`}
        required
      >
        <Select
          allowClear
          style={{ width: '100%' }}
          placeholder={`Выберите Вариант`}
        >
          {product.productVariants?.map((variant) => (
            <Option
              key={variant.id}
              value={variant.id}
            >{`Цена: ${variant.price}, Цвет: ${variant.color?.name}`}</Option>
          ))}
        </Select>
      </Form.Item>
      {/* ----------------------SIZES---------------------- */}
      <Form.Item
        label="Размер"
        name={`${ManageCheckoutFields.ProductSize}[${index}]`}
        required
      >
        <Select
          allowClear
          style={{ width: '100%' }}
          placeholder={`Выберите Размер`}
        >
          {product.sizes?.map((size) => (
            <Option
              key={size.id}
              value={size.name}
            >{`Размер: ${size.name}`}</Option>
          ))}
        </Select>
      </Form.Item>
      {/* ----------------------PRICE---------------------- */}
      <Form.Item
        label="Количество товар"
        required={true}
        name={`${ManageCheckoutFields.Qty}[${index}]`}
      >
        <Input
          required={true}
          type={'number'}
          placeholder="Напишите количество товара"
        />
      </Form.Item>
    </div>
  );
};

export default BasketProductForm;
