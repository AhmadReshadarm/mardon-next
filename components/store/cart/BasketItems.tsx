import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TCartState, TGlobalState } from 'redux/types';
import { handleRemoveClick } from './helpers';
import { useEffect, useState } from 'react';
import { fetchHistoryProducts } from 'redux/slicers/store/globalSlicer';
import styles from './cartStyles.module.css';
import CartItemLoader from './cartItemLoaders';
import { emptyLoading } from 'common/constants';
import CartItem from './cartItem';
import HeaderProductItmesHistory from 'ui-kit/HeaderProductItemsHistory';
type Props = {};
const BasketItems: React.FC<Props> = ({}) => {
  const { cart } = useAppSelector<TCartState>((state) => state.cart);
  const { historyProducts } = useAppSelector<TGlobalState>(
    (state) => state.global,
  );

  const dispatch = useAppDispatch();

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

  const [historyUI, setHistoryUI] = useState(historyProducts);
  useEffect(() => {
    const userHistoy = localStorage.getItem('history');
    if (userHistoy && historyProducts.length == 0) {
      const payload = {
        userHistory: JSON.parse(userHistoy),
        limit: '1000',
      };
      dispatch(fetchHistoryProducts(payload));
    }
  }, []);

  useEffect(() => {
    const cartVariantIds = new Set(
      cart?.orderProducts?.map((op) => op.productVariant?.id),
    );

    const filteredHistory = historyProducts
      .map((product) => ({
        ...product,
        productVariants: product.productVariants?.filter(
          (variant) => !cartVariantIds.has(variant.id),
        ),
      }))
      .filter((product) => product.productVariants?.length);
    setHistoryUI(filteredHistory);
  }, [cart, historyProducts]);

  return (
    <div className={styles.ItemsWrapper}>
      {cart?.orderProducts?.length !== 0 ? (
        <div className={styles.action_buttons_wrapper}>
          <button
            className={styles.action_btn_clear}
            onClick={() => handleRemoveClick(dispatch)}
          >
            <span className={styles.action_btn_clear_text}>
              ОЧИСТИТЬ КОРЗИНУ
            </span>
          </button>
        </div>
      ) : (
        <></>
      )}

      <ul className={styles.CartBody}>
        {cart?.orderProducts?.length !== 0 ? (
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

        {historyUI.length !== 0 ? (
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
            {historyUI.map((historyProduct, index) => {
              return (
                <HeaderProductItmesHistory
                  key={`history-item-${index}`}
                  product={historyProduct}
                />
              );
            })}
          </>
        ) : (
          <>
            {emptyLoading.map((item, index) => {
              return <CartItemLoader key={index} windowWidth={windowWidth} />;
            })}
          </>
        )}
      </ul>
    </div>
  );
};

export default BasketItems;
