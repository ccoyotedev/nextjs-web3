import React from "react";

import { Wallet } from "../../index";
import { AvailableWeb3Connectors } from "../../../../data-provider/connectors";

import styles from "./styles";

interface WalletCardProps extends Wallet {
  handleUnlockExternalWallet: (providerName: AvailableWeb3Connectors) => void;
}

export const WalletCard = ({ title, description, icon, disabled, providerName, handleUnlockExternalWallet, errorMessage }: WalletCardProps) => {
  return (
    <button className="wallet-card" onClick={() => handleUnlockExternalWallet(providerName)} disabled={disabled} type="button">
      {disabled && errorMessage && <strong className="error">{errorMessage}</strong>}

      <div className="inner">
        <div className="image-inner">
          <img src={icon} alt={title} />
        </div>

        <div className="text-inner">
          <p>{title}</p>
          {!!description && <span>{description}</span>}
        </div>
      </div>

      <style jsx>{styles}</style>
    </button>
  );
};
