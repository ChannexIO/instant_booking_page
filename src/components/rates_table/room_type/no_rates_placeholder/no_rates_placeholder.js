import React from 'react';
import { useTranslation } from 'react-i18next';

import Caption from 'components/caption';
import Cell from 'components/layout/cell';

import IconHelp from 'static/icons-help.svg';

import styles from './no_rates_placeholder.module.css';

export default function NoRatesPlaceholder() {
  const { t } = useTranslation();

  return (
    <Cell className={styles.placeholderContainer}>
      <div className={styles.placeholderContent}>
        <img
          className={styles.icon}
          src={IconHelp}
          alt="Info"
        />
        <Caption>
          {t('rates_table:no_rates_placeholder')}
        </Caption>
      </div>
    </Cell>
  );
}
