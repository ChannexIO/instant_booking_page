import React, { forwardRef } from "react";
import { Popover } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import Currency from "components/currency";

import styles from "./rate_plan_price_breakdown.module.css";

const DECIMAL_PLACES = 2;

function RatePlanPriceBreakdown({ ratePlan, currency, className, ...popoverProps }, ref) {
  const { t } = useTranslation();
  const { totalPrice, netPrice, lengthOfStay, taxes } = ratePlan;

  const perNightPrice = (Number(netPrice) / lengthOfStay).toFixed(DECIMAL_PLACES);
  const popoverClassName = [className, styles.popover].join(" ");

  return (
    <Popover
      className={popoverClassName}
      ref={ref}
      // OverlayTrigger add bunch of props that should be bypassed to popover
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...popoverProps}
    >
      <Popover.Content className={styles.totalContainer}>
        <div className={styles.priceRow}>
          <span>
            <Currency currency={currency} amount={perNightPrice} />
            {` x ${lengthOfStay} nights`}
          </span>
          <Currency currency={currency} amount={netPrice} />
        </div>
        {taxes.map((tax) => (
          <div className={styles.priceRow} key={tax.title}>
            <span>{tax.title}</span>
            <Currency currency={currency} amount={tax.amount} />
          </div>
        ))}
        <span className={styles.totalLabel}>{t("rates_table:total_price")}</span>
        <Currency className={styles.totalPrice} currency={currency} amount={totalPrice} />
      </Popover.Content>
    </Popover>
  );
}

export default forwardRef(RatePlanPriceBreakdown);
