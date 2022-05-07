import React, { useState } from "react";

import messages from "./messages";
import styles from "./styles";
import { getNetworkConfig } from "../../../../data-provider/config";
import { ChainId } from "../../../../data-provider/chains";
import { ChevronIcon } from "../../../../assets/icons";

interface SelectPreferredNetworkProps {
  preferredNetwork: ChainId;
  onSelectPreferredNetwork: (network: ChainId) => void;
  supportedNetworks: ChainId[];
}

export const SelectPreferredNetwork = ({ preferredNetwork, onSelectPreferredNetwork, supportedNetworks }: SelectPreferredNetworkProps) => {
  const [visible, setVisible] = useState(false);

  const getFormattedName = (chainId: ChainId) => {
    const config = getNetworkConfig(chainId);
    if (config?.isFork) return messages.forkNetwork.replace("{network}", config.name);
    if (config?.isTestnet) return messages.testNetwork.replace("{network}", config.name);
    return messages.mainnet.replace("{network}", config.name);
  };

  console.log(supportedNetworks);

  return (
    <div className="select-preferred-network">
      <p className="title">{messages.title}</p>

      <div className="dropdown">
        <button className="select" type="button" onClick={() => setVisible((prevState) => !prevState)}>
          <span>{getFormattedName(preferredNetwork)}</span>
          <img className="select-arrow" width={12} height={6} src={ChevronIcon} alt="chevron" />
        </button>
        <div className={`dropdown-items ${visible ? "visible" : ""}`}>
          {supportedNetworks.map((network) => (
            <button
              type="button"
              className="option"
              onClick={() => {
                onSelectPreferredNetwork(network);
                setVisible(false);
              }}
              key={network}
              disabled={network === preferredNetwork}
            >
              <span>{getFormattedName(network)}</span>
            </button>
          ))}
        </div>
      </div>

      <style jsx>{styles}</style>
    </div>
  );
};
