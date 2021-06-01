import React from "react";
import { useTranslation } from "react-i18next";

import Link from "components/link";

import styles from "./policy_link.module.css";

export default function PolicyLink() {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <Link to="https://channex.io/policy#Policy" target="_blank">
        {t("footer:privacy_policy")}
      </Link>
    </div>
  );
}
