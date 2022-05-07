import { AbstractConnector } from "@web3-react/abstract-connector";
import { ConnectorUpdate } from "@web3-react/types";
import { providers } from "ethers";

interface VenlyArguments {
  clientId: string;
  supportedChainIds?: number[];
  chainId: number;
  // rpcUrl?: string, //https://kovan.infura.io/v3/YOUR-PROJECT-ID
  environment: "staging" | "production";
  // signMethod?: 'POPUP' | "REDIRECT", //optional, REDIRECT by default
  // bearerTokenProvider?: () => 'obtained_bearer_token' //optional, default undefined
}

enum SecretType {
  AETERNITY = "AETERNITY",
  AVAC = "AVAC",
  BITCOIN = "BITCOIN",
  BSC = "BSC",
  ETHEREUM = "ETHEREUM",
  GOCHAIN = "GOCHAIN",
  HEDERA = "HEDERA",
  LITECOIN = "LITECOIN",
  MATIC = "MATIC",
  NEO = "NEO",
  TRON = "TRON",
  VECHAIN = "VECHAIN",
}

const secretTypes: { [key in keyof typeof SecretType]: number } = {
  ETHEREUM: 1,
  MATIC: 137,
  AETERNITY: 0,
  AVAC: 0,
  BITCOIN: 0,
  BSC: 0,
  GOCHAIN: 0,
  HEDERA: 0,
  LITECOIN: 0,
  NEO: 0,
  TRON: 0,
  VECHAIN: 0,
};

const getSecretTypeByChainId = (chainId: number): SecretType => {
  return (
    (Object.keys(secretTypes).find(
      (key) => secretTypes[key as keyof typeof SecretType] === chainId
    ) as SecretType) || "MATIC"
  );
};

type NetworkP = number | { chainId: string; [key: string]: any };

export class VenlyConnector extends AbstractConnector {
  public venly: any;
  public venlyConnect: any;

  private chainId: number;
  private environment: "staging" | "production" = "production";
  private readonly clientId: string;

  constructor({
    supportedChainIds,
    clientId,
    chainId,
    environment,
  }: VenlyArguments) {
    super({ supportedChainIds });

    this.clientId = clientId;
    this.chainId = chainId;
    this.environment = environment;

    this.handleOnLogout = this.handleOnLogout.bind(this);
    this.handleOnActiveWalletChanged =
      this.handleOnActiveWalletChanged.bind(this);
    this.handleOnError = this.handleOnError.bind(this);
  }

  private handleOnLogout(): void {
    this.emitDeactivate();
  }

  private handleOnActiveWalletChanged(account: string): void {
    this.emitUpdate({ account });
  }

  private handleOnError(error: Error): void {
    this.emitError(error);
  }

  public async activate(): Promise<ConnectorUpdate> {
    const { Venly } = await import("@venly/web3-provider");

    this.venly = Venly;
    this.venlyConnect = Venly.connect();

    const provider = await this.getProvider();
    const account = await this.getAccount();

    return { provider, account };
  }

  public async getProvider(): Promise<any> {
    return this.venly.createProviderEngine({
      clientId: this.clientId,
      skipAuthentication: false,
      secretType: getSecretTypeByChainId(this.chainId || 137),
      environment: this.environment,
      signMethod: "REDIRECT",
    });
  }

  public async getChainId(): Promise<number | string> {
    const provider = await this.getProvider();
    const web3Provider = new providers.Web3Provider(provider);

    const network = await web3Provider.getNetwork();
    return network.chainId;
  }

  public async getAccount(): Promise<null | string> {
    const wallets = await this.venlyConnect.api.getWallets();
    return wallets[0].address;
  }

  public deactivate() {}

  public async changeNetwork(
    newNetwork: number | NetworkP,
    isGasRelayEnabled?: boolean
  ) {
    const chainId =
      typeof newNetwork === "number" ? newNetwork : newNetwork.chainId;
    const secretType = getSecretTypeByChainId(this.chainId || 137);
    const provider = await this.venly.changeNetwork(
      secretType,
      isGasRelayEnabled
    );
    this.emitUpdate({ chainId, provider });
  }

  public async close() {
    await this.venly.logout();
    this.emitDeactivate();
  }
}
