import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
import { handleSignUp } from './helpers';
import PswShow from '../../../../../../assets/pswshow.svg';
import PswHide from '../../../../../../assets/pswhide.svg';
import variants from 'components/store/lib/variants';
import { InputsTooltip } from 'components/store/checkout/helpers';
import color from 'components/store/lib/ui.colors';
import { paginateTo } from 'components/store/checkout/constant';
import { useAppDispatch } from 'redux/hooks';
const ConfirmPsw = ({
  direction,
  authType,
  paginate,
  firstName,
  lastName,
  email,
  isCap,
  setCap,
}) => {
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState('');
  const [repeatPsw, setRepeatPsw] = useState('');
  const [isSubscribed, setSbuscribed] = useState(true);
  const [confidentiality, setConfidentiality] = useState('password');
  const [secret, setSecret] = useState(0);
  const [[pswInput, repeatPswInput], setInputsErr] = useState([false, false]);

  return (
    <Content
      // drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      custom={direction}
      variants={variants.authorizeSlideX}
      animate={authType == 'password' ? 'center' : 'enter'}
    >
      <FormWrapper
        name="confirmPassword"
        onSubmit={handleSignUp(
          firstName,
          lastName,
          email,
          password,
          isSubscribed,
          paginate,
          dispatch,
        )}
      >
        <h4>Введите свой пароль</h4>
        <AuthInputsWrapper>
          <label htmlFor="signup-psw">
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
                  <span>
                    Используйте буквенно-цифровые английские символы для пароля
                  </span>
                  <span style={{ color: color.hover }}>
                    минимальное допустимое количество символов восемь
                  </span>
                </React.Fragment>
              }
            >
              <span className="tool-tip">?</span>
            </InputsTooltip>
            <span>{isCap ? 'Капслок включен' : ''}</span>
          </label>
          <AuthInput
            whileHover="hover"
            whileTap="tap"
            variants={variants.boxShadow}
            placeholder={
              isEmpty(password) && pswInput
                ? 'Пароль не может быть пустым'
                : 'Пароль'
            }
            type={confidentiality}
            id="signup-psw"
            value={password}
            style={{
              border: `solid 1px ${
                isEmpty(password) && pswInput ? color.hover : color.btnPrimary
              }`,
            }}
            onChange={(e) => {
              setPassword(e.target.value);
              setInputsErr([true, repeatPswInput ? true : false]);
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
              <span>Повторите пароль</span>
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
            <span style={{ color: color.hover, fontSize: '0.8rem' }}>
              {repeatPsw !== password ? 'пароль не подходит' : ''}
            </span>
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
              border: `solid 1px ${
                isEmpty(repeatPsw) && repeatPswInput
                  ? color.hover
                  : color.btnPrimary
              }`,
            }}
            onChange={(e) => {
              setRepeatPsw(e.target.value);
              setInputsErr([pswInput ? true : false, true]);
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
        <div
          onClick={() => setSbuscribed((prev) => !prev)}
          className="newsletter-wrapper"
        >
          <input type="checkbox" name="newsletter" checked={isSubscribed} />
          <label htmlFor="newsletter">Подписаться на новостную рассылку</label>
        </div>
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
            isEmpty(password) || isEmpty(repeatPsw) || repeatPsw !== password
              ? color.btnSecondery
              : color.btnPrimary
          }
          disabled={
            isEmpty(password) || isEmpty(repeatPsw) || repeatPsw !== password
              ? true
              : false
          }
          textcolor={
            isEmpty(password) || isEmpty(repeatPsw) || repeatPsw !== password
              ? color.btnPrimary
              : color.textPrimary
          }
          onClick={handleSignUp(
            firstName,
            lastName,
            email,
            password,
            isSubscribed,
            paginate,
            dispatch,
          )}
        >
          регистрироваться
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
            paginate(paginateTo.back, 'signup');
            setInputsErr([false, false]);
          }}
        >
          Назад
        </AuthBtns>
      </BtnsWrapper>
    </Content>
  );
};

export default ConfirmPsw;
