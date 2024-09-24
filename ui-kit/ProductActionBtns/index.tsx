import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Product, ProductVariant } from 'swagger/services';
// import variants from 'components/store/lib/variants';
import { checkIfItemInCart, checkIfItemInWishlist } from './helpers';
import ItemCounter from 'ui-kit/ItemCounter';
import color from 'components/store/lib/ui.colors';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TCartState, TWishlistState } from 'redux/types';
import {
  handleCartBtnClick,
  handleWishBtnClick,
} from 'ui-kit/products/helpers';
import { devices } from 'components/store/lib/Devices';
import { useEffect, useRef, useState } from 'react';
import Loading from 'ui-kit/Loading';

type PropsCart = {
  product: Product;
  qty: number;
  variant: ProductVariant | undefined;
};

type StyleProps = {
  cardWidth?: number;
  isInwishList?: boolean;
};

export const AddToCart: React.FC<PropsCart> = ({ product, qty, variant }) => {
  const { cart, countLoading } = useAppSelector<TCartState>(
    (state) => state.cart,
  );

  const dispatch = useAppDispatch();

  // -------------------- UI Hooks ---------------------
  const [productId, setProductId] = useState('');

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  // ------------------- end of UI Hooks --------------------

  return (
    <>
      {!checkIfItemInCart(product, cart!) ? (
        <CartButtonWrapper
          initial={{ height: '0px' }}
          animate={{ height: '50px' }}
          transition={{ duration: 0.004 }}
          onClick={() => {
            handleCartBtnClick(product, dispatch, variant!, cart!)();
            setProductId('');
            setProductId(product.id!);
            setTimeout(() => setProductId(''), 1200);
          }}
          cardWidth={windowWidth}
          disabled={countLoading ? true : false}
        >
          {countLoading && productId === product.id ? (
            <Loading />
          ) : (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              В КОРЗИНУ
            </motion.span>
          )}
          <div className="content-indecator"></div>
        </CartButtonWrapper>
      ) : (
        <ItemCounter product={product} qty={qty} />
      )}
    </>
  );
};

type PropsWishlist = {
  product: Product;
};

export const AddToWishlist: React.FC<PropsWishlist> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { wishlist, loading }: TWishlistState = useAppSelector(
    (state) => state.wishlist,
  );

  // -------------------- UI Hooks ---------------------
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });
  const [productId, setProductId] = useState('');

  // ------------------- end of UI Hooks --------------------

  return (
    <WishlistButtonWrapper
      onClick={handleWishBtnClick(product, dispatch, wishlist!)}
      onMouseDown={() => {
        setProductId('');
        setProductId(product.id!);
        setTimeout(() => setProductId(''), 1000);
      }}
      cardWidth={windowWidth}
      disabled={loading ? true : false}
    >
      <InWishlistButtonContent
        cardWidth={windowWidth}
        isInwishList={checkIfItemInWishlist(product, wishlist!)}
      >
        {loading && productId === product.id ? (
          <Loading />
        ) : (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="wishlist-text-wrapper"
            style={{
              fontSize: checkIfItemInWishlist(product, wishlist!)
                ? '0.7rem'
                : '',
            }}
          >
            {checkIfItemInWishlist(product, wishlist!)
              ? 'УЖЕ В ИЗБРАННОЕ'
              : 'В ИЗБРАННОЕ'}
          </motion.span>
        )}
        <div className="content-indecator"></div>
      </InWishlistButtonContent>
    </WishlistButtonWrapper>
  );
};

const CartButtonWrapper = styled(motion.button)`
  width: 150px;
  height: 50px;
  border-radius: 30px;
  background-color: ${color.buttonPrimary};
  transition: 150ms;
  cursor: pointer;
  position: relative;
  span {
    color: ${color.textPrimary};
    font-family: ricordi;
  }

  .content-indecator {
    width: 100%;
    height: 100%;
    background-color: transparent;
    position: absolute;
    top: 0;
    left: 0;
  }

  &:active {
    background-color: ${color.backgroundPrimary};
    border: 1px solid;
    span {
      color: ${color.textSecondary};
    }
  }
  @media ${devices.laptopM} {
    width: 140px;
  }
  @media ${devices.tabletS} {
    // width: calc(${(p: StyleProps) => p.cardWidth! / 2}px - 50px);
    width: 125px;
  }
`;

const InWishlistButtonContent = styled.div<StyleProps>`
  width: 150px;
  height: 50px;
  border-radius: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  transition: 300ms;
  position: relative;
  ${(props) => {
    return props.isInwishList
      ? `background:linear-gradient(
      90deg,
      #cda172 -6.8%,
      #fef5ca 34.14%,
      #fff8d7 38.26%,
      #fdf3c8 66.52%,
      #cda172 107.04%
    );`
      : `background:linear-gradient(94deg, #f2d099 9.58%, #c6986a 106.37%)`;
  }};
  ${(props) => {
    return props.isInwishList ? `border:1px solid #00000017` : `none`;
  }};
  span {
    color: ${color.textSecondary};
    font-family: ricordi;
  }

  .content-indecator {
    width: 100%;
    height: 100%;
    background-color: transparent;
    position: absolute;
    top: 0;
    left: 0;
  }
  &:active {
    background: #c1ab93;
    border: none;
  }
  @media ${devices.laptopM} {
    width: 140px;
  }
  @media ${devices.tabletS} {
    width: 125px;
  }
`;
// ${(props) => {
//     return `width: calc(${props.cardWidth! / 2}px - 50px);`;
//   }}
const WishlistButtonWrapper = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: transparent;
  width: 150px;
  height: 50px;
  position: relative;
  overflow: hidden;
  @media ${devices.laptopM} {
    width: 140px;
  }
  @media ${devices.tabletS} {
    // width: calc(${(p: StyleProps) => p.cardWidth! / 2}px - 50px);
    width: 125px;
  }
`;
