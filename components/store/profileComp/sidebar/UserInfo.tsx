import { motion } from 'framer-motion';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { useState, useEffect, useRef } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { Role } from 'common/enums/roles.enum';
import { TAuthState } from 'redux/types';
import { useAppSelector } from 'redux/hooks';
import {
  sendVerificationToken,
  signout,
  updateUserById,
} from 'redux/slicers/authSlicer';
import Link from 'next/link';
import { devices } from 'components/store/lib/Devices';
import { AppDispatch } from 'redux/store';
import { clearSingleImage, createSigleImage } from 'redux/slicers/imagesSlicer';
import { openErrorNotification } from 'common/helpers';
import styles from '../styles/profile.module.css'; // NEW

const UserInfo = () => {
  const { user } = useAppSelector<TAuthState>((state) => state.auth);
  const [counter, setCoutner] = useState(30);
  const [iteration, setItration] = useState(0);
  const [counterStart, setCounterStart] = useState(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    setTimeout(() => {
      if (counter == 0) {
        setCoutner(30);
        setCounterStart(false);
        return;
      }
      if (counterStart) setCoutner(counter - 1);
    }, 1000);
  }, [counter, counterStart]);

  // _________________ image upload funtion __________________
  const imageList = useAppSelector<string>((state) => state.images.singleImage);
  const inputRef = useRef<any>(null);
  const [src, setSrc] = useState('');
  const handleUserImageUpload = async (
    event: any,
    setSrc: any,
    dispatch: AppDispatch,
  ) => {
    const fileObj = event.target.files;
    if (!fileObj[0] || fileObj[0].size > 1000000) {
      openErrorNotification('Размер файла более 1 МБ не допускается.');
      return;
    }

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };

    await dispatch(createSigleImage({ config, file: fileObj[0] }));
    setSrc(URL.createObjectURL(fileObj[0]));
  };

  const trigerImageUpload = (evt: any) => {
    evt.preventDefault();
    inputRef.current.click();
  };

  //  _______________________________
  return (
    <div className={styles.userInfoWrapper}>
      <div className={styles.user_data_wrapper}>
        <div className={styles.userProfileImage}>
          <img
            src={src !== '' ? src : `/api/images/${user?.image}`}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?radius=50&seed=${user?.firstName}`;
            }}
          />

          <input
            style={{ display: 'none' }}
            ref={inputRef}
            type="file"
            name="img"
            max={4}
            accept="image/png, image/gif, image/jpeg"
            onChange={(evt) => handleUserImageUpload(evt, setSrc, dispatch)}
          />
          <div
            onClick={(evt) => trigerImageUpload(evt)}
            className={styles.userImageChange}
          >
            Изменить
          </div>
        </div>

        <div className={styles.user_info_text_wrapper}>
          <h1 className={styles.userName}>
            {`${user?.firstName?.slice(0, 30)} ${user?.lastName?.slice(0, 30)}`}
            <span
              style={{ color: color.ok, fontSize: '0.7rem', fontWeight: 300 }}
            >
              {user?.role === Role.SuperUser ? 'премия' : ''}
            </span>
          </h1>
          <span className={styles.userEmail}>{user?.email}</span>
        </div>
      </div>
      {!user?.isVerified ? (
        <>
          <motion.span
            className={styles.errText}
            initial="init"
            animate="animate"
            variants={variants.fadInSlideUp}
          >
            Ваш аккаунт не подтвержден
          </motion.span>
          <button
            className={styles.actionButton}
            disabled={counterStart || iteration > 4 ? true : false}
            onClick={() => {
              dispatch(sendVerificationToken());
              setCounterStart(true);
              setItration(iteration + 1);
            }}
          >
            {counterStart
              ? `попробуй еще раз после: ${counter}`
              : iteration > 4
              ? 'Повторите попытку через 24 часа.'
              : 'Отправить мне подтверждение'}
          </button>
        </>
      ) : (
        ''
      )}
      {!imageList ? (
        ''
      ) : (
        <button
          className={styles.actionButton}
          onClick={() => {
            dispatch(
              updateUserById({ userId: user?.id!, user: { image: imageList } }),
            );
            dispatch(clearSingleImage());
          }}
        >
          Сохранить изображение
        </button>
      )}
      <div className={styles.action_bottun_wrapper}>
        <button
          className={styles.actionButton}
          onClick={() => dispatch(signout())}
        >
          Выйти
        </button>

        <Link href="/orders" className={styles.secondaryButton}>
          <span
            style={{ width: '20px', height: '20px', display: 'inline-block' }}
          >
            <svg
              fill="#1a1a1a"
              fillRule="evenodd"
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18.41 19.38"
            >
              <defs>
                <style></style>
              </defs>
              <path
                className="cls-1"
                d="M6.06,2.32c0-.41,.33-.73,.73-.73h4.93c.41,0,.73,.33,.73,.73v3.61H6.06V2.32Zm7.38,0v3.61h3.98l-.04,.53-.98,11.62-.04,.45H2.17l-.04-.45L1.15,6.46l-.04-.53h3.98V2.32c0-.95,.77-1.71,1.71-1.71h4.93c.95,0,1.71,.77,1.71,1.71ZM3.07,17.55l-.9-10.64h14.19l-.9,10.64H3.07Zm2.53-7.25h7.36v-.92H5.6v.92Z"
              />
            </svg>
          </span>
          <span>Мои заказы</span>
        </Link>
      </div>
    </div>
  );
};

export default UserInfo;
