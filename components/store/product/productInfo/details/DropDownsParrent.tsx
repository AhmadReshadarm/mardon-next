import { useState } from 'react';
import { ArrowBlackSVG } from 'assets/icons/UI-icons';
import styles from '../../styles/dropDowns.module.css';

type Props = {
  title: string;
  borderBottom?: string;
  children: JSX.Element | JSX.Element[] | string | string[];
};

const InfoDropdown = ({ title, children, borderBottom }: Props) => {
  const [openInfo, setOpenInfo] = useState(true);
  const [displayInfo, setDisplayInfo] = useState('flex');
  const [rotation, setRotation] = useState(-90);

  return (
    <div style={{ border: borderBottom }} className={styles.InfoWrappers}>
      <div
        onClick={() => {
          setOpenInfo(!openInfo);
          setRotation(rotation == 90 ? -90 : 90);
          setTimeout(() => {
            setDisplayInfo(displayInfo == 'none' ? 'flex' : 'none');
          }, 200);
        }}
        title={title}
        className={styles.InfoBtnWrappers}
      >
        <h2>{title}</h2>
        <span style={{ transform: `rotate(${rotation}deg)` }}>
          <ArrowBlackSVG />
        </span>
      </div>
      <div
        style={{ display: displayInfo }}
        className={styles.InfoContentWrappers}
      >
        <div
          id="info-content"
          style={{ display: displayInfo }}
          className={styles.info_content}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default InfoDropdown;
