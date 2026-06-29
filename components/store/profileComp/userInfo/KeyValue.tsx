import { motion } from 'framer-motion';
import variants from 'components/store/lib/variants';
import { handleEdit, handleHover } from './helpers';
import { useState } from 'react';
import styles from 'components/store/profileComp/styles/profile.module.css';

const KeyValue = (props: any) => {
  const { keyData, valueData, delay, settingsRef, setActive } = props;
  const [ishovered, setHovered] = useState(false);
  return (
    <motion.div
      initial="init"
      whileInView="animate"
      custom={delay}
      viewport={{ once: true }}
      variants={variants.fadInSlideUp}
      className={styles.keyValueWrapper}
      onMouseEnter={() => handleHover(ishovered, setHovered)}
      onMouseLeave={() => handleHover(ishovered, setHovered)}
    >
      <span className={styles.key}>{keyData}</span>
      <div className={styles.value}>
        <span>{valueData}</span>
        <span
          className={styles.edit_data}
          style={{ display: !ishovered ? 'none' : 'block' }}
          onClick={() => handleEdit(settingsRef, setActive)}
        >
          Изменить данные
        </span>
      </div>
    </motion.div>
  );
};

export default KeyValue;
