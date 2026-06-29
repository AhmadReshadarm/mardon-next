import { useRef, useState } from 'react';
import SideBar from './sidebar';
import UserInfo from './userInfo';
import Reveiws from './reveiws';
import Changepsw from './changepsw';
import Settings from './settings';
import { useAppSelector } from 'redux/hooks';
import { TAuthState } from 'redux/types';
import { UsePagination } from '../storeLayout/utils/HeaderAuth/authorize/helpers';
import Authorization from '../storeLayout/utils/HeaderAuth/authorize';
import styles from './styles/profile.module.css'; // NEW

const ProfileComp = (props: any) => {
  const { setActive } = props;
  const { user } = useAppSelector<TAuthState>((state) => state.auth);

  const [direction, authType, paginate] = UsePagination();
  const userInfoRef = useRef(null);
  const reveiwsRef = useRef<any>(null);
  const changePswRef = useRef(null);
  const settingsRef = useRef(null);
  const [isChangePassword, setIsChangePassword] = useState(false);

  return (
    <>
      {!user ? (
        <div className={styles.authContainer}>
          <div className={styles.authWrapper}>
            <div className={styles.authContent}>
              <Authorization
                direction={direction}
                authType={authType}
                paginate={paginate}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.profileContainer}>
          <div className={styles.sidebarWrapper}>
            <SideBar
              userInfoRef={userInfoRef}
              reveiwsRef={reveiwsRef}
              changePswRef={changePswRef}
              settingsRef={settingsRef}
              {...props}
            />
          </div>
          <div className={styles.mainWrapper}>
            <UserInfo
              settingsRef={settingsRef}
              userInfoRef={userInfoRef}
              setActive={setActive}
              user={user}
              {...props}
            />
            <Reveiws {...props} reveiwsRef={reveiwsRef} />
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
              <Changepsw
                {...props}
                setIsChangePassword={setIsChangePassword}
                changePswRef={changePswRef}
                user={user}
              />
            </div>

            <Settings {...props} settingsRef={settingsRef} user={user} />
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileComp;
