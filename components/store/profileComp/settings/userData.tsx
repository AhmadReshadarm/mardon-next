import { motion } from 'framer-motion';
import React, { useState } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';

import styles from '../styles/profile.module.css'; // NEW
import { InputsTooltip } from './helpers';
import { handleDataChange } from './helpers';
import { useAppDispatch } from 'redux/hooks';

const UserData = (props: any) => {
  const { isOpen, setOpen, user } = props;
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [serverResponse, setServerResponse] = useState(undefined);

  const [
    [firstNameInput, lastNameInput, phoneNumberInput, addressInput],
    setInputsErr,
  ] = useState([false, false, false, false]);
  const [success, setSuccess] = useState(false);
  const payload = {
    firstName,
    lastName,
  };
  const dispatch = useAppDispatch();

  return (
    <div
      className={styles.popupContainer}
      style={{ display: isOpen ? 'flex' : 'none' }}
    >
      <form className={styles.userDataContainer}>
        <span onClick={() => setOpen(false)} className={styles.closeBtn}>
          <svg
            width="15"
            height="15"
            viewBox="0 0 21 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="1"
              y1="-1"
              x2="26.3541"
              y2="-1"
              transform="matrix(0.683484 -0.729965 0.681649 0.731679 1.52267 21.0312)"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="1"
              y1="-1"
              x2="26.3044"
              y2="-1"
              transform="matrix(0.680786 0.732483 -0.684345 0.729158 0.21875 1.03125)"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)' }}>
          Личные данные
        </h2>
        <div className={styles.inputGrid}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              <b>
                <span>Имя</span>
                <span className={styles.requiredStar}>*</span>
              </b>
              <InputsTooltip
                enterTouchDelay={0}
                leaveTouchDelay={5000}
                key="firstname-tip"
                title={
                  <React.Fragment>
                    <span>Это поле обязательно к заполнению</span>
                  </React.Fragment>
                }
              >
                <span className={styles.tooltipHelp}>?</span>
              </InputsTooltip>
            </label>
            <input
              className={styles.inputField}
              placeholder={firstNameInput ? 'не может быть пустым' : 'Имя'}
              type="text"
              id="user-firstname"
              value={firstName}
              style={{
                border: `solid 1px ${
                  isEmpty(firstName) && firstNameInput
                    ? '#b33c3c'
                    : 'var(--border-light)'
                }`,
              }}
              onChange={(e) => {
                setFirstName(e.target.value);
                setInputsErr([
                  true,
                  lastNameInput,
                  phoneNumberInput,
                  addressInput,
                ]);
              }}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              <b>
                <span>Фамилия</span>
                <span className={styles.requiredStar}>*</span>
              </b>
              <InputsTooltip
                enterTouchDelay={0}
                leaveTouchDelay={5000}
                key="lastname-tip"
                title={
                  <React.Fragment>
                    <span>Это поле обязательно к заполнению</span>
                  </React.Fragment>
                }
              >
                <span className={styles.tooltipHelp}>?</span>
              </InputsTooltip>
            </label>
            <input
              className={styles.inputField}
              placeholder={firstNameInput ? 'не может быть пустым' : 'Фамилия'}
              type="text"
              id="user-familyname"
              value={lastName}
              style={{
                border: `solid 1px ${
                  isEmpty(lastName) && lastNameInput
                    ? '#b33c3c'
                    : 'var(--border-light)'
                }`,
              }}
              onChange={(e) => {
                setLastName(e.target.value);
                setInputsErr([
                  firstNameInput,
                  true,
                  phoneNumberInput,
                  addressInput,
                ]);
              }}
            />
          </div>
        </div>
        <button
          className={styles.actionButton}
          style={{
            backgroundColor:
              isEmpty(firstName) || isEmpty(lastName)
                ? 'var(--border-light)'
                : 'var(--primary-black)',
            width: '100%',
            marginTop: '10px',
          }}
          disabled={isEmpty(firstName) || isEmpty(lastName) ? true : false}
          onClick={(e) => {
            e.preventDefault();
            handleDataChange({ user, payload, setServerResponse, dispatch });
            setOpen(false);
            setSuccess(serverResponse == 200 ? true : false);
            setTimeout(() => {
              setSuccess(false);
            }, 800);
          }}
        >
          Сохранить изменения
        </button>
      </form>
    </div>
  );
};

export default UserData;
