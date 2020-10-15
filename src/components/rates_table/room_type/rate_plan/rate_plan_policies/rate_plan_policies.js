import React from 'react';

import MealPolicy from './meal_policy';
import CancellationPolicy from './cancellation_policy';
import PaymentPolicy from './payment_policy';
import PoliciesInfo from './policies_info';

import styles from './rate_plan_policies.module.css';

export default function RatePlanPolicies({ ratePlan, currency }) {

  return (
    <div className={styles.policyContainer}>
      <PoliciesInfo ratePlan={ratePlan} />
      {/* <MealPolicy mealPolicy={ratePlan.mealPolicy} currency={currency} /> //TODO - fix when rate.mealType added */}
      <CancellationPolicy cancellationPolicy={ratePlan.cancellationPolicy} />
      <PaymentPolicy paymentPolicy={ratePlan.paymentPolicy} />
    </div>
  );
}