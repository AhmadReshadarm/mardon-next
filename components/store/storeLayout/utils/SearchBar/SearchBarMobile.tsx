import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { motion } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';
import { outsideClickListner } from 'components/store/storeLayout/helpers';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  clearSearchQuery,
  clearSearchProducts,
  changeSearchQuery,
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
import { devices } from 'components/store/lib/Devices';
import { styleProps } from 'components/store/lib/types';
import CloseSVG from '../../../../../assets/close_black.svg';

type Props = {};

const SearchBarMobile: React.FC<Props> = ({}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  // searchQuery,
  const { products, productsLoading } = useAppSelector<TGlobalState>(
    (state) => state.global,
  );
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

  const [isActive, setSearchActive] = useState(false);
  const [isDisplay, setSearchDisplay] = useState(PopupDisplay.None);
  const [disabled, setDisabled] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    // dispatch(changeSearchQuery(router.query.name as string));
    setSearchQuery(router.query.name as string);
  }, [router.query.name]);
  useEffect(() => {
    if (searchQuery !== '') {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [searchQuery]);
  useEffect(() => {
    setSearchQuery('');
  }, [router]);
  return (
    <SearchFormWrapper className="blure">
      <SearchForm
        onSubmit={(evt) => {
          // dispatch(clearSearchQuery());
          setSearchQuery('');
          dispatch(clearSearchProducts());
          handleSearchFormSubmit(
            selectedCategory,
            searchQuery,
            router,
            setSearchActive,
            setSearchDisplay,
            dispatch,
          )(evt);
        }}
      >
        <FilterBtn
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setIsOpened={setIsOpened}
          setDisplay={setDisplay}
          btnNode={btnNode}
        />
        <SearchFieldInput
          onChange={(evt) => {
            setSearchQuery(evt.target.value);
            handleSearchQueryChange(selectedCategory, dispatch)(evt);
          }}
          placeholder="Введите ключевые слова или символы"
          type="input"
          padding={!selectedCategory ? '0 0 0 10px' : '0 0 0 70px'}
          value={searchQuery}
          autoFocus
        />
        {searchQuery || products.length ? (
          <ClearSearchBtn
            onClick={() => {
              // dispatch(clearSearchQuery());
              setSearchQuery('');
              dispatch(clearSearchProducts());
            }}
          >
            <span>
              <CloseSVG />
            </span>
          </ClearSearchBtn>
        ) : (
          ''
        )}

        <SearchBtn disabled={disabled} type={'submit'}>
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
          {!!products.length && !productsLoading ? (
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
          ) : !products.length && searchQuery && !productsLoading ? (
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
      <div className="mobile-div"></div>
    </SearchFormWrapper>
  );
};

const SearchFormWrapper = styled.div`
  width: 100%;
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
  position: relative;
  .mobile-div {
    position: absolute;
    left: 55px;
    background: ${color.textPrimary};
    width: 85%;
    min-height: 75px;
    z-index: 1;
  }
  @media ${devices.laptopS} {
    display: flex;
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

const SearchForm = styled(motion.form)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid ${color.btnPrimary};
  border-radius: 5px;
  padding: 0 5px;
  z-index: 2;
`;

const SearchFieldInput = styled(motion.input)`
  position: relative;
  width: 100%;
  height: 45px;
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: ${(p: styleProps) => p.padding};
  background-color: transparent;
`;

const SearchBtn = styled(motion.button)`
  cursor: pointer;
  background: ${color.searchBtnBg};
  min-width: 95px;
  height: 40px;
  border-radius: 5px;
  transition: 200ms;
  &:active {
    background: ${color.btnPrimary};
  }
  span {
    color: ${color.textPrimary};
  }
`;

const ClearSearchBtn = styled.div`
  width: 25px;
  height: 25px;
  position: absolute;
  top: 30px;
  right: 100px;
  span {
    width: 100%;
    height: 100%;
  }
`;

const ResultsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const ResultsContent = styled.ul`
  width: 100%;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 30px;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 15px;
  position: absolute;
  top: 20px;
  z-index: 10;
  background-color: ${color.glassmorphismBg};
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);
  border-radius: 15px;
  &::-webkit-scrollbar {
    width: 5px;
  }

  @media ${devices.laptopS} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    justify-content: space-evenly;
    justify-items: center;
    align-items: center;
  }
  @media (min-width: 550px) and (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    justify-content: space-evenly;
    justify-items: center;
    align-items: center;
  }
`;

const EmptyResultAndLoaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 5px;
  z-index: 10;
  background-color: ${color.glassmorphismBg};
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);
  padding: 10px;
  border-radius: 5px;
  span {
    width: 100%;
  }
`;

export default SearchBarMobile;
