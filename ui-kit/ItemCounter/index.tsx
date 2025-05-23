import { useEffect, useRef, useState } from 'react';
import color from 'components/store/lib/ui.colors';
import { motion } from 'framer-motion';
import { Product, ProductVariant } from 'swagger/services';
import { useAppSelector } from 'redux/hooks';
import { useAppDispatch } from 'redux/hooks';
import { TCartState } from 'redux/types';
import {
  handleProductCartQty,
  handleRemoveFromCartBtnClick,
} from 'ui-kit/products/helpers';
import { openErrorNotification } from 'common/helpers';
import styles from './ItemCounter.module.css';
type Props = {
  qty: number;
  product: Product;
  variant?: ProductVariant;
};

const ItemCounter: React.FC<Props> = ({ qty, product, variant }) => {
  const dispatch = useAppDispatch();
  const { cart, loading } = useAppSelector<TCartState>((state) => state.cart);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  // ------------------ UI hooks -------------------
  const [decrementPressed, setDecrementPressed] = useState(false);
  const [incrementPressed, setIncrementPressed] = useState(false);
  const [inputValue, setInputValue] = useState(String(qty));
  const [isEditing, setIsEditing] = useState(false);

  // Sync local state with prop when not editing
  useEffect(() => {
    if (!isEditing) {
      setInputValue(String(qty));
    }
  }, [qty, isEditing]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, []);

  // -----------------------------------------------
  return (
    <div
      // onClick={(e) => e.preventDefault()}
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
            const newQty = qty - 1;
            if (newQty < 1) {
              openErrorNotification('Должно быть число от 1 до 10000');
              return;
            }
            setInputValue(String(newQty)); // Optimistic update
            handleProductCartQty(newQty, product, dispatch, cart!, variant);
          }}
          disabled={loading ? true : false}
          initial={{ opacity: 0, x: 45 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ x: { delay: 0.4 }, delay: 0.3 }}
          title="Уменьшить количество товара в корзине"
          type="button"
        >
          <>
            {!decrementPressed ? (
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_99_565)">
                  <path
                    d="M9.66667 15V17.6667H23V15H9.66667ZM16.3333 3C8.97334 3 3 8.97334 3 16.3333C3 23.6933 8.97334 29.6667 16.3333 29.6667C23.6933 29.6667 29.6667 23.6933 29.6667 16.3333C29.6667 8.97334 23.6933 3 16.3333 3ZM16.3333 27C10.4533 27 5.66667 22.2133 5.66667 16.3333C5.66667 10.4533 10.4533 5.66667 16.3333 5.66667C22.2133 5.66667 27 10.4533 27 16.3333C27 22.2133 22.2133 27 16.3333 27Z"
                    fill="#949494"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_99_565">
                    <rect width="32" height="32" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            ) : (
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_99_559)">
                  <path
                    d="M15.9994 2.66663C8.63935 2.66663 2.66602 8.63996 2.66602 16C2.66602 23.36 8.63935 29.3333 15.9994 29.3333C23.3594 29.3333 29.3327 23.36 29.3327 16C29.3327 8.63996 23.3594 2.66663 15.9994 2.66663ZM22.666 17.3333H9.33268V14.6666H22.666V17.3333Z"
                    fill="#949494"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_99_559">
                    <rect width="32" height="32" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            )}
          </>
        </motion.button>
        <motion.input
          type="number"
          value={inputValue}
          onChange={(evt) => {
            const newValue = evt.target.value.replace(/^0+/, '');
            setInputValue(newValue);

            if (timeoutId.current) clearTimeout(timeoutId.current);

            if (newValue === '') return;

            const numValue = Number(newValue);
            if (numValue < 1 || numValue > 10000) {
              openErrorNotification('Должно быть число от 1 до 10000');
              return;
            }

            timeoutId.current = setTimeout(() => {
              handleProductCartQty(numValue, product, dispatch, cart!, variant);
            }, 500);
          }}
          onFocus={() => setIsEditing(true)}
          onBlur={() => {
            setIsEditing(false);
            const numValue = inputValue === '' ? 1 : Number(inputValue);
            if (numValue < 1 || numValue > 10000) {
              openErrorNotification('Должно быть число от 1 до 10000');
              setInputValue(String(qty));
              return;
            }
            handleProductCartQty(numValue, product, dispatch, cart!, variant);
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
            const newQty = qty + 1;
            if (newQty > 10000) {
              openErrorNotification('Должно быть число от 1 до 10000');
              return;
            }
            setInputValue(String(newQty)); // Optimistic update
            handleProductCartQty(newQty, product, dispatch, cart!, variant);
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
          <>
            {!incrementPressed ? (
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_99_566)">
                  <path
                    d="M17.6667 9.66667H15V15H9.66667V17.6667H15V23H17.6667V17.6667H23V15H17.6667V9.66667ZM16.3333 3C8.97334 3 3 8.97334 3 16.3333C3 23.6933 8.97334 29.6667 16.3333 29.6667C23.6933 29.6667 29.6667 23.6933 29.6667 16.3333C29.6667 8.97334 23.6933 3 16.3333 3ZM16.3333 27C10.4533 27 5.66667 22.2133 5.66667 16.3333C5.66667 10.4533 10.4533 5.66667 16.3333 5.66667C22.2133 5.66667 27 10.4533 27 16.3333C27 22.2133 22.2133 27 16.3333 27Z"
                    fill="#949494"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_99_566">
                    <rect width="32" height="32" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            ) : (
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_99_560)">
                  <path
                    d="M15.9994 2.66663C8.63935 2.66663 2.66602 8.63996 2.66602 16C2.66602 23.36 8.63935 29.3333 15.9994 29.3333C23.3594 29.3333 29.3327 23.36 29.3327 16C29.3327 8.63996 23.3594 2.66663 15.9994 2.66663ZM22.666 17.3333H17.3327V22.6666H14.666V17.3333H9.33268V14.6666H14.666V9.33329H17.3327V14.6666H22.666V17.3333Z"
                    fill="#949494"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_99_560">
                    <rect width="32" height="32" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            )}
          </>
        </motion.button>
      </motion.div>
      <motion.button
        className={styles.remove_from_cart_action_button}
        onClick={handleRemoveFromCartBtnClick(
          product,
          dispatch,
          variant!,
          cart!,
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        title={`Удалить ${product.name} из корзины`}
        type="button"
      >
        <motion.svg
          width="44"
          height="41"
          viewBox="0 0 44 41"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          key="menu-global-indecator-normat-state"
          initial="init"
          whileHover={{
            scale: 1.1,
          }}
          whileTap={{ scale: 1 }}
        >
          <path
            d="M32.7214 29.836L13.2763 10.3907C12.7559 9.87025 11.912 9.8693 11.3907 10.3907C10.8693 10.912 10.8702 11.7559 11.3907 12.2763L30.8358 31.7216C31.3562 32.242 32.2 32.243 32.7214 31.7216C33.2428 31.2002 33.2418 30.3564 32.7214 29.836Z"
            fill={color.inactiveIcons}
          />
          <path
            d="M13.2764 31.7215L32.7217 12.2764C33.2422 11.756 33.2431 10.9122 32.7217 10.3908C32.2004 9.86943 31.3565 9.87037 30.8361 10.3908L11.3908 29.8359C10.8704 30.3564 10.8694 31.2002 11.3908 31.7215C11.9122 32.2429 12.756 32.242 13.2764 31.7215Z"
            fill={color.inactiveIcons}
          />
        </motion.svg>
      </motion.button>
    </div>
  );
};

export default ItemCounter;
