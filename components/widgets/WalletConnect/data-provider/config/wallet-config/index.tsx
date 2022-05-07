import { ChainId } from "../../chains";

// wallets config
export const AUTHEREUM_API_KEY = process.env.AUTHEREUM_API_KEY;
export const PORTIS_DAPP_ID = process.env.PORTIS_DAPP_ID;
export const VENLY_CLIENT_ID = process.env.VENLY_CLIENT_ID;

export function getFortmaticKeyByChainId(chainId: ChainId): string {
  if (chainId === ChainId.mainnet) {
    return process.env.FORTMATIC_KEY_MAINNET || "";
  } else {
    return process.env.FORTMATIC_KEY_TESTNET || "";
  }
}
