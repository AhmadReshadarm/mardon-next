import {
  deleteProduct,
  fetchProducts,
  createProduct,
  editProduct,
} from 'redux/slicers/productsSlicer';
import { AppDispatch } from 'redux/store';
import {
  hasWhiteSpace,
  navigateTo,
  openErrorNotification,
} from '../../../common/helpers';
import { NextRouter } from 'next/router';
import { Page, paths } from 'routes/constants';
import { TableProps } from 'antd';
import { DataType } from 'common/interfaces/data-type.interface';
import {
  Category,
  ParameterProduct,
  Product,
  ProductResponse,
  ProductVariant,
} from 'swagger/services';
import { Dispatch, SetStateAction } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { ManageProductFields } from './ManageProductsFields.enum';
import { createImage } from 'redux/slicers/imagesSlicer';
import { onLocationChange } from 'components/store/catalog/helpers';
import { fetchProductsInExcelFile } from 'redux/slicers/store/catalogSlicer';
import { unwrapResult } from '@reduxjs/toolkit';
const handleDeleteProduct =
  (id: string, dispatch: AppDispatch, setVisible: any, offset: number) =>
  async () => {
    const handleLocationChange = onLocationChange(dispatch);
    const isSaved: any = await dispatch(deleteProduct(id));
    if (!isSaved.error) {
      dispatch(
        fetchProducts({
          offset: String(offset),
          limit: '12',
        }),
      );
      setVisible((prev) => !prev);
    }
    handleLocationChange();
  };

const handleDataConvertation = (
  form,
  imagesMap: Object,
  parameterProducts: ParameterProduct[],
  variantsLength: number,
) => {
  const newForm = { ...form };
  newForm.price = Number.parseInt(newForm.price, 10);
  newForm.available && (newForm.available = JSON.parse(newForm.available));
  newForm.parameterProducts = parameterProducts.map((parameterProduct) => ({
    parameterId: parameterProduct.parameter?.id,
    value: parameterProduct.value,
  }));

  const productVariants: any[] = [];

  for (let index = 0; index < variantsLength; index++) {
    const id: string = form[`id[${index}]`];
    const price: number = form[`${ManageProductFields.Price}[${index}]`];
    const oldPrice: number = form[`${ManageProductFields.OldPrice}[${index}]`];
    const artical: string = form[`${ManageProductFields.Artical}[${index}]`];
    // const wholeSalePrice: number =
    //   form[`${ManageProductFields.wholeSalePrice}[${index}]`];
    const available: boolean =
      form[`${ManageProductFields.Available}[${index}]`];
    const color: number = form[`${ManageProductFields.Color}[${index}]`];
    const payload = {
      id,
      price,
      oldPrice,
      // wholeSalePrice,
      artical,
      available,
      color,
      images: null,
    };
    const images = imagesMap[index];

    if (images?.length) {
      const imageNameArray = images.map((image) => {
        return image.url.split('/api/images/')[1];
      });

      payload.images = imageNameArray.join(', ');
    }

    productVariants.push(payload);
  }

  newForm.productVariants = productVariants;

  return newForm;
};

const checkForEmptyColorFieldInVariant = (variants: ProductVariant[]) => {
  let isEmpty = false;
  let emptyVariant;
  variants.map((variant) => {
    if (!variant.color) {
      isEmpty = true;
      emptyVariant = variant;
    }
  });
  return { isEmpty, emptyVariant };
};
const handleFormSubmitProduct =
  (
    router: NextRouter,
    dispatch: AppDispatch,
    imagesMap: Object,
    parameterProducts: ParameterProduct[],
    variantsLength: number,
    // desc: string,
  ) =>
  async (form) => {
    // form.desc = desc;

    const convertedForm = handleDataConvertation(
      form,
      imagesMap,
      parameterProducts,
      variantsLength,
    );

    if (hasWhiteSpace(form.url)) {
      openErrorNotification(
        'В URL-адресе не допускается использование пробелов.',
      );
      return;
    }
    if (convertedForm.productVariants.length == 0) {
      openErrorNotification('Установить вариант товара');
      return;
    }
    if (convertedForm.productVariants[0].price == undefined) {
      openErrorNotification('Установить цену товара');
      return;
    }
    if (
      checkForEmptyColorFieldInVariant(convertedForm.productVariants).isEmpty
    ) {
      openErrorNotification(
        `Выберите цвет для ${
          checkForEmptyColorFieldInVariant(convertedForm.productVariants)
            .emptyVariant.artical
        }`,
      );
      return;
    }

    if (router.query.id) {
      const isSaved: any = await dispatch(
        editProduct({
          ...convertedForm,
          id: router.query.id,
        }),
      );

      if (!isSaved.error) {
        navigateTo(router, Page.ADMIN_PRODUCTS)();
      }

      return;
    }

    const isSaved: any = await dispatch(createProduct(convertedForm));

    if (!isSaved.error) {
      navigateTo(router, Page.ADMIN_PRODUCTS)();
    }
  };

const handleRedirectProducts = (id: string, router: NextRouter) => () => {
  router.push(`${paths[Page.ADMIN_PRODUCTS]}/${id}`);
};

const handleTableChange: TableProps<DataType>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  // console.log('params', pagination, filters, sorter, extra);
};

const multipleItemsConverter = (items) => {
  return items?.map((item) => item.id);
};

const imagesConverter = (images) => {
  const imagesArray = images?.split(',');

  const imagesUrlArray = imagesArray?.map((image, index) => {
    const newImage = {
      name: image.trim(),
      url: `/api/images/${image.trim()}`,
      uid: index,
    };
    return newImage;
  });

  return imagesUrlArray;
};

const initialValuesConverter = (product: Product) => {
  const newProduct: any & Product = { ...product };
  newProduct.available = newProduct.available?.toString();
  newProduct.category = newProduct.category?.id;
  // newProduct.brand = newProduct.brand?.id;

  // newProduct.colors = multipleItemsConverter(newProduct.colors);
  newProduct.tags = multipleItemsConverter(newProduct.tags);
  // newProduct.sizes = multipleItemsConverter(newProduct.sizes);

  // newProduct.images = imagesConverter(newProduct.images);
  for (let index = 0; index < product?.productVariants?.length!; index++) {
    const variant = product.productVariants![index];
    newProduct[`id[${index}]`] = variant.id;
    newProduct[`${ManageProductFields.Price}[${index}]`] = variant.price;
    newProduct[`${ManageProductFields.OldPrice}[${index}]`] = variant.oldPrice;
    newProduct[`${ManageProductFields.Artical}[${index}]`] = variant.artical;
    newProduct[`${ManageProductFields.Available}[${index}]`] =
      variant.available;
    newProduct[`${ManageProductFields.Color}[${index}]`] = variant.color?.id;
    newProduct[index] = imagesConverter(variant.images);
  }

  return newProduct;
};

const handleParameterChange =
  (
    index: number,
    setParameterProducts: Dispatch<SetStateAction<ParameterProduct[]>>,
  ) =>
  (e) => {
    setParameterProducts((prev) => {
      const parameterProducts = cloneDeep(prev);

      parameterProducts[index].value = e.target.value;

      return parameterProducts;
    });
  };

const handleCategoryChange =
  (
    categories: Category[],
    setCurCategory: Dispatch<SetStateAction<Category | undefined>>,
    setParameterProducts: Dispatch<SetStateAction<ParameterProduct[]>>,
  ) =>
  (id: string) => {
    const category = categories.find((category) => category.id === id)!;
    setCurCategory(category);
    setParameterProducts(
      category?.parameters?.map((parameter) => ({
        parameter: parameter,
        value: '',
      }))!,
    );
  };

async function uploadImage(file, dispatch) {
  const config = {
    headers: { 'content-type': 'multipart/form-data' },
  };

  const image = await dispatch(
    createImage({
      config,
      file,
    }),
  );

  return new Promise((resolve, reject) => {
    resolve({ data: { link: `/api/images/${image.payload}` } });
  });
}

// ------------------------------- download products as excel file ---------------------

const handleProductDownloadInExcel = (
  dispatch,
  setLoadingData,
  ExcelJs,
  seLoadingProgress,
) => {
  setLoadingData(true);
  dispatch(fetchProductsInExcelFile())
    .then(unwrapResult)
    .then((response: ProductResponse) => {
      setLoadingData(true);
      if (!response.rows || !Array.isArray(response.rows)) {
        console.error(
          'Error: Products data is missing or not in the expected format.',
          response,
        );
        return; // Exit the function to prevent further errors
      }

      let workBook = new ExcelJs.Workbook();
      const sheet = workBook.addWorksheet('subscribers');
      sheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Наименование товара', key: 'name', width: 40 },
        { header: 'Артикул товара', key: 'artical', width: 20 },
        { header: 'Цена', key: 'price', width: 10 },
        { header: 'Ссылка на товара', key: 'link', width: 55 },
        { header: 'Изображение', key: 'image', width: 21 },
      ];
      sheet.getRow(1).alignment = {
        vertical: 'middle',
        horizontal: 'center',
        wrapText: true,
      };
      sheet.properties.defaultRowHeight = 115;

      let counter = 0;
      let progress = 0;
      const productIteration = async () => {
        if (counter < response.rows!.length) {
          progress = Math.floor((counter * 100) / response.rows!.length);
          seLoadingProgress(progress);

          await Promise.all(
            response.rows![counter]?.productVariants!?.map(
              async (variant: ProductVariant) => {
                const images = variant.images ? variant.images.split(', ') : [];

                const responseImage = await fetch(
                  `https://nbhoz.ru/api/images/${images[0]}`,
                );

                const buffer = await responseImage.arrayBuffer();
                const imageId = workBook.addImage({
                  buffer: buffer,
                  extension: 'jpeg',
                });
                await sheet.addRow({
                  id: response.rows![counter]?.id,
                  name: response.rows![counter]?.name,
                  artical: variant.artical!.includes('|')
                    ? variant.artical!.split('|')[0].toLocaleUpperCase()
                    : variant.artical!.toLocaleUpperCase(),
                  price: variant.price ? `${variant.price} ₽` : 'N/A',
                  link: {
                    text: `https://nbhoz.ru/product/${
                      response.rows![counter]?.url
                    }`,
                    hyperlink: `https://nbhoz.ru/product/${
                      response.rows![counter]?.url
                    }`,
                  },
                });

                await sheet.addImage(imageId, {
                  tl: { col: 5, row: sheet.rowCount - 1 },
                  ext: { width: 150, height: 150 },
                  editAs: 'oneCell',
                });
                sheet.getRow(sheet.rowCount).alignment = {
                  vertical: 'middle',
                  horizontal: 'center',
                  wrapText: true,
                };
              },
            ),
          );

          counter = counter + 1;
          productIteration();
        } else {
          try {
            workBook.xlsx.writeBuffer().then((data) => {
              const blob = new Blob([data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              });
              const url = window.URL.createObjectURL(blob);
              const anchor = document.createElement('a');
              anchor.href = url;
              anchor.download = `${
                new Date().toISOString().split('T')[0]
              }.xlsx`;
              anchor.click();
              window.URL.revokeObjectURL(url);
            });
            seLoadingProgress(100);
            setLoadingData(false);
            seLoadingProgress(0);
          } catch (error) {
            console.log(error);
          }
        }
      };
      productIteration();
    })
    .catch((error) => {
      console.log(error);
    });
};

export {
  handleDeleteProduct,
  handleFormSubmitProduct,
  handleRedirectProducts,
  handleTableChange,
  initialValuesConverter,
  handleParameterChange,
  handleCategoryChange,
  uploadImage,
  handleProductDownloadInExcel,
};
