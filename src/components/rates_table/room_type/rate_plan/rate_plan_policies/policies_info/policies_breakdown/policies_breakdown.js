import React, { forwardRef } from 'react';
import { Popover } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import PolicySection from './policy_section';

import styles from './policies_breakdown.module.css';

const PoliciesBreakdown = forwardRef(({ ratePlan, className, ...popoverProps }, ref) => {
  const { t } = useTranslation();

  const popoverClassName = [className, styles.popover].join(' ');

  // OverlayTrigger add bunch of props that should be bypassed to popover
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <Popover className={popoverClassName} ref={ref} {...popoverProps}>
      <Popover.Content>
        <PolicySection title={t('rates_table:meals')} text="Lorem ipsum dolor sit amet, consectetur adipiscing eli" />
        <PolicySection title={t('rates_table:cancellation')} text="Lorem ipsum dolor sit amet, consectetur adipiscing eli" />
        <PolicySection title={t('rates_table:prepayment')} text="Lorem ipsum dolor sit amet, consectetur adipiscing eli" />
      </Popover.Content>
    </Popover>
  );
});

export default PoliciesBreakdown;