// import { Pagination } from 'antd';
import Link from 'next/link';
import {
  getQueryParams,
  pushQueryParams,
} from 'common/helpers/manageQueryParams.helper';
import FilterBar from 'components/store/catalog/FilterBar';
import Pagination from 'ui-kit/Pagination';
import {
  convertQueryParams,
  onLocationChange,
  setPriceRange,
} from 'components/store/catalog/helpers';
import { devices } from 'components/store/lib/Devices';
import variants from 'components/store/lib/variants';
import { Container, Wrapper } from 'components/store/storeLayout/common';
import StoreLayout from 'components/store/storeLayout/layouts';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchParentCategories } from 'redux/slicers/store/catalogSlicer';
import { TCatalogState } from 'redux/types';
import styled from 'styled-components';
import { Category } from 'swagger/services';
import ProductGrid from 'ui-kit/products/productGrid';
import SEOstatic from 'components/store/SEO/SEOstatic';
import color from 'components/store/lib/ui.colors';
import FiltersSVg from '../../assets/catalog-filters.svg';
import { baseUrl } from 'common/constant';

const CatalogPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  // const [category, setCategory] = useState<Category | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >();
  const {
    products,
    categories,
    subCategories,
    brands,
    colors,
    tags,
    sizes,
    priceRange,
    loading,
  } = useAppSelector<TCatalogState>((state) => state.catalog);

  const handleLocationChange = onLocationChange(dispatch);

  const onCategoryChange = () => {
    const queryParams = convertQueryParams(
      getQueryParams(window.location.search),
    );
    // const categoryUrl =
    //   queryParams.categories && queryParams.categories![0]
    //     ? queryParams.categories![0]
    //     : '';
    // const category = categories.find(
    //   (category) => category.url === categoryUrl,
    // );
    // setCategory(category);
  };

  const handlePageChange = (page: number) => {
    pushQueryParams([{ name: 'page', value: page }]);
  };

  useEffect(() => {
    localStorage.removeItem('location');
    window.addEventListener('locationChange', () => {
      handleLocationChange();
      onCategoryChange();
    });
    setPriceRange(dispatch);

    (async () => {
      await dispatch(fetchParentCategories());
      await handleLocationChange();
      onCategoryChange();
    })();

    return () => {
      window.removeEventListener('locationChange', handleLocationChange);
    };
  }, []);

  const randomProduct = Math.floor(Math.random() * products?.length);
  const filteredSizes: any = sizes.filter((size) => {
    if (size.url?.match(/(?:^|\W)not-in-stock(?:$|\W)/)) {
      return;
    }
    return size;
  });

  const filteredColors: any = colors.filter((color) => color.url != '_');

  const [expanded, setExpanded] = useState(false);

  const handleExpantionChange = () => {
    setExpanded((prev) => !prev);
  };

  const paginationLength = useAppSelector(
    (state) => state.catalog.productsLength,
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(12);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const nPages = Math.ceil(paginationLength / recordsPerPage);

  useEffect(() => {
    handlePageChange(currentPage);
  }, [currentPage]);
  return (
    <>
      <SEOstatic
        page={{
          name: `${selectedCategory?.name ?? 'Каталог'}`,
          url: `${router.asPath}`,
          desc: `Интернет-магазин Fingarden - ${
            selectedCategory?.name ?? 'Каталог'
          } - ${selectedCategory?.desc ?? products[randomProduct]?.shortDesc}`,
          keywords: `${products[randomProduct]?.keywords}`,
          createdAt:
            selectedCategory?.createdAt ?? products[randomProduct]?.createdAt,
          updatedAt:
            selectedCategory?.updatedAt ?? products[randomProduct]?.updatedAt,
        }}
        image={
          `${baseUrl}/api/images/${products[0]?.category?.parent?.image}` ??
          '/img_not_found.png'
        }
      />
      <Container
        variants={variants.fadInOut}
        key="header"
        initial="start"
        animate="middle"
        exit="end"
        flex_direction="column"
        justify_content="center"
        padding="35px 0 50px"
      >
        <ToMainpageBtnWrapper>
          <Link href="/">
            <img src="/icons/back_arrow.png" alt="back button" />
            <span>Обратно на главную</span>
          </Link>
          <button onClick={handleExpantionChange}>
            <span>Фильтры</span>
            <span>
              <FiltersSVg />
            </span>
          </button>
        </ToMainpageBtnWrapper>

        <HeaderWrapper>
          <div className="header-title-wrapper">
            <span>Ассортимент</span>
          </div>
          <div className="header-divder-wrapper"></div>
        </HeaderWrapper>
        {selectedCategory ? (
          <>
            <TitleWrapper>
              <div className="header-title-wrapper">
                <span>{selectedCategory?.name}</span>
                <span className="product-lenght-on-category">
                  {paginationLength}
                </span>
              </div>
              <div className="header-divder-wrapper"></div>
            </TitleWrapper>
            <CategoryDescriptionWrapper>
              <span>{selectedCategory?.desc}</span>
            </CategoryDescriptionWrapper>
            <CategoryDescriptionWrapperMobile>
              <span>{selectedCategory?.desc?.slice(0, 100)}...</span>
            </CategoryDescriptionWrapperMobile>
          </>
        ) : (
          ''
        )}
        <Wrapper flex_direction="column">
          <CatelogContentWrapper>
            <FilterBar
              categories={categories}
              subCategories={subCategories}
              brands={brands}
              colors={filteredColors}
              priceRange={priceRange}
              tags={tags}
              sizes={filteredSizes.reverse()}
              expanded={expanded}
              handleExpantionChange={handleExpantionChange}
              setSelectedCategory={setSelectedCategory}
            />

            <Content>
              <Products>
                <ProductGrid
                  gridStyle={{
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    columnGap: '53px',
                    laptopColumnGap: '138px!important',
                    laptopGridTemplateColumns: 'repeat(2, 1fr) !important',
                    laptopSColumnGap: '28px!important',
                    laptopSGridTemplateColumns: 'repeat(2, 1fr) !important',
                  }}
                  products={products}
                  loading={loading}
                  emptyProductsTitle={'По вашему запросу ничего не найдено.'}
                />
              </Products>

              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                nPages={nPages}
              />
            </Content>
          </CatelogContentWrapper>
        </Wrapper>
      </Container>
    </>
  );
};

const ToMainpageBtnWrapper = styled.div`
  width: 100%;
  max-width: 1230px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 30px;

  a {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    img {
      width: 40px;
    }
  }
  button {
    display: none;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border-radius: 3px;
    background-color: ${color.btnSecondery};
    &:hover {
      background-color: ${color.btnPrimary};
      color: ${color.textPrimary};
      transform: scale(1.02);
    }
    &:active {
      transform: scale(1);
    }
    span {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      font-size: 1rem;
    }
  }
  @media ${devices.mobileL} {
    max-width: unset;
    padding: 0 10px 30px 10px;
    justify-content: space-between;
    a {
      img {
        width: 35px;
      }
      span {
        font-size: 0.8rem;
      }
    }
    button {
      display: flex;
    }
  }

  @media ${devices.mobileM} {
    max-width: unset;
    padding: 0 10px 30px 10px;
    justify-content: space-between;
    a {
      img {
        width: 30px;
      }
      span {
        font-size: 0.8rem;
      }
    }
    button {
      display: flex;
    }
  }
  @media ${devices.mobileS} {
    max-width: unset;
    padding: 0 10px 30px 10px;
    justify-content: space-between;
    a {
      img {
        width: 25px;
      }
      span {
        font-size: 0.8rem;
      }
    }
    button {
      display: flex;
    }
  }
`;
const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  border-bottom: 1px solid ${color.textSecondary};
  position: relative;
  .header-title-wrapper {
    max-width: 1230px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 0 30px 20px 0;
    border-bottom: 1px solid ${color.textSecondary};
    z-index: 2;
    margin-bottom: -1px;
    span {
      font-family: Baskerville;
      font-size: 2.5rem;
      font-weight: 600;
    }
  }
  .header-divder-wrapper {
    width: 50%;
    align-self: flex-end;
    border-bottom: 5px solid ${color.textPrimary};
    z-index: 1;
    position: absolute;
    top: 65px;
    right: 0;
  }
  @media ${devices.mobileL} {
    border: none;
    .header-title-wrapper {
      max-width: unset;
      width: 90%;
      span {
        font-size: 1rem;
      }
    }
    .header-divder-wrapper {
      width: 5%;
      z-index: 2;
    }
  }
  @media ${devices.mobileM} {
    border: none;
    .header-title-wrapper {
      max-width: unset;
      width: 90%;
      span {
        font-size: 1rem;
      }
    }
    .header-divder-wrapper {
      width: 5%;
      z-index: 2;
    }
  }
  @media ${devices.mobileS} {
    border: none;
    .header-title-wrapper {
      max-width: unset;
      width: 90%;
      span {
        font-size: 1rem;
      }
    }
    .header-divder-wrapper {
      width: 5%;
      z-index: 2;
    }
  }
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  border-bottom: 1px solid ${color.textSecondary};
  position: relative;
  .header-title-wrapper {
    max-width: 1230px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 20px 0 0 30px;
    border-bottom: 1px solid ${color.textSecondary};
    z-index: 2;
    margin-bottom: -1px;
    position: relative;
    span {
      font-size: 2.5rem;
      font-weight: 300;
    }
    .product-lenght-on-category {
      position: absolute;
      top: 20px;
      left: 15px;
      padding: 0 5px;
      border-radius: 4px;
      background-color: ${color.hoverBtnBg};
      color: ${color.textPrimary};
      font-size: 14px;
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
  }
  .header-divder-wrapper {
    width: 50%;
    align-self: flex-start;
    border-bottom: 5px solid ${color.textPrimary};
    z-index: 1;
    position: absolute;
    top: 75px;
    left: 0;
  }
  @media ${devices.mobileL} {
    border: none;
    .header-title-wrapper {
      max-width: unset;
      width: 90%;
      span {
        font-size: 1.5rem;
      }
    }
    .header-divder-wrapper {
      width: 5%;
      z-index: 2;
    }
  }
  @media ${devices.mobileM} {
    border: none;
    .header-title-wrapper {
      max-width: unset;
      width: 90%;
      span {
        font-size: 1.5rem;
      }
    }
    .header-divder-wrapper {
      width: 5%;
      z-index: 2;
    }
  }
  @media ${devices.mobileS} {
    border: none;
    .header-title-wrapper {
      max-width: unset;
      width: 90%;
      span {
        font-size: 1.5rem;
      }
    }
    .header-divder-wrapper {
      width: 5%;
      z-index: 2;
    }
  }
`;

const CategoryDescriptionWrapper = styled.div`
  max-width: 1230px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 30px 0;
  span {
    width: 70%;
    padding: 0 20px 0 0;
  }
  @media ${devices.mobileL} {
    display: none;
  }
`;

const CategoryDescriptionWrapperMobile = styled.div`
  display: none;
  @media ${devices.mobileL} {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 30px 0;
    span {
      width: 70%;
      padding: 0 20px 0 0;
    }
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  padding: 20px 0;
  @media ${devices.mobileL} {
    margin-left: 0;
    padding: 10px 15px;
  }
`;

const CatelogContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 40px;

  @media ${devices.mobileM} {
    flex-direction: column;
  }

  @media ${devices.mobileS} {
    flex-direction: column;
  }
`;

const Products = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 5px;
  }
  @media ${devices.laptopS} {
    padding: 0 10px;
  }

  @media ${devices.mobileL} {
    padding: 0 10px;
  }
  @media ${devices.mobileM} {
    padding: 0 10px;
  }

  @media ${devices.mobileS} {
    padding: 0 10px;
  }
`;

CatalogPage.PageLayout = StoreLayout;

export default CatalogPage;
