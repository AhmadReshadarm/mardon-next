import React, { Dispatch, SetStateAction, useState } from 'react';
import { motion } from 'framer-motion';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import {
  Content,
  AuthBtns,
  BtnsWrapper,
  AuthInput,
  AuthInputsWrapper,
  FormWrapper,
  ConfidentialityWrapper,
} from './common';
import { handleBack, handleSignIn } from './helpers';
import PswShow from '../../../../../../assets/pswshow.svg';
import PswHide from '../../../../../../assets/pswhide.svg';
import Link from 'next/link';
import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import { InputsTooltip } from 'components/store/checkout/helpers';
import { useAppDispatch } from 'redux/hooks';

type Props = {
  direction: number;
  authType: string;
  paginate: any;
  serverErr: number | undefined;
  isCap: boolean;
  setCap: Dispatch<SetStateAction<boolean>>;
  onAfterAuthorized?: () => void;
};
const SignIn: React.FC<Props> = ({
  direction,
  authType,
  paginate,
  serverErr,
  isCap,
  setCap,
  onAfterAuthorized,
}) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState(false);
  const [pswErr, setPswErr] = useState(false);
  const [confidentiality, setConfidentiality] = useState('password');
  const [secret, setSecret] = useState(0);

  return (
    <Content
      dragConstraints={{ left: 0, right: 0 }}
      custom={direction}
      variants={variants.authorizeSlideX}
      animate={authType == 'signin' ? 'center' : 'enter'}
    >
      <FormWrapper
        name="signin"
        onSubmit={handleSignIn({
          email,
          password,
          dispatch,
          onAfterAuthorized,
        })}
      >
        <h4>Введите свой логин и пароль, чтобы войти</h4>
        <AuthInputsWrapper>
          <label htmlFor="signin-mail">
            <b>
              <span>Логин</span>
              <span className="required">*</span>
            </b>
            <InputsTooltip
              enterTouchDelay={0}
              leaveTouchDelay={5000}
              key="email-tip"
              title={
                <React.Fragment>
                  <span>Это поле обязательно к заполнению</span>
                  <span
                    style={{
                      color: serverErr == 403 ? color.hover : color.btnPrimary,
                    }}
                  >
                    Эл. адрес должна быть подтверждена для входа
                  </span>
                  <span>
                    {serverErr == 403
                      ? 'Проверьте свой почтовый ящик на наличие письма с подтверждением'
                      : ''}
                  </span>
                </React.Fragment>
              }
            >
              <span
                style={{
                  borderColor:
                    serverErr == 403 ? color.hover : color.btnPrimary,
                  color: serverErr == 403 ? color.hover : color.btnPrimary,
                }}
                className="tool-tip"
              >
                ?
              </span>
            </InputsTooltip>
            <span style={{ color: color.hover }}>
              {serverErr == 400 ? 'Неверный эл. адрес' : ''}
            </span>
          </label>
          <AuthInput
            whileHover="hover"
            whileTap="tap"
            variants={variants.boxShadow}
            placeholder={emailErr ? 'Логин не может быть пустым' : 'Логин'}
            type="email"
            id="signin-mail"
            value={email}
            style={{
              border: `solid 1px ${
                emailErr || serverErr == 403 || serverErr == 400
                  ? color.hover
                  : color.btnPrimary
              }`,
            }}
            onChange={(e) => {
              setEmail(e.target.value.toLowerCase());
              setEmailErr(isEmail(e.target.value) ? false : true);
            }}
          />
        </AuthInputsWrapper>
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
                  <span>Эл. адрес должна быть подтверждена для входа</span>
                </React.Fragment>
              }
            >
              <span className="tool-tip">?</span>
            </InputsTooltip>
            <span style={{ color: color.hover }}>
              {serverErr == 401 ? 'Неверный пароль' : ''}
            </span>
            <span>
              {isCap && serverErr == undefined ? 'Капслок включен' : ''}
            </span>
          </label>
          <AuthInput
            whileHover="hover"
            whileTap="tap"
            variants={variants.boxShadow}
            placeholder={pswErr ? 'Пароль не может быть пустым' : 'Пароль'}
            type={confidentiality}
            id="signin-psw"
            value={password}
            style={{
              border: `solid 1px ${
                pswErr || serverErr == 401 ? color.hover : color.btnPrimary
              }`,
            }}
            onChange={(e) => {
              setPassword(e.target.value);
              setPswErr(isEmpty(e.target.value) ? true : false);
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
        <button type={'submit'} style={{ display: 'none' }}></button>
      </FormWrapper>
      <Link href="/profile/pswreset">
        <span>забыл пароль?</span>
      </Link>
      <BtnsWrapper>
        <AuthBtns
          initial="init"
          whileInView="animate"
          custom={0.05}
          whileHover={{ boxShadow: `0px 0px 4px 2px ${color.boxShadowBtn}` }}
          whileTap={{ boxShadow: `0px 0px 0px 0px ${color.boxShadowBtn}` }}
          variants={variants.fadInSlideUp}
          bgcolor={
            isEmpty(email) || isEmpty(password) || !isEmail(email)
              ? color.btnSecondery
              : color.btnPrimary
          }
          disabled={
            isEmpty(email) || isEmpty(password) || !isEmail(email)
              ? true
              : false
          }
          textcolor={
            isEmpty(email) || isEmpty(password) || !isEmail(email)
              ? color.btnPrimary
              : color.textPrimary
          }
          onClick={handleSignIn({
            email,
            password,
            dispatch,
            onAfterAuthorized,
          })}
        >
          Войти
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
          onClick={() => handleBack(paginate, setEmailErr, setPswErr, dispatch)}
        >
          Назад
        </AuthBtns>
      </BtnsWrapper>
    </Content>
  );
};

export default SignIn;
