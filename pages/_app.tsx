import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import 'styles.css';
import { wrapper } from '../redux/store';
import { ContextProvider } from 'common/context/AppContext';
import Head from 'next/head';
// import { Circe, Jost, ricordi } from 'common/helpers/fonts.helper';

export type ComponentWithPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout?: React.FC<any>;
  };
};

function App({ Component, pageProps }: ComponentWithPageLayout) {
  const router = useRouter();
  // className={`${Circe.variable} ${Jost.variable} ${ricordi.variable}`}
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
            <Component {...pageProps} key={router.asPath} />
          </Component.PageLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </ContextProvider>
    </>
  );
}

export default wrapper.withRedux(App);
