import styled from 'styled-components';
import React, { Dispatch, SetStateAction, useState } from 'react';
import isEmail from 'validator/lib/isEmail'; // docs: https://www.npmjs.com/package/validator
import isEmpty from 'validator/lib/isEmpty';
import {
  Content,
  AuthBtns,
  BtnsWrapper,
  AuthInput,
  AuthInputsWrapper,
  FormWrapper,
} from './common';
import variants from 'components/store/lib/variants';
import { InputsTooltip } from 'components/store/checkout/helpers';
import color from 'components/store/lib/ui.colors';
import { paginateTo } from 'components/store/checkout/constant';
import ConfirmPsw from './ConfirmPsw';
import { clearServerErr } from 'redux/slicers/authSlicer';
import { useAppDispatch } from 'redux/hooks';
import {
  handleFirstNameChange,
  handleLastNameChange,
  handleEmailChange,
} from './helpers';

type Props = {
  direction: number;
  authType: string;
  paginate: any;
  serverErr: number | undefined;
  isCap: boolean;
  setCap: Dispatch<SetStateAction<boolean>>;
};
const SignUp: React.FC<Props> = ({
  direction,
  authType,
  paginate,
  serverErr,
  isCap,
  setCap,
}) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lastName, setlastName] = useState('');
  const [[nameInput, lastNameInput, emailInput], setInputsErr] = useState([
    false,
    false,
    false,
  ]);

  return (
    <>
      <Content
        dragConstraints={{ left: 0, right: 0 }}
        custom={direction}
        variants={variants.authorizeSlideX}
        animate={authType == 'signup' ? 'center' : 'enter'}
      >
        <FormWrapper
          name="singup"
          onSubmit={(e) => {
            e.preventDefault();
            paginate(paginateTo.forward, 'password');
          }}
        >
          <h4>Введите свои данные</h4>
          <AuthDevider>
            <AuthInputsWrapper>
              <label htmlFor="signup-name">
                <b>
                  <span>Имя</span>
                  <span className="required">*</span>
                </b>
                <InputsTooltip
                  enterTouchDelay={0}
                  leaveTouchDelay={5000}
                  key="name-tip"
                  title={
                    <React.Fragment>
                      <span>Это поле обязательно к заполнению</span>
                      <span>это будет показано публично на нашем сайте</span>
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
                  isEmpty(name) && nameInput ? 'Не может быть пустым' : 'Имя'
                }
                type="text"
                // id="signup-name"
                value={name}
                style={{
                  fontSize: '0.78rem',
                  border: `solid 1px ${
                    isEmpty(name) && nameInput ? color.hover : color.btnPrimary
                  }`,
                }}
                onChange={handleFirstNameChange(
                  lastNameInput,
                  emailInput,
                  setName,
                  setInputsErr,
                )}
              />
            </AuthInputsWrapper>
            <AuthInputsWrapper>
              <label htmlFor="signup-lastName">
                <b>
                  <span>Фамилия</span>
                  <span className="required">*</span>
                </b>
                <InputsTooltip
                  enterTouchDelay={0}
                  leaveTouchDelay={5000}
                  key="lastName-tip"
                  title={
                    <React.Fragment>
                      <span>Это поле обязательно к заполнению</span>
                      <span>это будет показано публично на нашем сайте</span>
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
                  isEmpty(lastName) && lastNameInput
                    ? 'Не может быть пустым'
                    : 'Фамилия'
                }
                type="text"
                id="signup-lastName"
                value={lastName}
                style={{
                  fontSize: '0.78rem',
                  border: `solid 1px ${
                    isEmpty(lastName) && lastNameInput
                      ? color.hover
                      : color.btnPrimary
                  }`,
                }}
                onChange={handleLastNameChange(
                  nameInput,
                  emailInput,
                  setlastName,
                  setInputsErr,
                )}
              />
            </AuthInputsWrapper>
          </AuthDevider>
          <AuthInputsWrapper>
            <label htmlFor="signup-mail">
              <b>
                <span>Эл. адрес</span>
                <span className="required">*</span>
              </b>
              <InputsTooltip
                enterTouchDelay={0}
                leaveTouchDelay={5000}
                key="email-tip"
                title={
                  <React.Fragment>
                    <span>Это поле обязательно к заполнению</span>
                    <span>
                      Ваш эл. адрес будет использоваться как ваше имя
                      пользователя
                    </span>
                  </React.Fragment>
                }
              >
                <span className="tool-tip">?</span>
              </InputsTooltip>
              <span style={{ color: color.hover }}>
                {serverErr == 409 ? 'Уже зарегистрирован' : ''}
              </span>
            </label>
            <AuthInput
              whileHover="hover"
              whileTap="tap"
              variants={variants.boxShadow}
              placeholder={
                !isEmail(email) && emailInput
                  ? 'Эл. адрес не может быть пустым'
                  : 'Эл. адрес'
              }
              type="email"
              id="signup-mail"
              value={email}
              style={{
                border: `solid 1px ${
                  (!isEmail(email) && emailInput) || serverErr == 409
                    ? color.hover
                    : color.btnPrimary
                }`,
              }}
              onChange={handleEmailChange(
                nameInput,
                lastNameInput,
                setEmail,
                setInputsErr,
                dispatch,
              )}
            />
          </AuthInputsWrapper>
          <button type={'submit'} style={{ display: 'none' }}></button>
        </FormWrapper>
        <BtnsWrapper>
          <AuthBtns
            initial="init"
            whileInView="animate"
            custom={0.05}
            whileHover={{ boxShadow: `0px 0px 4px 2px ${color.boxShadowBtn}` }}
            whileTap={{ boxShadow: `0px 0px 0px 0px ${color.boxShadowBtn}` }}
            variants={variants.fadInSlideUp}
            bgcolor={
              isEmpty(email) ||
              isEmpty(name) ||
              isEmpty(lastName) ||
              !isEmail(email)
                ? color.btnSecondery
                : color.btnPrimary
            }
            disabled={
              isEmpty(email) ||
              isEmpty(name) ||
              isEmpty(lastName) ||
              !isEmail(email)
                ? true
                : false
            }
            textcolor={
              isEmpty(email) ||
              isEmpty(name) ||
              isEmpty(lastName) ||
              !isEmail(email)
                ? color.btnPrimary
                : color.textPrimary
            }
            onClick={() => paginate(paginateTo.forward, 'password')}
          >
            Следующий
          </AuthBtns>
          <AuthBtns
            initial="init"
            whileInView="animate"
            custom={0.1}
            whileHover={{ boxShadow: `0px 0px 4px 2px ${color.boxShadowBtn}` }}
            whileTap={{ boxShadow: `0px 0px 0px 0px ${color.boxShadowBtn}` }}
            variants={variants.fadInSlideUp}
            bgcolor={color.btnPrimary}
            textcolor={color.textPrimary}
            onClick={() => {
              dispatch(clearServerErr());
              setInputsErr([false, false, false]);
              paginate(paginateTo.back, 'selection');
            }}
          >
            Назад
          </AuthBtns>
        </BtnsWrapper>
      </Content>
      <ConfirmPsw
        firstName={name}
        lastName={lastName}
        email={email}
        direction={direction}
        authType={authType}
        paginate={paginate}
        isCap={isCap}
        setCap={setCap}
      />
    </>
  );
};

const AuthDevider = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
`;

export default SignUp;
