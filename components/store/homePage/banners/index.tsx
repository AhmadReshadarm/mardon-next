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
