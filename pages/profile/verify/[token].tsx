import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TAuthState } from 'redux/types';
import { verifyUserEmailByToken } from 'redux/slicers/authSlicer';
import StoreLayout from 'components/store/storeLayout/layouts';
import { baseUrl } from 'common/constant';
import styles from './VerifyAccount.module.css';

const VerifyAccount = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, serverErr, user } = useAppSelector<TAuthState>(
    (state) => state.auth,
  );

  const [result, setResult] = useState<'loading' | 'success' | 'error'>(
    'loading',
  );
  const [errorMessage, setErrorMessage] = useState('');
  const dispatched = useRef(false);

  useEffect(() => {
    if (!router.isReady) return;
    const token = router.asPath.split('/').pop();
    if (!token || dispatched.current) return;
    dispatched.current = true;
    dispatch(verifyUserEmailByToken(token));
  }, [router.isReady, dispatch, router.asPath]);

  useEffect(() => {
    if (loading) return; // still waiting for response

    // Success: user was set (truthy) and no server error
    if (user && !serverErr) {
      setResult('success');
      return;
    }

    // Explicit error from server
    if (serverErr) {
      setResult('error');
      const messages: Record<number, string> = {
        400: 'Требуется токен',
        401: 'Недействительный или просроченный токен',
        403: 'Срок действия ссылки истёк или она уже была использована.',
        404: 'Неверная ссылка подтверждения.',
        409: 'Адрес электронной почты уже подтверждён.',
        500: 'Внутренняя ошибка сервера. Попробуйте позже.',
      };
      setErrorMessage(
        messages[serverErr as number] ||
          'Произошла неизвестная ошибка. Пожалуйста, запросите новую ссылку.',
      );
      return;
    }

    // Fallback: request finished but neither user nor serverErr is set
    setResult('error');
    setErrorMessage('Произошла непредвиденная ошибка. Попробуйте позже.');
  }, [loading, user, serverErr]);

  return (
    <>
      <Head>
        <title>Подтверждение Email | NBHOZ</title>
        <meta
          property="og:image"
          content={`${baseUrl}/static/logo_800x800.png`}
        />
      </Head>

      <div className={styles.page}>
        <div className={styles.card}>
          {result === 'loading' && (
            <div className={styles.state}>
              <div className={styles.spinner} />
              <h2>Пожалуйста, подождите</h2>
              <p>Мы проверяем вашу ссылку подтверждения…</p>
            </div>
          )}

          {result === 'success' && (
            <div className={styles.state}>
              <div className={styles.checkmark}>✓</div>
              <h2>Email успешно подтверждён!</h2>
              <p>Теперь вы можете продолжить покупки или перейти в профиль.</p>
              <div className={styles.buttons}>
                <button
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  onClick={() => router.push('/catalog')}
                >
                  Продолжить покупки
                </button>
                <button
                  className={`${styles.btn} ${styles.btnSecondary}`}
                  onClick={() => router.push('/profile')}
                >
                  Перейти в профиль
                </button>
              </div>
            </div>
          )}

          {result === 'error' && (
            <div className={styles.state}>
              <div className={styles.crossmark}>✕</div>
              <h2>Ошибка подтверждения</h2>
              <p>{errorMessage}</p>
              <div className={styles.buttons}>
                <button
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  onClick={() => router.push('/profile')}
                >
                  Перейти в профиль
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

VerifyAccount.PageLayout = StoreLayout;
export default VerifyAccount;
