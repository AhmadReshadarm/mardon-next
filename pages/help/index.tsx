import StoreLayout from 'components/store/storeLayout/layouts';
import Head from 'next/head';
import { useAppDispatch } from 'redux/hooks';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import { useState } from 'react';
import { userHelpDisk } from 'redux/slicers/authSlicer';
import { useRouter } from 'next/router';
import { openErrorNotification } from 'common/helpers';
import { baseUrl } from 'common/constant';
import styles from 'components/store/help/styles/help.module.css';

const Help = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Помощь | NBHOZ</title>
        <meta
          property="og:image"
          name="og:image"
          content={`${baseUrl}/static/logo_800x800.png`}
        />
      </Head>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <span className={styles.title}>ЗАПОЛНЕНИЕ ЗАЯВКИ</span>
            <div className={styles.input_wrapper}>
              <div className={styles.input_label_wrapper}>
                <label htmlFor="email">Эл. адрес</label>
                <input
                  type="text"
                  name="email"
                  placeholder={
                    isEmpty(email) || !isEmail(email)
                      ? 'Эл. адрес не может быть пустым'
                      : 'Эл. адрес'
                  }
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className={styles.inputs_wrapper}
                />
              </div>
              <div className={styles.input_label_wrapper}>
                <textarea
                  name="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className={`${styles.inputs_wrapper} ${styles.text_area_wrapper}`}
                  placeholder="Расскажите нам, что пошло не так"
                />
              </div>
              <button
                onClick={() => {
                  if (isEmpty(email) || !isEmail(email)) {
                    openErrorNotification(
                      'Пожалуйста, укажите адрес электронной почты',
                    );
                    return;
                  }
                  if (isEmpty(text)) {
                    openErrorNotification(
                      'Пожалуйста, расскажите нам, что пошло не так.',
                    );
                    return;
                  }
                  dispatch(userHelpDisk({ email, text }));
                  router.push('/profile');
                }}
                className={styles.action_button}
              >
                <span>ОТПРАВИТЬ ЗАЯВКУ</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Help.PageLayout = StoreLayout;

export default Help;
