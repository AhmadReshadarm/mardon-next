import React, { useState } from 'react';
import isEmail from 'validator/lib/isEmail'; // docs: https://www.npmjs.com/package/validator
import isEmpty from 'validator/lib/isEmpty';
import {
  Content,
  AuthInput,
  AuthInputsWrapper,
  FormWrapper,
  AuthorizationFormWrapper,
} from './common';
import variants from 'components/store/lib/variants';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { handleSignUp } from './helpers';
import color from 'components/store/lib/ui.colors';
import { setOneClickBy } from 'redux/slicers/store/cartSlicer';
import { TGlobalUIState } from 'redux/types';

type Props = {
  direction: number;
  authType: string;
  paginate: any;
};
const SignUp: React.FC<Props> = ({ direction, authType, paginate }) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [isSubscribed, setSbuscribed] = useState(true);
  const { isAuthFormOpen } = useAppSelector<TGlobalUIState>(
    (state) => state.globalUI,
  );
  return (
    <Content
      dragConstraints={{ left: 0, right: 0 }}
      custom={direction}
      variants={variants.authorizeSlideX}
      animate={authType == 'signup' ? 'center' : 'enter'}
    >
      <AuthorizationFormWrapper>
        <FormWrapper
          name="singup"
          onSubmit={handleSignUp(email, isSubscribed, paginate, dispatch)}
        >
          <span>Логин и пароль будут отправлены вам на электронную почту</span>
          <AuthInputsWrapper>
            <AuthInput
              placeholder="Эл. адрес"
              type="email"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
            />
            <div
              onClick={() => setSbuscribed((prev) => !prev)}
              className="newsletter-wrapper"
            >
              <input type="checkbox" name="newsletter" checked={isSubscribed} />
              <label htmlFor="newsletter">
                Подписаться на новостную рассылку
              </label>
            </div>
            {isAuthFormOpen ? (
              ''
            ) : (
              <span
                style={{
                  fontSize: '1rem',
                  color: '#476CA9',
                  cursor: 'pointer',
                }}
                onClick={() => dispatch(setOneClickBy(true))}
              >
                Оформить заказ как гость
              </span>
            )}
          </AuthInputsWrapper>
          <div className="action-buttons-wrapper ">
            <button
              type={'submit'}
              disabled={isEmpty(email) || !isEmail(email)}
              style={{
                backgroundColor:
                  isEmpty(email) || !isEmail(email)
                    ? color.inactiveIcons
                    : color.buttonPrimary,
              }}
            >
              ЗАРЕГИСТРИРОВАТЬСЯ
            </button>
          </div>
        </FormWrapper>
      </AuthorizationFormWrapper>
    </Content>
  );
};

export default SignUp;
