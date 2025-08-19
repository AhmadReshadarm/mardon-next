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

          {/* <link
            rel="preload"
            href="/fonts/tt-ricordi-marmo-trial-variable.woff"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          /> */}
          {/* microsoft bing verification */}
          <meta
            name="msvalidate.01"
            content="C34B962949690979DF0ADC0147270090"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
