import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { motion } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';
import { outsideClickListnerRedux } from 'components/store/storeLayout/helpers';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  changeSearchQuery,
  clearSearchQuery,
  clearSearchProducts,
} from 'redux/slicers/store/globalSlicer';
import { TGlobalState, TGlobalUIState } from 'redux/types';
import styled from 'styled-components';
import { handleSearchQueryChange, handleSearchFormSubmit } from './helpers';
import SearchItem from './SearchItem';
import { useRouter } from 'next/router';
import Loading from 'ui-kit/Loading';
import {
  changeSearchDisplayState,
  changeSearchFormState,
} from 'redux/slicers/store/globalUISlicer';
import { MenuActiveStateSVG } from 'assets/icons/UI-icons';
import { devices } from 'components/store/lib/Devices';

type Props = {
  searchButtonRef: HTMLDivElement | any;
  windowWidth: number;
};

const SearchBar: React.FC<Props> = ({ searchButtonRef, windowWidth }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { searchQuery, products, productsLoading } =
    useAppSelector<TGlobalState>((state) => state.global);
  const { isSearchFormActive, searchDisplay } = useAppSelector<TGlobalUIState>(
    (state) => state.globalUI,
  );
  useEffect(() => {
    dispatch(changeSearchQuery(router.query.name as string));
  }, [router.query.name]);

  // -------------------  UI hooks -----------------------------
  const [searchWrapperRef, setsearchWrapperRef] = useState(null);
  const [listening, setListening] = useState(false);
  const searchWrapperNode = useCallback((node: any) => {
    setsearchWrapperRef(node);
  }, []);

  useEffect(
    outsideClickListnerRedux(
      listening,
      setListening,
      searchWrapperRef,
      searchButtonRef,
      dispatch,
      changeSearchFormState,
      changeSearchDisplayState,
    ),
  );
  useEffect(() => {
    if (!isSearchFormActive) {
      dispatch(clearSearchQuery());
      dispatch(clearSearchProducts());
    }
  }, [isSearchFormActive]);
  // --------------------- end of UI hooks -------------------------

  return (
    <SearchFormWrapper
      style={{ display: windowWidth < 1024 ? 'flex' : searchDisplay }}
      ref={searchWrapperNode}
      animate={
        windowWidth < 1024 ? 'open' : isSearchFormActive ? 'open' : 'close'
      }
      variants={variants.fadeInReveal}
    >
      <div className="header-Search-background"></div>
      <SearchForm
        name="search"
        onSubmit={handleSearchFormSubmit(
          searchQuery,
          router,
          changeSearchFormState,
          changeSearchDisplayState,
          dispatch,
        )}
      >
        <div
          onClick={() => {
            dispatch(clearSearchQuery());
            dispatch(clearSearchProducts());
          }}
          className="search-header-clear-button"
          style={{ display: searchQuery ? 'flex' : 'none' }}
        >
          <MenuActiveStateSVG fill={color.inactiveIcons} />
        </div>
        <SearchFieldInput
          onChange={handleSearchQueryChange(dispatch)}
          placeholder="Введите ключевые слова, артикул или символы"
          type="input"
          value={searchQuery}
        />

        <SearchBtn type={'submit'}>
          <span>ПОИСК</span>
        </SearchBtn>
      </SearchForm>
      <ResultsWrapper
        animate={searchQuery ? 'open' : 'close'}
        variants={variants.fadeInReveal}
        style={{ display: searchQuery ? 'flex' : 'none' }}
      >
        <>
          {products.length > 0 ? (
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
          ) : productsLoading ? (
            <EmptyResultAndLoaderWrapper>
              <Loading />
            </EmptyResultAndLoaderWrapper>
          ) : (
            <EmptyResultAndLoaderWrapper>
              <span>
                Такого товара нет в нашем интернет-магазине. Пожалуйста,
                проверьте внимательнее написание товара.
              </span>
            </EmptyResultAndLoaderWrapper>
          )}
        </>
      </ResultsWrapper>
    </SearchFormWrapper>
  );
};

const SearchFormWrapper = styled(motion.div)`
  width: 100%;
  position: absolute;
  top: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  z-index: 10;
  padding: 30px 0;
  .header-Search-background {
    width: 100vw;
    height: 250px;
    position: absolute;
    top: -90px;
    background-color: ${color.glassmorphismBg};
    backdrop-filter: blur(9px);
    -webkit-backdrop-filter: blur(9px);
    z-index: -1;
  }
  @media ${devices.laptopS} {
    position: unset;
  }

  @media ${devices.mobileL} {
    position: unset;
  }
  @media ${devices.mobileM} {
    position: unset;
  }
  @media ${devices.mobileS} {
    position: unset;
  }
`;

const SearchForm = styled(motion.form)`
  width: 600px;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0 5px 0 15px;
  align-items: center;
  border-radius: 30px;
  background-color: ${color.backgroundPrimary};
  gap: 10px;
  .search-header-clear-button {
    width: 30px;
    height: 30px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  @media ${devices.laptopS} {
    width: 100%;
    border: 1px solid;
  }

  @media ${devices.mobileL} {
    width: 100%;
    border: 1px solid;
  }
  @media ${devices.mobileM} {
    width: 100%;
    border: 1px solid;
  }
  @media ${devices.mobileS} {
    width: 100%;
    border: 1px solid;
  }
`;

const SearchFieldInput = styled(motion.input)`
  position: relative;
  width: 100%;
  height: 45px;
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const SearchBtn = styled.button`
  cursor: pointer;
  background-color: ${color.btnPrimary};
  min-width: 110px;
  height: 40px;
  border-radius: 30px;
  transition: 150ms;
  &:active {
    background-color: ${color.backgroundPrimary};
    border: 1px solid;
    span {
      color: ${color.textSecondary};
    }
  }
  span {
    color: ${color.textPrimary};
  }
`;

const ResultsWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  position: absolute;
  top: 160px;
  width: 100vw;
  height: 100vh;
  background-color: ${color.backgroundPrimary};
  @media ${devices.laptopS} {
    top: 200px;
    background-color: ${color.glassmorphismBg};
    backdrop-filter: blur(9px);
    -webkit-backdrop-filter: blur(9px);
  }

  @media ${devices.mobileL} {
    top: 200px;
    background-color: ${color.glassmorphismBg};
    backdrop-filter: blur(9px);
    -webkit-backdrop-filter: blur(9px);
  }
  @media ${devices.mobileM} {
    top: 200px;
    background-color: ${color.glassmorphismBg};
    backdrop-filter: blur(9px);
    -webkit-backdrop-filter: blur(9px);
  }
  @media ${devices.mobileS} {
    top: 200px;
    background-color: ${color.glassmorphismBg};
    backdrop-filter: blur(9px);
    -webkit-backdrop-filter: blur(9px);
  }
`;

const ResultsContent = styled.ul`
  width: 100%;
  max-width: 1230px;
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
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  span {
    text-align: center;
    margin-top: -300px;
  }
`;

export default SearchBar;
