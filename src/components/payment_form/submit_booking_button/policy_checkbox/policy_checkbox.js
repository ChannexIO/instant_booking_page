import React from "react";
import { useTranslation } from "react-i18next";

import Checkbox from "components/inputs/checkbox";

import PolicyInfo from "./policy_info";

import styles from "./policy_checkbox.module.css";

export default function PolicyCheckbox({ value, onChange }) {
  const { t } = useTranslation();

  return (
    <div className={styles.checkboxContainer}>
      <Checkbox
        value={value}
        onChange={onChange}
        label={
          <span className={styles.policyText}>
            {t("payment_page:policy_agreement")}
            <PolicyInfo />
          </span>
        }
      />
    </div>
  );
}
