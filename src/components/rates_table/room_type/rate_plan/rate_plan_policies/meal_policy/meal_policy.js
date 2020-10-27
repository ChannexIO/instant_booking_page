import React from 'react';
import { useTranslation } from 'react-i18next';

const DEFAULT_MEAL_POLICY = 'none';

export default function MealPolicy({ mealPolicy = DEFAULT_MEAL_POLICY }) {
  const { t } = useTranslation();

  return (
    <span>
      {t(`meal_types:${mealPolicy}`)}
    </span>
  );
}
