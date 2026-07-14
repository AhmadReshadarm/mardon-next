import ImageBanner from './ImageBanner';
import styles from '../styles/banners.module.css';
const Banners = ({ slides, base64Image_2, error }) => {
  return (
    <div className={styles.Container}>
      <div className={styles.SliderContainer}>
        <ImageBanner
          slides={slides}
          base64Image_2={base64Image_2}
          error={error}
        />
      </div>
    </div>
  );
};

export default Banners;
