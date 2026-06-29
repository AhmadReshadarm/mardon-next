// components/store/profileComp/settings/Notification.tsx
// REMOVED: import styled from 'styled-components';
import { motion } from 'framer-motion';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { devices } from 'components/store/lib/Devices';
import { useEffect, useState } from 'react';
import { handleEmailChange } from './helpers';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TSubscribers } from 'redux/types';
import {
  createSubscriber,
  deleteSubscriber,
  fetchSubscriberByEmail,
} from 'redux/slicers/subscriberSlicer';
import { User } from 'swagger/services';
import Loading from 'ui-kit/Loading';
import styles from '../styles/profile.module.css'; // NEW

type Props = {
  user: User;
};

const Notifactions: React.FC<Props> = ({ user }) => {
  const [editNotify, setEditNotify] = useState(false);
  const [email, setEmail] = useState(user.email);
  const { Subscriber, loading } = useAppSelector<TSubscribers>(
    (state) => state.subscribers,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchSubscriberByEmail(user.email as string));
  }, []);
  const handleSubscribtion = (name: string, email: string) => {
    if (Subscriber) {
      dispatch(deleteSubscriber(user.email as string));
      return;
    }
    if (!Subscriber) {
      dispatch(createSubscriber({ name, email }));
      return;
    }
  };
  return (
    <div className={styles.notificationWrapper}>
      <div className={styles.mailIcon}>
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_317_1705)">
            <path
              d="M20 4.5H4C2.9 4.5 2.01 5.4 2.01 6.5L2 18.5C2 19.6 2.9 20.5 4 20.5H20C21.1 20.5 22 19.6 22 18.5V6.5C22 5.4 21.1 4.5 20 4.5ZM20 18.5H4V8.5L12 13.5L20 8.5V18.5ZM12 11.5L4 6.5H20L12 11.5Z"
              fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_317_1705">
              <rect
                width="24"
                height="24"
                fill="white"
                transform="translate(0 0.5)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className={styles.notificationContent}>
        <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>
          Уведомления
        </h3>
        <span style={{ color: color.hover, fontSize: '0.9rem' }}>
          Изменив почта, вам также нужно будет подтвердить свой адрес
          электронной почты.
        </span>
        <div className={styles.notifyRow}>
          <span style={{ color: color.textSecondary, minWidth: '140px' }}>
            Получать на адрес
          </span>
          {editNotify ? (
            <div className={styles.notifyEmailWrapper}>
              <motion.input
                whileHover="hover"
                whileTap="tap"
                variants={variants.boxShadow}
                type="text"
                className={styles.inputField}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className={styles.secondaryButton}
                style={{
                  backgroundColor:
                    isEmpty(email) || !isEmail(email)
                      ? color.bgProduct
                      : color.btnSecondery,
                }}
                disabled={isEmpty(email) || !isEmail(email) ? true : false}
                onClick={() => {
                  setEditNotify(false);
                  handleEmailChange({ user, email });
                }}
              >
                Сохранить
              </button>
              <button
                className={styles.outlineButton}
                onClick={() => setEditNotify(false)}
              >
                Отмена
              </button>
            </div>
          ) : (
            <div className={styles.notifyEmailWrapper}>
              <motion.span style={{ fontSize: '1rem' }}>{email}</motion.span>
              <button
                className={styles.outlineButton}
                onClick={() => setEditNotify(true)}
              >
                Изменить
              </button>
            </div>
          )}
        </div>

        {!loading ? (
          <div
            onClick={() => handleSubscribtion(user.firstName!, user.email!)}
            className={styles.checkboxWrapper}
          >
            <input
              type="checkbox"
              id="review-notify"
              title="Подпишитесь на рассылку новостей"
              checked={Subscriber ? true : false}
              readOnly
            />
            <span>
              {!Subscriber
                ? 'Подпишитесь на рассылку новостей'
                : 'Вы подписаны на нашу рассылку'}
            </span>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default Notifactions;
