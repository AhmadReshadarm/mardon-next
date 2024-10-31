import { devices } from 'components/store/lib/Devices';
import styled from 'styled-components';
type StyleProps = {
  textWidth?: number;
};
const UserSelectWrapper = styled.div<StyleProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-itmes: flex-start;
  gap: 20px;
  border-radius: 15px;
  user-select: none;
  .short-description-wrapper {
    width: 100%;
    padding-right: 50px;
  }
  .product-header-1 {
    font-family: var(--font-ricordi);
    font-size: 1.5rem;
  }

  .product-title-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-itmes: flex-start;
    gap: 5px;
    .title-top-bar {
      width: 50px;
      height: 3px;
      background-color: #000000;
    }
  }

  @media ${devices.tabletL} {
    .product-header-1 {
      font-size: 1.2rem;
    }
  }
  @media ${devices.tabletS} {
    .product-header-1 {
      font-size: 1rem;
    }
  }
  @media ${devices.mobileL} {
    .product-header-1 {
      font-size: 1rem;
    }
  }
  @media ${devices.mobileM} {
    .product-header-1 {
      font-size: 1rem;
    }
  }
  @media ${devices.mobileS} {
    .product-header-1 {
      font-size: 0.8rem;
    }
  }
`;

export { UserSelectWrapper };
