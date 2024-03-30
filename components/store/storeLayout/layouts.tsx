import Footer from './Footer';
import Header from './Header';
import { YandexMetricaProvider } from 'next-yandex-metrica';

const StoreLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <YandexMetricaProvider
        tagID={96632717}
        initParameters={{
          clickmap: true,
          trackLinks: true,
          ecommerce: true,
          webvisor: true,
          accurateTrackBounce: true,
          childIframe: true,
          trackHash: true,
          triggerEvent: true,
        }}
      >
        <Header />
        {children}
        <Footer />
      </YandexMetricaProvider>
    </>
  );
};

export default StoreLayout;
