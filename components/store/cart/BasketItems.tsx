import CartItem from 'components/store/cart/cartItem';
import Loading from 'ui-kit/Loading';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TCartState } from 'redux/types';
import { handleItemRemove, handleRemoveClick } from './helpers';
import { TWishlistState } from 'redux/types';
import color from '../lib/ui.colors';
type Props = {};
const BasketItems: React.FC<Props> = ({}) => {
  const { cart, loading } = useAppSelector<TCartState>((state) => state.cart);
  const { wishlist }: TWishlistState = useAppSelector(
    (state) => state.wishlist,
  );
  const dispatch = useAppDispatch();

  return (
    <>
      {cart?.orderProducts?.length && !loading ? (
        <>
          <ItemsWrapper>
            <div className="action-btn-wrapper">
              <button onClick={() => handleRemoveClick(dispatch)}>
                <span>ОЧИСТИТЬ КОРЗИНУ</span>
              </button>
            </div>
            <CartBody>
              {cart?.orderProducts?.map((item, index) => {
                return (
                  <CartItem
                    key={`cart-item-page-${index}`}
                    cart={cart}
                    item={item}
                    onRemove={handleItemRemove}
                    wishlist={wishlist!}
                  />
                );
              })}
            </CartBody>
          </ItemsWrapper>
        </>
      ) : loading ? (
        <Loading />
      ) : (
        <NoCartItem>
          <h2>Ваша корзина пуста</h2>
        </NoCartItem>
      )}
    </>
  );
};

const ItemsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  .action-btn-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 20px;
    button {
      width: 200px;
      height: 40px;
      background-color: ${color.btnSecondery};
      cursor: pointer;
      transition: 300ms;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      border-radius: 3px;
      &:hover {
        background-color: ${color.searchBtnBg};

        transform: scale(1.02);
      }
      &:active {
        transform: scale(1);
        background-color: ${color.btnPrimary};
        color: ${color.textPrimary};
      }
      span {
        font-family: 'Jost';
        font-size: 1rem;
      }
    }
  }
`;

const CartBody = styled.ul`
  width: 100%;
  height: 700px;
  overflow-y: scroll;
  display: inline-block;
  padding: 20px;
  &::-webkit-scrollbar {
    width: 5px;
  }
`;

const NoCartItem = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  h2 {
    font-size: 3rem;
    font-family: Anticva;
  }
`;

export default BasketItems;
