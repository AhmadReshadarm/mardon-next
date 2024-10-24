import React, { useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import {
  Content,
  AuthInput,
  AuthInputsWrapper,
  FormWrapper,
  AuthorizationFormWrapper,
} from './common';
import { handleSignIn } from './helpers';
import Link from 'next/link';
import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import { useAppDispatch } from 'redux/hooks';
import { handleMenuStateRedux } from 'components/store/storeLayout/helpers';
import {
  changeAuthFormDisplayState,
  changeAuthFormState,
} from 'redux/slicers/store/globalUISlicer';
import { useAppSelector } from 'redux/hooks';
import { TGlobalUIState } from 'redux/types';
import { setOneClickBy } from 'redux/slicers/store/cartSlicer';
import { useRouter } from 'next/router';
type Props = {
  direction: number;
  authType: string;
};
const SignIn: React.FC<Props> = ({ direction, authType }) => {
  const dispatch = useAppDispatch();
  const [[email, password], setAuthPayload] = useState<[string, string]>([
    '',
    '',
  ]);

  const { isAuthFormOpen, authDisplay } = useAppSelector<TGlobalUIState>(
    (state) => state.globalUI,
  );
  const router = useRouter();
  return (
    <Content
      dragConstraints={{ left: 0, right: 0 }}
      custom={direction}
      variants={variants.authorizeSlideX}
      animate={authType == 'selection' ? 'center' : 'enter'}
    >
      <AuthorizationFormWrapper>
        <FormWrapper
          name="signin"
          onSubmit={handleSignIn({
            email,
            password,
            dispatch,
          })}
        >
          <span>Введите свой логин и пароль, чтобы войти</span>
          <div className="form-inputs-wrapper">
            <AuthInputsWrapper>
              <AuthInput
                placeholder="Введите Ваш логин"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => {
                  setAuthPayload([e.target.value.toLowerCase(), password]);
                }}
              />
            </AuthInputsWrapper>
            <AuthInputsWrapper>
              <AuthInput
                placeholder="Введите Ваш пароль"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setAuthPayload([email, e.target.value]);
                }}
              />
              <Link
                onClick={handleMenuStateRedux(
                  dispatch,
                  changeAuthFormState,
                  changeAuthFormDisplayState,
                  isAuthFormOpen,
                  authDisplay,
                )}
                href="/profile/pswreset"
                prefetch={false}
              >
                <span>Забыли пароль?</span>
              </Link>
              {isAuthFormOpen || router.pathname == '/profile' ? (
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
          </div>
          <div className="action-buttons-wrapper">
            <button
              type={'submit'}
              disabled={
                isEmpty(email) || isEmpty(password) || !isEmail(email)
                  ? true
                  : false
              }
              style={{
                backgroundColor:
                  isEmpty(email) || isEmpty(password) || !isEmail(email)
                    ? color.inactiveIcons
                    : color.buttonPrimary,
              }}
            >
              ВОЙТИ
            </button>
          </div>
        </FormWrapper>
      </AuthorizationFormWrapper>
    </Content>
  );
};

export default SignIn;
