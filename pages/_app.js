import Head from "next/head"
import "../styles/globals.css";
import "../styles/login.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <script src="./TW-ELEMENTS-PATH/dist/js/index.min.js"></script>
      </Head>
      <Component {...pageProps} />;

    </>
  )

}

export default MyApp;
