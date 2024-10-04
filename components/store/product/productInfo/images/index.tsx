import styled from 'styled-components';
import Slider from './Slider';
import color from 'components/store/lib/ui.colors';
import { Product } from 'swagger/services';
import { Dispatch, SetStateAction } from 'react';
import { devices } from 'components/store/lib/Devices';
import { motion } from 'framer-motion';

type Props = {
  product?: Product;
  images: string[];
  selectedIndex: number;
  direction: number;
  page: number;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
  paginateImage: Dispatch<SetStateAction<number>>;
  setPage: Dispatch<SetStateAction<[number, number]>>;
};

const Images: React.FC<Props> = ({
  selectedIndex,
  direction,
  product,
  images,
  page,
  setSelectedIndex,
  paginateImage,
}) => {
  return (
    <ImagesContainer>
      <Slider
        images={images}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        direction={direction}
        page={page}
        paginateImage={paginateImage}
        alt={product?.name}
      />
    </ImagesContainer>
  );
};

export const ImagesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  position: relative;
  .product-title {
    width: 100%;
    padding: 0 0 30px 40px;
    h1 {
      font-weight: 100;
      font-size: 2rem;
    }
  }
  @media ${devices.laptopS} {
    align-items: center;
    padding: 30px 0;
    gap: 30px;
    .product-title {
      position: unset;
    }
  }
  @media ${devices.tabletL} {
    align-items: center;
    padding: 30px 0;
    gap: 30px;
    .product-title {
      position: unset;
    }
  }
  @media ${devices.tabletS} {
    align-items: center;
    padding: 30px 0;
    gap: 30px;
    .product-title {
      position: unset;
    }
  }

  @media ${devices.mobileL} {
    align-items: center;
    padding: 30px 0;
    gap: 30px;
    .product-title {
      position: unset;
    }
  }
  @media ${devices.mobileM} {
    align-items: center;
    padding: 30px 0;
    gap: 30px;
    .product-title {
      position: unset;
    }
  }

  @media ${devices.mobileS} {
    align-items: center;
    padding: 30px 0;
    gap: 30px;
    .product-title {
      position: unset;
    }
  }
`;

const ProductImagesFullScreenWrapper = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${color.glassmorphismBg};
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);
  transition: 200ms;
  z-index: 99;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .pagination-and-slider-wrapper {
    width: 80%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 30px;
    position: relative;
  }

  .close-btn-wrapper {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -40px;
    right: 0;
    transition: 200ms;
    &:hover {
      transform: scale(1.2);
    }
  }
  @media ${devices.laptopS} {
    .pagination-and-slider-wrapper {
      width: 95%;
      flex-direction: column;
    }
    .close-btn-wrapper {
      top: -50px;
    }
  }
  @media ${devices.tabletL} {
    .pagination-and-slider-wrapper {
      width: 95%;
      flex-direction: column;
    }
    .close-btn-wrapper {
      top: -30px;
    }
  }
  @media ${devices.tabletS} {
    .pagination-and-slider-wrapper {
      width: 95%;
      flex-direction: column;
    }
    .close-btn-wrapper {
      top: -30px;
    }
  }

  @media ${devices.mobileL} {
    .pagination-and-slider-wrapper {
      width: 95%;
      flex-direction: column;
    }
    .close-btn-wrapper {
      top: -30px;
    }
  }
  @media ${devices.mobileM} {
    .pagination-and-slider-wrapper {
      width: 95%;
      flex-direction: column;
    }
    .close-btn-wrapper {
      top: -30px;
    }
  }

  @media ${devices.mobileS} {
    .pagination-and-slider-wrapper {
      width: 95%;
      flex-direction: column;
    }
    .close-btn-wrapper {
      top: -30px;
    }
  }
`;

export default Images;
