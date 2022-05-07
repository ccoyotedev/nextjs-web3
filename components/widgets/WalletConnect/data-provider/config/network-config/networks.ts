import { ChainId } from "../../chains";
import { BaseNetworkConfig } from "../types";

export const networkConfigs: Record<string, BaseNetworkConfig> = {
  [ChainId.kovan]: {
    name: "Kovan",
    publicJsonRPCUrl: [
      "https://eth-kovan.alchemyapi.io/v2/demo",
      "https://kovan.poa.network",
    ],
    explorerLink: "https://kovan.etherscan.com",
    rpcOnly: true,
    isTestnet: true,
  },
  [ChainId.mainnet]: {
    name: "Ethereum mainnet",
    publicJsonRPCUrl: [
      "https://cloudflare-eth.com",
      "https://eth-mainnet.alchemyapi.io/v2/demo",
    ],
    publicJsonRPCWSUrl: "wss://eth-mainnet.alchemyapi.io/v2/demo",
    explorerLink: "https://etherscan.com",
    rpcOnly: false,
  },
  [ChainId.polygon]: {
    name: "Polygon POS",
    publicJsonRPCUrl: ["https://polygon-rpc.com"],
    publicJsonRPCWSUrl: "wss://polygon-rpc.com",
    explorerLink: "https://polygonscan.com",
    rpcOnly: false,
  },
  [ChainId.mumbai]: {
    name: "Mumbai",
    publicJsonRPCUrl: ["https://rpc-mumbai.maticvigil.com"],
    publicJsonRPCWSUrl: "wss://rpc-mumbai.maticvigil.com",
    explorerLink: "https://explorer-mumbai.maticvigil.com",
    rpcOnly: true,
    isTestnet: true,
  },
  [ChainId.fuji]: {
    name: "Fuji",
    publicJsonRPCUrl: ["https://api.avax-test.network/ext/bc/C/rpc"],
    publicJsonRPCWSUrl: "wss://api.avax-test.network/ext/bc/C/rpc",
    explorerLink: "https://cchain.explorer.avax-test.network",
    rpcOnly: true,
    isTestnet: true,
  },
  [ChainId.avalanche]: {
    name: "Avalanche",
    publicJsonRPCUrl: ["https://api.avax.network/ext/bc/C/rpc"],
    publicJsonRPCWSUrl: "wss://api.avax.network/ext/bc/C/rpc",
    explorerLink: "https://cchain.explorer.avax.network",
    rpcOnly: false,
  },
} as const;
