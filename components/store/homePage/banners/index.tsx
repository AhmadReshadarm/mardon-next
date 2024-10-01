import variants from 'components/store/lib/variants';
import { Container } from 'components/store/storeLayout/common';
import styled from 'styled-components';
import ImageBanner from './ImageBanner';

const Banners = ({ slides }) => {
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
        <ImageBanner slides={slides} />
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
