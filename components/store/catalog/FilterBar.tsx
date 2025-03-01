import {
  clearQueryParams,
  getQueryParams,
} from 'common/helpers/manageQueryParams.helper';
import { FilterType, getFilters } from 'components/store/catalog/constants';
import ColorFilter from 'components/store/catalog/filters/ColorFilter';
import MultipleSelectionFilter from 'components/store/catalog/filters/MultipleSelectionFilter';
import RangeFilter from 'components/store/catalog/filters/RangeFilter';
import SingleSelectionFilter from 'components/store/catalog/filters/SingleSelectionFilter';
import InStockFilter from 'components/store/catalog/filters/inStockFilter';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Category, Color, PriceRange, Tag } from 'swagger/services';
import { FilterOption } from 'ui-kit/FilterCheckbox/types';
import { convertQueryParams, getFiltersConfig } from './helpers';
import { devices } from '../lib/Devices';
import color from '../lib/ui.colors';
import OrderByAndSortBySelectionFilter from './filters/OrderByAndSortBySelectionFilter';
import NameFilterAdmin from './filters/NameFilter';

type Props = {
  categories: Category[];
  subCategories: Category[];
  colors: Color[];
  tags: Tag[];
  priceRange: PriceRange;
  expanded: any;
  handleExpantionChange: any;
  setCurrentPage?: any;
  handlePageChange?: any;
  setPageSize?: any;
};

const FilterBar: React.FC<Props> = ({
  categories,
  subCategories,
  colors,
  tags,
  priceRange,
  expanded,
  handleExpantionChange,
  setCurrentPage,
  setPageSize,
}) => {
  const router = useRouter();
  const filters = convertQueryParams(router.query);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtersConfig, setFiltersConfig] = useState(
    getFiltersConfig({
      categories,
      subCategories,
      colors,
      priceRange,
      filters,
      tags,
      name: searchTerm,
    }),
  );

  const [localFilters, setLocalFilters] = useState(getFilters(filtersConfig));

  const handleResetFilters = () => {
    clearQueryParams();
    setSearchTerm('');
    setCurrentPage(1);
    setPageSize(12);
  };

  useEffect(() => {
    const filters = convertQueryParams(getQueryParams(window.location.search));
    setFiltersConfig(
      getFiltersConfig({
        categories,
        subCategories,
        colors,
        priceRange,
        filters,
        tags,
      }),
    );
  }, [categories, subCategories, colors, priceRange, tags, searchTerm]);

  useEffect(() => {
    setLocalFilters(getFilters(filtersConfig));
  }, [filtersConfig]);

  return (
    <FilterBarContent expanded={expanded}>
      <FiltersWrapper>
        <ResetButton onClick={handleResetFilters}>
          <span>Сбросить фильтры</span>
        </ResetButton>

        {localFilters.map(
          (filter, key) =>
            (filter.type === FilterType.SEARCH_TERM && (
              <NameFilterAdmin
                title={filter.title}
                name={filter.name!}
                onChange={filter.onChange}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            )) ||
            (filter.type === FilterType.IN_STOCK && (
              <InStockFilter title={filter.title} onChange={filter.onChange} />
            )) ||
            (filter.type === FilterType.ORDER_BY &&
              !!filter.options?.length && (
                <OrderByAndSortBySelectionFilter
                  key={`filter-${key}`}
                  title={filter.title}
                  options={filter.options}
                  onChange={
                    filter.onChange as (selectedOptions: FilterOption) => void
                  }
                />
              )) ||
            (filter.type === FilterType.SORT_BY && !!filter.options?.length && (
              <OrderByAndSortBySelectionFilter
                key={`filter-${key}`}
                title={filter.title}
                options={filter.options}
                onChange={
                  filter.onChange as (selectedOptions: FilterOption) => void
                }
              />
            )) ||
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
      </FiltersWrapper>
      <CloseBtn onClick={handleExpantionChange} title="Закрыть фильтры">
        <span>Сохранить и Закрыть</span>
        <span>
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
        </span>
      </CloseBtn>
    </FilterBarContent>
  );
};

const Checked = styled.div<{ dimensions: number }>`
  height: ${(prop) => prop.dimensions}px;
  width: ${(prop) => prop.dimensions}px;
  border-radius: 2px;
  background-color: ${color.activeIcons};
`;

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
    font-family: ver(--font-Jost);
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

const OrderBtnsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 15px;
  position: relative;
  .sort-by-btn {
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
      font-family: ver(--font-Jost);
      font-size: 1rem;
    }
  }
  .order-btn-content {
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    position: absolute;
    left: 0;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.25);
    button {
      width: 100%;
      height: 50px;
      border-radius: 15px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      border: 1px solid #00000026;
      &:hover {
        border: none;
        box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.25);
      }
    }
  }
  .sort-by-content-wrapper {
    top: 50px;
  }
  .order-by-contet-wrapper {
    top: 100px;
  }
`;

export default FilterBar;
