import { NextRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import {
  changeSearchQuery,
  clearSearchProducts,
  clearSearchQuery,
  searchProducts,
} from 'redux/slicers/store/globalSlicer';
import { AppDispatch } from 'redux/store';
import { CategoryInTree } from 'swagger/services';
import { Product } from 'swagger/services';
import { PopupDisplay } from '../../constants';

const handleSearchItemClick = (dispatch: AppDispatch) => () => {
  dispatch(clearSearchProducts());
  dispatch(clearSearchQuery());
};

const handleSearchQueryChange =
  (
    selected: CategoryInTree | undefined,
    // setFocused: Dispatch<SetStateAction<boolean>>,
    dispatch: AppDispatch,
  ) =>
  (e: any) => {
    const searchQuery = e.target.value;

    dispatch(changeSearchQuery(searchQuery));

    if (!searchQuery || searchQuery == '') {
      dispatch(clearSearchProducts());

      return;
    }

    // setFocused(true);

    const payload = {
      name: searchQuery,
      parent: selected?.url,
      limit: 5,
    };

    dispatch(searchProducts(payload));
  };

const handleSearchFormSubmit =
  (
    selectedCategory: CategoryInTree | undefined,
    searchQuery: string,
    router: NextRouter,
    setSearchActive: Dispatch<SetStateAction<boolean>>,
    setSearchDisplay: Dispatch<SetStateAction<PopupDisplay>>,
    dispatch: AppDispatch,
  ) =>
  (e) => {
    e.preventDefault();
    if (searchQuery == '') return;

    if (searchQuery !== '') {
      const query: { name: string; categories?: string } = {
        name: searchQuery,
      };

      if (selectedCategory) {
        query.categories = selectedCategory?.url;
      }
      dispatch(clearSearchQuery());
      dispatch(clearSearchProducts());

      router.push({
        pathname: '/catalog',
        query,
      });

      setSearchActive(false);
      setTimeout(() => {
        setSearchDisplay(PopupDisplay.None);
      }, 150);
    }
  };

const TrigerhandleWishBtnClick =
  (product: Product, onWishBtnClick: (product: Product) => void) =>
  (evt: any) => {
    evt.preventDefault();
    onWishBtnClick(product);
  };
const TrigerhandleCartBtnClick =
  (product: Product, onCardBtnClick: (product: Product) => void) =>
  (evt: any) => {
    evt.preventDefault();
    onCardBtnClick(product);
  };

export {
  handleSearchItemClick,
  handleSearchQueryChange,
  handleSearchFormSubmit,
  TrigerhandleWishBtnClick,
  TrigerhandleCartBtnClick,
};
