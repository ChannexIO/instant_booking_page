import React from "react";

import Currency from "components/currency";
import Cell from "components/layout/cell";

import RatePriceBreakdown from "./rate_price_breakdown";

import styles from "./room_price_breakdown.module.css";

export default function RoomPriceBreakdown({ roomWithSelectedRates, currency }) {
  return (
    <Cell className={styles.container}>
      <div className={styles.title}>
        {roomWithSelectedRates.title}
        <Currency amount={roomWithSelectedRates.total} currency={currency} />
      </div>
      <>
        {roomWithSelectedRates.selectedRates.map((ratePlan) => (
          <RatePriceBreakdown key={ratePlan.id} ratePlan={ratePlan} currency={currency} />
        ))}
      </>
    </Cell>
  );
}
