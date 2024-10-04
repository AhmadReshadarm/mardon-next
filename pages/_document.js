// import { GoogleAnalytics } from 'components/metrics/google-analytics';
import { YandexMetrics } from 'components/metrics/yandex-metrics';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { useEffect, useState } from 'react';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    let isMetrics = false;
    useEffect(() => {
      setTimeout(() => {
        isMetrics = true;
      }, 15000);
    }, []);

    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon.svg" />
          <link
            rel="preload"
            href="/fonts/circe/circe-regular.woff"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/circe/circe-extra-bold.woff"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/tt-ricordi-marmo-trial-variable.woff"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Jost/Jost-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
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
