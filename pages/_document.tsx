import { Html, Head, Main, NextScript } from "next/document";
import Image from "next/image";
import Link from "next/link";
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
