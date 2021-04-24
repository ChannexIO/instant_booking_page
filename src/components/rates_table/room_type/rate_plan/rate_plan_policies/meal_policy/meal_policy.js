import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./meal_policy.module.css";

const DEFAULT_MEAL_POLICY = "none";

export default function MealPolicy({ mealPolicy = DEFAULT_MEAL_POLICY }) {
  const { t } = useTranslation();

  if (mealPolicy === DEFAULT_MEAL_POLICY) {
    return null;
  }

  return <span className={styles.policyHightlighted}>{t(`meal_types:${mealPolicy}`)}</span>;
}
