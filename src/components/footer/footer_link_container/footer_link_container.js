import React from "react";

import styles from "./footer_link_container.module.css";

export default function FooterLinkContainer({ children }) {
  return <div className={styles.container}>{children}</div>;
}
