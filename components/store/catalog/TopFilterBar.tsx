import {
  clearQueryParams,
  getQueryParams,
} from 'common/helpers/manageQueryParams.helper';
import { FilterType, getFilters } from 'components/store/catalog/constants';
import ColorFilter from 'components/store/catalog/topFilters/ColorFilter';
import MultipleSelectionFilter from 'components/store/catalog/topFilters/MultipleSelectionFilter';
import RangeFilter from 'components/store/catalog/topFilters/RangeFilter';
import SingleSelectionFilter from 'components/store/catalog/topFilters/SingleSelectionFilter';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Category, Color, PriceRange, Tag } from 'swagger/services';
import { FilterOption } from 'ui-kit/FilterCheckbox/types';
import { convertQueryParams, getFiltersConfig } from './helpers';
import { devices } from '../lib/Devices';
import color from '../lib/ui.colors';
import CloseSVG from '../../../assets/close_black.svg';
import { LoadMoreIconSVG } from '../../../assets/icons/UI-icons';
import { motion } from 'framer-motion';

type Props = {
  categories: Category[];
  subCategories: Category[];
  colors: Color[];
  tags: Tag[];
  priceRange: PriceRange;
  expanded: any;
  handleExpantionChange: any;
  setSelectedCategory: any;
  setCurrentPage: any;
  setPageSize: any;
};

const TopFilterBar: React.FC<Props> = ({
  categories,
  subCategories,
  colors,
  tags,
  priceRange,
  expanded,
  handleExpantionChange,
  setSelectedCategory,
  setCurrentPage,
  setPageSize,
}) => {
  const router = useRouter();
  const filters = convertQueryParams(router.query);
  const [filtersConfig, setFiltersConfig] = useState(
    getFiltersConfig({
      categories,
      subCategories,
      colors,
      priceRange,
      filters,
      tags,
    }),
  );

  const [localFilters, setLocalFilters] = useState(getFilters(filtersConfig));

  const handleResetFilters = () => {
    clearQueryParams();
  };

  const hanldeResetBtnClick = () => {
    setSelectedCategory(undefined);
    setCurrentPage(1);
    setPageSize(12);
    handleResetFilters();
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
  }, [categories, subCategories, colors, priceRange, tags]);

  useEffect(() => {
    setLocalFilters(getFilters(filtersConfig));
  }, [filtersConfig]);

  const [isMoreFilters, setMoreFilters] = useState(false);
  return (
    <FilterBarContent expanded={expanded}>
      <div className="mobile-background"></div>
      <FiltersWrapper
        expanded={expanded}
        animate={{ height: isMoreFilters ? 'unset' : '0px' }}
      >
        <div className="mobile-filter-action-buttons">
          <span className="clear-filter-mobile" onClick={hanldeResetBtnClick}>
            Сбросить
          </span>
          <span
            onClick={() => {
              setMoreFilters(!isMoreFilters);
              handleExpantionChange();
            }}
          >
            <CloseSVG />
          </span>
        </div>
        {localFilters.map(
          (filter, key) =>
            (filter.type === FilterType.SINGLE_SELECTION &&
              !!filter.options?.length &&
              isMoreFilters && (
                <SingleSelectionFilter
                  key={`filter-${key}`}
                  title={filter.title}
                  options={filter.options}
                  setSelectedCategory={setSelectedCategory}
                  onChange={
                    filter.onChange as (selectedOptions: FilterOption) => void
                  }
                />
              )) ||
            (filter.type === FilterType.MULTIPLE_SELECTION &&
              !!filter.options?.length &&
              isMoreFilters && (
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
            (filter.type === FilterType.COLOR &&
              !!filter.options?.length &&
              isMoreFilters && (
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
              !!filter.max &&
              isMoreFilters && (
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
      <ActionButtonsWrapper>
        <ResetButton
          onClick={() => {
            setMoreFilters(!isMoreFilters);
            handleExpantionChange();
          }}
          style={{
            color: isMoreFilters ? color.textPrimary : color.textSecondary,
            backgroundColor: isMoreFilters
              ? color.textSecondary
              : color.textPrimary,
          }}
        >
          <span>{isMoreFilters ? 'Меньше фильтров' : 'Большe фильтров'}</span>
          <span className="more-filter-icon">
            <LoadMoreIconSVG colorState={isMoreFilters ? 'white' : 'black'} />
          </span>
        </ResetButton>
        <ResetButton
          onClick={hanldeResetBtnClick}
          style={{ display: isMoreFilters ? 'flex' : 'none' }}
        >
          <span>Сбросить фильтры</span>
        </ResetButton>
      </ActionButtonsWrapper>
    </FilterBarContent>
  );
};

const FilterBarContent = styled.div<any>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
  background-color: #f3f2f0;
  border-radius: 30px;
  @media ${devices.laptopS} {
    .mobile-background {
      display: ${(props) => (!props.expanded ? 'none' : 'block;')};
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      background-color: ${color.activeIcons};
      opacity: 0.6;
      z-index: 100000;
    }
  }
  @media ${devices.tabletL} {
    .mobile-background {
      display: ${(props) => (!props.expanded ? 'none' : 'block;')};
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      background-color: ${color.activeIcons};
      opacity: 0.6;
      z-index: 100000;
    }
  }

  @media ${devices.tabletS} {
    .mobile-background {
      display: ${(props) => (!props.expanded ? 'none' : 'block;')};
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      background-color: ${color.activeIcons};
      opacity: 0.6;
      z-index: 100000;
    }
  }
  @media ${devices.mobileL} {
    .mobile-background {
      display: ${(props) => (!props.expanded ? 'none' : 'block;')};
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      background-color: ${color.activeIcons};
      opacity: 0.6;
      z-index: 100000;
    }
  }

  @media ${devices.mobileM} {
    .mobile-background {
      display: ${(props) => (!props.expanded ? 'none' : 'block;')};
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      background-color: ${color.activeIcons};
      opacity: 0.6;
      z-index: 100000;
    }
  }

  @media ${devices.mobileS} {
    .mobile-background {
      display: ${(props) => (!props.expanded ? 'none' : 'block;')};
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      background-color: ${color.activeIcons};
      opacity: 0.6;
      z-index: 100000;
    }
  }
`;

const FiltersWrapper = styled<any>(motion.div)`
  width: 100%;
  display: inline-grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 50px;
  row-gap: 30px;
  padding: 10px;
  justify-items: center;

  .mobile-filter-action-buttons {
    display: none;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    left: 0;
    padding: 20px;
    background-color: #fff;
    span {
      cursor: pointer;
    }
  }
  @media ${devices.desktop} {
    grid-template-columns: repeat(3, 1fr);
  }
  @media ${devices.laptopL} {
    grid-template-columns: repeat(3, 1fr);
  }
  @media ${devices.laptopM} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${devices.laptopS} {
    height: 100% !important;
    position: fixed;
    z-index: 100000;
    bottom: 0;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    max-height: 70vh;
    min-height: 70vh;
    border-radius: 40px 40px 0 0;
    padding: 0 15px 15px 15px;
    gap: 20px;
    transition: 300ms;
    transform: ${(props) =>
      !props.expanded ? 'translate(0, 100%)' : 'translate(0, 0)'};
    .mobile-filter-action-buttons {
      display: flex;
    }
  }
  @media ${devices.tabletL} {
    height: 100% !important;
    position: fixed;
    z-index: 100000;
    bottom: 0;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    max-height: 70vh;
    min-height: 70vh;
    border-radius: 40px 40px 0 0;
    padding: 0 15px 15px 15px;
    gap: 20px;
    transition: 300ms;
    transform: ${(props) =>
      !props.expanded ? 'translate(0, 100%)' : 'translate(0, 0)'};
    .mobile-filter-action-buttons {
      display: flex;
    }
  }
  @media ${devices.tabletS} {
    height: 100% !important;
    position: fixed;
    z-index: 100000;
    bottom: 0;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    max-height: 70vh;
    min-height: 70vh;
    border-radius: 40px 40px 0 0;
    padding: 0 15px 15px 15px;
    gap: 20px;
    transition: 300ms;
    transform: ${(props) =>
      !props.expanded ? 'translate(0, 100%)' : 'translate(0, 0)'};
    .mobile-filter-action-buttons {
      display: flex;
    }
  }
  @media ${devices.mobileL} {
    height: 100% !important;
    position: fixed;
    z-index: 100000;
    bottom: 0;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    max-height: 70vh;
    min-height: 70vh;
    border-radius: 40px 40px 0 0;
    padding: 0 15px 15px 15px;
    gap: 20px;
    transition: 300ms;
    transform: ${(props) =>
      !props.expanded ? 'translate(0, 100%)' : 'translate(0, 0)'};
    .mobile-filter-action-buttons {
      display: flex;
    }
  }
  @media ${devices.mobileM} {
    height: 100% !important;
    position: fixed;
    z-index: 100000;
    bottom: 0;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    max-height: 70vh;
    min-height: 70vh;
    border-radius: 40px 40px 0 0;
    padding: 0 15px 15px 15px;
    gap: 20px;
    transition: 300ms;
    transform: ${(props) =>
      !props.expanded ? 'translate(0, 100%)' : 'translate(0, 0)'};
    .mobile-filter-action-buttons {
      display: flex;
    }
  }
  @media ${devices.mobileS} {
    height: 100% !important;
    position: fixed;
    z-index: 100000;
    bottom: 0;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    max-height: 70vh;
    min-height: 70vh;
    border-radius: 40px 40px 0 0;
    padding: 0 15px 15px 15px;
    gap: 20px;
    transition: 300ms;
    transform: ${(props) =>
      !props.expanded ? 'translate(0, 100%)' : 'translate(0, 0)'};
    .mobile-filter-action-buttons {
      display: flex;
    }
  }
`;

const ActionButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;

  @media ${devices.tabletS} {
    flex-direction: column;
    align-items: flex-end;
  }
  @media ${devices.mobileL} {
    flex-direction: column;
    align-items: flex-end;
  }
  @media ${devices.mobileM} {
    flex-direction: column;
    align-items: flex-end;
  }
  @media ${devices.mobileS} {
    flex-direction: column;
    align-items: flex-end;
  }
`;

const ResetButton = styled.button`
  width: 200px;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  gap: 20px;
  border: 1px solid #949494;
  cursor: pointer;
  transition: 150ms;
  &:hover {
    transform: scale(1.02);
  }
  &:active {
    transform: scale(1);
    background-color: ${color.btnPrimary};
    color: ${color.textPrimary};
  }
  .more-filter-icon {
    width: 30px;
    height: 30px;
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

export default TopFilterBar;
