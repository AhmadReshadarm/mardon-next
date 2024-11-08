import ImageBanner from './ImageBanner';
import styles from '../styles/banners.module.css';
const Banners = ({ slides }) => {
  return (
    <div className={styles.Container}>
      <div className={styles.SliderContainer}>
        <ImageBanner slides={slides} />
      </div>
    </div>
  );
};

export default Banners;
