import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from '../lib/ui.colors';

const Filter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
`;

const FilterTitle = styled(motion.div)`
  font-size: 1.5rem;
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

export { Filter, FilterTitle, FilterBody };
