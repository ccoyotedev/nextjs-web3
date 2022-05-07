import "../styles/globals.css";
import type { AppProps } from "next/app";
import Web3ConnectProvider from "components/widgets/WalletConnect";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ConnectProvider>
      <Component {...pageProps} />
    </Web3ConnectProvider>
  );
}

export default MyApp;
