import {
  getQueryParams,
  pushQueryParams,
} from 'common/helpers/manageQueryParams.helper';
import {
  clearBrands,
  clearColors,
  clearSubCategories,
  clearTags,
  // fetchBrands,
  fetchColors,
  fetchPriceRange,
  fetchProducts,
  fetchSubCategories,
  fetchTags,
  setPage,
} from 'redux/slicers/store/catalogSlicer';
import { AppDispatch } from 'redux/store';
import { FilterOption } from 'ui-kit/FilterCheckbox/types';
import { TFiltersConfig } from './types';

const PAGE_ITEMS_LIMIT = 12;

const convertQueryParams = (query: {
  [k: string]: string | string[] | undefined;
}) => {
  const { categories, subCategories, colors, tags } = query;
  const categoriesArray = categories
    ? Array.isArray(categories)
      ? categories
      : [categories]
    : undefined;
  const subCategoriesArray = subCategories
    ? Array.isArray(subCategories)
      ? subCategories
      : [subCategories]
    : undefined;
  // const brandsArray = brands
  //   ? Array.isArray(brands)
  //     ? brands
  //     : [brands]
  //   : undefined;
  const colorsArray = colors
    ? Array.isArray(colors)
      ? colors
      : [colors]
    : undefined;
  const tagsArray = tags ? (Array.isArray(tags) ? tags : [tags]) : undefined;

  return {
    categories: categoriesArray,
    subCategories: subCategoriesArray,
    // brands: brandsArray,
    colors: colorsArray,
    tags: tagsArray,
  };
};

const getFiltersConfig = ({
  categories,
  subCategories,
  // brands,
  colors,
  priceRange,
  filters,
  tags,
}: TFiltersConfig) => {
  return {
    sectionOptions: categories.map(({ id, name, url }) => ({
      id,
      name,
      url,
      checked: !!filters.categories?.find((categoryUrl) => categoryUrl === url),
    })) as FilterOption[],
    subSectionOptions: subCategories.map(({ id, name, url }) => ({
      id,
      name,
      url,
      checked: !!filters.subCategories?.find(
        (categoryUrl) => categoryUrl === url,
      ),
    })) as FilterOption[],
    // brandOptions: brands.map(({ id, name, url }) => ({
    //   id,
    //   name,
    //   url,
    //   checked: !!filters.brands?.find((brandUrl) => brandUrl === url),
    // })) as FilterOption[],
    colorOptions: colors.map(({ id, name, url, code }) => ({
      id,
      name,
      url,
      color: code,
      checked: !!filters.colors?.find((colorUrl) => colorUrl === url),
    })) as FilterOption[],
    tagOptions: tags.map(({ id, name, url }) => ({
      id,
      name,
      url,
      checked: !!filters.tags?.find((tagUrl) => tagUrl === url),
    })) as FilterOption[],
    minPrice: priceRange.minPrice!,
    maxPrice: priceRange.maxPrice!,
  };
};

const setPriceRange = (dispatch: AppDispatch) => {
  const queryParams = getQueryParams(window.location.search);
  const { categories, subCategories } = convertQueryParams(queryParams);
  const payload = {
    parent: categories ? categories[0] : undefined,
    categories: subCategories,
  };

  dispatch(fetchPriceRange(payload));
};

const onLocationChange = (dispatch: AppDispatch) => async () => {
  const queryParams = getQueryParams(window.location.search);
  const { minPrice, maxPrice, name, page, limit } = queryParams;
  const { categories, subCategories, colors, tags } =
    convertQueryParams(queryParams);
  const payload = {
    // brands,
    colors,
    tags,
    name,
    parent: categories ? categories[0] : undefined,
    categories: subCategories,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    limit: limit ? limit : PAGE_ITEMS_LIMIT,
    offset: Number(limit ?? PAGE_ITEMS_LIMIT) * (Number(page ?? 1) - 1),
  };
  //
  dispatch(setPage(Number(page ?? 1)));

  dispatch(fetchProducts(payload));
  const curLocation = localStorage.getItem('location')!;
  localStorage.setItem('location', window.location.search);

  const rawPrevQueryParams = getQueryParams(curLocation);
  const prevQueryParams = convertQueryParams(rawPrevQueryParams);
  setPriceRange(dispatch);

  // ------------------------ reset tags on catelog change ---------------------
  if (
    JSON.stringify(prevQueryParams.categories) !== JSON.stringify(categories) ||
    JSON.stringify(prevQueryParams.subCategories) !==
      JSON.stringify(subCategories)
  ) {
    pushQueryParams([{ name: 'tags', value: '' }]);
  }
  // -----------------------------------------------------------------------------
  if (
    JSON.stringify(prevQueryParams.categories) !== JSON.stringify(categories)
  ) {
    const category = categories ? categories[0] : '';

    if (category) {
      await dispatch(fetchSubCategories(category));
      await dispatch(fetchColors({ parent: category }));
    } else {
      await dispatch(clearSubCategories());
      await dispatch(clearColors());
    }
  }

  if (
    JSON.stringify(prevQueryParams.subCategories) !==
    JSON.stringify(subCategories)
  ) {
    const subCategory = subCategories ? subCategories[0] : '';
    if (subCategories) {
      await dispatch(fetchColors({ category: subCategories[0] }));
      await dispatch(fetchTags({ children: subCategory }));
    } else {
      await dispatch(clearTags());
    }
  }
};

export {
  convertQueryParams,
  getFiltersConfig,
  setPriceRange,
  onLocationChange,
};
