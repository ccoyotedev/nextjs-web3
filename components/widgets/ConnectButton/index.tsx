import React from "react";
import { Web3Button } from "components/ui";
import { ChainId } from "utils/ethers.helper";
import {
  useUserWalletDataContext,
  useWeb3React,
} from "components/widgets/WalletConnect";
import { providers } from "ethers";

export const ConnectButton = () => {
  const { chainId } = useWeb3React<providers.Web3Provider>();
  const {
    showSelectWalletModal,
    currentAccount,
    disconnectWallet,
    activating,
  } = useUserWalletDataContext();

  return (
    <Web3Button
      user={currentAccount}
      network={chainId ? ChainId[chainId] : undefined}
      handleConnect={showSelectWalletModal}
      handleLogout={disconnectWallet}
      loading={activating}
    />
  );
};
