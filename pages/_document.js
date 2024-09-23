// import { GoogleAnalytics } from 'components/metrics/google-analytics';
// import { YandexMetrics } from 'components/metrics/yandex-metrics';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon.svg" />
          <link
            rel="preload"
            href="/fonts/circe/circe-regular.woff"
            as="Circe"
            type="font/woff"
          />
          <link
            rel="preload"
            href="/fonts/tt-ricordi-marmo-trial-variable.woff"
            as="ricordi"
            type="font/woff"
          />
        </Head>
        <body>
          {/* <div
            dangerouslySetInnerHTML={{
              __html: GoogleAnalytics(),
            }}
          /> */}
          {/* <div
            dangerouslySetInnerHTML={{
              __html: YandexMetrics(),
            }}
          /> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
