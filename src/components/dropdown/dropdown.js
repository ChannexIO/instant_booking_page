import React, { useCallback } from "react";
import { Dropdown as BootstrapDropdown } from "react-bootstrap";

import Label from "components/label";

import styles from "./dropdown.module.css";

const VERTICAL_ORIENTATION = "vertical";

export default function Dropdown({ className, layout, children, title, show, onToggle, label }) {
  const containerClass =
    layout === VERTICAL_ORIENTATION ? styles.containerVertical : styles.containerHorizontal;

  const handleVisibilityToggle = useCallback(
    (newVisibilityState, event, meta) => {
      if (meta.source === "select") {
        return;
      }

      onToggle(newVisibilityState);
    },
    [onToggle],
  );

  return (
    <div className={[containerClass, className].join(" ")}>
      {label && <Label>{label}</Label>}
      <BootstrapDropdown className={styles.dropdown} show={show} onToggle={handleVisibilityToggle}>
        <BootstrapDropdown.Toggle className={styles.dropdownToggle}>
          {title}
        </BootstrapDropdown.Toggle>
        <BootstrapDropdown.Menu className={styles.dropdownMenu}>{children}</BootstrapDropdown.Menu>
      </BootstrapDropdown>
    </div>
  );
}
