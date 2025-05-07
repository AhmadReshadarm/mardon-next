import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TCartState, TGlobalState } from 'redux/types';
import { handleRemoveClick } from './helpers';
import { useEffect, useState } from 'react';
import { fetchHistoryProducts } from 'redux/slicers/store/globalSlicer';
import styles from './cartStyles.module.css';
import CartItemLoader from './cartItemLoaders';
import { emptyLoading } from 'common/constants';
import dynamic from 'next/dynamic';
const CartItem = dynamic(() => import('./cartItem'), {
  ssr: false,
});
const HeaderProductItmesHistory = dynamic(
  () => import('ui-kit/HeaderProductItemsHistory'),
  {
    ssr: false,
  },
);
type Props = {};
const BasketItems: React.FC<Props> = ({}) => {
  const { cart, countLoading, loading } = useAppSelector<TCartState>(
    (state) => state.cart,
  );
  const { historyProducts, loadingHistory } = useAppSelector<TGlobalState>(
    (state) => state.global,
  );
  const [cartProductIds, setCartProductIds] = useState(
    new Set(cart?.orderProducts!.map((item) => item.product!.id)),
  );
  const [hasAllProducts, setHasAllProducts] = useState(
    historyProducts.every((product) => cartProductIds.has(product.id)),
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const userHistoy = localStorage.getItem('history');
    if (userHistoy) {
      const payload = {
        userHistory: JSON.parse(userHistoy),
        limit: '1000',
      };
      dispatch(fetchHistoryProducts(payload));
    }
  }, [cart]);

  useEffect(() => {
    setCartProductIds(
      new Set(cart?.orderProducts!.map((item) => item.product!.id)),
    );
  }, [cart, historyProducts]);

  useEffect(() => {
    setHasAllProducts(
      historyProducts.every((product) => cartProductIds.has(product.id)),
    );
  }, [cartProductIds, historyProducts]);
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

  return (
    <div className={styles.ItemsWrapper}>
      <div className={styles.action_buttons_wrapper}>
        <button
          className={styles.action_btn_clear}
          onClick={() => handleRemoveClick(dispatch)}
        >
          <span className={styles.action_btn_clear_text}>ОЧИСТИТЬ КОРЗИНУ</span>
        </button>
      </div>
      <ul className={styles.CartBody}>
        {cart?.orderProducts?.length && !countLoading ? (
          <>
            {cart?.orderProducts?.map((orderProduct, index) => {
              return (
                <CartItem
                  key={`cart-item-page-${index}`}
                  orderProduct={orderProduct}
                />
              );
            })}
          </>
        ) : countLoading || loading ? (
          <>
            {emptyLoading.map((item, index) => {
              return <CartItemLoader key={index} windowWidth={windowWidth} />;
            })}
          </>
        ) : (
          <div
            style={{ justifyContent: 'center' }}
            className={styles.PopupBtnsDivider}
          >
            <h1 style={{ fontWeight: '600', textAlign: 'center' }}>
              Ваша корзина пуста
            </h1>
          </div>
        )}
        {!historyProducts.length && loadingHistory ? (
          <>
            {emptyLoading.map((item, index) => {
              return <CartItemLoader key={index} windowWidth={windowWidth} />;
            })}
          </>
        ) : (
          <>
            {!hasAllProducts ? (
              <>
                <li style={{ width: '100%' }}>
                  <div
                    style={{ justifyContent: 'center' }}
                    className={styles.PopupBtnsDivider}
                  >
                    <h1 style={{ fontWeight: '600', textAlign: 'center' }}>
                      Вы смотрели
                    </h1>
                  </div>
                </li>
                {historyProducts.map((historyProduct, index) => {
                  return (
                    <HeaderProductItmesHistory
                      key={`history-item-${index}`}
                      product={historyProduct}
                    />
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </ul>
    </div>
  );
};

export default BasketItems;
