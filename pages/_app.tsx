import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import 'styles.css';
import { wrapper } from '../redux/store';
import { ContextProvider } from 'common/context/AppContext';
import Head from 'next/head';
import { Jost } from 'next/font/google';
import { DynamicLoadProvider } from '../common/context/DynamicLoadContext';
const jost = Jost({
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
  variable: '--font-Jost',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});
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
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <style jsx global>{`
          :root {
            --font-Jost: ${jost.style.fontFamily};
          }
        `}</style>
      </Head>
      <DynamicLoadProvider>
        <ContextProvider>
          {Component.PageLayout ? (
            <Component.PageLayout>
              {/* <div className={`${jost.variable} font-sans`}> */}
              {/* <div
                className={jost.variable}
                style={{ fontFamily: 'var(--font-Jost)' }}
              > */}
              <Component {...pageProps} key={router.asPath} />
              {/* </div> */}
            </Component.PageLayout>
          ) : (
            <Component {...pageProps} />
          )}
        </ContextProvider>
      </DynamicLoadProvider>
    </>
  );
}

export default wrapper.withRedux(App);
