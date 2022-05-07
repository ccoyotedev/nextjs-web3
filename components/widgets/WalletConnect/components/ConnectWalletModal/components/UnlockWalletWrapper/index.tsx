import React, { ReactNode } from "react";
import { Modal } from "../../../index";
import messages from "./messages";
import styles from "./styles";

interface ConnectWalletWrapperProps {
  children: ReactNode[];
  isVisible: boolean;
  onBackdropPress: () => void;
}

export const UnlockWalletWrapper = ({ children, isVisible, onBackdropPress }: ConnectWalletWrapperProps) => {
  return (
    <Modal open={isVisible} onClose={onBackdropPress}>
      <div className="connect-wallet-wrapper">
        <div className="inner">
          <div className="caption-inner">
            <h2>{messages.caption}</h2>
          </div>

          {children}
        </div>
      </div>
      <style jsx>{styles}</style>
    </Modal>
  );
};
