import { Button, Form, Input, List, Select, Spin } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { generateArrayOfNumbers } from 'common/helpers/array.helper';
import { navigateTo } from 'common/helpers/navigateTo.helper';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  clearImageList,
  setDefaultImageList,
} from 'redux/slicers/mutipleImagesSlicer';
import { TMultipleImageState } from 'redux/types';
import { Page } from 'routes/constants';
import {
  // Brand,
  Category,
  Color,
  ParameterProduct,
  Product,
  // Size,
  Tag,
} from 'swagger/services';

import FormItem from '../generalComponents/FormItem';
import {
  handleCategoryChange,
  handleFormSubmitProduct,
  initialValuesConverter,
  handleParameterChange,
} from './helpers';
import { ManageProductFields } from './ManageProductsFields.enum';
import styles from './products.module.scss';
import ProductVariantForm from './ProductVariantForm';

const { Option } = Select;

type Props = {
  products: Product[];
  product?: Product;
  title: string;
  isLoading: boolean;
  isSaveLoading: boolean;
  editMode: boolean;
  tags: Tag[];
  // sizes: Size[];
  colors: Color[];
  categories: Category[];
};

const ManageProductForm = ({
  title,
  products,
  product,
  isLoading,
  isSaveLoading,
  editMode,
  tags,
  // sizes,
  colors,
  categories,
}: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const [variants, setVariants] = useState<any[]>([]);
  const hasInitializedForm = useRef(false);

  // const initialValues = initialValuesConverter(product as Product,  variants);
  const [curCategory, setCurCategory] = useState<Category>();
  const [parameterProducts, setParameterProducts] = useState<
    ParameterProduct[]
  >([]);
  const { imagesMap } = useAppSelector<TMultipleImageState>(
    (state) => state.multipleImages,
  );

  useEffect(() => {
    // set UI Varaints Ids in edit mode from DB id
    if (product?.productVariants && editMode) {
      const initialVariants = product.productVariants.map((v) => ({
        id: v.id,
      }));
      setVariants(initialVariants);
    }
    // Initialize images
    if (product && editMode) {
      product!.productVariants?.forEach((variant, index) => {
        const images = variant.images?.split(', ').map((image) => ({
          uid: image,
          name: image,
          url: `/api/images/${image}`,
        }));

        images?.forEach((image) => {
          dispatch(setDefaultImageList({ file: image, index: variant.id }));
        });
      });
    }

    // ---------------------------------------------------------------

    setCurCategory(product?.category);
    setParameterProducts(
      product?.category?.parameters?.map((parameter) => {
        const parameterProduct = product.parameterProducts?.find(
          (parameterProduct) => parameterProduct.parameterId === parameter.id,
        );

        return {
          parameter: parameter,
          value: parameterProduct?.value,
        };
      })!,
    );

    return () => {
      dispatch(clearImageList());
    };
  }, [product]);

  useEffect(() => {
    if (
      product &&
      editMode &&
      variants.length > 0 &&
      !hasInitializedForm.current
    ) {
      const values = initialValuesConverter(product, variants);
      form.setFieldsValue(values);
      hasInitializedForm.current = true;
    }
  }, [product, editMode, variants]);

  const handleAddVariant = () => {
    const uniqueId = Math.floor(Math.random() * 5000);
    setVariants((prev) => prev.concat({ id: uniqueId }));
  };

  const filteredTags = tags.map((tag) => {
    return { value: tag.id, label: tag.name };
  });

  return (
    <>
      <div className={styles.createProductHeader}>
        <h1 className={styles.createProductHeader__title}>{title}</h1>
      </div>
      {(isLoading || !product) && editMode ? (
        <Spin className={styles.spinner} size="large" />
      ) : (
        <Form
          layout="vertical"
          onFinish={handleFormSubmitProduct(
            router,
            dispatch,
            imagesMap,
            parameterProducts,
            variants.length,
            // editorModal,
            variants,
          )}
          form={form}
          // initialValues={initialValues}
          requiredMark={true}
          className={styles.createProductForm}
        >
          {/* ----------------------NAME---------------------- */}
          <FormItem
            option={ManageProductFields.Name}
            children={
              <Input required={true} placeholder="Введите имя товара" />
            }
          />
          {/* ----------------------ULR---------------------- */}
          <FormItem
            option={ManageProductFields.Url}
            children={
              <Input required={true} placeholder="Введите Url товара" />
            }
          />
          {/* ----------------------DESCRIPTION---------------------- */}

          <FormItem
            option={ManageProductFields.Desc}
            children={
              <TextArea
                required={true}
                rows={10}
                placeholder="Введите описание"
              />
            }
          />

          {/* ----------------------SHORT DESCRIPTION---------------------- */}
          <FormItem
            option={ManageProductFields.ShortDesc}
            children={
              <TextArea
                required={true}
                rows={10}
                placeholder="Введите краткое описание, Не более 350 символов"
              />
            }
          />
          {/* ----------------------KEYWORDS---------------------- */}
          <FormItem
            option={ManageProductFields.Keywords}
            children={
              <TextArea
                required={true}
                rows={10}
                placeholder="Введите keywords | Пользователь ',' между каждым ключевым словом, Например: ключевое слово-1, ключевое слово-2."
              />
            }
          />
          {/* ----------------------CATEGORIES---------------------- */}
          <FormItem
            option={ManageProductFields.Category}
            children={
              <>
                <Select
                  onChange={handleCategoryChange(
                    categories,
                    setCurCategory,
                    setParameterProducts,
                  )}
                  style={{ width: '100%', height: '50px' }}
                >
                  {categories?.map((item) => {
                    return (
                      <Option
                        key={item.id}
                        value={item.id}
                        style={{ padding: '10px' }}
                      >
                        <div
                          style={{
                            borderBottom: '1px solid #4096FF',
                          }}
                        >
                          <p style={{ fontWeight: '600', fontSize: '1rem' }}>
                            {item.parent?.name}{' '}
                            <svg
                              width="6"
                              height="10"
                              viewBox="0 0 6 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 1.5L4.84375 5.53125L1.03125 9.34375"
                                stroke="#4096FF"
                                stroke-width="1.2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                            </svg>{' '}
                            {item.name}
                          </p>
                        </div>
                      </Option>
                    );
                  })}
                </Select>
              </>
            }
          />

          {/* ----------------------TAGS---------------------- */}
          <FormItem
            option={ManageProductFields.Tags}
            children={
              <>
                <Select
                  mode="multiple"
                  allowClear
                  style={{
                    width: '100%',
                    height: '50px',
                  }}
                  placeholder={`Выберите несколько или одну коллекцию`}
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={filteredTags}
                />
              </>
            }
          />

          {/* ----------------------PRODUCT VARIANTS---------------------- */}
          <h2 style={{ fontSize: '26px', marginBottom: '20px' }}>
            Варианты товара
          </h2>
          <div className={styles['product-variants']}>
            {variants.map((variant, index) => (
              <ProductVariantForm
                key={`product-variant-${index}`}
                colors={colors}
                index={index}
                setVariants={setVariants}
                imagesList={imagesMap[variant.id] || []}
                variantId={variant.id}
              />
            ))}
            <Button type="primary" onClick={handleAddVariant}>
              Добавить вариант
            </Button>
          </div>
          {/* ----------------------Char List---------------------- */}
          {!!curCategory?.parameters?.length && (
            <>
              <h2 style={{ marginBottom: '10px' }}>Список характеристик</h2>
              <span>
                Оставьте пустым или добавьте тире - или подчеркните _, чтобы
                скрыть эту опцию на стороне клиента.
              </span>
              <List
                bordered={true}
                itemLayout="horizontal"
                dataSource={parameterProducts}
                style={{ marginBottom: '20px' }}
                renderItem={(parameterProduct, index) => (
                  <List.Item className={styles['list-item']}>
                    <span className={styles['list-item__title']}>
                      {parameterProduct.parameter?.name}
                    </span>
                    <Input
                      value={parameterProduct.value}
                      placeholder={'Ввдедите Значение характеристики'}
                      onChange={handleParameterChange(
                        index,
                        setParameterProducts,
                      )}
                    />
                  </List.Item>
                )}
              />
            </>
          )}
          {/* ----------------------THE END OF INPUTS---------------------- */}
          <Form.Item className={styles.createProductForm__buttonsStack}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.createProductForm__buttonsStack__submitButton}
              loading={isSaveLoading}
            >
              {products ? 'Сохранить' : 'Создать'}
            </Button>
            <Button
              type="primary"
              onClick={navigateTo(router, Page.ADMIN_PRODUCTS)}
            >
              Вернуться назад
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default ManageProductForm;
