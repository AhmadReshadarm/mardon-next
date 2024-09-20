import variants from 'components/store/lib/variants';
import { Container } from 'components/store/storeLayout/common';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { THomePageState } from 'redux/types';
import styled from 'styled-components';
import ImageBanner from './ImageBanner';
import { ErrorBoundary } from 'react-error-boundary';
import FallbackRender from 'ui-kit/FallbackRenderer';
import { useEffect } from 'react';
import { fetchBanner } from 'redux/slicers/store/homePageSlicer';

const Banners = () => {
  const dispatch = useAppDispatch();
  const { banner, loading } = useAppSelector<THomePageState>(
    (state) => state.homePage,
  );

  useEffect(() => {
    dispatch(fetchBanner());
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
      style={{
        overflow: 'hidden',
      }}
    >
      <SliderContainer>
        {!loading ? (
          <>
            <ErrorBoundary fallbackRender={FallbackRender}>
              <ImageBanner slides={banner?.slides} />
            </ErrorBoundary>
          </>
        ) : (
          <ImageLoader />
        )}
      </SliderContainer>
    </Container>
  );
};

const SliderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImageLoader = styled.div`
  width: 100vw;
  height: 100vh;
  background: #cccccca3;
  position: relative;
  overflow: hidden;
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    transform: translateX(-100px);
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    animation: loading 0.8s infinite;
  }

  @keyframes loading {
    100% {
      transform: translateX(100%);
    }
  }
`;

export default Banners;
