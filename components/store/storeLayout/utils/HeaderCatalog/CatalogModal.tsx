import Link from 'next/link';
import styled from 'styled-components';
import { TGlobalState } from 'redux/types';
import { useAppSelector } from 'redux/hooks';
import TagsModal from './Tagsmodal';

// import {
//   handleBrandClick,
//   handleCategoryHover,
//   handleSubCategoryHover,
// } from './helpers';

type Props = { setOnWhichNav: any };

const CatalogModal: React.FC<Props> = ({ setOnWhichNav }) => {
  const { categories } = useAppSelector<TGlobalState>((state) => state.global);

  return (
    <CatalogContentWrapper>
      {categories.map((category, indexmain) => {
        return (
          <MainCatalogWrapper key={indexmain}>
            <div className="main-catagory">
              <Link
                onClick={() => setOnWhichNav('')}
                href={`/catalog?categories=${category.url}`}
              >
                <span>{category.name}</span>
              </Link>
            </div>
            <SubCategoriesWrapper>
              {category.children?.map((subCategory, index) => {
                return (
                  <SubCategoriesContainer key={index}>
                    <Link
                      onClick={() => setOnWhichNav('')}
                      href={`/catalog?categories=${category.url}&subCategories=${subCategory.url}`}
                    >
                      <span className="sub-category">{subCategory.name}</span>
                    </Link>
                    <TagsModal
                      category={category.url!}
                      subCategory={subCategory.url!}
                      setOnWhichNav={setOnWhichNav}
                    />
                  </SubCategoriesContainer>
                );
              })}
            </SubCategoriesWrapper>
          </MainCatalogWrapper>
        );
      })}
    </CatalogContentWrapper>
  );
};

const CatalogContentWrapper = styled.div`
  width: 85%;
  height: 100%;
  padding: 30px 0;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 50px;
  transition: 300ms;
  &::-webkit-scrollbar {
    width: 5px;
  }
  span {
    &:hover {
      color: #526725;
    }
  }
`;

const MainCatalogWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  .main-catagory {
    width: 100%;
    border-bottom: 1.5px solid;
    padding: 0 0 15px 150px;
    span {
      font-size: 2.5rem;
      font-weight: 500;
    }
  }
`;

const SubCategoriesWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 10px 0 0 150px;
  gap: 30px;
`;

const SubCategoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  .sub-category {
    font-weight: 600;
  }
`;

export default CatalogModal;
