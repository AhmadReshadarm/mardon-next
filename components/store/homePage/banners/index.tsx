import { devices } from 'components/store/lib/Devices';
import variants from 'components/store/lib/variants';
import { Container } from 'components/store/storeLayout/common';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchBanner } from 'redux/slicers/store/homePageSlicer';
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
      style={{
        overflow: 'hidden',
      }}
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

export default Banners;
