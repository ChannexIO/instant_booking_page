import React from 'react';
import { useTranslation } from 'react-i18next';
import { CoffeeOutlined } from '@ant-design/icons';

import Policy from 'components/policy';
import Currency from 'components/currency';

export default function MealPolicy({ mealPolicy, currency }) {
  const { t } = useTranslation();
  const {  type, price, included } = mealPolicy;

  if (type === 'none') {
    return null;
  }

  const breakfastPrice = included ? t('rates_table:included') : <Currency currency={currency} amount={price}/>;

  return (
    <Policy
      icon={<CoffeeOutlined />}
      title={t(`meal_types:${type}`)}
      addon={breakfastPrice}
      isHighlighted={included}
    />
  );
}