import React from "react";
import { Button as BootstrapButton, Spinner } from "react-bootstrap";

import styles from "./button.module.css";

export default function Button({
  children,
  variant = "primary",
  loading,
  disabled,
  className,
  onClick,
}) {
  const buttonStyles = [styles.button];

  if (className) {
    buttonStyles.push(className);
  }

  return (
    <BootstrapButton
      variant={variant}
      className={buttonStyles.join(" ")}
      disabled={loading || disabled}
      onClick={onClick}
    >
      <>
        {loading && <Spinner animation="border" size="sm" className={styles.spinner} />}
        {children}
      </>
    </BootstrapButton>
  );
}
