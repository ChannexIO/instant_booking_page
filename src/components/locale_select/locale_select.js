import React from 'react';
import { GlobalOutlined } from "@ant-design/icons";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import styles from "./locale_select.module.css";  

export default function LocaleSelect({ }) {
  const { t } = useTranslation();

  return (
    <Dropdown>
      <Dropdown.Toggle className={styles.toggle} variant="link">
        <GlobalOutlined className={styles.icon} />{t("general:locale")}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item>
          Some locales
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}