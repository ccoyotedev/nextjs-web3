import React, { PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { SafeAppConnector } from "@gnosis.pm/safe-apps-web3-react";

import { AvailableWeb3Connectors, disconnectWeb3Connector, getWeb3Connector } from "../connectors";

import messages from "./messages";
import { ChainId } from "../chains";

interface UserWalletData {
  availableAccounts: string[];
  currentAccount: string;
  disconnectWallet: (error?: Error) => void;
  showSelectWalletModal: () => void;
  currentProviderName: AvailableWeb3Connectors | undefined;
  handleNetworkChange: (network: ChainId) => void;
  activating: boolean;
}

const formattingError = (error: Error | undefined, supportedChainIds: ChainId[]) => {
  if (!error || !error.message) {
    return;
  }
  // Unsupported chain
  if (error.message.includes("Unsupported chain id:")) {
    return messages.unsupportedNetwork.replace("{supportedNetworks}", supportedChainIds.join(", "));
  }
  // Disconnected or locked ledger
  if (error.message.includes("0x6804") || error.message.includes("0x6700")) {
    return messages.ledgerDisconnected;
  }
  // Ignore Ledger WebUSB errors: Invalid sequence or channel
  if (error.message.includes("Invalid sequence") || error.message.includes("Invalid channel")) {
    return;
  }

  return error.message;
};

const UserWalletDataContext = React.createContext({} as UserWalletData);

export const useUserWalletDataContext = () => useContext(UserWalletDataContext);

export interface UnlockWalletPreloaderProps {
  currentProviderName?: AvailableWeb3Connectors;
}

export interface ConnectWalletModalProps {
  preferredChainId: ChainId;
  onSelectPreferredChainId: (chainId: ChainId) => void;
  supportedChainIds: ChainId[];
  onUnlockExternalWallet: (providerName: AvailableWeb3Connectors, chainId: ChainId, availableChainIds: ChainId[], skipLoad?: boolean) => void;
  error?: string;
  isVisible: boolean;
  onBackdropPress: () => void;
}

interface Web3ProviderProps {
  defaultChainId: ChainId;
  supportedChainIds: ChainId[];
  connectWalletModal: (props: ConnectWalletModalProps) => JSX.Element;
}

export function Web3Provider({
  children,
  defaultChainId,
  supportedChainIds,
  connectWalletModal: ConnectWalletModal,
}: PropsWithChildren<Web3ProviderProps>) {
  const { library, account, activate, error, deactivate } = useWeb3React<ethers.providers.Web3Provider>();

  const [currentProviderName, setCurrentProviderName] = useState<AvailableWeb3Connectors | undefined>();
  const [preferredNetwork, setPreferredNetwork] = useState(
    Number(typeof window !== "undefined" ? localStorage.getItem("preferredChainId") || (defaultChainId as ChainId) : defaultChainId)
  );
  const [activating, setActivation] = useState(false);
  const [isSelectWalletModalVisible, setSelectWalletModalVisible] = useState(false);
  const [isErrorDetected, setErrorDetected] = useState(false);

  const formattedError = formattingError(error, supportedChainIds);

  const [availableAccounts, setAvailableAccounts] = useState<string[]>([]);

  const [currentAccount, setCurrentAccount] = useState("");
  const [mockWalletAddress, setMockWalletAddress] = useState("");

  /** Handlers */
  const handleActivation = async (connectorName: AvailableWeb3Connectors, network: ChainId): Promise<boolean> => {
    let isSuccessful = false;
    setActivation(true);
    console.log(network);
    //TODO: maybe next line is useless
    localStorage.setItem("preferredChainId", network as unknown as string);
    try {
      await activate(getWeb3Connector(connectorName, network), () => {}, true);
      setCurrentProviderName(connectorName);
      isSuccessful = true;
    } catch (e) {
      console.log("error on activation", e);
      disconnectWallet();
    }
    setActivation(false);
    return isSuccessful;
  };

  const handleNetworkChange = async (network: ChainId) => {
    setPreferredNetwork(network);
    localStorage.setItem("preferredChainId", network as unknown as string);
    if (currentProviderName && library) {
      return await handleActivation(currentProviderName, network);
    } else {
      return undefined;
    }
  };
  const handleUnlockWallet = useCallback(
    async (connectorName: AvailableWeb3Connectors, chainId: ChainId) => {
      if (await handleActivation(connectorName, chainId)) {
        setSelectWalletModalVisible(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleAccountsListLoading = async (provider?: ethers.providers.Web3Provider, retries = 0) => {
    // Implement a retry system to prevent users to infinitely load Aave page during a connection issue.
    if (retries <= 0) {
      const error = new Error(
        "[Aave][Web3Provider] Max account reload reached. Clearing app state. Ask Aave support channels if you encounter this error."
      );
      // Clear state and disconnect wallet
      disconnectWallet();

      console.error(error);
      return;
    }
    // Lock the `handleAccountsListLoading` function if accounts are loading, to prevent spamming `await provider.listAccounts()`
    // and saturating the Web3 provider connection.
    if (provider) {
      let accounts: string[] = [];
      try {
        accounts = provider ? await provider.listAccounts() : [];
      } catch (error) {
        // Catch any Web3 load error or Ledger connection error when the app tries to connect prior connecting to the USB device
        // Hold the retry until 3 segs if there is an error loading accounts,
        // to prevent spamming the Ledger Web USB channel and block the connection.
        setTimeout(async () => {
          console.log("[Aave][Web3Provider] Retrying Web3 connection.");
          await handleAccountsListLoading(provider, retries - 1);
        }, 3000);
        return;
      }
      const storedAccount = localStorage.getItem("selectedAccount");
      setAvailableAccounts(accounts);
      // TODO: most probably lower case useless, keeping it just in case
      if (storedAccount && accounts.map((acc) => acc.toLowerCase()).includes(storedAccount.toLowerCase())) {
        // If loaded account and local storage account matches, set the account
        handleSetCurrentAccount(storedAccount);
      } else {
        // If storage does not match loaded accounts and is not a Ledger provider, them use first account from loaded accounts
        handleSetCurrentAccount(accounts.length === 1 ? accounts[0] : "");
      }
    }
  };

  const handleSetCurrentAccount = (account: string) => {
    setCurrentAccount(account);
    localStorage.setItem("selectedAccount", account);
  };

  const disconnectWallet = () => {
    disconnectWeb3Connector();
    setAvailableAccounts([]);
    setCurrentAccount("");
    setCurrentProviderName(undefined);
    deactivate();
  };
  /** End of Handlers */

  /** Side effects */
  useEffect(() => {
    setMockWalletAddress(localStorage.getItem("mockWalletAddress") || "");
  }, []);

  // try to check on the startapp, if we're in the gnosis iFrame - activate this provider
  useEffect(() => {
    const safeAppConnector = new SafeAppConnector();

    safeAppConnector.isSafeApp().then((isSafeApp) => {
      let storedProviderName = localStorage.getItem("currentProvider") as AvailableWeb3Connectors | undefined;
      if (isSafeApp) {
        storedProviderName = "gnosis-safe";
      } else if (storedProviderName === "gnosis-safe") {
        storedProviderName = undefined;
      }
      if (storedProviderName) {
        console.log("storedProviderName", storedProviderName);
        setCurrentProviderName(storedProviderName);
        handleUnlockWallet(storedProviderName, preferredNetwork);
      } else {
        setCurrentAccount("");
        setActivation(false);
      }
    });
    // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, []);

  // TODO: disabled for now, require more testing to understand risks
  // on update of connector config
  // and on chain id update - to prevent bugs on matic
  // we're recreating provider
  // useEffect(() => {
  //   if (currentProviderName === 'browser') {
  //     handleUnlockWallet(
  //       currentProviderName,
  //       preferredNetwork,
  //       supportedChainIds,
  //       connectorOptionalConfig
  //     );
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [chainId]);

  // store chosen provider name in localStorage after update
  useEffect(() => {
    if (account && currentProviderName) {
      localStorage.setItem("currentProvider", currentProviderName);

      // we're providing referral fee for imToken if it's used over WalletConnect as well
      // @ts-ignore
      const providerPeerName = (library?.provider?.wc?.peerMeta?.name || "") as string;
      // if user used imToken and switching to another we remove their referral code
      handleAccountsListLoading(library, 10);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, currentProviderName, handleUnlockWallet, library]);

  useEffect(() => {
    if (formattedError) {
      setErrorDetected(true);
    } else {
      setErrorDetected(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formattedError, currentAccount]);
  /** End of side effects */

  return (
    <UserWalletDataContext.Provider
      value={{
        availableAccounts,
        disconnectWallet,
        currentAccount: currentAccount && mockWalletAddress ? mockWalletAddress : currentAccount,
        showSelectWalletModal: () => setSelectWalletModalVisible(true),
        currentProviderName,
        handleNetworkChange,
        activating,
      }}
    >
      {(!account || !library || !currentAccount) && (
        <ConnectWalletModal
          preferredChainId={preferredNetwork}
          onSelectPreferredChainId={handleNetworkChange}
          supportedChainIds={supportedChainIds}
          onUnlockExternalWallet={handleUnlockWallet}
          error={formattedError}
          isVisible={isSelectWalletModalVisible || isErrorDetected}
          onBackdropPress={() => {
            setSelectWalletModalVisible(false);
            setErrorDetected(false);
          }}
        />
      )}

      {children}
    </UserWalletDataContext.Provider>
  );
}
