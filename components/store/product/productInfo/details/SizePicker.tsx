import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import React, { useEffect, useState } from 'react';
import { Size } from 'swagger/services';
import { devices } from 'components/store/lib/Devices';
import {
  setproductSize,
  clearproductSize,
} from 'redux/slicers/store/cartSlicer';
import { useAppDispatch } from 'redux/hooks';
type Props = {
  sizes?: Size[];
};

const SizePicker: React.FC<Props> = ({ sizes }) => {
  const dispatch = useAppDispatch();
  const handleSelectedSize = (setSelectedSize, index, productSize) => {
    setSelectedSize(index);
    dispatch(setproductSize(productSize));
  };

  const handleSelectedSizeClear = (setSelectedSize) => {
    setSelectedSize(null);
    dispatch(clearproductSize());
  };

  const [selectedSize, setSelectedSize] = useState(null);

  return (
    <Container>
      <Wrapper>
        {sizes?.map((productSize, index) => {
          return (
            <Selection
              onClick={() =>
                handleSelectedSize(setSelectedSize, index, productSize.name)
              }
              key={index}
              selected={selectedSize == index ? true : false}
            >
              <span>{productSize.name}</span>
            </Selection>
          );
        })}
      </Wrapper>
      {selectedSize !== null ? (
        <span
          onClick={() => handleSelectedSizeClear(setSelectedSize)}
          className="clear-product-size"
        >
          Очистить
        </span>
      ) : (
        ''
      )}
    </Container>
  );
};

const Container = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  position: relative;
  .clear-product-size {
    position: absolute;
    left: 0;
    bottom: -35px;
    color: ${color.textSecondary};
    transition: 200ms;
    padding: 5px;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const Wrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 10px;
  @media ${devices.laptopS} {
    grid-template-columns: repeat(4, 1fr);
  }
  @media ${devices.mobileL} {
    grid-template-columns: repeat(4, 1fr);
  }
  @media ${devices.mobileM} {
    grid-template-columns: repeat(3, 1fr);
  }
  @media ${devices.mobileS} {
    grid-template-columns: repeat(3, 1fr);
  }
  li {
  }
`;

const Selection = styled.li<{
  selected: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  transition: 200ms;
  padding: 3px;
  box-shadow: 0px 5px 10px 0px ${color.boxShadowBtn};
  &:hover {
    box-shadow: 0px 8px 14px 0px ${color.boxShadowBtn};
  }
  &:active {
    box-shadow: 0px 5px 10px 0px ${color.boxShadowBtn};
  }
  ${(props) => {
    if (props.selected) {
      return css`
        box-shadow: 0px 5px 10px 0px ${color.boxShadowBtn};
      `;
    }
  }}

  span {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    font-size: 1rem;
    white-space: nowrap;
    padding: 5px;
    ${(props) => {
      if (props.selected) {
        return css`
          background: ${color.selected};
          color: ${color.btnPrimary};
        `;
      }
    }}
  }
`;

export default SizePicker;
