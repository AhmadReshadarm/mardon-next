import styled from 'styled-components';
import { useState } from 'react';
import QuastionList from './Quastions';
import AuthorizeQuastionBtn from '../AuthorizeBtn';
import AskQuastion from './askQuastion';
import { useAppSelector } from 'redux/hooks';
import { TProductInfoState, TAuthState } from 'redux/types';
import { devices } from 'components/store/lib/Devices';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { motion } from 'framer-motion';
import { openErrorNotification } from 'common/helpers';

const Quastions = ({ productId, userId }) => {
  const { product } = useAppSelector<TProductInfoState>(
    (state) => state.productInfo,
  );
  const { user } = useAppSelector<TAuthState>((state) => state.auth);
  return (
    <ContentContainer>
      <ContentWrapper style={{ alignItems: 'flex-start' }}>
        {product?.questions?.length ? (
          <QuastionList product={product} />
        ) : (
          <div>Здесь пока нет вопросов.</div>
        )}
      </ContentWrapper>
      <ContentWrapper>
        {user && user.isVerified ? (
          <AskQuastion productId={productId} userId={userId} />
        ) : (
          <>
            <AddReviewBtn
              onClick={() => {
                if (user?.isVerified == false) {
                  openErrorNotification('Адрес эл. почты не подтвержден');
                }
                if (!user) {
                  openErrorNotification('Войдите, чтобы написать вопрос');
                }
              }}
            >
              <span>Задайте вопрос</span>
            </AddReviewBtn>
          </>
        )}
      </ContentWrapper>
    </ContentContainer>
  );
};

const ContentContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 1fr;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0;

  @media ${devices.laptopS} {
    width: 95%;
    display: flex;
    flex-direction: column-reverse;
  }

  @media ${devices.mobileL} {
    width: 95%;
    display: flex;
    flex-direction: column-reverse;
  }
  @media ${devices.mobileM} {
    width: 95%;
    display: flex;
    flex-direction: column-reverse;
  }

  @media ${devices.mobileS} {
    width: 95%;
    display: flex;
    flex-direction: column-reverse;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  padding: 20px 0;
  gap: 20px;
  position: relative;

  @media ${devices.mobileL} {
    width: 100%;
  }
`;

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

export default Quastions;
