import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState } from 'react';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { TAuthState } from 'redux/types';
import { useAppSelector } from 'redux/hooks';
import { openErrorNotification } from 'common/helpers';

const AuthorizeReviewBtn = (props: any) => {
  const [signInAlert, setSignInAlert] = useState(false);
  const { user } = useAppSelector<TAuthState>((state) => state.auth);
  const { isInUserCheckout, checkouts, productId, alertSignIn, text } = props;
  return (
    <>
      <AddReviewBtn
        onClick={() => {
          setSignInAlert(user ? false : true);
          if (user) {
            if (!isInUserCheckout(productId, checkouts)) {
              openErrorNotification('Этого товара нет в списке ваших заказов');
            }
            if (!user.isVerified) {
              openErrorNotification('Адрес эл. почты не подтвержден');
            }
          }
          setTimeout(() => {
            setSignInAlert(false);
          }, 3000);
        }}
      >
        <span>{text}</span>
      </AddReviewBtn>
      {signInAlert ? (
        <motion.span
          custom={0}
          initial="init"
          whileInView="animate"
          variants={variants.fadeOutSlideOut}
          style={{ color: color.hover, textAlign: 'center', width: '100%' }}
        >
          {alertSignIn}
        </motion.span>
      ) : (
        ''
      )}
    </>
  );
};

const AddReviewBtn = styled.button`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${color.btnSecondery};
  cursor: pointer;
  transition: 300ms;
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
`;

export default AuthorizeReviewBtn;
