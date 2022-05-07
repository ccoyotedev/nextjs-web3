import { ChainId } from "../../chains";

// walets config
export const AUTHEREUM_API_KEY = process.env.REACT_APP_AUTHEREUM_API_KEY;
export const PORTIS_DAPP_ID = process.env.REACT_APP_PORTIS_DAPP_ID;
export const VENLY_CLIENT_ID = process.env.VENLY_CLIENT_ID;

export function getFortmaticKeyByChainId(chainId: ChainId): string {
  if (chainId === ChainId.mainnet) {
    return process.env.REACT_APP_FORTMATIC_KEY_MAINNET || "";
  } else {
    return process.env.REACT_APP_FORTMATIC_KEY_TESTNET || "";
  }
}
