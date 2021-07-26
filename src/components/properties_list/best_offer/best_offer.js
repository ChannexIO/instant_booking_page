import React from "react";
import { useTranslation } from "react-i18next";

import Currency from "components/currency";

import styles from "./best_offer.module.css";

export default function BestOffer({ amount, currency }) {
  const { t } = useTranslation();

  return (
    <div className={styles.bestOffer}>
      {t("properties:price_from")}
      <Currency amount={amount} currency={currency} />
    </div>
  );
}
