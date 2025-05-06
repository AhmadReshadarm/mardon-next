import Link from 'next/link';
import { motion } from 'framer-motion';
import { getTotalPrice } from './helpers';
import variants from '../lib/variants';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TAuthState, TCartState } from 'redux/types';
import { setOneClickBy } from 'redux/slicers/store/cartSlicer';
import styles from './footerCart.module.css';

const CartFooter = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector<TCartState>((state) => state.cart);

  const { user } = useAppSelector<TAuthState>((state) => state.auth);
  const handleGoToCart = () => {
    dispatch(setOneClickBy(false));
  };

  return (
    <div className={styles.Wrapper}>
      <div
        className={styles.CartTotalPrice}
        style={{
          display: Number(cart?.orderProducts?.length) > 0 ? 'flex' : 'none',
        }}
      >
        <span className={styles.total_text}>Ваша корзина</span>
        <span>Итого: {getTotalPrice(cart?.orderProducts!, user)} ₽</span>
      </div>
      <div className={styles.footer_spliter}>
        <div className={styles.footer_no_border}></div>
        <div className={styles.footer_border}></div>
      </div>
      <div className={styles.CheckoutBtnWrapper}>
        <Link
          style={{
            display: Number(cart?.orderProducts?.length) > 0 ? 'flex' : 'none',
          }}
          href={cart?.totalAmount == 0 ? '/cart' : '/checkout'}
        >
          <motion.button
            className={styles.CheckoutBtn}
            whileHover="hover"
            whileTap="tap"
            variants={variants.boxShadow}
            onClick={handleGoToCart}
          >
            <span>Перейти к оформлению заказа</span>
            <svg
              width="9"
              height="14"
              viewBox="0 0 9 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.3125 1.875L7.25 6.9375L2.3125 11.875"
                stroke="white"
                stroke-width="3.1"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </motion.button>
        </Link>
        <Link href="/catalog">
          <motion.button
            className={styles.CheckoutBtn}
            whileHover="hover"
            whileTap="tap"
            variants={variants.boxShadow}
            style={{ backgroundColor: '#e2dad0', color: '#000000e3' }}
          >
            Продолжить покупки
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default CartFooter;
