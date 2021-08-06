import React from "react";
import { Row } from "react-bootstrap";
import classnames from "classnames";

import styles from "./section_wrapper.module.css";

const CONTAINER_STYLES = {
  light: styles.containerLight,
  dark: styles.containerDark,
};

export default function SectionWrapper({ theme, children, padded = true, id }) {
  const containerClassname = classnames(CONTAINER_STYLES[theme], padded && styles.containerPadded);

  return (
    <div id={id} className={containerClassname}>
      <div className={styles.containerInner}>
        <Row noGutters>{children}</Row>
      </div>
    </div>
  );
}
