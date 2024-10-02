import {
  clearQueryParams,
  getQueryParams,
  pushQueryParams,
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
import CloseSVGWhite from '../../../assets/close.svg';
import { LoadMoreIconSVG } from '../../../assets/icons/UI-icons';
import { motion } from 'framer-motion';
import NameFilter from './topFilters/NameFilter';
import { useAppSelector } from 'redux/hooks';
import { TCatalogState } from 'redux/types';

type Props = {
  categories: Category[];
  subCategories: Category[];
  colors: Color[];
  tags: Tag[];
  priceRange: PriceRange;
  expanded: boolean;
  handleExpantionChange: any;
  setSelectedCategory: any;
  setCurrentPage: any;
  setPageSize: any;
  // setHasActiveFilters: any;
};

type StyleProps = {
  display: string;
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
  // setHasActiveFilters,
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

  const [isMoreFilters, setMoreFilters] = useState(true);
  const [ActivateResetBtn, setActivateResetBtn] = useState(false);
  const [resetSlider, setResetSlider] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [localFilters, setLocalFilters] = useState(getFilters(filtersConfig));
  const [sliderChanged, setSliderChanged] = useState(false);
  const handleResetFilters = () => {
    clearQueryParams();
  };

  const hanldeResetBtnClick = () => {
    setSearchTerm('');
    setSelectedCategory(undefined);
    setCurrentPage(1);
    setPageSize(12);
    handleResetFilters();
    setResetSlider(true);
    setActivateResetBtn(false);
    setSliderChanged(false);
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

  useEffect(() => {
    searchTerm !== '' ? setActivateResetBtn(true) : setActivateResetBtn(false);
    const delayDebounceFn = setTimeout(() => {
      setCurrentPage(1);
      setPageSize(12);

      pushQueryParams([
        { name: 'name', value: searchTerm },
        { name: 'page', value: 1 },
      ]);
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    const queryParams = getQueryParams(window.location.search);
    const { name } = queryParams;
    if (!ActivateResetBtn && name !== undefined) {
      setSearchTerm(name);
    }
  }, []);

  // ---------------------- UI hooks ------------------------

  const [isHoverMobile, setIsHoverMobile] = useState(false);
  useEffect(() => {
    setIsHoverMobile(true);
    const timer = setTimeout(() => {
      setIsHoverMobile(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [
    ActivateResetBtn,
    subCategories.length !== 0,
    searchTerm,
    priceRange.maxPrice,
    priceRange.minPrice,
  ]);
  const { uiPriceRang } = useAppSelector<TCatalogState>(
    (state) => state.catalog,
  );
  // useEffect(() => {
  //   const child = document.querySelector('.selected-filter-child');

  //   function isInPage(node) {
  //     return node === document.body ? false : document.body.contains(node);
  //   }
  //   isInPage(child) ? setHasActiveFilters(true) : setActivateResetBtn(false);
  // });

  return (
    <FilterBarContent expanded={expanded}>
      <div className="mobile-background"></div>
      <FiltersWrapper
        expanded={expanded}
        animate={{ height: isMoreFilters ? 'unset' : '0px' }}
      >
        <div
          style={{
            justifyContent:
              subCategories.length !== 0 || ActivateResetBtn
                ? 'space-between'
                : 'flex-end',
          }}
          className="mobile-filter-action-buttons"
        >
          <span
            style={{
              display:
                subCategories.length !== 0 || ActivateResetBtn
                  ? 'flex'
                  : 'none',
            }}
            className="clear-filter-mobile"
            onClick={hanldeResetBtnClick}
          >
            Сбросить
          </span>
          <span
            className={`save-and-close-btn-mobile ${
              isHoverMobile ? 'save-and-close-btn-mobile-animation' : ''
            }`}
            onClick={() => {
              setMoreFilters(!isMoreFilters);
              handleExpantionChange();
            }}
            onMouseOver={() => setIsHoverMobile(true)}
            onMouseLeave={() => setIsHoverMobile(false)}
          >
            <span>Сохранить и закрыть</span>
            {isHoverMobile ? <CloseSVGWhite /> : <CloseSVG />}
          </span>
        </div>
        {localFilters.map(
          (filter, key) =>
            (filter.type === FilterType.SINGLE_SELECTION &&
              !!filter.options?.length &&
              isMoreFilters && (
                <SearchAndCategoryWrapper>
                  {filter.title === 'Выберите категории' ? (
                    <NameFilter
                      title="Напишите название товара"
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      setSliderChanged={setSliderChanged}
                    />
                  ) : (
                    ''
                  )}

                  <SingleSelectionFilter
                    key={`filter-${key}`}
                    title={filter.title}
                    options={filter.options}
                    setSelectedCategory={setSelectedCategory}
                    setSliderChanged={setSliderChanged}
                    onChange={
                      filter.onChange as (selectedOptions: FilterOption) => void
                    }
                  />
                </SearchAndCategoryWrapper>
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
                  setActivateResetBtn={setActivateResetBtn}
                  setResetSlider={setResetSlider}
                  resetSlider={resetSlider}
                  sliderChanged={sliderChanged}
                  setSliderChanged={setSliderChanged}
                />
              )),
        )}
      </FiltersWrapper>
      <ActionButtonsWrapper>
        <MoreFiltersButton
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
        </MoreFiltersButton>
        <ResetButton
          onClick={hanldeResetBtnClick}
          display={
            (subCategories.length !== 0 || ActivateResetBtn) && isMoreFilters
              ? 'flex'
              : 'none'
          }
        >
          <span>Сбросить фильтры</span>
        </ResetButton>
      </ActionButtonsWrapper>
      <SelectedFiltersWrapper className="selected-parent">
        {/* ----------------------------------------- seleceted Filters start ------------------------------------------- */}

        {localFilters.map((selectedFilter, indexSelectedFilter) => {
          switch (selectedFilter.title) {
            case 'Выберите цвет':
              return (
                <>
                  {selectedFilter.options!.map((selectedColor, index) => {
                    return (
                      <>
                        {selectedColor.checked ? (
                          <SelectedFiltersButtons
                            key={`${selectedColor.id}-${index}`}
                            className="selected-filter-child"
                          >
                            <div className="selected-color-warpper">
                              <span>Цвет</span>
                              <div
                                style={{
                                  backgroundColor: `${selectedColor.color}`,
                                }}
                                className="selected-color-indecator"
                              ></div>
                            </div>

                            <span
                              onClick={() => {
                                const curOption = selectedFilter.options?.find(
                                  (option) => option.id === selectedColor.id,
                                );
                                curOption!.checked = false;

                                const selectedOptions: any =
                                  selectedFilter.options?.filter(
                                    (option) => option.checked,
                                  );

                                selectedFilter.onChange(selectedOptions);
                              }}
                            >
                              <CloseSVG />
                            </span>
                          </SelectedFiltersButtons>
                        ) : (
                          ''
                        )}
                      </>
                    );
                  })}
                </>
              );
            case 'Выберите тип товара':
              return (
                <>
                  {selectedFilter.options!.map((selectedType, index) => {
                    return (
                      <>
                        {selectedType.checked ? (
                          <SelectedFiltersButtons
                            key={`${selectedType.id}-${index}`}
                            className="selected-filter-child"
                          >
                            <span>{selectedType.name}</span>
                            <span
                              onClick={() => {
                                const curOption = selectedFilter.options?.find(
                                  (option) => option.id === selectedType.id,
                                );
                                curOption!.checked = false;

                                const selectedOptions: any =
                                  selectedFilter.options?.filter(
                                    (option) => option.checked,
                                  );

                                selectedFilter.onChange(selectedOptions);
                              }}
                            >
                              <CloseSVG />
                            </span>
                          </SelectedFiltersButtons>
                        ) : (
                          ''
                        )}
                      </>
                    );
                  })}
                </>
              );
            case 'Выберите категории':
              return (
                <>
                  {selectedFilter.options!.map((selectedCategory, index) => {
                    return (
                      <>
                        {selectedCategory.checked ? (
                          <SelectedFiltersButtons
                            key={`${selectedCategory.id}-${index}`}
                            className="selected-filter-child"
                          >
                            <span>{selectedCategory.name}</span>
                            <span
                              onClick={() => {
                                const curOption: any =
                                  selectedFilter.options?.find(
                                    (option) =>
                                      option.id === selectedCategory.id,
                                  );
                                curOption!.checked = false;
                                curOption.url = '';
                                selectedFilter.onChange(curOption);
                                setResetSlider(true);
                                setSliderChanged(false);
                                setSelectedCategory(undefined);
                              }}
                            >
                              <CloseSVG />
                            </span>
                          </SelectedFiltersButtons>
                        ) : (
                          ''
                        )}
                      </>
                    );
                  })}
                </>
              );
            case 'Выберите подкатегорию':
              return (
                <>
                  {selectedFilter.options!.map((selectedSubCategory, index) => {
                    return (
                      <>
                        {selectedSubCategory.checked ? (
                          <SelectedFiltersButtons
                            key={`${selectedSubCategory.id}-${index}`}
                            className="selected-filter-child"
                          >
                            <span>{selectedSubCategory.name}</span>
                            <span
                              onClick={() => {
                                const curOption: any =
                                  selectedFilter.options?.find(
                                    (option) =>
                                      option.id === selectedSubCategory.id,
                                  );
                                curOption!.checked = false;
                                curOption.url = '';
                                selectedFilter.onChange(curOption);
                                setResetSlider(true);
                                setSliderChanged(false);
                                // set header to parent category on filter close
                                localFilters.map((filter) => {
                                  if (filter.title == 'Выберите категории') {
                                    const curOptionChecked =
                                      filter.options?.find(
                                        (option) => option.checked,
                                      );
                                    setSelectedCategory(curOptionChecked);
                                  }
                                });
                              }}
                            >
                              <CloseSVG />
                            </span>
                          </SelectedFiltersButtons>
                        ) : (
                          ''
                        )}
                      </>
                    );
                  })}
                </>
              );
            case 'Установить ценовой диапозон':
              return (
                <>
                  {sliderChanged ? (
                    <SelectedFiltersButtons
                      key={`${selectedFilter.min}-${selectedFilter.max}`}
                      className="selected-filter-child"
                    >
                      <span>
                        От ${uiPriceRang.minPrice} ₽ до ${uiPriceRang.maxPrice}{' '}
                        ₽
                      </span>
                      <span
                        onClick={() => {
                          setResetSlider(true);
                          setSliderChanged(false);
                          const values: any = [null, null];
                          selectedFilter.onChange(values);
                        }}
                      >
                        <CloseSVG />
                      </span>
                    </SelectedFiltersButtons>
                  ) : (
                    ''
                  )}
                </>
              );
            default:
              break;
          }
        })}

        {/* ------------------------------------ end of selected filters -------------------------------------- */}
      </SelectedFiltersWrapper>
    </FilterBarContent>
  );
};

const SearchAndCategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const FilterBarContent = styled.div<any>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  padding: 10px 20px 10px 20px;
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

const SelectedFiltersWrapper = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;
  row-gap: 30px;
  padding: 40px 10px 0 10px;
  justify-items: flex-start;
  @media ${devices.desktop} {
    grid-template-columns: repeat(5, 1fr);
    width: 70%;
  }
  @media ${devices.laptopL} {
    grid-template-columns: repeat(4, 1fr);
    width: 70%;
  }
  @media ${devices.laptopM} {
    grid-template-columns: repeat(3, 1fr);
     width: 60%;
  }
  @media ${devices.laptopS} {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-items: flex-start;
    overflow-x: scroll;
    overflow-y: hidden;
    15px 20px 0 20px;
    gap: 20px;
  }
  @media ${devices.tabletL} {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-items: flex-start;
    overflow-x: scroll;
    overflow-y: hidden;
   15px 20px 0 20px;
    gap: 20px;
  }
  @media ${devices.tabletS} {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-items: flex-start;
    overflow-x: scroll;
    overflow-y: hidden;
   15px 20px 0 20px;
    gap: 20px;
  }
  @media ${devices.mobileL} {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-items: flex-start;
    overflow-x: scroll;
    overflow-y: hidden;
   15px 20px 0 20px;
    gap: 20px;
  }
  @media ${devices.mobileM} {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-items: flex-start;
    overflow-x: scroll;
    overflow-y: hidden;
    15px 20px 0 20px;
    gap: 20px;
  }
  @media ${devices.mobileS} {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-items: flex-start;
    overflow-x: scroll;
    overflow-y: hidden;
    15px 20px 0 20px;
    gap: 20px;
  }
`;

const SelectedFiltersButtons = styled.button`
  width: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 5px;
  border-radius: 30px;
  cursor: pointer;
  border: 1px solid #c1ab93;
  background-color: #e8d9ca;
  transition: 150ms;
  span {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    padding: 8px;
    font-size: 1rem;
    text-align: center;
    white-space: nowrap;
    color: #000;
  }
  .selected-color-warpper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .selected-color-indecator {
      width: 25px;
      height: 25px;
      min-width: 25px;
      min-height: 25px;
      border-radius: 50%;
      border: 1px solid #00000052;
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
    align-items: center;
    position: sticky;
    top: 0;
    left: 0;
    padding: 20px 0px;
    background-color: #fff;
    z-index: 10;
    span {
      cursor: pointer;
    }
    .clear-filter-mobile {
      border: 1px solid #00000047;
      padding: 5px 15px;
      border-radius: 50px;
    }
    .save-and-close-btn-mobile {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 10px;
      border: 1px solid #00000047;
      padding: 5px 15px;
      border-radius: 50px;
      position: relative;
      &:before {
        position: absolute;
        content: '';
        width: 0;
        height: 100%;
        top: 0;
        right: 0;
        z-index: -1;
        background-color: #000;
        border-radius: 50px;
        transition: all 0.3s ease;
      }
    }

    .save-and-close-btn-mobile-animation {
      color: #fff;
      &:before {
        left: 0;
        width: 100%;
      }
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
    left: 0;
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
      .clear-filter-mobile {
        font-size: 1.5rem;
        font-weight: 500;
      }
      .save-and-close-btn-mobile {
        font-size: 1.5rem;
        font-weight: 500;
      }
    }
  }
  @media ${devices.tabletL} {
    height: 100% !important;
    position: fixed;
    z-index: 100000;
    bottom: 0;
    left: 0;
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
      .clear-filter-mobile {
        font-size: 1.2rem;
      }
      .save-and-close-btn-mobile {
        font-size: 1.2rem;
      }
    }
  }
  @media ${devices.tabletS} {
    height: 100% !important;
    position: fixed;
    z-index: 100000;
    bottom: 0;
    left: 0;
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
      .clear-filter-mobile {
        font-size: 14px;
      }
      .save-and-close-btn-mobile {
        font-size: 14px;
      }
    }
  }
  @media ${devices.mobileL} {
    height: 100% !important;
    position: fixed;
    z-index: 100000;
    bottom: 0;
    left: 0;
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
      .clear-filter-mobile {
        font-size: 12px;
      }
      .save-and-close-btn-mobile {
        font-size: 12px;
      }
    }
  }
  @media ${devices.mobileM} {
    height: 100% !important;
    position: fixed;
    z-index: 100000;
    bottom: 0;
    left: 0;
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
      .clear-filter-mobile {
        font-size: 9px;
      }
      .save-and-close-btn-mobile {
        font-size: 9px;
      }
    }
  }
  @media ${devices.mobileS} {
    height: 100% !important;
    position: fixed;
    z-index: 100000;
    bottom: 0;
    left: 0;
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
      .clear-filter-mobile {
        font-size: 9px;
      }
      .save-and-close-btn-mobile {
        font-size: 9px;
      }
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

const MoreFiltersButton = styled.button`
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
  transition: 300ms;
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

const ResetButton = styled.button`
  width: 200px;
  height: 40px;
  display: ${(p: StyleProps) => p.display};
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
  @media ${devices.laptopS} {
    display: none;
  }
  @media ${devices.tabletL} {
    display: none;
  }
  @media ${devices.tabletS} {
    display: none;
  }
  @media ${devices.mobileL} {
    display: none;
  }
  @media ${devices.mobileM} {
    display: none;
  }
  @media ${devices.mobileS} {
    display: none;
  }
`;

export default TopFilterBar;
