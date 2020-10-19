import React from 'react';

import CancellationPolicy from './cancellation_policy';
import PaymentPolicy from './payment_policy';
import PoliciesInfo from './policies_info';

import styles from './rate_plan_policies.module.css';

export default function RatePlanPolicies({ ratePlan }) {
  return (
    <div className={styles.policyContainer}>
      <PoliciesInfo ratePlan={ratePlan} />
      <CancellationPolicy cancellationPolicy={ratePlan.cancellationPolicy} />
      <PaymentPolicy paymentPolicy={ratePlan.paymentPolicy} />
    </div>
  );
}
