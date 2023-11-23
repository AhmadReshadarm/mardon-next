import { useEffect, useState } from 'react';
import styled from 'styled-components';
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
  const [timer, setTimer] = useState<any>(null);
  useEffect(() => {
    setInputValue(qty);
  }, [qty]);
  return (
    <ItemCounterWrapper
      initial={{ width: '0px' }}
      animate={{ width: '180px' }}
      onClick={(e) => e.preventDefault()}
    >
      <motion.div
        initial={{ width: '0px', opacity: 0 }}
        animate={{ width: '130px', opacity: 1 }}
        transition={{ delay: 0.2, opacity: { delay: 0.1 } }}
        className="counter-action-buttons-wrapper"
      >
        <motion.button
          onMouseDown={() => setDecrementPressed(true)}
          onMouseUp={() => setDecrementPressed(false)}
          onClick={() => {
            setInputValue(inputValue > 1 ? inputValue - 1 : inputValue);
            handleItemCountChange(
              inputValue > 1 ? inputValue - 1 : inputValue,
              product,
              dispatch,
              cart!,
            );
          }}
          disabled={loading}
          initial={{ opacity: 0, x: 45 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ x: { delay: 0.4 }, delay: 0.3 }}
        >
          <BasketDecrementSVG pressed={decrementPressed} />
        </motion.button>
        <motion.input
          type="number"
          min={1}
          max={10000}
          defaultValue={1}
          value={inputValue}
          onChange={(evt) => {
            setInputValue(
              Number(evt.target.value) == 0
                ? 1
                : Number(evt.target.value) > 10000
                ? 10000
                : Number(evt.target.value),
            );
            clearTimeout(timer);
            const newTimer = setTimeout(() => {
              handleItemCountChange(
                Number(evt.target.value) == 0
                  ? 1
                  : Number(evt.target.value) >= 10000
                  ? 10000
                  : Number(evt.target.value),
                product,
                dispatch,
                cart!,
              );
            }, 500);
            setTimer(newTimer);
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        />
        <motion.button
          onMouseDown={() => setIncrementPressed(true)}
          onMouseUp={() => setIncrementPressed(false)}
          onClick={() => {
            setInputValue(inputValue >= 10000 ? 10000 : inputValue + 1);
            handleItemCountChange(
              inputValue >= 10000 ? 10000 : inputValue + 1,
              product,
              dispatch,
              cart!,
            );
          }}
          disabled={loading}
          initial={{ opacity: 0, x: -45 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            x: { delay: 0.4 },
            delay: 0.3,
          }}
        >
          <BasketIncrementSVG pressed={incrementPressed} />
        </motion.button>
      </motion.div>
      <motion.div
        className="remove-from-cart-action-button"
        onClick={handleCartBtnClick(
          product,
          dispatch,
          product.productVariants![0],
          cart!,
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <MenuActiveStateSVG fill={color.inactiveIcons} />
      </motion.div>
    </ItemCounterWrapper>
  );
};

const ItemCounterWrapper = styled(motion.div)`
  width: 180px;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: solid 1px;
  border-radius: 30px;
  padding: 0 5px 0 0;
  .counter-action-buttons-wrapper {
    width: 130px;
    height: 100%;
    border-radius: 30px;
    background-color: #e2dad0;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;

    button {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      cursor: pointer;
    }
    input {
      width: 50px;
      height: 30px;
      border-radius: 3px;
      background-color: #d6cec1;
      border: none;
      text-align: center;
      padding: 3px;
    }
    input[type='number']::-webkit-inner-spin-button,
    input[type='number']::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
  .remove-from-cart-action-button {
    width: 30px;
    height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

export default ItemCounter;
