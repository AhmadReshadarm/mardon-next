import KeyValue from './KeyValue';
import { useMemo, useEffect } from 'react';
import styles from 'components/store/profileComp/styles/profile.module.css';

const UserInfo = (props: any) => {
  const { userInfoRef, setActive, user } = props;
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
  return (
    <div className={styles.user_data_container} id="userinfo" ref={userInfoRef}>
      <h2 className={styles.sectionHeader}>Личные данные</h2>
      <div className={styles.user_data_info_wrapper}>
        <KeyValue
          {...props}
          delay={0.05}
          keyData="Имя и фамилия"
          valueData={`${user.firstName} ${user.lastName}`}
        />
        <KeyValue
          {...props}
          delay={0.2}
          keyData="Почта"
          valueData={user.email}
        />
      </div>
    </div>
  );
};

export default UserInfo;
