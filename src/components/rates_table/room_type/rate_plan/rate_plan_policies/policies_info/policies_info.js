import React from 'react';

import Tooltip from 'components/tooltip';

import PoliciesBreakdown from './policies_breakdown';

import styles from './policies_info.module.css';

export default function PoliciesInfo({ ratePlan }) {
  return (
    <Tooltip className={styles.tooltip}>
      <PoliciesBreakdown ratePlan={ratePlan} />
    </Tooltip>
  );
}
