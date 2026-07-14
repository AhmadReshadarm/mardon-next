import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import 'styles.css';
import { wrapper } from '../redux/store';
import { ContextProvider } from 'common/context/AppContext';
import Head from 'next/head';
import localFont from 'next/font/local';
import { DynamicLoadProvider } from '../common/context/DynamicLoadContext';

const jost = localFont({
  src: [
    {
      path: '../public/fonts/Jost/Jost-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Jost/Jost-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Jost/Jost-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Jost/Jost-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  display: 'optional',
  variable: '--font-Jost',
  adjustFontFallback: 'Arial',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
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
          <div className={jost.variable}>
            {Component.PageLayout ? (
              <Component.PageLayout>
                <Component {...pageProps} key={router.asPath} />
              </Component.PageLayout>
            ) : (
              <Component {...pageProps} />
            )}
          </div>
        </ContextProvider>
      </DynamicLoadProvider>
    </>
  );
}

export default wrapper.withRedux(App);
