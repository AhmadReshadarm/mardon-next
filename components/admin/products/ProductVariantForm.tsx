import { Button, Form, Input, Select, Switch } from 'antd';
import { Color, Image } from 'swagger/services';
import { ManageProductFields } from './ManageProductsFields.enum';
import styles from './products.module.scss';
import MultipleImageUpload from '../generalComponents/MultipleImageUpload';
import { InsertRowLeftOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useState } from 'react';
import DatabaseImages from 'ui-kit/DatabaseImages';
import { CloseSVGBlack } from 'assets/icons/UI-icons';

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
        <CloseSVGBlack />
      </button>
      <Form.Item name={`id[${index}]`} style={{ display: 'none' }}>
        <Input name={`id[${index}]`} />
      </Form.Item>
      {/* ----------------------PRICE---------------------- */}
      <Form.Item name={`${ManageProductFields.Price}[${index}]`} required>
        <Input
          min={1}
          required={true}
          type={'number'}
          placeholder="Введите стоимость продукта"
        />
      </Form.Item>
      {/* ----------------------OLD PRICE---------------------- */}

      <Form.Item name={`${ManageProductFields.OldPrice}[${index}]`}>
        <Input
          // required={true}
          type={'number'}
          placeholder="Введите устаревшую стоимость продукта"
        />
      </Form.Item>
      {/* ----------------------Artical---------------------- */}
      <Form.Item name={`${ManageProductFields.Artical}[${index}]`} required>
        <Input required={true} placeholder="введите Артикул" />
      </Form.Item>
      {/* ----------------------AVAILABLE---------------------- */}
      <Form.Item
        label="В наличии"
        name={`${ManageProductFields.Available}[${index}]`}
        valuePropName="checked"
        required={true}
      >
        <Switch />
      </Form.Item>
      {/* ----------------------COLORS---------------------- */}
      <Form.Item
        label="Цвет"
        name={`${ManageProductFields.Color}[${index}]`}
        required={true}
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

        {isOpen ? (
          <DatabaseImages
            isProducts={true}
            setOpen={setOpen}
            isOpen={isOpen}
            prodcutVariantIndex={index}
          />
        ) : (
          ''
        )}
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
