import {
  getQueryParams,
  pushQueryParams,
} from 'common/helpers/manageQueryParams.helper';
// import Pagination from 'ui-kit/Pagination';
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
import { Suspense, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchParentCategories } from 'redux/slicers/store/catalogSlicer';
import { TCatalogState } from 'redux/types';
import styled from 'styled-components';
import { Category } from 'swagger/services';
import ProductGrid from 'ui-kit/products/productGrid';
import SEOstatic from 'components/store/SEO/SEOstatic';
import { baseUrl } from 'common/constant';
import Loading from 'ui-kit/Loading';
import TopFilterBar from 'components/store/catalog/TopFilterBar';
import { Pagination } from 'antd';

const CatalogPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >();
  const {
    products,
    categories,
    subCategories,
    // brands,
    colors,
    tags,
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

  const randomProduct = Math.floor(Math.random() * products?.length - 1);

  const filteredTags: any = tags.filter((tag) => {
    if (
      tag.url?.match(/(?:^|\W)best_product(?:$|\W)/) ||
      tag.url?.match(/(?:^|\W)main-page(?:$|\W)/) ||
      tag.url?.match(/(?:^|\W)-(?:$|\W)/) ||
      tag.url?.match(/(?:^|\W)_(?:$|\W)/) ||
      tag.url?.match(/(?:^|\W) (?:$|\W)/)
    ) {
      return;
    }
    return tag;
  });

  const filteredColors: any = colors.filter((color) => {
    if (
      color.url?.match(/(?:^|\W)-(?:$|\W)/) ||
      color.url?.match(/(?:^|\W)_(?:$|\W)/) ||
      color.url?.match(/(?:^|\W) (?:$|\W)/)
    ) {
      return;
    }
    return color;
  });

  const [expanded, setExpanded] = useState(false);

  const handleExpantionChange = () => {
    setExpanded((prev) => !prev);
  };

  const paginationLength = useAppSelector(
    (state) => state.catalog.productsLength,
  );

  const [currentPage, setCurrentPage] = useState(1);
  // const [recordsPerPage] = useState(12);
  // const indexOfLastRecord = currentPage * recordsPerPage;
  // const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  // const nPages = Math.ceil(paginationLength / recordsPerPage);

  // useEffect(() => {
  //   handlePageChange(currentPage);
  // }, [currentPage]);
  return (
    <>
      {!!products ? (
        <SEOstatic
          page={{
            realName: `${selectedCategory?.name} | NBHOZ`,
            name: `${products[randomProduct]?.name ?? 'Каталог'}`,
            url: `${router.asPath}`,
            desc: `${
              selectedCategory?.name ?? 'Каталог'
            } - покупайте на NBHOZ по выгодным ценам! оптом ${
              products[randomProduct]?.shortDesc ?? selectedCategory?.desc
            }`,
            keywords: `${products[randomProduct]?.keywords}`,
            createdAt:
              products[randomProduct]?.createdAt ?? selectedCategory?.createdAt,
            updatedAt:
              products[randomProduct]?.updatedAt ?? selectedCategory?.updatedAt,
          }}
          image={
            `${baseUrl}/api/images/${products[0]?.category?.parent?.image}` ??
            '/img_not_found.png'
          }
        />
      ) : (
        ''
      )}
      <Container
        variants={variants.fadInOut}
        key="header"
        initial="start"
        animate="middle"
        exit="end"
        flex_direction="column"
        justify_content="center"
        align_items="center"
        padding="80px 0"
      >
        <Wrapper flex_direction="column">
          <Suspense fallback={<Loading />}>
            <CatelogContentWrapper>
              <TopFilterBar
                categories={categories}
                subCategories={subCategories}
                // brands={brands}
                colors={filteredColors}
                priceRange={priceRange}
                tags={filteredTags}
                expanded={expanded}
                handleExpantionChange={handleExpantionChange}
                setSelectedCategory={setSelectedCategory}
              />

              <Content>
                {!!products ? (
                  <>
                    <Products>
                      <ProductGrid
                        products={products}
                        loading={loading}
                        emptyProductsTitle={
                          'По вашему запросу ничего не найдено.'
                        }
                      />
                    </Products>
                    {/* <Pagination
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      nPages={nPages}
                    /> */}
                    <Pagination
                      style={{ marginTop: '20px' }}
                      defaultCurrent={currentPage}
                      total={paginationLength}
                      pageSize={12}
                      onChange={handlePageChange}
                    />
                  </>
                ) : (
                  ''
                )}
              </Content>
            </CatelogContentWrapper>
          </Suspense>
        </Wrapper>
      </Container>
    </>
  );
};

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
  flex-direction: column;
  align-items: center;
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
