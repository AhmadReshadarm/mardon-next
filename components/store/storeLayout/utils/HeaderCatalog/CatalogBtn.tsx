import { devices } from 'components/store/lib/Devices';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { PopupDisplay } from '../../constants';
import { Path } from '../paths';
import { handleMenuState } from '../../helpers';

type Props = {
  isOpened: boolean;
  btnNode: any;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  setDisplay: Dispatch<SetStateAction<PopupDisplay>>;
};

const CategoryBtn: React.FC<Props> = ({
  isOpened,
  setIsOpened,
  setDisplay,
  btnNode,
}) => {
  return (
    <BtnSvg
      id="category-btn"
      ref={btnNode}
      onClick={handleMenuState(setIsOpened, setDisplay)}
      whileHover="hover"
      whileTap="tap"
      variants={variants.boxShadow}
    >
      <svg width="21" height="15" viewBox="0 0 21 15">
        <Path
          d="M0.903992 1H2.19894M0.903992 7.40294H2.19894M0.903992 13.8059H2.19894"
          stroke="white"
          animate={{ opacity: isOpened ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        />
        <Path
          d="M5.5 1L20.5 1"
          stroke="white"
          animate={{ opacity: isOpened ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        />
        <Path
          stroke="white"
          d="M5.5 7.40295L20.5 7.40295"
          animate={{ rotate: isOpened ? 45 : 0 }}
        />
        <Path
          stroke="white"
          d="M5.5 7.40295L20.5 7.40295"
          animate={{ rotate: isOpened ? -45 : 0 }}
        />
        <Path
          stroke="white"
          d="M5.5 13.8059L12.75 13.8059"
          animate={{ opacity: isOpened ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        />
      </svg>
      <span style={{ color: `${color.textPrimary}`, fontSize: '1rem' }}>
        Каталог
      </span>
    </BtnSvg>
  );
};

const BtnSvg = styled(motion.button)`
  width: 130px;
  height: 45px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  background: ${color.btnPrimary};
  border: none;
  border-radius: 8px;
  align-items: center;
  align-self: flex-end;

  @media ${devices.laptopS} {
    top: 10px;
    position: absolute;
    margin-left: 599px;
  }

  @media ${devices.mobileL} {
    display: none;
  }
`;

export default CategoryBtn;
