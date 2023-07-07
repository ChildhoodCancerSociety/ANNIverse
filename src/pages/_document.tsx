import Document, { Head, Html, Main, NextScript } from "next/document";
import type { DocumentContext, DocumentInitialProps } from "next/document";

const persistThemeScript = `
document.documentElement.dataset.mode = (() => {
  const persistentTheme = window.localStorage.getItem("theme");
  if(persistentTheme === "dark" || persistentTheme === "light") {
    return persistentTheme;
  }
  const mqTheme = window.matchMedia("(prefers-color-scheme: dark)");
  return mqTheme.matches ? "dark" : "light";
  return "light";
})();`;

// I know this looks messed up. I don't get really why we have to do this over a functional component either
// https://nextjs.org/docs/pages/building-your-application/routing/custom-document
class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Martian+Mono:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <script dangerouslySetInnerHTML={{ __html: persistThemeScript }} />
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
