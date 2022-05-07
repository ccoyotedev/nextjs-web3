import React, { ReactNode } from "react";
import Image from "next/image";
import styles from "./styles";

import { WarningIcon } from "../../assets/icons";

interface WarningAreaProps {
  title?: string | null | {} | ReactNode;
  children?: ReactNode;
  withMargin?: boolean;
  orangeFill?: boolean;
}

export const WarningArea = ({ title, children }: WarningAreaProps) => {
  return (
    <div className="warning-area">
      <div className={`top-line ${!!children ? "topLine" : ""}`}>
        {title && (
          <>
            <span className="icon">
              <Image src={WarningIcon} alt="Aave" width={20} height={20} />
            </span>
            {typeof title === "string" ? <p>{title}</p> : title}
          </>
        )}
      </div>

      {!!children && <div className="content">{children}</div>}

      <style jsx>{styles}</style>
    </div>
  );
};
