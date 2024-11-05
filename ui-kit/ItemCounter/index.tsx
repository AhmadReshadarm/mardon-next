import { useState } from 'react';
import color from 'components/store/lib/ui.colors';
import { motion } from 'framer-motion';
import { Product } from 'swagger/services';
import { useAppSelector } from 'redux/hooks';
import { handleItemCountChange } from 'common/helpers/cart.helper';
import { useAppDispatch } from 'redux/hooks';
import { TCartState } from 'redux/types';
import {
  BasketDecrementSVG,
  BasketIncrementSVG,
  MenuActiveStateSVG,
} from 'assets/icons/UI-icons';
import { handleCartBtnClick } from 'ui-kit/products/helpers';
import { openErrorNotification } from 'common/helpers';
import styles from './ItemCounter.module.css';
type Props = {
  qty: number;
  product: Product;
};

const ItemCounter: React.FC<Props> = ({ qty, product }) => {
  const dispatch = useAppDispatch();
  const { cart, loading } = useAppSelector<TCartState>((state) => state.cart);

  // ------------------ UI hooks -------------------
  const [decrementPressed, setDecrementPressed] = useState(false);
  const [incrementPressed, setIncrementPressed] = useState(false);
  const [inputValue, setInputValue] = useState(qty);

  // -----------------------------------------------
  return (
    <motion.div
      onClick={(e) => e.preventDefault()}
      className={styles.ItemCounterWrapper}
    >
      <motion.div
        initial={{ width: '0px', opacity: 0 }}
        animate={{ width: '130px', opacity: 1 }}
        transition={{ delay: 0.2, opacity: { delay: 0.1 } }}
        className={styles.counter_action_buttons_wrapper}
      >
        <motion.button
          onMouseDown={() => setDecrementPressed(true)}
          onMouseUp={() => setDecrementPressed(false)}
          onClick={() => {
            if (inputValue <= 0 || String(inputValue) == '') {
              openErrorNotification('Должно быть число от 1 до 10000');
              return;
            }
            setInputValue(inputValue > 1 ? inputValue - 1 : inputValue);
            handleItemCountChange(
              inputValue > 1 ? inputValue - 1 : inputValue,
              product,
              dispatch,
              cart!,
            );
          }}
          disabled={loading ? true : false}
          initial={{ opacity: 0, x: 45 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ x: { delay: 0.4 }, delay: 0.3 }}
          title="Уменьшить количество товара в корзине"
          type="button"
        >
          <BasketDecrementSVG pressed={decrementPressed} />
        </motion.button>
        <motion.input
          type="number"
          value={String(inputValue).replace(/^0+/, '')}
          onChange={(evt) => {
            const newValue = evt.target.value.replace(/^0+/, '');
            if (Number(newValue) < 0 || Number(newValue) > 10000) {
              openErrorNotification('Должно быть число от 1 до 10000');
              return;
            }
            setInputValue(Number(newValue));
            handleItemCountChange(
              Number(newValue == '' ? 1 : newValue),
              product,
              dispatch,
              cart!,
            );
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          title="Введите количество товара"
        />
        <motion.button
          onMouseDown={() => setIncrementPressed(true)}
          onMouseUp={() => setIncrementPressed(false)}
          onClick={() => {
            if (inputValue >= 10000 || String(inputValue) == '') {
              openErrorNotification('Должно быть число от 1 до 10000');
              return;
            }
            setInputValue(inputValue >= 10000 ? 10000 : inputValue + 1);
            handleItemCountChange(
              inputValue >= 10000 ? 10000 : inputValue + 1,
              product,
              dispatch,
              cart!,
            );
          }}
          disabled={loading ? true : false}
          initial={{ opacity: 0, x: -45 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            x: { delay: 0.4 },
            delay: 0.3,
          }}
          title="Увеличить количество товара в корзине"
          type="button"
        >
          <BasketIncrementSVG pressed={incrementPressed} />
        </motion.button>
      </motion.div>
      <motion.button
        className={styles.remove_from_cart_action_button}
        onClick={handleCartBtnClick(
          product,
          dispatch,
          product?.productVariants![0],
          cart!,
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        title={`Удалить ${product.name} из корзины`}
        type="button"
      >
        <MenuActiveStateSVG fill={color.inactiveIcons} />
      </motion.button>
    </motion.div>
  );
};

export default ItemCounter;
