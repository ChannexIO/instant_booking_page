import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

import MaterialSelect from "components/inputs/material_select";

import styles from "./children_age_input.module.css";

export default function ChildrenAgeInput({ index, value, options, onChange }) {
  const { t } = useTranslation();

  const handleChange = useCallback(
    (newValue) => {
      onChange(Number(newValue), index);
    },
    [index, onChange],
  );

  return (
    <div className={styles.inputContainer}>
      <MaterialSelect
        name={index}
        placeholder={t("hotel_page:children_age_placeholder")}
        value={value}
        options={options}
        onChange={handleChange}
      />
    </div>
  );
}
