import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useState } from 'react';
import color from 'components/store/lib/ui.colors';
import Vector from '../../../../assets/vector_upside_black.svg';

type Props = {
  title: string;
  children: JSX.Element | JSX.Element[] | string | string[];
  setIndex: any;
  index: number;
  paginateImage: any;
  stateIndex: number;
};

const InfoDropdown = ({
  title,
  children,
  setIndex,
  index,
  paginateImage,
  stateIndex,
}: Props) => {
  const [openInfo, setOpenInfo] = useState(false);
  const [displayInfo, setDisplayInfo] = useState('none');

  return (
    <InfoWrappers>
      <InfoBtnWrappers
        onClick={() => {
          if (!openInfo && index !== stateIndex) {
            setIndex(index);
            paginateImage(stateIndex > index ? -1 : 1);
          }
          setOpenInfo(!openInfo);
          setTimeout(() => {
            setDisplayInfo(displayInfo == 'none' ? 'flex' : 'none');
          }, 200);
        }}
      >
        <div className="dropdown-btn-wrapper">
          <h2 style={{ fontWeight: openInfo ? '500' : '200' }}>{title}</h2>
          <motion.span
            style={{ display: displayInfo }}
            animate={{
              opacity: openInfo ? 1 : 0,
            }}
          >
            <Vector />
          </motion.span>
        </div>
      </InfoBtnWrappers>
      <InfoContentWrappers
        style={{ display: displayInfo }}
        animate={{
          padding: openInfo ? '15px 15px 50px 15px' : 0,
        }}
        transition={{ duration: 0.2, padding: { delay: 0.1 } }}
      >
        <motion.div
          id="info-content"
          style={{ display: displayInfo }}
          animate={{
            opacity: openInfo ? 1 : 0,
          }}
        >
          {children}
        </motion.div>
      </InfoContentWrappers>
    </InfoWrappers>
  );
};

const InfoWrappers = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const InfoBtnWrappers = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  border-bottom: 1px solid ${color.textSecondary};
  .dropdown-btn-wrapper {
    width: 95%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    h2 {
      font-size: 2rem;
      transition: 300ms;
    }
    span {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      transition: 300ms;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
`;

const InfoContentWrappers = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  #info-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;
  }
`;

export default InfoDropdown;
