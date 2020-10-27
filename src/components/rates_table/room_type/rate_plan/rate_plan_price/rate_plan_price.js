import React from 'react';
import { useTranslation } from 'react-i18next';

import Caption from 'components/caption';
import Currency from 'components/currency';
import Cell from 'components/layout/cell';
import Tooltip from 'components/tooltip';

import RatePlanPriceBreakdown from './rate_plan_price_breakdown';

import styles from './rate_plan_price.module.css';

export default function RatePlanPrice({ ratePlan, currency }) {
  const { t } = useTranslation();

  const { totalPrice } = ratePlan;

  return (
    <Cell className={styles.ratePlanPriceCell}>
      <div className={styles.ratePlanPriceContainer}>
        <div className={styles.ratePlanPrice}>
          <Currency currency={currency} amount={totalPrice} />
        </div>
        <Tooltip>
          <RatePlanPriceBreakdown ratePlan={ratePlan} currency={currency} />
        </Tooltip>
      </div>
      <Caption>
        {t('rates_table:includes_taxes')}
      </Caption>
    </Cell>
  );
}
