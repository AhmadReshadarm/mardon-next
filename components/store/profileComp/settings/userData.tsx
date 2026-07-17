import React, { useState } from 'react';
import styles from '../styles/profile.module.css'; // NEW
import { handleDataChange } from './helpers';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TAuthState } from 'redux/types';

const UserData = (props: any) => {
  const { isOpen, setOpen } = props;
  const { user } = useAppSelector<TAuthState>((state) => state.auth);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);

  const payload = {
    firstName: firstName,
    lastName: lastName,
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
              </b>
            </label>
            <input
              className={styles.inputField}
              placeholder="Имя"
              type="text"
              id="user-firstname"
              value={firstName}
              style={{
                border: 'solid 1px var(--border-light)',
              }}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              <b>
                <span>Фамилия</span>
              </b>
            </label>
            <input
              className={styles.inputField}
              placeholder="Фамилия"
              type="text"
              id="user-familyname"
              value={lastName}
              style={{
                border: 'solid 1px var(--border-light)',
              }}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <button
          className={styles.actionButton}
          style={{
            backgroundColor: 'var(--primary-black)',
            width: '100%',
            marginTop: '10px',
          }}
          onClick={(e) => {
            e.preventDefault();
            handleDataChange({ user, payload, dispatch });
            setOpen(false);
          }}
        >
          Сохранить изменения
        </button>
      </form>
    </div>
  );
};

export default UserData;
