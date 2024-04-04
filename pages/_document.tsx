import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="description" content="A directory of Pokemon" />
        <meta name="keywords" content="pokemon, pokevan" />
        <meta name="author" content="Evan Bassler" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="rating" content="general" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
