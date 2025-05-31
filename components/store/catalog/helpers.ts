import { getQueryParams } from 'common/helpers/manageQueryParams.helper';
import {
  clearColors,
  clearProducts,
  clearSubCategories,
  clearTags,
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
import { stopWords } from 'common/constants';

const PAGE_ITEMS_LIMIT = 12;

const convertQueryParams = (query: {
  [k: string]: string | string[] | undefined;
}) => {
  const {
    categories,
    subCategories,
    colors,
    tags,
    orderBy,
    sortBy,
    name,
    available,
  } = query;

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
  const colorsArray = colors
    ? Array.isArray(colors)
      ? colors
      : [colors]
    : undefined;
  const tagsArray = tags ? (Array.isArray(tags) ? tags : [tags]) : undefined;
  const orderByQuary = orderBy
    ? Array.isArray(orderBy)
      ? orderBy[0]
      : [orderBy][0]
    : undefined;
  const sortByQuary = sortBy
    ? Array.isArray(sortBy)
      ? sortBy[0]
      : [sortBy][0]
    : undefined;
  const nameQuary = name
    ? Array.isArray(name)
      ? name[0]
      : [name][0]
    : undefined;
  const availableQuary = available
    ? Array.isArray(available)
      ? available[0]
      : [available][0]
    : undefined;

  return {
    categories: categoriesArray,
    subCategories: subCategoriesArray,
    colors: colorsArray,
    tags: tagsArray,
    orderBy: orderByQuary,
    sortBy: sortByQuary,
    name: nameQuary,
    available: Boolean(availableQuary),
  };
};

const getFiltersConfig = ({
  categories,
  subCategories,
  colors,
  priceRange,
  filters,
  tags,
}: TFiltersConfig) => {
  return {
    sectionOptions: categories.map(({ id, name, url, image }) => ({
      id,
      name,
      url,
      checked: !!filters.categories?.find((categoryUrl) => categoryUrl === url),
      ImageUrl: `/api/images/${image}`,
    })) as FilterOption[],
    subSectionOptions: subCategories.map(({ id, name, url, image }) => ({
      id,
      name,
      url,
      checked: !!filters.subCategories?.find(
        (categoryUrl) => categoryUrl === url,
      ),
      ImageUrl: `/api/images/${image}`,
    })) as FilterOption[],
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
    orderSectionOptions: [
      {
        id: '1',
        name: '(От А до Я)',
        url: 'ASC',
        checked: filters.orderBy !== 'ASC' ? false : true,
      },
      {
        id: '2',
        name: '(От Я до А)',
        url: 'DESC',
        checked: filters.orderBy !== 'DESC' ? false : true,
      },
    ] as FilterOption[],
    sortSectionOptions: [
      {
        id: '3',
        name: 'Имени',
        url: 'name',
        checked: filters.sortBy !== 'name' ? false : true,
      },
      {
        id: '4',
        name: 'ID',
        url: 'id',
        checked: filters.sortBy !== 'id' ? false : true,
      },
    ] as FilterOption[],
  };
};

const setPriceRange = (dispatch: AppDispatch) => {
  const queryParams = getQueryParams(window.location.search);
  const { categories, subCategories } = convertQueryParams(queryParams);
  const { name } = queryParams;
  const payload = {
    parent: categories ? categories[0] : undefined,
    categories: subCategories,
    name: name,
  };

  dispatch(fetchPriceRange(payload));
};

const onLocationChange = (dispatch: AppDispatch) => async () => {
  const queryParams = getQueryParams(window.location.search);
  const { minPrice, maxPrice, name, page, limit, sortBy, orderBy, available } =
    queryParams;

  const { categories, subCategories, colors, tags } =
    convertQueryParams(queryParams);

  const payload = {
    colors,
    tags,
    name: name ? name[0] : undefined,
    parent: categories ? categories[0] : undefined,
    categories: subCategories,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    sortBy: sortBy ? String(sortBy) : 'id',
    orderBy: orderBy ? String(orderBy) : 'DESC',
    limit: limit ? limit : PAGE_ITEMS_LIMIT,
    offset: Number(limit ?? PAGE_ITEMS_LIMIT) * (Number(page ?? 1) - 1),
    available: available ? Boolean(available) : undefined,
  };
  //

  dispatch(setPage(Number(page ?? 1)));

  dispatch(fetchProducts(payload));

  const curLocation = localStorage.getItem('location')!;
  localStorage.setItem('location', window.location.search);

  const rawPrevQueryParams = getQueryParams(curLocation);
  const prevQueryParams = convertQueryParams(rawPrevQueryParams);
  setPriceRange(dispatch);

  if (
    JSON.stringify(prevQueryParams.categories) !== JSON.stringify(categories)
  ) {
    const category = categories ? categories[0] : '';

    if (category) {
      await dispatch(fetchSubCategories(category));
      await dispatch(fetchColors({ parent: category }));
    } else {
      dispatch(clearSubCategories());
      dispatch(clearColors());
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
      dispatch(clearTags());
      dispatch(clearColors());
    }
  }
  return () => dispatch(clearProducts());
};

const cleanSearchTerm = (term: string): string => {
  if (!term.trim()) return '';

  return term
    .split(/\s+/)
    .filter((word) => {
      const cleanWord = word.replace(/[^\wа-яё-]/gi, '').toLowerCase();
      return cleanWord.length >= 2 && !stopWords.includes(cleanWord);
    })
    .join(' ');
};

export {
  convertQueryParams,
  getFiltersConfig,
  setPriceRange,
  onLocationChange,
  cleanSearchTerm,
};
