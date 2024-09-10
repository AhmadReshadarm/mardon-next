import variants from 'components/store/lib/variants';
import { Container } from 'components/store/storeLayout/common';
import { useAppSelector } from 'redux/hooks';
import { THomePageState } from 'redux/types';
import styled from 'styled-components';
import Loading from 'ui-kit/Loading';
import ImageBanner from './ImageBanner';

const Banners = () => {
  const { banner, loading } = useAppSelector<THomePageState>(
    (state) => state.homePage,
  );

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
