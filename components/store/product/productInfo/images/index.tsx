import styled from 'styled-components';
import Slider from './Slider';
import { Product } from 'swagger/services';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  product?: Product;
  images: string[];
  selectedIndex: number;
  direction: number;
  page: number;
  firstLoad: boolean;
  setFirstLoad: Dispatch<SetStateAction<boolean>>;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
  paginateImage: Dispatch<SetStateAction<number>>;
  setPage: Dispatch<SetStateAction<[number, number]>>;
  base64Image: any;
};

const Images: React.FC<Props> = ({
  selectedIndex,
  direction,
  product,
  images,
  page,
  setSelectedIndex,
  paginateImage,
  firstLoad,
  setFirstLoad,
  base64Image,
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
        firstLoad={firstLoad}
        setFirstLoad={setFirstLoad}
        base64Image={base64Image}
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
`;

export default Images;
