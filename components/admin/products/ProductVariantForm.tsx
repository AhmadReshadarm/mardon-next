import { Button, Form, Input, Select, Switch } from 'antd';
import { Color, Image } from 'swagger/services';
import { ManageProductFields } from './ManageProductsFields.enum';
import styles from './products.module.scss';
import CloseSVG from '../../../assets/close_black.svg';
import MultipleImageUpload from '../generalComponents/MultipleImageUpload';
import { InsertRowLeftOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useState } from 'react';
import DatabaseImages from 'ui-kit/DatabaseImages';

const { Option } = Select;

type Props = {
  colors: Color[];
  index: number;
  setVariants: any;
  imagesList: Image[];
};
const ProductVariant: React.FC<Props> = ({
  colors,
  index,
  setVariants,
  imagesList,
}) => {
  const handleRemove = (index) => () => {
    setVariants((prev) => {
      const array = [...prev];
      array.splice(index, 1);

      return array;
    });
  };
  const [isOpen, setOpen] = useState(false);
  return (
    <div className={styles['product-variant']}>
      <h2 className={styles['product-variant__title']}>
        Вариант № {index + 1}
      </h2>
      <button
        type={'button'}
        className={styles['product-variant__remove']}
        onClick={handleRemove(index)}
      >
        <CloseSVG />
      </button>
      <Form.Item name={`id[${index}]`} style={{ display: 'none' }}>
        <Input name={`id[${index}]`} />
      </Form.Item>
      {/* ----------------------PRICE---------------------- */}
      <Form.Item name={`${ManageProductFields.Price}[${index}]`} required>
        <Input
          required={true}
          type={'number'}
          placeholder="Введите стоимость продукта"
        />
      </Form.Item>
      {/* ----------------------OLD PRICE---------------------- */}
      <Form.Item name={`${ManageProductFields.OldPrice}[${index}]`}>
        <span>
          опцию Оставьте пустым, если хотите скрыть эту опцию на стороне
          клиента.
        </span>
        <Input
          type={'number'}
          placeholder="Введите устаревшую стоимость продукта"
        />
      </Form.Item>
      {/* ----------------------wholeSalePrice---------------------- */}
      {/* <Form.Item
        name={`${ManageProductFields.wholeSalePrice}[${index}]`}
        required
      >
        <Input type={'number'} placeholder="введите оптовую цену" />
      </Form.Item> */}
      {/* ----------------------AVAILABLE---------------------- */}
      <Form.Item
        label="В наличии"
        name={`${ManageProductFields.Available}[${index}]`}
        valuePropName="checked"
        required
      >
        <Switch />
      </Form.Item>
      {/* ----------------------COLORS---------------------- */}
      <Form.Item
        label="Цвет"
        name={`${ManageProductFields.Color}[${index}]`}
        required
      >
        <Select
          allowClear
          style={{ width: '100%' }}
          placeholder={`Выберите цвета`}
        >
          {colors?.map((item) => (
            <Option key={item.id} value={item.id}>{`${item.name}`}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name={`${ManageProductFields.Images}[${index}]`} required>
        <MultipleImageUpload
          fileList={imagesList}
          isProduct={true}
          index={index}
        />
        <ButtonDevider>
          <Button
            onClick={() => setOpen(true)}
            icon={<InsertRowLeftOutlined />}
          >
            Выбрать из базы данных
          </Button>
        </ButtonDevider>

        <DatabaseImages
          isProducts={true}
          setOpen={setOpen}
          isOpen={isOpen}
          prodcutVariantIndex={index}
        />
      </Form.Item>
    </div>
  );
};

const ButtonDevider = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
  padding: 20px 0;
`;

export default ProductVariant;
