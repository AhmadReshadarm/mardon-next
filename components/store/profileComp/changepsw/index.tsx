import isEmpty from 'validator/lib/isEmpty';
import color from 'components/store/lib/ui.colors';
import React, { useState, useMemo, useEffect } from 'react';
import { InputsTooltip, handleChangePsw } from './helpers';
import styles from '../styles/profile.module.css';
import Image from 'next/image';

const Changepsw = (props: any) => {
  const {
    user,
    setActive,
    changePswRef,
    isChangePassword,
    setIsChangePassword,
  } = props;
  const [isCap, setCap] = useState(false);
  const [psw, setPsw] = useState('');
  const [oldPsw, setOldPsw] = useState('');
  const [repeatPsw, setRepeatPsw] = useState('');

  // Password visibility states
  const [oldPswVisible, setOldPswVisible] = useState(false);
  const [newPswVisible, setNewPswVisible] = useState(false);
  const [repeatPswVisible, setRepeatPswVisible] = useState(false);

  // Validation error flags
  const [[oldPswInput, pswInput, repeatPswInput], setInputsErr] = useState([
    false,
    false,
    false,
  ]);

  const payload = {
    user,
    psw,
    repeatPsw,
    oldPassword: oldPsw,
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

  // Toggle password visibility helpers
  const toggleOldPsw = () => setOldPswVisible(!oldPswVisible);
  const toggleNewPsw = () => setNewPswVisible(!newPswVisible);
  const toggleRepeatPsw = () => setRepeatPswVisible(!repeatPswVisible);

  return (
    <div className={styles.password_section_wrapper} ref={changePswRef}>
      <button
        className={styles.secondaryButton}
        onClick={() => setIsChangePassword(true)}
      >
        Изменить пароль
      </button>

      <div
        className={styles.popupContainer}
        style={{ display: isChangePassword ? 'flex' : 'none' }}
      >
        <div className={styles.userDataContainer} id="changepsw">
          <span
            className={styles.closeBtn}
            style={{ cursor: 'default' }}
            onClick={() => {
              props.setIsChangePassword(false);
            }}
          >
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
            Изменить пароль
          </h2>

          <div
            className={styles.is_caps_lock_on}
            style={{ display: isCap ? 'flex' : 'none' }}
          >
            <span className={styles.is_caps_lock_on_indecator} />
            <span>Caps Lock включена</span>
          </div>

          <form className={styles.inputGrid}>
            {/* Old Password */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                <b>
                  <span>Старый пароль</span>
                  <span className={styles.requiredStar}>*</span>
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
                  <span className={styles.tooltipHelp}>?</span>
                </InputsTooltip>
              </label>
              <input
                className={styles.inputField}
                placeholder={
                  isEmpty(oldPsw) && oldPswInput
                    ? 'не может быть пустым'
                    : 'Старый пароль'
                }
                type={oldPswVisible ? 'text' : 'password'}
                id="old-psw"
                value={oldPsw}
                style={{
                  border: `solid 1px ${
                    isEmpty(oldPsw) && oldPswInput
                      ? '#b33c3c'
                      : 'var(--border-light)'
                  }`,
                }}
                onChange={(e) => {
                  setOldPsw(e.target.value);
                  setInputsErr([true, pswInput, repeatPswInput]);
                }}
                onKeyUp={(e) =>
                  setCap(e.getModifierState('CapsLock') ? true : false)
                }
              />
              <div className={styles.confidentialityIcon}>
                <span onClick={toggleOldPsw} style={{ cursor: 'pointer' }}>
                  {oldPswVisible ? (
                    '👁️'
                  ) : (
                    <Image
                      src="/icons/peaking.gif"
                      width={20}
                      height={20}
                      alt="peaking emoji"
                    />
                  )}
                </span>
              </div>
            </div>

            {/* New Password */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                <b>
                  <span>Новый пароль</span>
                  <span className={styles.requiredStar}>*</span>
                </b>
                <InputsTooltip
                  enterTouchDelay={0}
                  leaveTouchDelay={5000}
                  key="psw-tip"
                  title={
                    <React.Fragment>
                      <span>Это поле обязательно к заполнению</span>
                      <span>
                        Используйте буквенно-цифровые английские символы
                      </span>
                      <span style={{ color: color.hover }}>
                        Минимум 8 символов
                      </span>
                    </React.Fragment>
                  }
                >
                  <span className={styles.tooltipHelp}>?</span>
                </InputsTooltip>
              </label>
              <input
                className={styles.inputField}
                placeholder={
                  isEmpty(psw) && pswInput
                    ? 'Пароль не может быть пустым'
                    : 'Пароль'
                }
                type={newPswVisible ? 'text' : 'password'}
                id="new-psw"
                value={psw}
                style={{
                  border: `solid 1px ${
                    isEmpty(psw) && pswInput ? '#b33c3c' : 'var(--border-light)'
                  }`,
                }}
                onChange={(e) => {
                  setPsw(e.target.value);
                  setInputsErr([oldPswInput, true, repeatPswInput]);
                }}
                onKeyUp={(e) =>
                  setCap(e.getModifierState('CapsLock') ? true : false)
                }
              />
              <div className={styles.confidentialityIcon}>
                <span onClick={toggleNewPsw} style={{ cursor: 'pointer' }}>
                  {newPswVisible ? (
                    '👁️'
                  ) : (
                    <Image
                      src="/icons/peaking.gif"
                      width={20}
                      height={20}
                      alt="peaking emoji"
                    />
                  )}
                </span>
              </div>
            </div>

            {/* Repeat Password */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                <b>
                  <span>Повторите новый пароль</span>
                  <span className={styles.requiredStar}>*</span>
                </b>
                <InputsTooltip
                  enterTouchDelay={0}
                  leaveTouchDelay={5000}
                  key="psw-repeat-tip"
                  title={
                    <React.Fragment>
                      <span>Это поле обязательно к заполнению</span>
                      <span style={{ color: color.hover }}>
                        Повторите тот же пароль
                      </span>
                    </React.Fragment>
                  }
                >
                  <span className={styles.tooltipHelp}>?</span>
                </InputsTooltip>
              </label>
              <input
                className={styles.inputField}
                placeholder={
                  isEmpty(repeatPsw) && repeatPswInput
                    ? 'Пароль не может быть пустым'
                    : 'Повторите пароль'
                }
                type={repeatPswVisible ? 'text' : 'password'}
                id="repeat-psw"
                value={repeatPsw}
                style={{
                  border: `solid 1px ${
                    isEmpty(repeatPsw) && repeatPswInput
                      ? '#b33c3c'
                      : 'var(--border-light)'
                  }`,
                }}
                onChange={(e) => {
                  setRepeatPsw(e.target.value);
                  setInputsErr([oldPswInput, pswInput, true]);
                }}
                onKeyUp={(e) =>
                  setCap(e.getModifierState('CapsLock') ? true : false)
                }
              />
              <div className={styles.confidentialityIcon}>
                <span onClick={toggleRepeatPsw} style={{ cursor: 'pointer' }}>
                  {repeatPswVisible ? (
                    '👁️'
                  ) : (
                    <Image
                      src="/icons/peaking.gif"
                      width={20}
                      height={20}
                      alt="peaking emoji"
                    />
                  )}
                </span>
              </div>
            </div>

            <button
              className={styles.actionButton}
              style={{
                backgroundColor:
                  isEmpty(oldPsw) || isEmpty(psw) || isEmpty(repeatPsw)
                    ? 'var(--border-light)'
                    : 'var(--primary-black)',
                width: '100%',
                marginTop: '10px',
                color:
                  isEmpty(oldPsw) || isEmpty(psw) || isEmpty(repeatPsw)
                    ? 'var(--primary-black)'
                    : 'var(--bg-light)',
              }}
              disabled={isEmpty(oldPsw) || isEmpty(psw) || isEmpty(repeatPsw)}
              onClick={(e) => {
                e.preventDefault();
                handleChangePsw(payload);
              }}
            >
              Сохранить изменения
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Changepsw;
