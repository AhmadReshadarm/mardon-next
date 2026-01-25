import { Button, Form, Input, Select, Switch } from 'antd';
import { Color, Image } from 'swagger/services';
import { ManageProductFields } from './ManageProductsFields.enum';
import styles from './products.module.scss';
import MultipleImageUpload from '../generalComponents/MultipleImageUpload';
import { InsertRowLeftOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useState } from 'react';
import DatabaseImages from 'ui-kit/DatabaseImages';
import { useAppDispatch } from 'redux/hooks';
import { clearImageListForVariant } from 'redux/slicers/mutipleImagesSlicer';

const { Option } = Select;

type Props = {
  colors: Color[];
  index: number;
  setVariants: any;
  imagesList: Image[];
  variantId: number;
};
const ProductVariant: React.FC<Props> = ({
  colors,
  index,
  setVariants,
  imagesList,
  variantId,
}) => {
  const dispatch = useAppDispatch();

  const handleRemove = (variantId: number) => () => {
    setVariants((prev) => prev.filter((v) => v.id !== variantId));
    dispatch(clearImageListForVariant(variantId));
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
        onClick={handleRemove(variantId)}
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
      <Form.Item name={`id[${variantId}]`} style={{ display: 'none' }}>
        <Input name={`id[${variantId}]`} />
      </Form.Item>
      {/* ----------------------PRICE---------------------- */}
      <Form.Item
        label="цена"
        name={`${ManageProductFields.Price}[${variantId}]`}
        required
      >
        <Input
          min={1}
          required={true}
          type={'number'}
          placeholder="Введите стоимость продукта"
        />
      </Form.Item>
      {/* ----------------------OLD PRICE---------------------- */}

      <Form.Item
        label="Старая цена"
        name={`${ManageProductFields.OldPrice}[${variantId}]`}
      >
        <Input
          // required={true}
          type={'number'}
          placeholder="Введите устаревшую стоимость продукта"
        />
      </Form.Item>
      {/* ----------------------Artical---------------------- */}
      <Form.Item
        label="Артикул (используйте заглавные буквы)"
        name={`${ManageProductFields.Artical}[${variantId}]`}
        required
      >
        <Input required={true} placeholder="введите Артикул" />
      </Form.Item>
      {/* ----------------------AVAILABLE---------------------- */}
      <Form.Item
        label="В наличии"
        name={`${ManageProductFields.Available}[${variantId}]`}
        valuePropName="checked"
        required={true}
      >
        <Switch />
      </Form.Item>
      {/* ----------------------COLORS---------------------- */}
      <Form.Item
        label="Цвет"
        name={`${ManageProductFields.Color}[${variantId}]`}
        required={true}
      >
        <Select
          allowClear
          style={{ width: '100%' }}
          placeholder={`Выберите цвета`}
        >
          {colors?.map((item, index) => (
            <Option key={item.id} value={item.id}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '10px',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  borderTop: index == 0 ? 'none' : '1px solid #4096FF',
                  padding: '5px 0',
                }}
              >
                <span
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: item.code,
                    borderRadius: '50%',
                  }}
                ></span>
                <span>{`${item.name}`}</span>
              </div>
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        style={{ border: '1px solid', padding: '15px', borderRadius: '10px' }}
        label="Параметры загрузки изображений"
        name={`${ManageProductFields.Images}[${variantId}]`}
        required
      >
        <MultipleImageUpload
          fileList={imagesList}
          isProduct={true}
          index={variantId}
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
            prodcutVariantIndex={variantId}
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
