import { devices } from 'components/store/lib/Devices';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import {
  Container,
  Content,
  Wrapper,
} from 'components/store/storeLayout/common';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchBanner, fetchBrands } from 'redux/slicers/store/homePageSlicer';
import { THomePageState } from 'redux/types';
import styled from 'styled-components';
import Loading from 'ui-kit/Loading';
import ImageBanner from './ImageBanner';

const Banners = () => {
  const dispatch = useAppDispatch();
  const { banner } = useAppSelector<THomePageState>((state) => state.homePage);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await dispatch(fetchBanner());
      setLoading(false);
    })();
  }, []);

  return (
    <Container
      variants={variants.fadInOut}
      key="container-home-banners"
      initial="start"
      animate="middle"
      exit="end"
      flex_direction="row"
      justify_content="center"
      position="relative"
      style={{ overflow: 'hidden' }}
    >
      <SliderContainer>
        {!loading ? (
          <>
            <ImageBanner slides={banner?.slides} />
          </>
        ) : (
          <Loading />
        )}
      </SliderContainer>
      <SliderBgWrapper>
        <div className="inner-wrapper">
          <div className="right-side">
            <div className="mobile-div"></div>
          </div>
          <div className="left-side"></div>
          <div className="left-side"></div>
        </div>
      </SliderBgWrapper>
    </Container>
  );
};

const SliderContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SliderBgWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(
    to right,
    ${color.bgSecondary} 40%,
    ${color.bgPrimary}
  );
  .inner-wrapper {
    max-width: 1230px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    @media ${devices.laptopM} {
      max-width: 990px;
    }
    @media ${devices.laptopS} {
      max-width: 728px;
    }
    @media ${devices.mobileL} {
      max-width: unset;
      width: 95%;
    }
  }
  .right-side {
    min-height: 600px;
    width: 100%;
    background: ${color.bgSecondary};
    position: relative;
    overflow: hidden;
    .mobile-div {
      display: none;
      @media ${devices.laptopS} {
        display: block;
        min-height: 600px;
        width: 100%;
        background: ${color.bgPrimary};
        position: absolute;
        left: 55px;
      }
      @media ${devices.mobileL} {
        display: block;
        min-height: 600px;
        width: 100%;
        background: ${color.bgPrimary};
        position: absolute;
        left: 55px;
      }
    }
  }
  .left-side {
    min-height: 600px;
    width: 100%;
    background: ${color.bgPrimary};

    @media ${devices.laptopS} {
      display: none;
    }
    @media ${devices.mobileL} {
      display: none;
    }
  }
`;

export default Banners;
