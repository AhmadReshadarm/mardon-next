import dynamic from 'next/dynamic';
const Header = dynamic(() => import('./Header'), {
  ssr: false,
});
const Footer = dynamic(() => import('./Footer'), {
  ssr: false,
});

const YandexMetricaProvider = dynamic(
  () => import('next-yandex-metrica').then((mod) => mod.YandexMetricaProvider),
  {
    ssr: false,
  },
);

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
