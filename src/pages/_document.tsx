import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body className="bg-gray-100 dark:bg-gray-600 text-black dark:text-white">
          <Main />
          <div id="my-portal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
