import { motion } from 'framer-motion';
import { useState } from 'react';
import variants from 'components/store/lib/variants';
import { ArrowBlackSVG } from 'assets/icons/UI-icons';
import {
  InfoBtnWrappers,
  InfoContentWrappers,
  InfoWrappers,
} from './DropDownsParrent';

type Props = {
  title: string;
  borderBottom?: string;
  children: JSX.Element | JSX.Element[] | string | string[];
};

const InfoDropdownReturn = ({ title, children, borderBottom }: Props) => {
  const [openInfo, setOpenInfo] = useState(false);
  const [displayInfo, setDisplayInfo] = useState('none');

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

export default InfoDropdownReturn;
