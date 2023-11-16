import {
  clearQueryParams,
  getQueryParams,
  pushQueryParams,
} from 'common/helpers/manageQueryParams.helper';
import { FilterType, getFilters } from 'components/store/catalog/constants';
import ColorFilter from 'components/store/catalog/filters/ColorFilter';
import MultipleSelectionFilter from 'components/store/catalog/filters/MultipleSelectionFilter';
import RangeFilter from 'components/store/catalog/filters/RangeFilter';
import SingleSelectionFilter from 'components/store/catalog/filters/SingleSelectionFilter';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import variants from '../lib/variants';
import {
  Brand,
  Category,
  Color,
  PriceRange,
  Size,
  Tag,
} from 'swagger/services';
import { FilterOption } from 'ui-kit/FilterCheckbox/types';
import { convertQueryParams, getFiltersConfig } from './helpers';
import { devices } from '../lib/Devices';
import color from '../lib/ui.colors';
import CloseSVG from '../../../assets/close_black.svg';

type Props = {
  categories: Category[];
  subCategories: Category[];
  brands: Brand[];
  colors: Color[];
  tags: Tag[];
  sizes: Size[];
  priceRange: PriceRange;
  expanded: any;
  handleExpantionChange: any;
  setSelectedCategory: any;
};

const FilterBar: React.FC<Props> = ({
  categories,
  subCategories,
  brands,
  colors,
  tags,
  sizes,
  priceRange,
  expanded,
  handleExpantionChange,
  setSelectedCategory,
}) => {
  const router = useRouter();
  const filters = convertQueryParams(router.query);
  const [filtersConfig, setFiltersConfig] = useState(
    getFiltersConfig({
      categories,
      subCategories,
      brands,
      colors,
      priceRange,
      filters,
      tags,
      sizes,
    }),
  );

  const [localFilters, setLocalFilters] = useState(getFilters(filtersConfig));

  const handleResetFilters = () => {
    clearQueryParams();
  };

  const hanldeResetBtnClick = () => {
    handleResetFilters();
  };

  useEffect(() => {
    const filters = convertQueryParams(getQueryParams(window.location.search));
    setFiltersConfig(
      getFiltersConfig({
        categories,
        subCategories,
        brands,
        colors,
        priceRange,
        filters,
        tags,
        sizes,
      }),
    );
  }, [categories, subCategories, brands, colors, priceRange, tags, sizes]);

  useEffect(() => {
    setLocalFilters(getFilters(filtersConfig));
  }, [filtersConfig]);
  // useEffect(() => handleExpantionChange(), []);

  useEffect(() => {
    const checkedCategory = localFilters[0].options?.find(
      (checked) => checked.checked,
    );
    const selectedCategory = categories.find(
      (category) => category.url === checkedCategory?.url,
    );
    setSelectedCategory(selectedCategory);
  }, [categories, subCategories, brands, colors, priceRange, tags, sizes]);

  return (
    <FilterBarContent expanded={expanded}>
      <FiltersWrapper>
        {localFilters.map(
          (filter, key) =>
            (filter.type === FilterType.SINGLE_SELECTION &&
              !!filter.options?.length && (
                <SingleSelectionFilter
                  key={`filter-${key}`}
                  title={filter.title}
                  options={filter.options}
                  onChange={
                    filter.onChange as (selectedOptions: FilterOption) => void
                  }
                />
              )) ||
            (filter.type === FilterType.MULTIPLE_SELECTION &&
              !!filter.options?.length && (
                <MultipleSelectionFilter
                  key={`filter-${key}`}
                  title={filter.title}
                  options={filter.options}
                  onChange={
                    filter.onChange as (
                      selectedOptions: FilterOption[] | undefined,
                    ) => void
                  }
                />
              )) ||
            (filter.type === FilterType.COLOR && !!filter.options?.length && (
              <ColorFilter
                key={`filter-${key}`}
                title={filter.title}
                options={filter.options}
                onChange={
                  filter.onChange as (
                    selectedOptions: FilterOption[] | undefined,
                  ) => void
                }
              />
            )) ||
            (filter.type === FilterType.RANGE &&
              !!filter.min &&
              !!filter.max && (
                <RangeFilter
                  key={`filter-${key}`}
                  title={filter.title}
                  min={filter.min!}
                  max={filter.max!}
                  onChange={
                    filter.onChange as (values: [number, number]) => void
                  }
                />
              )),
        )}
        <ResetButton onClick={hanldeResetBtnClick}>
          <span>Сбросить фильтры</span>
        </ResetButton>
      </FiltersWrapper>
      <CloseBtn onClick={handleExpantionChange} title="Закрыть фильтры">
        <span>Сохранить и Закрыть</span>
        <span>
          <CloseSVG />
        </span>
      </CloseBtn>
    </FilterBarContent>
  );
};

const FilterBarContent = styled.div<any>`
  min-width: 250px;
  max-width: 250px;
  width: 100%;
  padding: 20px 0 0 0;
  @media ${devices.laptopS} {
    min-width: 220px;
  }

  @media ${devices.mobileL} {
    max-width: 100vw;
    height: 100vh;
    overflow-y: scroll;
    position: fixed;
    z-index: 1000;
    background: ${color.textPrimary};
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    display: block;
    transform: translate(-100%, 0);
    transition: all 0.3s;
    &::-webkit-scrollbar {
      width: 5px;
    }
    transform: ${(props) =>
      !props.expanded ? 'translate(-100%, 0)' : 'translate(0, 0)'};
  }
  @media ${devices.mobileM} {
    max-width: 100vw;
    height: 100vh;
    overflow-y: scroll;
    position: fixed;
    z-index: 1000;
    background: ${color.textPrimary};
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    display: block;
    transform: translate(-100%, 0);
    transition: all 0.3s;
    &::-webkit-scrollbar {
      width: 5px;
    }
    transform: ${(props) =>
      !props.expanded ? 'translate(-100%, 0)' : 'translate(0, 0)'};
  }
  @media ${devices.mobileS} {
    max-width: 100vw;
    height: 100vh;
    overflow-y: scroll;
    position: fixed;
    z-index: 1000;
    background: ${color.textPrimary};
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    display: block;
    transform: translate(-100%, 0);
    transition: all 0.3s;
    &::-webkit-scrollbar {
      width: 5px;
    }
    transform: ${(props) =>
      !props.expanded ? 'translate(-100%, 0)' : 'translate(0, 0)'};
  }
`;

const FiltersWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  @media ${devices.mobileL} {
    padding: 20px;
  }
  @media ${devices.mobileM} {
    padding: 20px;
  }
  @media ${devices.mobileS} {
    padding: 20px;
  }
`;

const ResetButton = styled.button`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  background-color: ${color.btnSecondery};
  cursor: pointer;
  transition: 300ms;
  margin-top: 30px;
  &:hover {
    background-color: ${color.searchBtnBg};

    transform: scale(1.02);
  }
  &:active {
    transform: scale(1);
    background-color: ${color.btnPrimary};
    color: ${color.textPrimary};
  }
  span {
    font-family: 'Jost';
    font-size: 1rem;
  }
`;

const CloseBtn = styled.button`
  display: none;
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: ${color.btnSecondery};
  padding: 10px;
  border-radius: 3px;
  span {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  &:hover {
    background-color: ${color.btnPrimary};
    color: ${color.textPrimary};
    transform: scale(1.02);
  }
  &:active {
    transform: scale(1);
  }
  @media ${devices.mobileL} {
    display: flex;
  }
  @media ${devices.mobileM} {
    display: flex;
  }
  @media ${devices.mobileS} {
    display: flex;
  }
`;

export default FilterBar;
