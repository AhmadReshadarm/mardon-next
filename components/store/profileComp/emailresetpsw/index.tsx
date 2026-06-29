import styles from 'components/store//profileComp/styles/resetPassword.module.css';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import { useEffect, useState } from 'react';
import { handleResetClick } from './helpers';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

const EmailResetPsw = () => {
  const [email, setEmail] = useState('');
  const [inputErr, setInputErr] = useState(false);
  const [counter, setCoutner] = useState(30);
  const [counterStart, setCounterStart] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      router.push('/');
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (counter == 0) {
        setCoutner(30);
        setCounterStart(false);
        return;
      }
      if (counterStart) setCoutner(counter - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [counter, counterStart]);

  return (
    <>
      <h2 className={styles.title}>Сброс пароля</h2>
      <span className={styles.subtitle}>
        Мы отправим вам письмо на ваш адрес электронной почты для сброса пароля
      </span>
      <form className={styles.form}>
        <div className={styles.inputWrapper}>
          <input
            type="email"
            value={email}
            placeholder={
              (isEmpty(email) || !isEmail(email)) && inputErr
                ? 'Эл. адрес не может быть пустым'
                : 'Эл. адрес'
            }
            className={styles.input}
            onChange={(e) => {
              setEmail(e.target.value);
              setInputErr(true);
            }}
          />
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleResetClick(email, dispatch);
            setCounterStart(true);
          }}
          className={styles.button}
          disabled={
            isEmpty(email) || !isEmail(email) || counterStart ? true : false
          }
        >
          <span>
            {counterStart
              ? `Повторите после: ${counter}`
              : 'Отправь мне ссылку'}
          </span>
        </button>
        <Link href="/help" className={styles.link}>
          <span>Что-то пошло не так? напишите нам</span>
        </Link>
      </form>
    </>
  );
};

export default EmailResetPsw;
