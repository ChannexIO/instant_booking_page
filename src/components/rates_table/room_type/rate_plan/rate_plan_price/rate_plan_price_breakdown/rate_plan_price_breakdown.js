import React, { forwardRef } from 'react';
import { Popover } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import Currency from 'components/currency';

import styles from './rate_plan_price_breakdown.module.css';

const DECIMAL_PLACES = 2;

const RatePlanPriceBreakdown = forwardRef(({ ratePlan, currency, className, ...popoverProps }, ref) => {
  const { t } = useTranslation();
  const { price, taxFreePrice, lengthOfStay, taxes } = ratePlan;

  const perNightPrice = (taxFreePrice / lengthOfStay).toFixed(DECIMAL_PLACES);
  const popoverClassName = [className, styles.popover].join(' ');

  return (
    <Popover
      className={popoverClassName}
      ref={ref}
      // OverlayTrigger add bunch of props that should be bypassed to popover
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...popoverProps}
    >
      <Popover.Title>
        <div className={styles.priceRow}>
          <span>
            <Currency currency={currency} amount={perNightPrice} />
            {`x ${lengthOfStay} nights`}
          </span>
          <Currency currency={currency} amount={taxFreePrice} />
        </div>
        {taxes.map((tax) => (
          <div className={styles.priceRow} key={tax.title}>
            <span>{tax.title}</span>
            <Currency currency={currency} amount={tax.amount} />
          </div> 
        ))}
      </Popover.Title>
      <Popover.Content className={styles.totalContainer}>
        <span className={styles.totalLabel}>{t('rates_table:total_price')}</span>
        <Currency
          className={styles.totalPrice}
          currency={currency}
          amount={price}
        />
      </Popover.Content>
    </Popover>
  );
});

export default RatePlanPriceBreakdown;