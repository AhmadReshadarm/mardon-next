import { emptyLoading } from 'common/constants';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ItemContainer, ItemWrapper } from 'ui-kit/products/productItem';
import { ImageSliderSlide, ImageSliderWrapper } from 'ui-kit/products/slider';

const Loader = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });
  return (
    <>
      <div className="section-title-wrapper">
        <LoaderMask style={{ width: '150px', height: '50px' }} />
        <ul className="best-product-grid-wrapper">
          {emptyLoading.map((item, index) => {
            return <LoaderItem index={index} windowWidth={windowWidth} />;
          })}
        </ul>
      </div>
    </>
  );
};

export const LoaderItem = ({ index, windowWidth }) => {
  return (
    <ItemContainer key={index} cardWidth={windowWidth}>
      <ItemWrapper>
        <ImageSliderWrapper cardWidth={windowWidth}>
          <ImageSliderSlide>
            <LoaderMask style={{ width: '100%', height: '100%' }} />
          </ImageSliderSlide>
        </ImageSliderWrapper>
        <div className="product-title-add-to-card-wrapper">
          <span>
            {<LoaderMask style={{ width: '100%', height: '20px' }} />}
          </span>
          <div className="artical-wrapper">
            <span>
              {<LoaderMask style={{ width: '100px', height: '15px' }} />}
            </span>
          </div>
          <div className="product-description-wrapper">
            <span style={{ display: 'flex', gap: '10px' }}>
              <LoaderMask style={{ width: '100%', height: '15px' }} />

              <LoaderMask style={{ width: '100%', height: '15px' }} />
            </span>
          </div>
          <div className="product-price-wrapper">
            <span>
              <LoaderMask style={{ width: '80px', height: '15px' }} />
            </span>
          </div>
          <div className="action-buttons-wrapper">
            <LoaderMask
              style={{
                width: '150px',
                height: '50px',
                borderRadius: '30px',
              }}
            />
            <LoaderMask
              style={{
                width: '150px',
                height: '50px',
                borderRadius: '30px',
              }}
            />
          </div>
        </div>
      </ItemWrapper>
    </ItemContainer>
  );
};

const LoaderMask = styled.div`
  border-radius: 5px;
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

export default Loader;
