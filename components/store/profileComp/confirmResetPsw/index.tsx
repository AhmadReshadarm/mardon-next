import React, { useEffect, useState } from 'react';
import { handleResetClick } from './helpers';
import { useRouter } from 'next/router';
import { useAppDispatch } from 'redux/hooks';
import styles from '../styles/confirmResetPsw.module.css';
import Image from 'next/image';
import Link from 'next/link';
const ConfirmResetPsw = () => {
  const [psw, setPsw] = useState('');
  const [repeatPsw, setRepeatPsw] = useState('');

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [repeatPasswordVisible, setRepeatpasswordVisible] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isCapON, setIsCapON] = useState(false);
  useEffect(() => {
    document.addEventListener('keydown', function (event) {
      if (event.getModifierState('CapsLock')) {
        setIsCapON(true);
      } else {
        setIsCapON(false);
      }
    });
  }, []);

  const togglePasswordVisible = () => setPasswordVisible(!passwordVisible);
  const toggleRepeatPasswordVisible = () =>
    setRepeatpasswordVisible(!repeatPasswordVisible);
  return (
    <>
      <form
        onSubmit={(evt) => handleResetClick(evt, psw, router, dispatch)}
        className={styles.form_cart_wrapper}
      >
        <h2 className={styles.form_title}>Сбросить пароль</h2>
        <div className={styles.Auth_inputs_wrapper}>
          <label className={styles.form_label_wrapper} htmlFor="password">
            <b>
              <span className={styles.lable_title}>Пароль</span>
              <span className={styles.required}>*</span>
            </b>
          </label>
          <input
            placeholder="Пароль"
            type={passwordVisible ? 'text' : 'password'}
            id="password"
            value={psw}
            onChange={(e) => setPsw(e.target.value)}
            className={styles.input_feild}
          />
          <div className={styles.confidentialityIcon}>
            <span onClick={togglePasswordVisible} style={{ cursor: 'pointer' }}>
              {passwordVisible ? (
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
        {/*  --------------------------- */}
        <div className={styles.Auth_inputs_wrapper}>
          <label
            className={styles.form_label_wrapper}
            htmlFor="signup-password-repeat"
          >
            <b>
              <span className={styles.lable_title}>Повторите пароль</span>
              <span className={styles.required}>*</span>
            </b>
          </label>
          <input
            placeholder="Повторите пароль"
            type={repeatPasswordVisible ? 'text' : 'password'}
            id="signup-password-repeat"
            value={repeatPsw}
            onChange={(e) => setRepeatPsw(e.target.value)}
            className={styles.input_feild}
          />
          <div className={styles.confidentialityIcon}>
            <span
              onClick={toggleRepeatPasswordVisible}
              style={{ cursor: 'pointer' }}
            >
              {repeatPasswordVisible ? (
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
          style={{
            backgroundColor:
              psw.trim() !== '' && repeatPsw.trim() !== '' && psw === repeatPsw
                ? '#000000'
                : '#a0a0a0',
          }}
          disabled={
            psw.trim() !== '' && repeatPsw.trim() !== '' && psw === repeatPsw
              ? false
              : true
          }
          className={styles.submit_button}
        >
          Изменить пароль
        </button>
        <Link href="/help" className={styles.link}>
          <span>Что-то пошло не так? напишите нам</span>
        </Link>
      </form>
      <div
        className={styles.is_caps_lock_on}
        style={{ display: isCapON ? 'flex' : 'none' }}
      >
        <span className={styles.is_caps_lock_on_indecator} />
        <span>Caps Lock включена</span>
      </div>
    </>
  );
};

export default ConfirmResetPsw;
