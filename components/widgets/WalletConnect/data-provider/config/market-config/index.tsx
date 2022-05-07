import { ChainId } from "../../chains";
import { MarketDataType } from "../types";

import * as logos from "../../../assets/markets";

export enum CustomMarket {
  proto_kovan = "proto_kovan",
  proto_mainnet = "proto_mainnet",
  proto_avalanche = "proto_avalanche",
  proto_matic = "proto_matic",
  proto_mumbai = "proto_mumbai",
  amm_kovan = "amm_kovan",
  amm_mainnet = "amm_mainnet",
  proto_fuji = "proto_fuji",
}

export const marketsData: {
  [key in keyof typeof CustomMarket]: MarketDataType;
} = {
  [CustomMarket.proto_mainnet]: {
    chainId: ChainId.mainnet,
    logo: logos.aavev2Logo,
    activeLogo: logos.aavev2ActiveLogo,
    aTokenPrefix: "A",
  },
  [CustomMarket.proto_matic]: {
    chainId: ChainId.polygon,
    logo: logos.aaveLogo,
    activeLogo: logos.aaveActiveLogo,
    subLogo: logos.polygon,
    aTokenPrefix: "AM",
  },
  [CustomMarket.proto_kovan]: {
    chainId: ChainId.kovan,
    logo: logos.aavev2Logo,
    activeLogo: logos.aavev2ActiveLogo,
    aTokenPrefix: "A",
  },
  [CustomMarket.amm_kovan]: {
    chainId: ChainId.kovan,
    logo: logos.ammLogo,
    activeLogo: logos.ammActiveLogo,
    aTokenPrefix: "AAMM",
  },
  [CustomMarket.amm_mainnet]: {
    chainId: ChainId.mainnet,
    logo: logos.ammLogo,
    activeLogo: logos.ammActiveLogo,
    aTokenPrefix: "AAMM",
  },
  [CustomMarket.proto_mumbai]: {
    chainId: ChainId.mumbai,
    logo: logos.aaveLogo,
    activeLogo: logos.aaveActiveLogo,
    subLogo: logos.polygon,
    aTokenPrefix: "AM",
  },
  [CustomMarket.proto_fuji]: {
    chainId: ChainId.fuji,
    logo: logos.aaveLogo,
    activeLogo: logos.aaveActiveLogo,
    subLogo: logos.avalanche,
    aTokenPrefix: "AAVA",
  },
  [CustomMarket.proto_avalanche]: {
    chainId: ChainId.avalanche,
    logo: logos.aaveLogo,
    activeLogo: logos.aaveActiveLogo,
    subLogo: logos.avalanche,
    aTokenPrefix: "AV",
  },
} as const;
