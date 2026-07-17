import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import isEmpty from 'validator/lib/isEmpty';
import { useRouter } from 'next/router';
import { useAppDispatch } from 'redux/hooks';
import { openErrorNotification } from 'common/helpers';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import { InputsTooltip } from 'components/store/checkout/helpers';
import { handleResetClick } from './helpers';
import styles from 'components/store/profileComp/styles/resetPassword.module.css';

const ConfirmResetPsw = () => {
  const [psw, setPsw] = useState('');
  const [repeatPsw, setRepeatPsw] = useState('');
  const [pswErr, setPswErr] = useState(false);
  const [repeatErr, setRepeatErr] = useState(false);
  const [isCap, setCap] = useState(false);
  const [oldPswVisible, setOldPswVisible] = useState(false);
  const [newPswVisible, setNewPswVisible] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isCap) openErrorNotification('Включен Капс лок (Caps Lock on)');
    if (!isCap) openSuccessNotification('Капс лок выключен (Caps Lock off)');
  }, [isCap]);

  const isFormValid = !isEmpty(psw) && !isEmpty(repeatPsw) && psw === repeatPsw;

  return (
    <div className={styles.content}>
      <h2 className={styles.title}>Сбросить пароль</h2>
      <span className={styles.subtitle}>
        Введите новый пароль для вашей учетной записи
      </span>

      <form className={styles.form}>
        {/* CAPS LOCK WARNING (Same as Changepsw) */}
        <div
          className={styles.is_caps_lock_on}
          style={{
            display: isCap ? 'flex' : 'none',
            position: 'relative',
            top: '-10px',
            right: '0',
          }}
        >
          <span className={styles.is_caps_lock_on_indecator} />
          <span>Caps Lock включена</span>
        </div>

        {/* New Password Input */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="new-psw">
            <b>
              <span>Пароль</span>
              <span className={styles.requiredStar}>*</span>
            </b>
            <InputsTooltip
              enterTouchDelay={0}
              leaveTouchDelay={5000}
              key="psw-tip"
              title={<span>Это поле обязательно к заполнению</span>}
            >
              <span className={styles.tooltipHelp}>?</span>
            </InputsTooltip>
          </label>

          <input
            className={styles.inputField}
            placeholder={
              pswErr ? 'Пароль не может быть пустым' : 'Новый пароль'
            }
            type={newPswVisible ? 'text' : 'password'}
            id="new-psw"
            value={psw}
            style={{
              border: `solid 1px ${pswErr ? '#b33c3c' : 'var(--border-light)'}`,
            }}
            onChange={(e) => {
              setPsw(e.target.value);
              setPswErr(isEmpty(e.target.value));
            }}
            onKeyUp={(e) =>
              setCap(e.getModifierState('CapsLock') ? true : false)
            }
          />

          {/* Fix: Absolutely positioned eye icon */}
          <div className={styles.confidentialityIcon}>
            <span
              onClick={() => setNewPswVisible(!newPswVisible)}
              style={{ cursor: 'pointer' }}
            >
              {newPswVisible ? (
                '👁️'
              ) : (
                <Image
                  src="/icons/peaking.gif"
                  width={20}
                  height={20}
                  alt="peaking emoji"
                  unoptimized
                />
              )}
            </span>
          </div>
        </div>

        {/* Repeat Password Input */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="repeat-psw">
            <b>
              <span>Повторите пароль</span>
              <span className={styles.requiredStar}>*</span>
            </b>
            <InputsTooltip
              enterTouchDelay={0}
              leaveTouchDelay={5000}
              key="rpeat-psw-tip"
              title={
                <React.Fragment>
                  <span>Это поле обязательно к заполнению</span>
                  <span style={{ color: 'var(--hover)' }}>
                    повторите тот же пароль сверху
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
              repeatErr ? 'Пароль не может быть пустым' : 'Повторите пароль'
            }
            type={oldPswVisible ? 'text' : 'password'}
            id="repeat-psw"
            value={repeatPsw}
            style={{
              border: `solid 1px ${
                repeatErr ? '#b33c3c' : 'var(--border-light)'
              }`,
            }}
            onChange={(e) => {
              setRepeatPsw(e.target.value);
              setRepeatErr(isEmpty(e.target.value));
            }}
            onKeyUp={(e) =>
              setCap(e.getModifierState('CapsLock') ? true : false)
            }
          />

          {/* Fix: Absolutely positioned eye icon */}
          <div className={styles.confidentialityIcon}>
            <span
              onClick={() => setOldPswVisible(!oldPswVisible)}
              style={{ cursor: 'pointer' }}
            >
              {oldPswVisible ? (
                '👁️'
              ) : (
                <Image
                  src="/icons/peaking.gif"
                  width={20}
                  height={20}
                  alt="peaking emoji"
                  unoptimized
                />
              )}
            </span>
          </div>
        </div>

        {/* Submit Button (Styled exactly as in Changepsw) */}
        <button
          className={styles.actionButton}
          style={{
            backgroundColor: isFormValid
              ? 'var(--primary-black)'
              : 'var(--border-light)',
            width: '100%',
            marginTop: '15px',
            color: isFormValid ? 'var(--bg-light)' : 'var(--primary-black)',
          }}
          disabled={!isFormValid}
          onClick={(e) => {
            e.preventDefault();
            handleResetClick(psw, router, dispatch);
          }}
        >
          Изменить пароль
        </button>
      </form>
    </div>
  );
};

export default ConfirmResetPsw;
