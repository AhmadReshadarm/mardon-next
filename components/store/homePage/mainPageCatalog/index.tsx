import { Container } from 'components/store/storeLayout/common';
import styled from 'styled-components';
import color from 'components/store/lib/ui.colors';
import { TGlobalState } from 'redux/types';
import { useAppSelector } from 'redux/hooks';
import CatalogModal from './CatalogModal';
import Loading from 'ui-kit/Loading';
import { UseImagePaginat } from 'components/store/storeLayout/helpers';
import { useState } from 'react';
import ImageSlider from './ImageSlider';
import { devices } from 'components/store/lib/Devices';

const MainPageCatalog = (): JSX.Element => {
  const { categories, loading } = useAppSelector<TGlobalState>(
    (state) => state.global,
  );
  const [page, direction, setPage, paginateImage] = UseImagePaginat();
  const [index, setIndex] = useState(0);

  return (
    <Container
      flex_direction="column"
      justify_content="center"
      align_items="center"
      bg_color={color.bgPrimary}
    >
      <Wrapper>
        {!loading ? (
          <>
            <HeaderWrapper>
              <div className="header-title-wrapper">
                <h2>Ассортимент</h2>
              </div>
            </HeaderWrapper>

            <CatalogContentWrapper>
              <ImageSlider
                categories={categories}
                page={page}
                index={index}
                direction={direction}
              />
              <CatalogModal
                paginateImage={paginateImage}
                stateIndex={index}
                setIndex={setIndex}
                categories={categories}
              />
            </CatalogContentWrapper>
          </>
        ) : (
          <Loading />
        )}
      </Wrapper>
    </Container>
  );
};

const Wrapper = styled.div`
  max-width: 1500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  @media ${devices.laptopL} {
    max-width: 1230px;
  }
  @media ${devices.laptopM} {
    max-width: 1230px;
  }
  @media ${devices.laptopS} {
    max-width: unset;
  }
  @media ${devices.tabletL} {
    max-width: unset;
  }
  @media ${devices.tabletS} {
    max-width: unset;
  }
  @media ${devices.mobileL} {
    max-width: unset;
  }
  @media ${devices.mobileM} {
    max-width: unset;
  }
  @media ${devices.mobileS} {
    max-width: unset;
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
    max-width: 1500px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 0 30px 20px 0;
    border-bottom: 1px solid ${color.textSecondary};
    z-index: 2;
    margin-bottom: -1px;
    h2 {
      font-family: Baskerville;
      font-size: 2rem;
    }
  }
  .header-divder-wrapper {
    width: 50%;
    align-self: flex-end;
    border-bottom: 20px solid ${color.textPrimary};
    z-index: 1;
    position: absolute;
    top: 40px;
    right: 0;
  }
`;

const CatalogContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
  gap: 100px;
  @media ${devices.laptopS} {
    flex-direction: column;
    gap: 30px;
  }
  @media ${devices.tabletL} {
    flex-direction: column;
    gap: 30px;
  }
  @media ${devices.tabletS} {
    flex-direction: column;
    gap: 30px;
  }
  @media ${devices.mobileL} {
    flex-direction: column;
    gap: 30px;
  }
  @media ${devices.mobileM} {
    flex-direction: column;
    gap: 30px;
  }

  @media ${devices.mobileS} {
    flex-direction: column;
    gap: 30px;
  }
`;

export default MainPageCatalog;
