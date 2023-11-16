import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { devices } from 'components/store/lib/Devices';
import isEmpty from 'validator/lib/isEmpty';
import React, { useEffect, useState } from 'react';
import { InputsTooltip } from 'components/store/checkout/helpers';
import PswShow from '../../../../assets/pswshow.svg';
import PswHide from '../../../../assets/pswhide.svg';
import { handleResetClick } from './helpers';
import { useRouter } from 'next/router';
import { useAppDispatch } from 'redux/hooks';
import { openErrorNotification } from 'common/helpers';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
const ConfirmResetPsw = () => {
  const [psw, setPsw] = useState('');
  const [repeatPsw, setRepeatPsw] = useState('');
  const [pswErr, setPswErr] = useState(false);
  const [repeatErr, setrepeatErr] = useState(false);
  const [isCap, setCap] = useState(false);
  const [confidentiality, setConfidentiality] = useState('password');
  const [secret, setSecret] = useState(0);
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isCap) openErrorNotification('Включен Капс лок (Caps Lock on)');
    if (!isCap) openSuccessNotification('Капс лок выключен (Caps Lock off)');
  }, [isCap]);
  return (
    <Wrapper>
      <Title>Сбросить пароль</Title>
      <AuthInputsWrapper>
        <label htmlFor="signin-psw">
          <b>
            <span>Пароль</span>
            <span className="required">*</span>
          </b>
          <InputsTooltip
            enterTouchDelay={0}
            leaveTouchDelay={5000}
            key="psw-tip"
            title={
              <React.Fragment>
                <span>Это поле обязательно к заполнению</span>
              </React.Fragment>
            }
          >
            <span className="tool-tip">?</span>
          </InputsTooltip>
        </label>
        <AuthInput
          placeholder={pswErr ? 'Пароль не может быть пустым' : 'Пароль'}
          type={confidentiality}
          id="signin-psw"
          value={psw}
          style={{
            border:
              isEmpty(repeatPsw) && repeatErr
                ? `solid 1px ${color.hover}`
                : 'none',
          }}
          onChange={(e) => {
            setPsw(e.target.value);
            setPswErr(isEmpty(e.target.value) ? true : false);
          }}
          onKeyUp={(e) => setCap(e.getModifierState('CapsLock') ? true : false)}
        />
        <ConfidentialityWrapper>
          <span className="content-confidentiality">
            <motion.span
              custom={secret}
              animate={confidentiality == 'password' ? 'show' : 'hide'}
              variants={variants.pswConfidential}
              onClick={() => {
                setSecret(1);
                setConfidentiality('text');
              }}
            >
              <PswHide />
            </motion.span>
            <motion.span
              custom={secret}
              animate={confidentiality == 'text' ? 'show' : 'hide'}
              variants={variants.pswConfidential}
              onClick={() => {
                setSecret(-1);
                setConfidentiality('password');
              }}
            >
              <PswShow />
            </motion.span>
          </span>
        </ConfidentialityWrapper>
      </AuthInputsWrapper>
      <AuthInputsWrapper>
        <label htmlFor="signup-psw-repeat">
          <b>
            <span>Повторите пароль</span>
            <span className="required">*</span>
          </b>
          <InputsTooltip
            enterTouchDelay={0}
            leaveTouchDelay={5000}
            key="rpeat-psw-tip"
            title={
              <React.Fragment>
                <span>Это поле обязательно к заполнению</span>
                <span style={{ color: color.hover }}>
                  повторите тот же пароль сверху
                </span>
              </React.Fragment>
            }
          >
            <span className="tool-tip">?</span>
          </InputsTooltip>
        </label>
        <AuthInput
          placeholder={
            isEmpty(repeatPsw) && repeatErr
              ? 'Пароль не может быть пустым'
              : 'Повторите пароль'
          }
          type={confidentiality}
          id="signup-psw-repeat"
          value={repeatPsw}
          style={{
            border:
              isEmpty(repeatPsw) && repeatErr
                ? `solid 1px ${color.hover}`
                : `none`,
          }}
          onChange={(e) => {
            setRepeatPsw(e.target.value);
            setrepeatErr(isEmpty(e.target.value) ? true : false);
          }}
          onKeyUp={(e) => setCap(e.getModifierState('CapsLock') ? true : false)}
        />
        <ConfidentialityWrapper>
          <span className="content-confidentiality">
            <motion.span
              custom={secret}
              animate={confidentiality == 'password' ? 'show' : 'hide'}
              variants={variants.pswConfidential}
              onClick={() => {
                setSecret(1);
                setConfidentiality('text');
              }}
            >
              <PswHide />
            </motion.span>
            <motion.span
              custom={secret}
              animate={confidentiality == 'text' ? 'show' : 'hide'}
              variants={variants.pswConfidential}
              onClick={() => {
                setSecret(-1);
                setConfidentiality('password');
              }}
            >
              <PswShow />
            </motion.span>
          </span>
        </ConfidentialityWrapper>
      </AuthInputsWrapper>
      <ActionBtn
        style={{
          backgroundColor:
            isEmpty(psw) || isEmpty(repeatPsw) || psw != repeatPsw
              ? color.textSecondary
              : color.btnPrimary,
        }}
        disabled={
          isEmpty(psw) || isEmpty(repeatPsw) || psw != repeatPsw ? true : false
        }
        onClick={(e) => {
          e.preventDefault();
          handleResetClick(psw, router, dispatch);
        }}
      >
        Изменить пароль
      </ActionBtn>
    </Wrapper>
  );
};

const Title = styled.h2`
  font-size: 1.5rem;
`;

const Wrapper = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  @media ${devices.mobileL} {
    width: 100%;
  }
  @media ${devices.mobileM} {
    width: 100%;
  }
  @media ${devices.mobileS} {
    width: 100%;
  }
`;

const AuthInputsWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  position: relative;
  label {
    width: 96%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;

    .tool-tip {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 1px solid;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      cursor: help;
    }
    .required {
      color: ${color.hover};
    }
  }
  @media ${devices.mobileL} {
    width: 90%;
  }
  @media ${devices.mobileM} {
    width: 90%;
  }
  @media ${devices.mobileS} {
    width: 90%;
  }
`;

const AuthInput = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 5px;
  padding: 0 10px;
  font-size: 1rem;
  box-shadow: 0px 5px 10px 0px ${color.boxShadowBtn};
`;
const ConfidentialityWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 32px;
  right: 5px;
  .content-confidentiality {
    width: 35px;
    height: 25px;
    overflow: hidden;
    position: relative;
    span {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      cursor: pointer;
    }
  }
`;

const ActionBtn = styled.button`
  width: 350px;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  background-color: ${color.btnSecondery};
  color: ${color.textPrimary};
  cursor: pointer;
  transition: 300ms;
  &:hover {
    background-color: ${color.btnPrimary};
    color: ${color.textPrimary};
    transform: scale(1.02);
  }
  &:active {
    transform: scale(1);
  }
  span {
    font-size: 1rem;
    font-weight: 300;
    color: ${color.textPrimary};
  }
  @media ${devices.mobileL} {
    width: 90%;
  }
  @media ${devices.mobileM} {
    width: 90%;
  }
  @media ${devices.mobileS} {
    width: 90%;
  }
`;

export default ConfirmResetPsw;
