import WishlistItems from './wishlistItems';
import styles from './wishlistStyles.module.css';
const Wishlist = () => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.ItemsWrapper}>
        <WishlistItems />
      </div>
    </div>
  );
};

export default Wishlist;
