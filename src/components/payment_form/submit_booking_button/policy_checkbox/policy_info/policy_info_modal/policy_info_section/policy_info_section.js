import React from "react";
import { useTranslation } from "react-i18next";
import { FrownOutlined } from "@ant-design/icons";

import Placeholder from "components/placeholder";

import styles from "./policy_info_section.module.css";

export default function PolicyInfoSection({ title, text }) {
  const { t } = useTranslation();

  const policyPlaceholder = (
    <Placeholder icon={<FrownOutlined />} text={t("payment_page:policy_info:no_policy_message")} />
  );

  const policyContent = text || policyPlaceholder;

  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div>{policyContent}</div>
    </div>
  );
}
