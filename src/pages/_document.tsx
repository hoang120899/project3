import { InjectionMode, resetIds, Stylesheet } from "@fluentui/react";
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

export default class MyDocument extends Document<{ styleTags: string }> {
  static async getInitialProps(ctx: DocumentContext) {
    const stylesheet = Stylesheet.getInstance();
    stylesheet.setConfig({
      injectionMode: InjectionMode.none,
      namespace: "server",
    });
    stylesheet.reset();
    resetIds();

    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => <App {...props} />,
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styleTags: stylesheet.getRules(true),
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* This is fastest. @font-face styles are not necessary. */}
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@200;400;600&display=swap"
            rel="stylesheet"
          />
          <style
            type="text/css"
            dangerouslySetInnerHTML={{ __html: this.props.styleTags }}
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
