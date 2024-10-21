import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import 'styles.css';
import { wrapper } from '../redux/store';
import { ContextProvider } from 'common/context/AppContext';
import Head from 'next/head';

export type ComponentWithPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout?: React.FC<any>;
  };
};

function App({ Component, pageProps }: ComponentWithPageLayout) {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta
          property="viewport"
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
      </Head>
      <ContextProvider>
        {Component.PageLayout ? (
          <Component.PageLayout>
            <AnimatePresence mode="wait">
              <Component {...pageProps} key={router.asPath} />
            </AnimatePresence>
          </Component.PageLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </ContextProvider>
    </>
  );
}

export default wrapper.withRedux(App);
