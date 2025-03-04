import { pushQueryParams } from 'common/helpers/manageQueryParams.helper';
import cloneDeep from 'lodash/cloneDeep';
import { FilterOption } from 'ui-kit/FilterCheckbox/types';
import { Filter } from './types';

enum FilterType {
  MULTIPLE_SELECTION,
  SINGLE_SELECTION,
  RANGE,
  COLOR,
  ORDER_BY,
  SORT_BY,
  SEARCH_TERM,
  IN_STOCK,
}

const getFilters = ({
  sectionOptions,
  subSectionOptions,
  colorOptions,
  tagOptions,
  minPrice,
  maxPrice,
  name,
  orderSectionOptions,
  sortSectionOptions,
}: {
  sectionOptions: FilterOption[];
  subSectionOptions: FilterOption[];
  colorOptions: FilterOption[];
  tagOptions: FilterOption[];
  minPrice: number;
  maxPrice: number;
  name?: string;
  orderSectionOptions: FilterOption[];
  sortSectionOptions: FilterOption[];
}): Filter[] => {
  return [
    {
      title: 'Название товар или артикул',
      type: FilterType.SEARCH_TERM,
      name,
      onChange: (searchTerm: string) => {
        pushQueryParams([
          { name: 'name', value: searchTerm },
          { name: 'page', value: 1 },
        ]);
      },
    },
    {
      title: 'Товары нет в наличии',
      type: FilterType.IN_STOCK,
      onChange: (available: boolean) => {
        if (available) {
          pushQueryParams([
            { name: 'available', value: 'false' },
            { name: 'page', value: 1 },
          ]);
        }
        if (!available) {
          pushQueryParams([
            { name: 'available', value: undefined },
            { name: 'page', value: 1 },
          ]);
        }
      },
    },
    {
      title: 'Сортировать товар по',
      type: FilterType.ORDER_BY,
      options: cloneDeep(orderSectionOptions),
      onChange: (selectedOption: FilterOption | undefined) => {
        const orderBy = selectedOption?.url!;
        pushQueryParams([
          { name: 'orderBy', value: orderBy == '' ? '' : orderBy },
        ]);
      },
    },
    {
      title: 'Сортировать товар по',
      type: FilterType.SORT_BY,
      options: cloneDeep(sortSectionOptions),
      onChange: (selectedOption: FilterOption | undefined) => {
        const sortBy = selectedOption?.url!;
        pushQueryParams([
          { name: 'sortBy', value: sortBy == '' ? '' : sortBy },
        ]);
      },
    },
    {
      title: 'Выберите категории',
      options: cloneDeep(sectionOptions),
      type: FilterType.SINGLE_SELECTION,
      onChange: (selectedOption: FilterOption | undefined) => {
        const categories = selectedOption?.url!;

        pushQueryParams([
          { name: 'categories', value: categories == '' ? '' : categories },
          { name: 'subCategories', value: [] },
          { name: 'colors', value: [] },
          { name: 'tags', value: [] },
          { name: 'minPrice', value: null },
          { name: 'maxPrice', value: null },
          { name: 'page', value: 1 },
        ]);
      },
    },
    {
      title: 'Выберите подкатегорию',
      options: cloneDeep(subSectionOptions),
      type: FilterType.SINGLE_SELECTION,
      onChange: (selectedOption: FilterOption | undefined) => {
        const subCategories = selectedOption?.url!;

        pushQueryParams([
          {
            name: 'subCategories',
            value: subCategories == '' ? '' : subCategories,
          },
          { name: 'colors', value: [] },
          { name: 'tags', value: [] },
          { name: 'minPrice', value: null },
          { name: 'maxPrice', value: null },
          { name: 'page', value: 1 },
        ]);
      },
    },
    {
      title: 'Выберите тип товара',
      options: cloneDeep(tagOptions),
      type: FilterType.MULTIPLE_SELECTION,
      onChange: (selectedOptions: FilterOption[] | undefined) => {
        const tags = selectedOptions?.map((option) => option.url);

        pushQueryParams([
          { name: 'tags', value: tags },
          { name: 'page', value: 1 },
        ]);
      },
    },
    {
      title: 'Выберите цвет',
      options: cloneDeep(colorOptions),
      type: FilterType.COLOR,
      onChange: (selectedOptions: FilterOption[] | undefined) => {
        const colors = selectedOptions?.map((option) => option.url);

        pushQueryParams([
          { name: 'colors', value: colors },
          { name: 'page', value: 1 },
        ]);
      },
    },
    {
      title: 'Установить ценовой диапозон',
      type: FilterType.RANGE,
      min: minPrice,
      max: maxPrice,
      onChange: ([minPrice, maxPrice]: [number, number]) => {
        pushQueryParams([
          { name: 'minPrice', value: minPrice },
          { name: 'maxPrice', value: maxPrice },
          { name: 'page', value: 1 },
        ]);
      },
    },
  ];
};

export { FilterType, getFilters };
