import React from "react";
import { useTranslation } from "react-i18next";

import Currency from "components/currency";

import { HOTEL_INFO_SECTION } from "constants/element_ids";
import scrollToElementById from "utils/scroll_to_element_by_id";

import styles from "./min_price_panel.module.css";

const handleClick = (e) => {
  e.preventDefault();

  scrollToElementById(HOTEL_INFO_SECTION);
};

export default function MinPricePanel({ bestOffer, params }) {
  const { t } = useTranslation();
  const { checkinDate, checkoutDate } = params;
  const hasEnteredDates = checkinDate && checkoutDate;

  return (
    <a className={styles.minPriceContainer} onClick={handleClick} href="/">
      {bestOffer && (
        <div className={styles.minPriceContent}>
          {t("hotel_page:price_from")}
          <Currency
            className={styles.minPrice}
            amount={bestOffer.offer}
            currency={bestOffer.currency}
          />
          {!hasEnteredDates && t("hotel_page:price_per_night")}
        </div>
      )}
    </a>
  );
}
