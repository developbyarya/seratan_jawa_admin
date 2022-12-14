import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/lib/components/navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar></Navbar>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
