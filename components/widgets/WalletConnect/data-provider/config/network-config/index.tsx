import { ChainId } from "../../chains";

import { networkConfigs as _networkConfigs } from "./networks";
import { CustomChain, chainData as _chainData } from "../chain-config";
import {
  ExplorerLinkBuilderConfig,
  ExplorerLinkBuilderProps,
  ChainDataType,
  NetworkConfig,
  BaseNetworkConfig,
} from "../types";

export type Pool = {
  address: string;
};

const ENABLE_TESTNET = process.env.ENABLE_TESTNET === "true";

// determines if forks should be shown
//const FORK_ENABLED = localStorage.getItem("forkEnabled") === "true";

// specifies which network was forked
// const FORK_BASE_CHAIN_ID = Number(localStorage.getItem("forkBaseChainId") || 1);

// specifies on which chainId the fork is running
// const FORK_CHAIN_ID = Number(localStorage.getItem("forkChainId") || 3030);
// const FORK_RPC_URL = localStorage.getItem("forkRPCUrl") || "http://127.0.0.1:8545";
// const FORK_WS_RPC_URL = localStorage.getItem("forkWsRPCUrl") || "ws://127.0.0.1:8545";

/**
 * Generates network configs based on networkConfigs & fork settings.
 * Forks will have a rpcOnly clone of their underlying base network config.
 */
export const networkConfigs = Object.keys(_networkConfigs).reduce(
  (acc, value) => {
    const FORK_ENABLED =
      typeof window !== "undefined"
        ? window.localStorage.getItem("forkEnabled") === "true"
        : false;
    const FORK_BASE_CHAIN_ID =
      typeof window !== "undefined"
        ? Number(window.localStorage.getItem("forkBaseChainId"))
        : 1;

    acc[value] = _networkConfigs[value];
    if (FORK_ENABLED && Number(value) === FORK_BASE_CHAIN_ID) {
      const FORK_CHAIN_ID = Number(
        window.localStorage.getItem("forkChainId") || 3030
      );
      const FORK_RPC_URL =
        window.localStorage.getItem("forkRPCUrl") || "http://127.0.0.1:8545";
      const FORK_WS_RPC_URL =
        window.localStorage.getItem("forkWsRPCUrl") || "ws://127.0.0.1:8545";

      acc[FORK_CHAIN_ID] = {
        ..._networkConfigs[value],
        rpcOnly: true,
        isFork: true,
        privateJsonRPCUrl: FORK_RPC_URL,
        privateJsonRPCWSUrl: FORK_WS_RPC_URL,
        underlyingChainId: FORK_BASE_CHAIN_ID,
      };
    }
    return acc;
  },
  {} as { [key: string]: BaseNetworkConfig }
);

/**
 * Generates network configs based on chainData & fork settings.
 * Fork chains are generated for all chains on the underlying base chain.
 */
export const chainData = Object.keys(_chainData).reduce((acc, value) => {
  const FORK_ENABLED =
    typeof window !== "undefined"
      ? window.localStorage.getItem("forkEnabled") === "true"
      : false;
  const FORK_BASE_CHAIN_ID =
    typeof window !== "undefined"
      ? Number(window.localStorage.getItem("forkBaseChainId"))
      : 1;

  acc[value] = _chainData[value as keyof typeof CustomChain];
  if (
    FORK_ENABLED &&
    _chainData[value as keyof typeof CustomChain].chainId === FORK_BASE_CHAIN_ID
  ) {
    const FORK_CHAIN_ID = Number(
      window.localStorage.getItem("forkChainId") || 3030
    );

    acc[`fork_${value}`] = {
      ..._chainData[value as keyof typeof CustomChain],
      chainId: FORK_CHAIN_ID,
    };
  }
  return acc;
}, {} as { [key: string]: ChainDataType });

export function getDefaultChainId() {
  return chainData[availableChains[0]].chainId;
}

export function getSupportedChainIds(): number[] {
  return Array.from(
    Object.keys(chainData).reduce((acc, value) => {
      if (
        ENABLE_TESTNET ||
        !networkConfigs[chainData[value as keyof typeof CustomChain].chainId]
          .isTestnet
      )
        acc.add(chainData[value as keyof typeof CustomChain].chainId);
      return acc;
    }, new Set<number>())
  );
}

export const availableChains = Object.keys(chainData).filter((key) =>
  getSupportedChainIds().includes(
    chainData[key as keyof typeof CustomChain].chainId
  )
) as CustomChain[];

const linkBuilder =
  ({
    baseUrl,
    addressPrefix = "address",
    txPrefix = "tx",
  }: ExplorerLinkBuilderConfig) =>
  ({ tx, address }: ExplorerLinkBuilderProps): string => {
    if (tx) {
      return `${baseUrl}/${txPrefix}/${tx}`;
    }
    if (address) {
      return `${baseUrl}/${addressPrefix}/${address}`;
    }
    return baseUrl;
  };

export function getNetworkConfig(chainId: ChainId): NetworkConfig {
  const config = networkConfigs[chainId];
  if (!config) {
    throw new Error(`Network with chainId "${chainId}" was not configured`);
  }
  return {
    ...config,
    explorerLinkBuilder: linkBuilder({ baseUrl: config.explorerLink }),
  };
}

// reexport
export { CustomChain };
