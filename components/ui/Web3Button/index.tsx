import { Loader } from "components/ui";
import { smartTrim } from "utils/ethers.helper";
import { useState } from "react";
import styles from "./styles";

interface Props {
  user?: string;
  network?: string;
  handleConnect: () => void;
  handleLogout: () => void;
  loading?: boolean;
}

export const Web3Button = ({
  user,
  network,
  handleConnect,
  handleLogout,
  loading,
}: Props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const connected = user && network;

  const handleClick = () => {
    if (!connected) {
      handleConnect();
    } else {
      setDropdownOpen((prevState) => !prevState);
    }
  };

  return (
    <>
      <button
        className={`web3-button ${connected ? "connected" : ""}`}
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? (
          <div className="loading-container">
            <Loader size={3} />
            <p>Loading</p>
          </div>
        ) : !connected ? (
          <p className="network">Connect</p>
        ) : (
          <>
            <div>
              <p className="user-address">{smartTrim(user, 8)}</p>
              <p className="network">{network}</p>
            </div>
            {dropdownOpen && (
              <div className="dropdown">
                <div className="dropdown-item" onClick={handleLogout}>
                  <p>Logout</p>
                </div>
              </div>
            )}
          </>
        )}
      </button>
      <style jsx>{styles}</style>
    </>
  );
};
