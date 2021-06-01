import React from "react";
import { useTranslation } from "react-i18next";

import PriceBreakdown from "components/search_section/price_breakdown";
import TotalPrice from "components/search_section/total_price";

import Dates from "../dates";
import Guests from "../guests";
import Title from "../title";

import PropertyPhoto from "./property_photo";

import styles from "./summary.module.css";

export default function Summary({ params, property, selectedRatesByRoom, total }) {
  const { t } = useTranslation();
  const { checkinDate, checkoutDate, currency } = params;

  return (
    <div className={styles.summaryMainWrapper}>
      <div className={styles.title}>
        <h6>{t("payment_page:booking_summary:title")}</h6>
      </div>
      <PropertyPhoto photos={property.photos} />
      <div className={styles.summaryWrapper}>
        <Title property={property} />
        <Dates checkinDate={checkinDate} checkoutDate={checkoutDate} />
        <Guests params={params} />
        <PriceBreakdown selectedRatesByRoom={selectedRatesByRoom} currency={currency} />
        <TotalPrice totalPrice={total} currency={currency} />
      </div>
    </div>
  );
}
