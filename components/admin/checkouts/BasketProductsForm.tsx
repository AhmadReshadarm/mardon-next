import { Form, Input, Select, Switch } from 'antd';
import { Product, ProductVariant } from 'swagger/services';
import styles from './checkouts.module.scss';
import { ManageCheckoutFields } from './ManageCheckoutFields.enum';
import Image from 'next/image';
import { useState } from 'react';
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
    <li key={`product-variant-${index}`} className={styles['product-variant']}>
      <h2 className={styles['product-variant__title']}>{`${index + 1}. ${
        product.name
      }`}</h2>
      <button
        type={'button'}
        className={styles['product-variant__remove']}
        onClick={handleRemove(product.id!, basketList, setBasketList)}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 21 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="1"
            y1="-1"
            x2="26.3541"
            y2="-1"
            transform="matrix(0.683484 -0.729965 0.681649 0.731679 1.52267 21.0312)"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
          />
          <line
            x1="1"
            y1="-1"
            x2="26.3044"
            y2="-1"
            transform="matrix(0.680786 0.732483 -0.684345 0.729158 0.21875 1.03125)"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </button>

      <ul
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          gap: '15px',
        }}
      >
        {product.productVariants?.map((variant, variantIndex) => {
          return (
            <ProductVariantItem
              index={index}
              variantIndex={variantIndex}
              variant={variant}
            />
          );
        })}
      </ul>
    </li>
  );
};
type PropsV = {
  variantIndex: number;
  index: number;
  variant: ProductVariant;
};
const ProductVariantItem: React.FC<PropsV> = ({
  index,
  variantIndex,
  variant,
}) => {
  const [addToCart, setAddToCart] = useState(false);
  return (
    <li
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: '15px',
        border: '1px solid',
        padding: '20px',
        borderRadius: '30px',
      }}
      key={variantIndex}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '10px',
        }}
      >
        {/* <span>add to cart?</span> */}

        <Form.Item
          label="Добавить в корзину?"
          name={`${ManageCheckoutFields.IsAddToCart}[${index}][${variantIndex}]`}
          valuePropName="checked"
        >
          <Switch
            defaultChecked={false}
            value={addToCart}
            onChange={() => setAddToCart(!addToCart)}
          />
        </Form.Item>
      </div>
      {addToCart ? (
        <>
          {' '}
          <Form.Item
            name={`${ManageCheckoutFields.Variant}[${index}][${variantIndex}]`}
            required={true}
            style={{ width: '100%' }}
          >
            <Select
              placeholder={`Выберите Вариант`}
              allowClear
              style={{ width: '100%', minHeight: '100px' }}
            >
              <Option required={true} key={variant.id} value={variant.id}>
                <div
                  style={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    src={`/api/images/${variant.images?.split(', ')[0]}`}
                    alt={variant.artical!}
                    width={80}
                    height={80}
                    style={{ borderRadius: '15px' }}
                  />
                  <span>Цена: {variant.price} ₽</span>
                  <span>Цвет: </span>
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      minWidth: '20px',
                      minHeight: '20px',
                      borderRadius: '50%',
                      border: '1px solid',
                      backgroundColor: variant.color?.code,
                    }}
                    title={variant.color?.name}
                  />
                  <span>Артикул:</span>
                  <span>{variant.artical?.toUpperCase()}</span>
                </div>
              </Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Количество товар"
            required={true}
            name={`${ManageCheckoutFields.Qty}[${index}][${variantIndex}]`}
          >
            <Input
              required={true}
              type={'number'}
              placeholder="Напишите количество товара"
            />
          </Form.Item>
        </>
      ) : (
        <div
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
          }}
        >
          <Image
            src={`/api/images/${variant.images?.split(', ')[0]}`}
            alt={variant.artical!}
            width={80}
            height={80}
            style={{ borderRadius: '15px' }}
          />
          <span>Цена: {variant.price} ₽</span>
          <span>Цвет: </span>
          <div
            style={{
              width: '20px',
              height: '20px',
              minWidth: '20px',
              minHeight: '20px',
              borderRadius: '50%',
              border: '1px solid',
              backgroundColor: variant.color?.code,
            }}
            title={variant.color?.name}
          />
          <span>Артикул:</span>
          <span>{variant.artical?.toUpperCase()}</span>
        </div>
      )}
    </li>
  );
};

export default BasketProductForm;
