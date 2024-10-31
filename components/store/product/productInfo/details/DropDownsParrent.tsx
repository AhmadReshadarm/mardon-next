import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useState } from 'react';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { ArrowBlackSVG } from 'assets/icons/UI-icons';
import { devices } from 'components/store/lib/Devices';

type Props = {
  title: string;
  borderBottom?: string;
  children: JSX.Element | JSX.Element[] | string | string[];
};

const InfoDropdown = ({ title, children, borderBottom }: Props) => {
  const [openInfo, setOpenInfo] = useState(true);
  const [displayInfo, setDisplayInfo] = useState('flex');

  return (
    <InfoWrappers style={{ border: borderBottom }}>
      <InfoBtnWrappers
        onClick={() => {
          setOpenInfo(!openInfo);
          setTimeout(() => {
            setDisplayInfo(displayInfo == 'none' ? 'flex' : 'none');
          }, 200);
        }}
        title={title}
      >
        <h2>{title}</h2>
        <motion.span
          animate={openInfo ? 'open' : 'close'}
          variants={variants.rotate}
        >
          <ArrowBlackSVG />
        </motion.span>
      </InfoBtnWrappers>
      <InfoContentWrappers
        style={{ display: displayInfo }}
        animate={{
          padding: openInfo ? '15px' : 0,
        }}
        transition={{ duration: 0.3, padding: { delay: 0.1 } }}
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

export const InfoWrappers = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${color.textSecondary};
`;

export const InfoBtnWrappers = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  h2 {
    font-size: 1.2rem;
    font-weight: 500;
  }
  span {
    transform: rotate(90deg);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  @media ${devices.tabletS} {
    h2 {
      font-size: 1rem;
      font-weight: 500;
    }
  }
  @media ${devices.mobileL} {
    h2 {
      font-size: 0.9rem;
      font-weight: 500;
    }
  }
  @media ${devices.mobileM} {
    h2 {
      font-size: 0.8rem;
      font-weight: 400;
    }
  }
  @media ${devices.mobileS} {
    h2 {
      font-size: 0.8rem;
      font-weight: 400;
    }
  }
`;

export const InfoContentWrappers = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  overflow: hidden;
  #info-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;
    .dilevery-title {
      font-weight: 500;
    }
    .fr-view {
      width: 100%;
      padding: 5px 20px;
    }
  }

  @media ${devices.tabletL} {
    .dilevery-title {
      font-size: 1rem;
    }
  }
  @media ${devices.tabletS} {
    .dilevery-title {
      font-size: 0.9rem;
    }
  }
  @media ${devices.mobileL} {
    .dilevery-title {
      font-size: 0.8rem;
    }
  }
  @media ${devices.mobileM} {
    .dilevery-title {
      font-size: 0.6rem;
    }
  }
  @media ${devices.mobileS} {
    .dilevery-title {
      font-size: 0.6rem;
    }
  }
`;

export default InfoDropdown;
