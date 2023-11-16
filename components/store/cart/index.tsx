import styled from 'styled-components';
import BasketItems from './BasketItems';
import CartFooter from 'components/store/cart/CartFooter';
import { useAppSelector } from 'redux/hooks';
import { TCartState } from 'redux/types';
type Props = {};

const Cart: React.FC<Props> = ({}) => {
  const { cart } = useAppSelector<TCartState>((state) => state.cart);
  return (
    <Wrapper>
      <div className="header-spliter">
        <div className="border-header"></div>
        <div className="none-border-header"></div>
      </div>
      <ItemWrapper>
        <BasketItems />
      </ItemWrapper>
      <CartFooter cart={cart} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .header-spliter {
    width: 100%;
    .border-header {
      width: 95%;
      border-top: 1px solid;
    }
    .none-border-header {
      width: 10%;
    }
  }
`;

const ItemWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
`;

export default Cart;
