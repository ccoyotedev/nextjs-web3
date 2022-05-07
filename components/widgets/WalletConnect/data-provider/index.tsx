export * from "./browser-wallet";
export * from "./provider";
export * from "./connectors";

import React from "react";
import { Web3Provider, ConnectWalletModalProps } from "./provider";
import { getDefaultChainId, getSupportedChainIds } from "./config";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import { ConnectWalletModal } from "../components";
import { AvailableWeb3Connectors } from "./connectors";

interface Props {
  children: React.ReactNode;
  preloader?: (props: {
    currentProviderName?: AvailableWeb3Connectors;
  }) => JSX.Element;
  connectWalletModal?: (props: ConnectWalletModalProps) => JSX.Element;
}

const WalletConnect = ({
  children,
  connectWalletModal: CustomConnectWalletModal,
}: Props) => {
  const getWeb3Library = (provider: any): ethers.providers.Web3Provider => {
    return new ethers.providers.Web3Provider(provider);
  };

  return (
    <Web3ReactProvider getLibrary={getWeb3Library}>
      <Web3Provider
        defaultChainId={getDefaultChainId()}
        supportedChainIds={getSupportedChainIds()}
        connectWalletModal={CustomConnectWalletModal || ConnectWalletModal}
      >
        {children}
      </Web3Provider>
    </Web3ReactProvider>
  );
};

export default WalletConnect;
