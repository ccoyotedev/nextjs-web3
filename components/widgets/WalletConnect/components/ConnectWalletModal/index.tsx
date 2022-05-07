import React from "react";

import {
  AvailableWeb3Connectors,
  ConnectWalletModalProps,
  getWeb3ProviderFromBrowser,
} from "../../data-provider";

import { WarningArea } from "../WarningArea";
import {
  UnlockWalletWrapper,
  WalletCard,
  SelectPreferredNetwork,
} from "./components";
import {
  AUTHEREUM_API_KEY,
  getFortmaticKeyByChainId,
  PORTIS_DAPP_ID,
  VENLY_CLIENT_ID,
} from "../../data-provider/config";

import messages from "./messages";

import * as icons from "../../assets/providers";
import { ChainId } from "../../data-provider/chains";
import styles from "./styles";

export interface Wallet {
  title: string;
  description?: string;
  providerName: AvailableWeb3Connectors;
  icon: string;
  disabled?: boolean;
  notSupported?: boolean;
  errorMessage?: string;
}

export const ConnectWalletModal = ({
  preferredChainId,
  onSelectPreferredChainId,
  supportedChainIds,
  onUnlockExternalWallet,
  error,
  isVisible,
  onBackdropPress,
}: ConnectWalletModalProps) => {
  const browserWalletProvider = getWeb3ProviderFromBrowser();

  const handleUnlockExternalWallet = (providerName: AvailableWeb3Connectors) =>
    onUnlockExternalWallet(
      providerName,
      preferredChainId,
      supportedChainIds,
      false
    );

  // @ts-ignore
  const isImToken = typeof window !== "undefined" ? !!window.imToken : false;

  const wallets: Wallet[] = [
    {
      title: messages.titleBrowserWallet.replace(
        "{walletName}",
        isImToken ? "imToken" : "Browser"
      ),
      description: "(MetaMask, Trustwallet, Enjin)",
      providerName: "browser",
      icon: isImToken ? icons.imToken : icons.browserWallets,
      disabled: !browserWalletProvider,
      errorMessage: messages.noBrowserBrowserWallet,
    },
    {
      title: "Portis",
      providerName: "portis",
      icon: icons.portisIcon,
      notSupported: !PORTIS_DAPP_ID || preferredChainId === ChainId.avalanche,
    },
    {
      title: "MEW wallet",
      providerName: "mew-wallet",
      icon: icons.MEWIcon,
      notSupported: preferredChainId !== ChainId.mainnet,
    },
    {
      title: "Coinbase",
      providerName: "wallet-link",
      icon: icons.coinbaseIcon,
      notSupported: preferredChainId === ChainId.avalanche,
    },
    {
      title: "Authereum",
      providerName: "authereum",
      icon: icons.authereumIcon,
      notSupported: !AUTHEREUM_API_KEY || preferredChainId !== ChainId.mainnet,
    },
    {
      title: "Wallet Connect",
      providerName: "wallet-connect",
      icon: icons.walletConnectIcon,
    },
    {
      title: "Clover",
      providerName: "clover",
      icon: icons.cloverIcon,
    },
    {
      title: "Torus",
      providerName: "torus",
      icon: icons.torusIcon,
      notSupported: preferredChainId === ChainId.avalanche,
    },
    {
      title: "Fortmatic",
      providerName: "fortmatic",
      icon: icons.formaticIcon,
      notSupported:
        !getFortmaticKeyByChainId(preferredChainId) ||
        preferredChainId === ChainId.polygon ||
        preferredChainId === ChainId.avalanche,
    },
    {
      title: "imToken",
      providerName: "wallet-connect",
      icon: icons.imToken,
      notSupported:
        isImToken ||
        preferredChainId === ChainId.polygon ||
        preferredChainId === ChainId.avalanche,
    },
    {
      title: "Venly",
      providerName: "venly",
      icon: icons.venlyIcon,
      notSupported: !VENLY_CLIENT_ID,
    },
  ];

  return (
    <UnlockWalletWrapper
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
    >
      <SelectPreferredNetwork
        preferredNetwork={preferredChainId}
        onSelectPreferredNetwork={onSelectPreferredChainId}
        supportedNetworks={supportedChainIds}
      />

      {error && (
        <WarningArea title={messages.errorCaption}>
          <p>Hello</p>
        </WarningArea>
      )}

      <div className="content">
        {wallets
          .filter((wallet) => !wallet.notSupported)
          .map((wallet, index) => (
            <WalletCard
              title={wallet.title}
              description={wallet.description}
              errorMessage={
                wallet.providerName === "browser" && !browserWalletProvider
                  ? wallet.errorMessage
                  : ""
              }
              providerName={wallet.providerName}
              icon={wallet.icon}
              disabled={wallet.disabled}
              handleUnlockExternalWallet={handleUnlockExternalWallet}
              key={index}
            />
          ))}
      </div>

      <div className="privacy-inner">
        <p>
          <span key="disclaimer">{messages.disclaimer}</span>
          {messages.disclaimerBottomText}
        </p>
      </div>

      <style jsx>{styles}</style>
    </UnlockWalletWrapper>
  );
};
