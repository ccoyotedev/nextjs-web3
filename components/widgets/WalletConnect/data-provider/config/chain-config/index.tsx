import { ChainId } from "../../chains";
import { ChainDataType } from "../types";

export enum CustomChain {
  proto_kovan = "proto_kovan",
  proto_mainnet = "proto_mainnet",
  proto_avalanche = "proto_avalanche",
  proto_matic = "proto_matic",
  proto_mumbai = "proto_mumbai",
  amm_kovan = "amm_kovan",
  amm_mainnet = "amm_mainnet",
  proto_fuji = "proto_fuji",
}

export const chainData: {
  [key in keyof typeof CustomChain]: ChainDataType;
} = {
  [CustomChain.proto_mainnet]: {
    chainId: ChainId.mainnet,
  },
  [CustomChain.proto_matic]: {
    chainId: ChainId.polygon,
  },
  [CustomChain.proto_kovan]: {
    chainId: ChainId.kovan,
  },
  [CustomChain.amm_kovan]: {
    chainId: ChainId.kovan,
  },
  [CustomChain.amm_mainnet]: {
    chainId: ChainId.mainnet,
  },
  [CustomChain.proto_mumbai]: {
    chainId: ChainId.mumbai,
  },
  [CustomChain.proto_fuji]: {
    chainId: ChainId.fuji,
  },
  [CustomChain.proto_avalanche]: {
    chainId: ChainId.avalanche,
  },
} as const;
