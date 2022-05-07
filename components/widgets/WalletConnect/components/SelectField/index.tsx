import React, { ReactNode } from "react";
import classNames from "classnames";

import styles from "./styles";
import { ChevronIcon } from "../../assets/icons";

interface SelectFieldProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  children: ReactNode;
  disabled?: boolean;
  value: ReactNode;
  placeholder?: string;
  className?: string;
}

export const SelectField = ({ visible, setVisible, children, disabled, value, placeholder }: SelectFieldProps) => {
  return (
    <>
      <div className="dropdown">
        <button className="select" disabled={disabled} type="button" onClick={() => setVisible(!visible)}>
          <span>{placeholder && !value ? placeholder : value}</span>
          <img className="select-arrow" width={12} height={6} src={ChevronIcon} alt="chevron" />
        </button>
        <div className={`dropdown-items ${visible ? "visible" : ""}`}>{children}</div>
      </div>

      <style jsx>{styles}</style>
    </>
  );
};
