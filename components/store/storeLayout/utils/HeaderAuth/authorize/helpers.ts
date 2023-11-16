import { Dispatch, SetStateAction, useState } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import { paginateTo } from 'components/store/checkout/constant';
import { AppDispatch } from 'redux/store';
import {
  clearServerErr,
  signout,
  signup,
  userSignin,
} from 'redux/slicers/authSlicer';
import { PopupDisplay } from '../../../constants';

const UsePagination = (): [
  number,
  string,
  (newDirection: number, newType: any) => void,
] => {
  const [direction, setPage]: [number, any] = useState(0);
  const [authType, setAuthType]: [any, any] = useState('selection');

  const paginate = (newDirection: number, newType: any) => {
    setPage(newDirection);
    setAuthType(newType);
  };

  return [direction, authType, paginate];
};

const handleBack = (paginate, emailErr, pswErr, dispatch: AppDispatch) => {
  paginate(paginateTo.back, 'selection');
  emailErr(false);
  pswErr(false);
  dispatch(clearServerErr());
};

const handleSignIn =
  ({
    email,
    password,
    dispatch,
    onAfterAuthorized,
  }: {
    email: string;
    password: string;
    dispatch: AppDispatch;
    onAfterAuthorized?: () => void;
  }) =>
  async (e) => {
    e.preventDefault();
    if (isEmail(email) && !isEmpty(password)) {
      const payload = {
        email,
        password,
      };

      const resp: any = await dispatch(userSignin(payload));

      if (!resp.error) {
        if (onAfterAuthorized) {
          onAfterAuthorized();
        }
      }
    }
  };

const handleLogout =
  (
    dispatch: AppDispatch,
    setDisplay: Dispatch<SetStateAction<PopupDisplay>>,
    setIsOpened: Dispatch<SetStateAction<boolean>>,
  ) =>
  () => {
    setIsOpened((prev) => !prev);
    setTimeout(() => {
      setDisplay((prev) =>
        prev === PopupDisplay.None ? PopupDisplay.Flex : PopupDisplay.None,
      );
    });
    dispatch(signout());
  };

const handleSignUp =
  (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    isSubscribed: boolean,
    paginate: any,
    dispatch: AppDispatch,
  ) =>
  async (e) => {
    e.preventDefault();
    if (isEmail(email)) {
      const payload = {
        firstName,
        lastName,
        email,
        password,
        isSubscribed,
      };
      const resp: any = await dispatch(signup(payload));

      if (!resp.error) {
        paginate(paginateTo.back, 'signin');

        return;
      }

      paginate(paginateTo.back, 'signup');
    }
  };

const handleEmailChange =
  (
    nameInput: boolean,
    lastNameInput: boolean,
    setEmail: Dispatch<SetStateAction<string>>,
    setInputsErr: Dispatch<SetStateAction<[boolean, boolean, boolean]>>,
    dispatch: AppDispatch,
  ) =>
  (e) => {
    setEmail(e.target.value.toLowerCase());
    dispatch(clearServerErr());
    setInputsErr([
      nameInput ? true : false,
      lastNameInput ? true : false,
      true,
    ]);
  };

const handleFirstNameChange =
  (
    lastNameInput: boolean,
    emailInput: boolean,
    setName: Dispatch<SetStateAction<string>>,
    setInputsErr: Dispatch<SetStateAction<[boolean, boolean, boolean]>>,
  ) =>
  (e) => {
    setName(e.target.value);
    setInputsErr([
      true,
      lastNameInput ? true : false,
      emailInput ? true : false,
    ]);
  };

const handleLastNameChange =
  (
    nameInput: boolean,
    emailInput: boolean,
    setlastName: Dispatch<SetStateAction<string>>,
    setInputsErr: Dispatch<SetStateAction<[boolean, boolean, boolean]>>,
  ) =>
  (e) => {
    setlastName(e.target.value);
    setInputsErr([nameInput ? true : false, true, emailInput ? true : false]);
  };

export {
  UsePagination,
  handleBack,
  handleSignIn,
  handleSignUp,
  handleLogout,
  handleEmailChange,
  handleFirstNameChange,
  handleLastNameChange,
};
