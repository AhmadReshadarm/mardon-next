import { useMemo, useEffect, useState } from 'react';
import styles from 'components/store/profileComp/styles/profile.module.css';
import { handleEdit } from './helpers';
import { useAppSelector } from 'redux/hooks';
import { TAuthState } from 'redux/types';

const UserInfo = (props: any) => {
  const { userInfoRef, setActive, settingsRef } = props;
  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActive('profile');
      }),
    [],
  );

  useEffect(() => {
    observer.observe(userInfoRef.current);

    return () => {
      observer.disconnect();
    };
  }, [userInfoRef, observer]);
  const [ishovereName, setHovereName] = useState(false);
  const [isHoverEmai, setHoverEmai] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  const { user } = useAppSelector<TAuthState>((state) => state.auth);
  return (
    <div className={styles.user_data_container} id="userinfo" ref={userInfoRef}>
      <h2 className={styles.sectionHeader}>Личные данные</h2>
      {/* --------------------------- main ------------------------------ */}
      <div className={styles.user_data_info_wrapper}>
        {/* --------------- -------------- keys -------------------------*/}
        <div
          className={styles.user_data_keys_wrapper}
          onClick={() =>
            windowWidth < 1025 ? handleEdit(settingsRef, setActive) : ''
          }
        >
          <span
            onMouseEnter={() => setHovereName(true)}
            onMouseLeave={() => setHovereName(false)}
            className={`${styles.user_data_keys} ${
              ishovereName ? styles.user_data_keys_value_hover : ''
            }`}
            style={{ whiteSpace: 'nowrap' }}
          >
            Имя и фамилия
          </span>
          <span
            onMouseEnter={() => setHoverEmai(true)}
            onMouseLeave={() => setHoverEmai(false)}
            className={`${styles.user_data_keys} ${
              isHoverEmai ? styles.user_data_keys_value_hover : ''
            }`}
          >
            Почта
          </span>
        </div>
        {/* ----------------------------end of keys ----------------------------- */}
        {/* ---------------------------- values ------------------- */}
        <div
          className={styles.user_data_values_wrapper}
          onClick={() =>
            windowWidth < 1025 ? handleEdit(settingsRef, setActive) : ''
          }
        >
          <div
            onMouseEnter={() => setHovereName(true)}
            onMouseLeave={() => setHovereName(false)}
            className={`${styles.user_data_values} ${
              ishovereName ? styles.user_data_keys_value_hover : ''
            }`}
          >
            <span>
              {user?.firstName === '' && user.lastName === ''
                ? 'Аноним'
                : `${user?.firstName} ${user?.lastName}`}
            </span>
            <span
              className={styles.edit_data}
              style={{ display: !ishovereName ? 'none' : 'block' }}
              onClick={() => handleEdit(settingsRef, setActive)}
            >
              Изменить данные
            </span>
          </div>

          <div
            onMouseEnter={() => setHoverEmai(true)}
            onMouseLeave={() => setHoverEmai(false)}
            className={`${styles.user_data_values} ${
              isHoverEmai ? styles.user_data_keys_value_hover : ''
            }`}
          >
            <span>{user?.email}</span>
            <span
              className={styles.edit_data}
              style={{ display: !isHoverEmai ? 'none' : 'block' }}
              onClick={() => handleEdit(settingsRef, setActive)}
            >
              Изменить данные
            </span>
          </div>
        </div>
        {/* ----------------------end of values ------------ */}
      </div>
      {/* --------------------------- end of main ------------------------------ */}
    </div>
  );
};

export default UserInfo;
