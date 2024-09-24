import { YandexMetrics } from 'components/metrics/yandex-metrics';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
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

const StoreLayoutProductMobile = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMetrics, setIsMetrics] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsMetrics(true);
    }, 15000);
  }, []);
  return (
    <>
      {isMetrics ? (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: YandexMetrics(),
            }}
          />

          <GoogleAnalytics gaId="G-LPMTNCKRGT" />
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

export default StoreLayoutProductMobile;
