import styled from 'styled-components';
import { motion } from 'framer-motion';
import isEmpty from 'validator/lib/isEmpty';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { devices } from 'components/store/lib/Devices';
import { Container, Header } from '../common';
import { styleProps } from 'components/store/lib/types';
import { InputsTooltip, handleChangePsw } from './helpers';
import PswShow from '../../../../assets/pswshow.svg';
import PswHide from '../../../../assets/pswhide.svg';
import React, { useState, useMemo, useEffect } from 'react';

const Changepsw = (props: any) => {
  const { changePswRef, setActive, user } = props;
  const [serverResponse, setServerResponse] = useState(undefined);
  const [isCap, setCap] = useState(false);
  const [psw, setPsw] = useState('');
  const [oldPsw, setOldPsw] = useState('');
  const [repeatPsw, setRepeatPsw] = useState('');
  const [confidentiality, setConfidentiality] = useState('password');
  const [secret, setSecret] = useState(0);
  const [oldPswSecret, setOldPswSecret] = useState('password');
  const [[oldPswInput, pswInput, repeatPswInput], setInputsErr] = useState([
    false,
    false,
    false,
  ]);
  const payload = {
    user,
    psw,
    oldPassword: oldPsw,
    setServerResponse,
  };

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActive('changePsw');
      }),
    [],
  );

  useEffect(() => {
    observer.observe(changePswRef.current);

    return () => {
      observer.disconnect();
    };
  }, [changePswRef, observer]);

  return (
    <Container id="changepsw" ref={changePswRef}>
      <Header>Изменить пароль</Header>
      <Wrapper>
        <span className="errors">
          {repeatPsw !== psw ? 'Новый пароль не подходит' : ''}
          {serverResponse == 404 ? 'Пользователь не найден' : ''}
          {serverResponse == 409
            ? 'Нельзя использовать тот же пароль, что и предыдущий'
            : ''}
          {serverResponse == 403 ? 'Доступ ограничен: войдите снова' : ''}

          {serverResponse == 401 ? 'Старый пароль не подходит' : ''}
          {serverResponse == 429
            ? 'Слишком много запросов, вернитесь через 24 часа'
            : ''}
          {serverResponse! >= 500
            ? 'Нам очень жаль 😔, что-то пошло не так с нашими серверами'
            : ''}
        </span>
        <span className="success">
          {serverResponse == 200 ? 'Пароль изменен' : ''}
        </span>
        <span className="errors">{isCap ? 'Капслок включен' : ''}</span>

        <FormWrapper>
          <AuthInputsWrapper>
            <label htmlFor="old-psw">
              <b>
                <span>Старый пароль</span>
                <span className="required">*</span>
              </b>
              <InputsTooltip
                enterTouchDelay={0}
                leaveTouchDelay={5000}
                key="old-psw-tip"
                title={
                  <React.Fragment>
                    <span>Это поле обязательно к заполнению</span>
                    <span>
                      Используйте буквенно-цифровые английские символы
                    </span>
                    <span style={{ color: color.hover }}>
                      Напишите свой предыдущий пароль
                    </span>
                  </React.Fragment>
                }
              >
                <span className="tool-tip">?</span>
              </InputsTooltip>
            </label>
            <AuthInput
              whileHover="hover"
              whileTap="tap"
              variants={variants.boxShadow}
              placeholder={
                isEmpty(oldPsw) && pswInput
                  ? 'не может быть пустым'
                  : 'Старый пароль'
              }
              type={oldPswSecret}
              id="old-psw"
              value={oldPsw}
              style={{
                border: `solid 1px ${
                  isEmpty(psw) && pswInput ? color.hover : color.btnSecondery
                }`,
              }}
              onChange={(e) => {
                setServerResponse(undefined);
                setOldPsw(e.target.value);
                setInputsErr([
                  true,
                  pswInput ? true : false,
                  repeatPswInput ? true : false,
                ]);
              }}
              onKeyUp={(e) =>
                setCap(e.getModifierState('CapsLock') ? true : false)
              }
            />
            <ConfidentialityWrapper>
              <span className="content-confidentiality">
                <motion.span
                  custom={secret}
                  animate={oldPswSecret == 'password' ? 'show' : 'hide'}
                  variants={variants.pswConfidential}
                  onClick={() => {
                    setSecret(1);
                    setOldPswSecret('text');
                  }}
                >
                  <PswHide />
                </motion.span>
                <motion.span
                  custom={secret}
                  animate={oldPswSecret == 'text' ? 'show' : 'hide'}
                  variants={variants.pswConfidential}
                  onClick={() => {
                    setSecret(-1);
                    setOldPswSecret('password');
                  }}
                >
                  <PswShow />
                </motion.span>
              </span>
            </ConfidentialityWrapper>
          </AuthInputsWrapper>
          <AuthInputsWrapper>
            <label htmlFor="signup-psw">
              <b>
                <span>Новый пароль</span>
                <span className="required">*</span>
              </b>
              <InputsTooltip
                enterTouchDelay={0}
                leaveTouchDelay={5000}
                key="psw-tip"
                title={
                  <React.Fragment>
                    <span>Это поле обязательно к заполнению</span>
                    <span>
                      Используйте буквенно-цифровые английские символы для
                      пароля
                    </span>
                    <span style={{ color: color.hover }}>
                      минимальное допустимое количество символов восемь
                    </span>
                  </React.Fragment>
                }
              >
                <span className="tool-tip">?</span>
              </InputsTooltip>
            </label>
            <AuthInput
              whileHover="hover"
              whileTap="tap"
              variants={variants.boxShadow}
              placeholder={
                isEmpty(psw) && pswInput
                  ? 'Пароль не может быть пустым'
                  : 'Пароль'
              }
              type={confidentiality}
              id="signup-psw"
              value={psw}
              style={{
                border: `solid 1px ${
                  isEmpty(psw) && pswInput ? color.hover : color.btnSecondery
                }`,
              }}
              onChange={(e) => {
                setServerResponse(undefined);
                setPsw(e.target.value);
                setInputsErr([
                  oldPswInput ? true : false,
                  true,
                  repeatPswInput ? true : false,
                ]);
              }}
              onKeyUp={(e) =>
                setCap(e.getModifierState('CapsLock') ? true : false)
              }
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
                <span>Повторите новый пароль</span>
                <span className="required">*</span>
              </b>
              <InputsTooltip
                enterTouchDelay={0}
                leaveTouchDelay={5000}
                key="psw-tip"
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
              whileHover="hover"
              whileTap="tap"
              variants={variants.boxShadow}
              placeholder={
                isEmpty(repeatPsw) && repeatPswInput
                  ? 'Пароль не может быть пустым'
                  : 'Повторите пароль'
              }
              type={confidentiality}
              id="signup-psw-repeat"
              value={repeatPsw}
              style={{
                border: `solid 1px  ${
                  isEmpty(repeatPsw) && repeatPswInput
                    ? color.hover
                    : color.btnSecondery
                }`,
              }}
              onChange={(e) => {
                setServerResponse(undefined);
                setRepeatPsw(e.target.value);
                setInputsErr([
                  oldPswInput ? true : false,
                  pswInput ? true : false,
                  true,
                ]);
              }}
              onKeyUp={(e) =>
                setCap(e.getModifierState('CapsLock') ? true : false)
              }
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
        </FormWrapper>

        <AuthBtns
          disabled={
            isEmpty(oldPsw) ||
            isEmpty(psw) ||
            isEmpty(repeatPsw) ||
            repeatPsw !== psw
              ? true
              : false
          }
          onClick={(e) => {
            e.preventDefault();
            handleChangePsw(payload);
          }}
        >
          Изменить пароль
        </AuthBtns>
      </Wrapper>
    </Container>
  );
};

const Wrapper = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  user-select: none;
  .errors {
    color: ${color.hover};
    font-size: 1rem;
  }
  .success {
    color: ${color.ok};
    font-size: 1rem;
  }
  @media ${devices.mobileL} {
    align-items: center;
  }
  @media ${devices.mobileM} {
    align-items: center;
  }
  @media ${devices.mobileS} {
    align-items: center;
  }
`;

const AuthBtns = styled.button`
  width: 200px;
  height: 40px;
  border-radius: 3px;
  background-color: ${color.btnSecondery};
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
    font-family: 'Jost';
    font-size: 1rem;
  }
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

const FormWrapper = styled.form`
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  h4 {
    font-size: 1rem;
  }
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
  align-items: flex-start;
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
`;

const AuthInput = styled(motion.input)`
  width: 200px;
  height: 40px;
  border-radius: 5px;
  padding: 0 10px;
  font-size: 1rem;
  font-weight: 300;
  background-color: ${color.btnSecondery};
  border: none;
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

export default Changepsw;
