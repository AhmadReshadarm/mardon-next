import { basicRequestParams } from 'common/constants';
import AdminLayout from 'components/admin/adminLayout/layout';
import ManageProductForm from 'components/admin/products/ManageProductsForm';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  clearCategories,
  fetchCategories,
} from 'redux/slicers/categoriesSlicer';
import { clearColors, fetchColors } from 'redux/slicers/colorsSlicer';
import { clearImageList } from 'redux/slicers/imagesSlicer';
import { clearTags, fetchTags } from 'redux/slicers/tagsSlicer';
import {
  clearChosenProduct,
  fetchChosenProduct,
} from '../../../redux/slicers/productsSlicer';
import Head from 'next/head';

const ManageProduct = () => {
  const title = 'Редактирование продукта';
  const router = useRouter();
  const products = useAppSelector((state) => state.products.products);
  const filteredProducts = products.filter(
    (product) => product.id !== Number(router.query.id),
  );

  const isLoading = useAppSelector((state) => state.products.loading);
  const isSaveLoading = useAppSelector((state) => state.products.saveLoading);

  const product = useAppSelector((state) => state.products.chosenProduct);

  const colors = useAppSelector((state) => state.colors.colors);
  const categories = useAppSelector((state) => state.categories.categories);
  const filteredNoneSubCategories = categories.filter(
    (category) => !!category.parent,
  );

  const filteredCategories = filteredNoneSubCategories.sort((a, b) => {
    // sort children in a - z
    let copmare = b.name.localeCompare(a.name);
    // sort parent in a - z
    copmare = b?.parent.name.localeCompare(a?.parent.name);
    return copmare;
  });

  const tags = useAppSelector((state) => state.tags.tags);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (router.query.id) {
      dispatch(fetchChosenProduct(router.query.id as string));
    }

    dispatch(fetchColors(basicRequestParams));
    dispatch(fetchCategories(basicRequestParams));
    dispatch(fetchTags(basicRequestParams));

    return () => {
      dispatch(clearChosenProduct());
      dispatch(clearImageList());

      dispatch(clearColors());
      dispatch(clearCategories());
      dispatch(clearTags());
    };
  }, [dispatch, router.query]);

  return (
    <>
      <Head>
        <title>
          Администрирование {`>`} Продукты {`>`} Редактирование продукта | NBHOZ
        </title>
      </Head>
      <ManageProductForm
        tags={tags}
        // sizes={sizes}
        categories={filteredCategories}
        colors={colors}
        title={title}
        editMode={true}
        products={filteredProducts}
        product={product}
        isLoading={isLoading}
        isSaveLoading={isSaveLoading}
      />
    </>
  );
};

ManageProduct.PageLayout = AdminLayout;

export default ManageProduct;
