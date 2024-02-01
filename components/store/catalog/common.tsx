import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from '../lib/ui.colors';
import { devices } from '../lib/Devices';

const Filter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
`;

const TopFilter = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  padding: 10px;
  background-color: ${color.backgroundPrimary};
  border-radius: 30px;
  .top-filter-body-special {
    grid-template-columns: repeat(2, 1fr) !important;
  }
  @media ${devices.laptopS} {
    padding: 20px;
    background-color: #f4f4f4;
  }
  @media ${devices.tabletL} {
    padding: 20px;
    background-color: #f4f4f4;
  }
  @media ${devices.tabletS} {
    padding: 20px;
    background-color: #f4f4f4;
  }
  @media ${devices.mobileL} {
    padding: 20px;
    background-color: #f4f4f4;
  }
  @media ${devices.mobileM} {
    padding: 20px;
    background-color: #f4f4f4;
  }
  @media ${devices.mobileS} {
    padding: 20px;
    background-color: #f4f4f4;
  }
`;

const FilterTitle = styled(motion.div)`
  font-size: 1.5rem;
`;
const TopFilterTitle = styled(motion.div)`
  font-size: 1rem;
`;

const TopFilterBody = styled(motion.div)`
  width: 100%;
  display: inline-grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;
  row-gap: 10px;
  padding: 10px;
  justify-items: center;
  .check-box {
    label {
      span {
        cursor: pointer !important;
      }
    }
  }
  &::-webkit-scrollbar {
    display: none;
  }

  @media ${devices.laptopS} {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-items: flex-start;
    overflow-x: scroll;
    overflow-y: hidden;
    padding: 20px;
    gap: 20px;
  }
  @media ${devices.tabletL} {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-items: flex-start;
    overflow-x: scroll;
    overflow-y: hidden;
    padding: 20px;
    gap: 20px;
  }
  @media ${devices.tabletS} {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-items: flex-start;
    overflow-x: scroll;
    overflow-y: hidden;
    padding: 20px 10px;
    gap: 20px;
  }
  @media ${devices.mobileL} {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-items: flex-start;
    overflow-x: scroll;
    overflow-y: hidden;
    padding: 20px 10px;
    gap: 20px;
  }
  @media ${devices.mobileM} {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-items: flex-start;
    overflow-x: scroll;
    overflow-y: hidden;
    padding: 20px 10px;
    gap: 20px;
  }
  @media ${devices.mobileS} {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-items: flex-start;
    overflow-x: scroll;
    overflow-y: hidden;
    padding: 20px 10px;
    gap: 20px;
  }
`;

const FilterBody = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 10px;
  background-color: ${color.bgProduct};
  box-shadow: 0px 5px 10px 0px ${color.boxShadowBtn};
  padding: 10px;
  .check-box {
    label {
      span {
        cursor: pointer !important;
      }
    }
  }
`;

export {
  Filter,
  FilterTitle,
  FilterBody,
  TopFilter,
  TopFilterBody,
  TopFilterTitle,
};
