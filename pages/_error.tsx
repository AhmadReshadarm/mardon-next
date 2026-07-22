// import StoreLayout from 'components/store/storeLayout/layouts';
// import Head from 'next/head';
// import styles from '../genral-styles/error.module.css';
// import { useEffect } from 'react';
// import { usePathname } from 'next/navigation';

// import {
//   getClientErrorDetails,
//   getServerErrorDetails,
//   sendErrorReport,
// } from 'common/helpers/errorLogger.helper';

// interface ErrorPageProps {
//   statusCode: number;
//   hasGetInitialPropsRun?: boolean;
// }

// const Error = ({ statusCode, hasGetInitialPropsRun }: ErrorPageProps) => {
//   const pathname = usePathname();

//   useEffect(() => {
//     if (!hasGetInitialPropsRun) return;

//     const isServer = typeof window === 'undefined';

//     // Use globalThis.Error to avoid shadowing the component name
//     const syntheticError = new globalThis.Error(
//       statusCode
//         ? `Server error ${statusCode} on ${pathname}`
//         : `Client UI error on ${pathname}`,
//     );

//     let details;
//     if (isServer) {
//       details = getServerErrorDetails(syntheticError, {
//         headers: {},
//         url: pathname,
//         method: 'GET',
//       });
//     } else {
//       details = getClientErrorDetails(syntheticError, { pathname });
//     }

//     sendErrorReport(details, isServer).catch(console.error);
//   }, [hasGetInitialPropsRun, statusCode, pathname]);
//   return (
//     <>
//       <Head>
//         <title>Ошибка Сервиса | NBHOZ 500</title>
//       </Head>
//       <div className={styles.Container}>
//         <div className={styles.Wrapper}>
//           <div className={styles.Content}>
//             <h1 className={styles.ErrorWrapper}>500 ОШИБКА</h1>
//             <div className={styles.ContentWrapper}>
//               <h2>Упс..Кажется, что-то сломалось или же это Ошибка Сервиса</h2>
//               <h4>
//                 Мы знаем о проблеме и уже работаем над ней. Попробуйте зайти
//                 позже. Спасибо за Ваш выбор. С Уважением, Ваш NBHOZ
//               </h4>
//             </div>
//             <span>
//               <p>
//                 {statusCode
//                   ? `An error ${statusCode} occurred on server`
//                   : 'An error occurred on client'}
//               </p>
//             </span>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// Error.getInitialProps = async ({ res, err, req }) => {
//   const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
//   return { statusCode, hasGetInitialPropsRun: true };
// };

// Error.PageLayout = StoreLayout;
// export default Error;

// pages/_error.tsx
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Head from 'next/head';
import StoreLayout from 'components/store/storeLayout/layouts';
import {
  getClientErrorDetails,
  getServerErrorDetails,
  sendErrorReport,
} from 'common/helpers/errorLogger.helper';
import styles from '../genral-styles/error.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface ErrorPageProps {
  statusCode: number;
  error?: { message: string; stack?: string };
  hasGetInitialPropsRun?: boolean;
}

const ErrorPage = ({
  statusCode,
  error,
  hasGetInitialPropsRun,
}: ErrorPageProps) => {
  const pathname = usePathname();
  const hasReported = useRef(false);
  const router = useRouter();
  useEffect(() => {
    // Avoid sending if getInitialProps didn't run or we already sent
    if (!hasGetInitialPropsRun || hasReported.current) return;
    hasReported.current = true;

    const isServer = typeof window === 'undefined';

    // Reconstruct a real Error object from the serialized error
    const err = error
      ? new globalThis.Error(error.message)
      : new globalThis.Error(`HTTP ${statusCode}`);
    if (error?.stack) err.stack = error.stack;

    // Build details – now with the real stack trace
    let details;
    if (isServer) {
      details = getServerErrorDetails(err, {
        headers: {},
        url: pathname,
        method: 'GET',
      });
    } else {
      details = getClientErrorDetails(err, { pathname, statusCode });
    }

    // Fire‑and‑forget report
    sendErrorReport(details, isServer).catch(console.error);
  }, [hasGetInitialPropsRun, statusCode, error, pathname]);

  return (
    <>
      <Head>
        <title>Ошибка Сервиса | NBHOZ 500</title>
      </Head>
      <div className={styles.Container}>
        <div className={styles.Wrapper}>
          <div className={styles.Content}>
            <h1 className={styles.ErrorWrapper}>500 ОШИБКА</h1>
            <div className={styles.ContentWrapper}>
              <h2>Упс..Кажется, что-то сломалось или же это Ошибка Сервиса</h2>
              <h4>
                Мы знаем о проблеме и уже работаем над ней. Попробуйте зайти
                позже. Спасибо за Ваш выбор. С Уважением, Ваш NBHOZ
              </h4>
            </div>
            <Link href="/" className={styles.refreshButton}>
              Продолжить покупки
            </Link>
            <span>
              <p>
                {statusCode
                  ? `На сервере произошла ошибка ${statusCode}.`
                  : 'На стороне клиента произошла ошибка.'}
              </p>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

ErrorPage.getInitialProps = async ({ res, err, req }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  // Serialise the error so it can be passed to the client
  const error = err ? { message: err.message, stack: err.stack } : undefined;
  return { statusCode, error, hasGetInitialPropsRun: true };
};

ErrorPage.PageLayout = StoreLayout;
export default ErrorPage;
