import { paginateTo } from 'components/store/checkout/constant';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { motion } from 'framer-motion';
import { useAppSelector } from 'redux/hooks';
import { TAuthState } from 'redux/types';
import styled from 'styled-components';
import { PopupDisplay } from '../../../constants';
import { Loading } from './common';
import SignIn from './signin';
import SignUp from './signup';
import { devices } from 'components/store/lib/Devices';
import CloseSVGWhite from '../../../../../../assets/close.svg';
import { useState } from 'react';
type Props = {
  direction: number;
  authType: string;
  paginate: (newDirection: number, newType: any) => void;
};

type StyleProps = {
  isLoginActive: boolean;
  isSingUpActive: boolean;
};
const Authorization: React.FC<Props> = ({ direction, authType, paginate }) => {
  const { loading } = useAppSelector<TAuthState>((state) => state.auth);
  const [isHelperActive, setIshelperActive] = useState(true);

  return (
    <>
      <AuthorizationWrapper>
        <div className="auth-intial-image-wrapper">
          <img src="/singin-static.jpg" alt="" />
        </div>
        <div className="auth-parrent-wrapper">
          <AuthHeader
            custom={0.1}
            initial="init"
            whileInView="animate"
            variants={variants.fadInSlideUp}
          >
            <AuthTabWrapper
              isLoginActive={authType == 'selection'}
              isSingUpActive={authType == 'signup'}
            >
              <motion.div
                animate={authType == 'selection' ? 'init' : 'animate'}
                variants={{ init: { x: 0 }, animate: { x: 100 } }}
                className="auth-page-indecator"
              ></motion.div>

              <div className="auth-buttons-row">
                <div
                  style={{
                    display:
                      authType !== 'signup' && isHelperActive ? 'flex' : 'none',
                  }}
                  className="helper-box-wrapper"
                >
                  <div className="box arrow-top">
                    <span
                      className="helper-close-btn"
                      onClick={() => setIshelperActive(false)}
                    >
                      <CloseSVGWhite />
                    </span>
                    <span>
                      Если у вас нет аккаунт, нажмите здесь чтобы создать новую
                      аккаунт
                    </span>
                  </div>
                </div>
                <h2
                  className="sign-in-tab"
                  onClick={() => paginate(paginateTo.forward, 'selection')}
                >
                  ВХОД
                </h2>
                <span>/</span>
                <h2
                  className="sign-up-tab"
                  onClick={() => paginate(paginateTo.back, 'signup')}
                >
                  РЕГИСТРАЦИЯ
                </h2>
              </div>
            </AuthTabWrapper>
          </AuthHeader>
          <SignIn direction={direction} authType={authType} />
          <SignUp
            direction={direction}
            authType={authType}
            paginate={paginate}
          />
          <Loading
            style={{
              display: loading ? PopupDisplay.Flex : PopupDisplay.None,
            }}
          />
        </div>
      </AuthorizationWrapper>
    </>
  );
};

const AuthHeader = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 15px;
  h3 {
    font-family: ricordi;
    font-size: 2rem;
  }
  span {
    font-weight: 500;
    font-size: 16px;
  }
`;

const AuthorizationWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  felx-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 30px;
  .auth-intial-image-wrapper {
    width: 45%;
    display: flex;
    align-items: center;
    img {
      width: 100%;
      height: 370px;
      object-fit: cover;
    }
  }
  .auth-parrent-wrapper {
    width: 55%;
    height: 100%;
    position: relative;
    overflow: hidden;
    padding: 60px;
  }
  @media ${devices.laptopS} {
    padding: 30px 0;
    .auth-intial-image-wrapper {
      display: none;
    }
    .auth-parrent-wrapper {
      width: 100%;
      padding: 0;
    }
  }
  @media ${devices.tabletL} {
    padding: 30px 0;
    .auth-intial-image-wrapper {
      display: none;
    }
    .auth-parrent-wrapper {
      width: 100%;
      padding: 0;
    }
  }
  @media ${devices.tabletS} {
    padding: 30px 0;
    .auth-intial-image-wrapper {
      display: none;
    }
    .auth-parrent-wrapper {
      width: 100%;
      padding: 0;
    }
  }
  @media ${devices.mobileL} {
    padding: 30px 0;
    .auth-intial-image-wrapper {
      display: none;
    }
    .auth-parrent-wrapper {
      width: 100%;
      padding: 0;
    }
  }
  @media ${devices.mobileM} {
    padding: 30px 0;
    .auth-intial-image-wrapper {
      display: none;
    }
    .auth-parrent-wrapper {
      width: 100%;
      padding: 0;
    }
  }
  @media ${devices.mobileS} {
    padding: 30px 0;
    .auth-intial-image-wrapper {
      display: none;
      padding: 0;
    }
    .auth-parrent-wrapper {
      width: 100%;
      padding: 0;
    }
  }
`;

const AuthTabWrapper = styled.div<StyleProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  z-index: 9;
  .auth-page-indecator {
    width: 50px;
    height: 3px;
    background-color: ${color.buttonPrimary};
  }
  .auth-buttons-row {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    position: relative;
    .helper-box-wrapper {
      position: absolute;
      top: 35px;
      left: 100px;
      width: 150px;
      background-color: #000;
      border-radius: 10px;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
        rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;

      .box {
        width: 100%;
        height: 100%;
        color: #fff;
        padding: 20px;
        position: relative;
        float: left;
        .helper-close-btn {
          position: absolute;
          position: absolute;
          top: 10px;
          right: 10px;
        }
      }

      .box.arrow-top:after {
        content: ' ';
        position: absolute;
        right: 60px;
        top: -10px;
        border-top: none;
        border-right: 15px solid transparent;
        border-left: 15px solid transparent;
        border-bottom: 15px solid black;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
          rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
      }
    }

    h2 {
      font-family: ricordi;
      font-size: 1.5rem;
      cursor: pointer;
      color: ${color.inactiveIcons};
      &:hover {
        color: ${color.activeIcons};
      }
    }
    ${({ isLoginActive, isSingUpActive }: StyleProps) => {
      if (isLoginActive) {
        return `
          .sign-in-tab{
            color:${color.activeIcons}
          }
        `;
      }
      if (isSingUpActive) {
        return `
          .sign-up-tab{
            color:${color.activeIcons}
          }
        `;
      }
    }}
  }
`;

export default Authorization;
