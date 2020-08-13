import React from 'react';
import { useTranslation } from "react-i18next";

import styles from "./rate_plan_price.module.css";

const TAX_DECIMAL_PLACES = 2;

export default function RatePlanPrice({ ratePlan }) {
  const { t } = useTranslation();  
  const { price, taxes, currency } = ratePlan;
    const additionalTaxesAmount = taxes
    .filter((tax) => !tax.inclusive)
    .reduce((acc, tax) => acc + Number(tax.amount), 0)
    .toFixed(TAX_DECIMAL_PLACES);
  const hasTaxes = Boolean(additionalTaxesAmount);

  return (
    <div className={styles.ratePlanPriceContainer}>
      <div className={styles.ratePlanPrice}>{`${currency} ${price}`}</div>
      {hasTaxes && (
        <div className={styles.ratePlanTaxes}>
          {`+${currency} ${additionalTaxesAmount} ${t("rates_table:taxes_and_charges")}`}
        </div>
      )}
    </div>
  );
}