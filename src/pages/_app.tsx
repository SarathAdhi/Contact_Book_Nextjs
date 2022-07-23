import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

// https://www.linkedin.com/feed/update/urn:li:activity:6955087601779286016/

function MyApp({ Component, pageProps }: AppProps) {
  const [showing, setShowing] = useState(false);

  useEffect(() => {
    setShowing(true);
  }, []);
  return <>{showing && <Component {...pageProps} />}</>;
}

export default MyApp;
