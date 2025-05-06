import BasketItems from './BasketItems';
import CartFooter from 'components/store/cart/CartFooter';
import styles from './cartStyles.module.css';

const Cart = () => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.ItemWrapper}>
        <BasketItems />
      </div>
      <CartFooter />
    </div>
  );
};

export default Cart;
