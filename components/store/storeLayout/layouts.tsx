// import { YandexMetrics } from 'components/metrics/yandex-metrics';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Script from 'next/script';
// const Header = dynamic(() => import('./Header'), {
//   ssr: false,
// });
// const Footer = dynamic(() => import('./Footer'), {
//   ssr: false,
// });
import Header from './Header';
import Footer from './Footer';
const GoogleAnalytics = dynamic(
  () => import('@next/third-parties/google').then((mod) => mod.GoogleAnalytics),
  {
    ssr: false,
  },
);

const StoreLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMetrics, setIsMetrics] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsMetrics(true);
    }, 10000);
  }, []);
  return (
    <>
      {/* <div
        dangerouslySetInnerHTML={{
          __html: YandexMetrics(),
        }}
      /> */}

      {isMetrics ? (
        <>
          <GoogleAnalytics gaId="G-LPMTNCKRGT" />
          <Script
            id="yandex-tag"
            src="/yandex.js"
            onError={(err) => {
              console.error('Error', err);
            }}
            defer={true}
            // onLoad={() => {
            //   console.log('now loaded');
            // }}
          />

          <noscript>
            <div>
              <img
                src="https://mc.yandex.ru/watch/96632717"
                style={{ position: 'absolute', left: '-9999px' }}
                alt=""
              />
            </div>
          </noscript>
        </>
      ) : (
        ''
      )}

      <Header />
      {children}
      <Footer />
    </>
  );
};

export default StoreLayout;
