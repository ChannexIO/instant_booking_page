import React from "react";
import { useTranslation } from "react-i18next";

import Currency from "components/currency";
import Cell from "components/layout/cell";

import styles from "./total_price.module.css";

export default function TotalPrice({ totalPrice, currency }) {
  const { t } = useTranslation();

  return (
    <Cell noLine>
      <h6 className={styles.total}>
        {t("hotel_page:total")}
        <Currency amount={totalPrice} currency={currency} />
      </h6>
    </Cell>
  );
}
