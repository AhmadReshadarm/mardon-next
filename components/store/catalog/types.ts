import { TFilters } from 'redux/types';
import { Category, Color, PriceRange, Tag } from 'swagger/services';
import { FilterOption } from 'ui-kit/FilterCheckbox/types';
import { FilterType } from './constants';

export type Filter = {
  title: string;
  type: FilterType;
  options?: FilterOption[];
  min?: number;
  max?: number;
  name?: string;
  onChange: (
    selectedOptions: any,
    setCurrentPage?: any,
    setPageSize?: any,
  ) => void;
};

// (FilterOption[] | undefined) &
//       FilterOption &
//       [number, number] &
//       string &
//       boolean,

export type TFiltersConfig = {
  categories: Category[];
  subCategories: Category[];
  colors: Color[];
  tags: Tag[];
  priceRange: PriceRange;
  filters: TFilters;
  name?: string;
};
