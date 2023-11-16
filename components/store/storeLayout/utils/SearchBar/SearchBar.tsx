import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { motion } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';
import { outsideClickListner } from 'components/store/storeLayout/helpers';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  changeSearchQuery,
  clearSearchQuery,
  clearSearchProducts,
} from 'redux/slicers/store/globalSlicer';
import { TGlobalState } from 'redux/types';
import styled from 'styled-components';
import { CategoryInTree } from 'swagger/services';
import { PopupDisplay } from '../../constants';
import { FilterBtn } from './FilterBtn';
import FilterModal from './FilterModal';
import { handleSearchQueryChange, handleSearchFormSubmit } from './helpers';
import SearchItem from './SearchItem';
import { useRouter } from 'next/router';
import Loading from 'ui-kit/Loading';
import { styleProps } from 'components/store/lib/types';

type Props = {
  isSearchActive: boolean;
  setSearchActive: any;
  searchWrapperNode: any;
  isSearchFormVisiable: string;
  setSearchDisplay: any;
};

const SearchBar: React.FC<Props> = ({
  isSearchActive,
  setSearchActive,
  searchWrapperNode,
  isSearchFormVisiable,
  setSearchDisplay,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { searchQuery, products, productsLoading } =
    useAppSelector<TGlobalState>((state) => state.global);
  const [selectedCategory, setSelectedCategory] = useState<CategoryInTree>();
  const [isOpened, setIsOpened] = useState(false);
  const [display, setDisplay] = useState(PopupDisplay.None);
  const [menuRef, setMenuRef] = useState(null);
  const [btnRef, setBtnRef] = useState(null);
  const [listening, setListening] = useState(false);
  const menuNode = useCallback((node: any) => {
    setMenuRef(node);
  }, []);
  const btnNode = useCallback((node: any) => {
    setBtnRef(node);
  }, []);

  useEffect(
    outsideClickListner(
      listening,
      setListening,
      menuRef,
      btnRef,
      setIsOpened,
      setDisplay,
    ),
  );

  useEffect(() => {
    !isSearchActive ? setSelectedCategory(undefined) : '';
  }, [isSearchActive]);

  useEffect(() => {
    dispatch(changeSearchQuery(router.query.name as string));
  }, [router.query.name]);

  return (
    <SearchFormWrapper
      style={{ display: isSearchFormVisiable }}
      ref={searchWrapperNode}
      className="blure"
    >
      <SearchForm
        name="search"
        animate={isSearchActive ? 'animate' : 'exit'}
        custom={0.2}
        variants={variants.fadInSlideUp}
        onSubmit={handleSearchFormSubmit(
          selectedCategory,
          searchQuery,
          router,
          setSearchActive,
          setSearchDisplay,
          dispatch,
        )}
      >
        <FilterBtn
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setIsOpened={setIsOpened}
          setDisplay={setDisplay}
          btnNode={btnNode}
        />
        <SearchFieldInput
          onChange={handleSearchQueryChange(selectedCategory, dispatch)}
          placeholder="Введите ключевые слова или символы"
          type="input"
          padding={!selectedCategory ? '0 80px 0 40px' : '0 80px 0 100px'}
          value={searchQuery}
          autoFocus
        />
        <SearchBtn onClick={() => {}} type={'submit'}>
          <span>ПОИСК</span>
        </SearchBtn>
      </SearchForm>
      <FilterModal
        isOpened={isOpened}
        display={display}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory!}
        setIsOpened={setIsOpened}
        setDisplay={setDisplay}
        menuNode={menuNode}
      />
      <ResultsWrapper>
        <>
          {!!products.length && isSearchActive && !productsLoading ? (
            <ResultsContent
              style={{
                overflowY: products.length > 2 ? 'scroll' : 'unset',
              }}
            >
              {products.map((product, index: number) => {
                return (
                  <SearchItem
                    key={`search-bar-item-${index}`}
                    product={product}
                    index={index}
                  />
                );
              })}
            </ResultsContent>
          ) : !products.length &&
            isSearchActive &&
            searchQuery &&
            !productsLoading ? (
            <EmptyResultAndLoaderWrapper>
              <span>
                Такого товара нет в нашем интернет-магазине. Пожалуйста,
                проверьте внимательнее написание товара.
              </span>
            </EmptyResultAndLoaderWrapper>
          ) : productsLoading ? (
            <EmptyResultAndLoaderWrapper>
              <Loading />
            </EmptyResultAndLoaderWrapper>
          ) : (
            <></>
          )}
        </>
      </ResultsWrapper>
    </SearchFormWrapper>
  );
};

const SearchFormWrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${color.glassmorphismBg};
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);
  gap: 40px;
  z-index: 999;
  padding: 30px 0;
`;

const SearchForm = styled(motion.form)`
  width: 100%;
  max-width: 1230px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SearchFieldInput = styled(motion.input)`
  position: relative;
  width: 525px;
  height: 45px;
  border: none;
  border-bottom: 1px solid ${color.btnPrimary};
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: ${(p: styleProps) => p.padding};
  background-color: transparent;
  margin-left: -35px;
`;

const SearchBtn = styled(motion.button)`
  cursor: pointer;
  background: ${color.btnPrimary};
  width: 200px;
  height: 40px;
  border-radius: 5px;
  margin-left: -10px;
  margin-bottom: -5px;
  span {
    color: ${color.textPrimary};
  }
`;

const ResultsWrapper = styled.div`
  width: 100%;
  max-width: 1230px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ResultsContent = styled.ul`
  width: 100%;
  height: 350px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  justify-content: space-evenly;
  justify-items: center;
  align-items: center;
  padding: 15px;
  gap: 30px;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 5px;
  }
`;

const EmptyResultAndLoaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  span {
    width: 50%;
  }
`;

export default SearchBar;
