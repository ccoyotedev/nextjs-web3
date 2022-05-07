import React, { ReactNode, ReactNodeArray } from "react";
import classNames from "classnames";

import styles from "./styles";

import { WarningIcon } from "../../assets/icons";

interface WarningAreaProps {
  title?: string | null | {} | ReactNodeArray;
  children?: ReactNode;
  withMargin?: boolean;
  orangeFill?: boolean;
}

export const WarningArea = ({ title, children }: WarningAreaProps) => {
  return (
    <div className="warning-area">
      <div
        className={classNames("top-line", {
          topLine: !!children,
        })}
      >
        {title && (
          <p>
            <img src={WarningIcon} alt="Aave" />
            {title}
          </p>
        )}
      </div>

      {!!children && <div className="content">{children}</div>}

      <style jsx>{styles}</style>
    </div>
  );
};
