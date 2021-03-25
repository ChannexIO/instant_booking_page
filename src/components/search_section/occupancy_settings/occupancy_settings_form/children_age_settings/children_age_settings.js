import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Label from "components/label";

import ChildrenAgeInput from "./children_age_input";

import styles from "./children_age_settings.module.css";

const MAX_CHILD_AGE = 17;

export default function ChildrenAgeSettings({ name, bookingParams, onChange }) {
  const [childrenAgeOptions, setChildrenAgeOptions] = useState([]);
  const { t } = useTranslation();

  useEffect(
    function initChildrenAgeOptions() {
      const newChildrenAgeOptions = Array(MAX_CHILD_AGE + 1)
        .fill(null)
        .map((el, index) => ({
          key: index,
          value: index,
        }));

      setChildrenAgeOptions(newChildrenAgeOptions);
    },
    [t],
  );

  useEffect(
    function handleChildrenAmountChange() {
      const { children, childrenAge } = bookingParams;
      const isChildrenArrayUpToDate = Array.isArray(childrenAge) && children === childrenAge.length;
      const isChildrenAmountUnset = children === undefined;

      if (isChildrenAmountUnset || isChildrenArrayUpToDate) {
        return;
      }

      const oldChildrenAge = Array.isArray(childrenAge) ? childrenAge : [];
      const updatedChildrenAge = Array(children)
        .fill(null)
        .map((el, index) => {
          return oldChildrenAge[index];
        });

      onChange(updatedChildrenAge, name);
    },
    [bookingParams, name, onChange],
  );

  const handleChange = useCallback(
    (value, index) => {
      const { childrenAge = [] } = bookingParams;

      const updatedChildrenAge = [...childrenAge];
      updatedChildrenAge[index] = value;

      onChange(updatedChildrenAge, name);
    },
    [bookingParams, onChange, name],
  );

  if (!Array.isArray(bookingParams.childrenAge) || !bookingParams.childrenAge.length) {
    return null;
  }

  return (
    <div className={styles.settingsWrapper}>
      <Label>{t("hotel_page:children_section_label")}</Label>
      <div className={styles.settingsContainer}>
        {bookingParams.childrenAge.map((value, index) => (
          <ChildrenAgeInput
            key={index.toString()}
            index={index}
            value={value}
            options={childrenAgeOptions}
            onChange={handleChange}
          />
        ))}
      </div>
    </div>
  );
}
