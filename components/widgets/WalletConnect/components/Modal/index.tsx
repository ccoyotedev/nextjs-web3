import { CloseIcon } from "../../assets/icons";
import styles from "./styles";

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
            <img src={CloseIcon} alt="close modal" className="close-icon" onClick={onClose} />
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
