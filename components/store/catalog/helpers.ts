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
import { useEffect, useState } from 'react';
import { CategoryInTree } from 'swagger/services';

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
    publish,
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
  const publishQuary = publish
    ? Array.isArray(publish)
      ? publish[0]
      : publish[0]
    : undefined;

  return {
    categories: categoriesArray,
    subCategories: subCategoriesArray,
    colors: colorsArray,
    tags: tagsArray,
    orderBy: orderByQuary,
    sortBy: sortByQuary,
    name: nameQuary,
    available: availableQuary,
    publish: publishQuary,
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
      ImageUrl: `/api/images/compress/${image}?qlty=50&width=320&height=200&lossless=false`,
    })) as FilterOption[],
    subSectionOptions: subCategories.map(({ id, name, url, image }) => ({
      id,
      name,
      url,
      checked: !!filters.subCategories?.find(
        (categoryUrl) => categoryUrl === url,
      ),
      ImageUrl: `/api/images/compress/${image}?qlty=50&width=320&height=200&lossless=false`,
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
    available: available ? available[0] : undefined,
    publish: 'true',
  };

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
const onLocationChangeAdmin = (dispatch: AppDispatch) => async () => {
  const queryParams = getQueryParams(window.location.search);

  const {
    minPrice,
    maxPrice,
    name,
    page,
    limit,
    sortBy,
    orderBy,
    available,
    publish,
  } = queryParams;

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
    available: available ? available[0] : undefined,
    publish: publish ? publish[0] : undefined,
  };

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

const useIsBelowViewport = (
  ref: React.RefObject<HTMLElement>,
  deps: any[] = [],
) => {
  const [isBelow, setIsBelow] = useState(true);

  useEffect(() => {
    const checkPosition = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setIsBelow(rect.top > window.innerHeight);
    };

    checkPosition();

    window.addEventListener('scroll', checkPosition, { passive: true });
    window.addEventListener('resize', checkPosition);
    return () => {
      window.removeEventListener('scroll', checkPosition);
      window.removeEventListener('resize', checkPosition);
    };
  }, [ref]);

  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setIsBelow(rect.top > window.innerHeight);
  }, deps);

  return isBelow;
};

// ----------------- SEO Helpers -----------------------------
// Default SEO data when no category is selected
const defaultSeoData = {
  realName: 'Каталог | NBHOZ - Опт Товаров для Дома и Бизнеса',
  name: 'Каталог | NBHOZ - Опт Товаров для Дома и Бизнеса',
  desc: 'Оптовый поставщик товаров для дома и бизнеса. У нас вы найдете широкий ассортимент хозяйственных товаров, включая уборочный инвентарь, товары для ремонта, и многое другое. Закажите оптом и получите выгодные цены!',
  keywords:
    'оптом, товары для дома, хозяйственные товары, мелкая оптовая торговля, купить оптом, продажа оптом, оптовый склад, оптовый поставщик, швабры, губки, столовые приборы, инструменты, коврики, спортивный инвентарь',
  url: '/catalog',
  createdAt: '2023-10-18T00:00:00Z',
  updatedAt: new Date().toISOString(),
};

const defaultSeoImage = 'https://nbhoz.ru/static/logo_800x800.png';

// Helper to generate a keywords string (can be extended)
const generateKeywords = (item: CategoryInTree): string => {
  return defaultSeoData.keywords; // or construct from item.name etc.
};

/**
 * Build SEO data from a category list and the current query
 */
function getSeoData(
  categoriesList: CategoryInTree[],
  query: { categories?: string | null; subCategories?: string | null },
) {
  const { categories: catUrl, subCategories: subUrl } = query;

  // If no category is selected, return default
  if (!catUrl) {
    return { ...defaultSeoData, url: '/catalog' };
  }

  // Find the matching parent category
  const category = categoriesList.find((c) => c.url === catUrl);
  if (!category) {
    // fallback to default (should not happen)
    return { ...defaultSeoData, url: `/catalog?categories=${catUrl}` };
  }

  // If no sub‑category is selected, use category data
  if (!subUrl) {
    return {
      realName: `${category.name} | NBHOZ`,
      name: `${category.name} | NBHOZ`,
      url: `/catalog?categories=${category.url}`,
      desc: category.desc || defaultSeoData.desc,
      keywords: generateKeywords(category),
      createdAt: category.createdAt || defaultSeoData.createdAt,
      updatedAt: category.updatedAt || defaultSeoData.updatedAt,
    };
  }

  // Find the sub‑category
  const subCategory = category.children?.find((child) => child.url === subUrl);
  if (!subCategory) {
    // sub‑category not found – fallback to category
    return {
      realName: `${category.name} | NBHOZ`,
      name: `${category.name} | NBHOZ`,
      url: `/catalog?categories=${category.url}`,
      desc: category.desc || defaultSeoData.desc,
      keywords: generateKeywords(category),
      createdAt: category.createdAt || defaultSeoData.createdAt,
      updatedAt: category.updatedAt || defaultSeoData.updatedAt,
    };
  }

  // Both category and sub‑category exist
  return {
    realName: `${category.name} > ${subCategory.name} | NBHOZ`,
    name: `${category.name} > ${subCategory.name} | NBHOZ`,
    url: `/catalog?categories=${category.url}&subCategories=${subCategory.url}`,
    desc: subCategory.desc || category.desc || defaultSeoData.desc,
    keywords: generateKeywords(subCategory) || generateKeywords(category),
    createdAt:
      subCategory.createdAt || category.createdAt || defaultSeoData.createdAt,
    updatedAt:
      subCategory.updatedAt || category.updatedAt || defaultSeoData.updatedAt,
  };
}

/**
 * Build the OG image URL
 */
function getSeoImage(
  categoriesList: CategoryInTree[],
  query: { categories?: string | null; subCategories?: string | null },
): string {
  const { categories: catUrl, subCategories: subUrl } = query;
  if (!catUrl) return defaultSeoImage;

  const category = categoriesList.find((c) => c.url === catUrl);
  if (!category) return defaultSeoImage;

  // Prefer sub‑category image if available, else category image
  if (subUrl) {
    const sub = category.children?.find((child) => child.url === subUrl);
    if (sub?.image) return `https://nbhoz.ru/api/images/${sub.image}`;
  }

  if (category.image) return `https://nbhoz.ru/api/images/${category.image}`;

  return defaultSeoImage;
}

// ----------------- end of SEO Helpers ------------------------

export {
  convertQueryParams,
  getFiltersConfig,
  setPriceRange,
  onLocationChange,
  cleanSearchTerm,
  useIsBelowViewport,
  onLocationChangeAdmin,
  getSeoData,
  getSeoImage,
  defaultSeoData,
  defaultSeoImage,
};
