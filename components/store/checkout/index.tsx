import { useEffect, useState } from 'react';
import Header from './Header';
// import Authorize from './authorize';
import UserData from './userdata';
import TotalDeleveryDate from './totalDeliveryDate';
import { useAppSelector } from 'redux/hooks';
import { TAuthState, TCartState } from 'redux/types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from '../lib/ui.colors';
import variants from '../lib/variants';
import Authorization from '../storeLayout/utils/HeaderAuth/authorize';
import { UsePagination } from '../storeLayout/utils/HeaderAuth/authorize/helpers';
import { devices } from '../lib/Devices';
import Loading from 'ui-kit/Loading';
const CheckoutContent = () => {
  const { user } = useAppSelector<TAuthState>((state) => state.auth);
  const { isOneClickBuy } = useAppSelector<TCartState>((state) => state.cart);
  const [hasAddress, setHasAddress] = useState(false);
  const [backToFinal, setBacktoFinal] = useState(false);
  const [direction, authType, paginate] = UsePagination();
  const [step, setStep] = useState(0);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    if (user) {
      setStep(1);
    }
  }, [user]);
  useEffect(() => {
    if (isOneClickBuy) {
      setStep(1);
    }
  }, [isOneClickBuy]);

  return (
    <Content>
      {isLoading ? (
        <Loader>
          <Loading />
        </Loader>
      ) : (
        ''
      )}
      <Header step={step} setStep={setStep} />
      {step == 0 && !user && !isOneClickBuy ? (
        <Contianer>
          <Wrapper variants={variants.fadeInReveal}>
            <AuthContent>
              <Authorization
                direction={direction}
                authType={authType}
                paginate={paginate}
              />
            </AuthContent>
          </Wrapper>
        </Contianer>
      ) : (step == 1 && isOneClickBuy && !hasAddress) ||
        (step == 1 && user && !hasAddress) ? (
        <UserData
          setStep={setStep}
          backToFinal={backToFinal}
          setHasAddress={setHasAddress}
        />
      ) : (
        <TotalDeleveryDate
          setHasAddress={setHasAddress}
          setStep={setStep}
          setBacktoFinal={setBacktoFinal}
          setLoading={setLoading}
        />
      )}
    </Content>
  );
};

const Content = styled.div`
  width: 100%;
  position: relative;
`;

const Contianer = styled(motion.div)`
  width: 100%;
  height: 70vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: url(/auth_bg.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 350px;
  @media ${devices.mobileL} {
    height: auto;
    padding: 30px 0;
  }
`;

const Wrapper = styled(motion.div)`
  width: 400px;
  height: 412px;
  position: relative;
  border-radius: 25px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${color.glassmorphismBg};
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);
  box-shadow: 0px 2px 10px ${color.boxShadowBtn};
  overflow: hidden;
`;

const AuthContent = styled(motion.div)`
  width: 85%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  p {
    text-align: center;
  }
  span {
    color: ${color.hover};
  }
`;

const Loader = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff36;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default CheckoutContent;

// |if the user is not signed in bring authrization whick is first step
// |
// |---if the user is new bring user data which is second step
// |
// |
// |---|if the user is old and has delivery address bring details which is second step finished
//     |and ready to go to third step -> /payment
//     |
//     |--user can edit address and oreder reciver data
