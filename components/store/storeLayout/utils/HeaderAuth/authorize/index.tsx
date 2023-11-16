import { paginateTo } from 'components/store/checkout/constant';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAppSelector } from 'redux/hooks';
import { TAuthState } from 'redux/types';
import styled from 'styled-components';
import { PopupDisplay } from '../../../constants';
import { AuthBtns, Content, Loading } from './common';
import SignIn from './signin';
import SignUp from './signup';

type Props = {
  direction: number;
  authType: string;
  paginate: (newDirection: number, newType: any) => void;
  onAfterAuthorized?: () => void;
};
const Authorization: React.FC<Props> = ({
  direction,
  authType,
  paginate,
  onAfterAuthorized,
}) => {
  const [isCap, setCap] = useState(false);
  const { serverErr, loading } = useAppSelector<TAuthState>(
    (state) => state.auth,
  );

  return (
    <>
      <Content
        dragConstraints={{ left: 0, right: 0 }}
        custom={direction}
        variants={variants.authorizeSlideX}
        animate={authType == 'selection' ? 'center' : 'enter'}
      >
        <AuthMessege
          custom={0.1}
          initial="init"
          whileInView="animate"
          variants={variants.fadInSlideUp}
        >
          <h3>Fingarden</h3>
          <h4>Войдите или зарегистрируйтесь для оформления заказа</h4>
          <span className="sing-up-notice">
            При регистрации мы вышлем вам ссылку для подтверждения на ваш
            почтовый ящик
          </span>
        </AuthMessege>
        <SingInUpBtnsWrapper>
          <AuthBtns
            whileHover="hover"
            whileTap="tap"
            variants={variants.boxShadow}
            bgcolor={color.btnPrimary}
            textcolor={color.textPrimary}
            onClick={() => paginate(paginateTo.forward, 'signin')}
          >
            Войти
          </AuthBtns>
          <span style={{ fontFamily: 'intro' }}>или</span>
          <AuthBtns
            whileHover="hover"
            whileTap="tap"
            variants={variants.boxShadow}
            bgcolor={color.btnPrimary}
            textcolor={color.textPrimary}
            onClick={() => paginate(paginateTo.forward, 'signup')}
          >
            Зарегистрироваться
          </AuthBtns>
        </SingInUpBtnsWrapper>
      </Content>

      <SignIn
        direction={direction}
        authType={authType}
        serverErr={serverErr}
        isCap={isCap}
        setCap={setCap}
        paginate={paginate}
        onAfterAuthorized={onAfterAuthorized}
      />
      <SignUp
        direction={direction}
        authType={authType}
        paginate={paginate}
        serverErr={serverErr}
        isCap={isCap}
        setCap={setCap}
      />
      <Loading
        style={{
          display: loading ? PopupDisplay.Flex : PopupDisplay.None,
        }}
      />
    </>
  );
};

const AuthMessege = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 15px;
  h3 {
    font-family: 'intro';
    font-size: 2rem;
    margin: 0;
  }
  .sing-up-notice {
    color: ${color.bgSecondary};
  }
`;

const SingInUpBtnsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

export default Authorization;
