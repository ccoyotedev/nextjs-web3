import { CloseIcon } from "../../assets/icons";
import styles from "./styles";
import Image from "next/image";

interface Props {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

export const Modal = ({ children, open, onClose }: Props) => {
  if (open) {
    return (
      <>
        <div className="overlay">
          <div className="panel">
            <div className="close-icon" onClick={onClose}>
              <Image src={CloseIcon} alt="close modal" />
            </div>
            {children}
          </div>
        </div>
        <style jsx>{styles}</style>
      </>
    );
  } else {
    return <></>;
  }
};
