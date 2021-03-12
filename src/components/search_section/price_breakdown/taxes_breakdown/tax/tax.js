import React from 'react';

import Currency from 'components/currency';
import Cell from 'components/layout/cell';

import styles from './tax.module.css';

export default function Tax({ tax, currency }) {
  const taxBaseValue = tax.rate;
  const taxBaseCurrency = tax.mode === 'percent' ? '%' : currency;

  return (
    <Cell className={styles.tax}>
      <span>
        {`${tax.title} (`}
          <Currency amount={taxBaseValue} currency={taxBaseCurrency} />
        )
      </span>
      <Currency amount={tax.amount} currency={currency} />
    </Cell>
  );
}
