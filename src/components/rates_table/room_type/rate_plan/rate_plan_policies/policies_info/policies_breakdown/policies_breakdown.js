import React, { forwardRef } from 'react';
import { Popover } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import PolicySection from './policy_section';

import styles from './policies_breakdown.module.css';

const PoliciesBreakdown = forwardRef(({ ratePlan, ...popoverProps }, ref) => {
  const { t } = useTranslation();

  return (
    // OverlayTrigger add bunch of props that should be bypassed to popover
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Popover ref={ref} {...popoverProps}>
      <div className={styles.policiesContainer}>
        <PolicySection title={t('rates_table:meals')} text="Lorem ipsum dolor sit amet, consectetur adipiscing eli" />
        <PolicySection title={t('rates_table:cancellation')} text="Lorem ipsum dolor sit amet, consectetur adipiscing eli" />
        <PolicySection title={t('rates_table:prepayment')} text="Lorem ipsum dolor sit amet, consectetur adipiscing eli" />
      </div>
    </Popover>
  );
});

export default PoliciesBreakdown;