import React from "react";

import Cell from "components/layout/cell";

import CancellationPolicy from "./cancellation_policy";
import MealPolicy from "./meal_policy";
import PaymentPolicy from "./payment_policy";
import PoliciesInfo from "./policies_info";

import styles from "./rate_plan_policies.module.css";

export default function RatePlanPolicies({ ratePlan, hotelPolicy, checkinDate }) {
  return (
    <Cell className={styles.policyCell}>
      <div className={styles.policyContainer}>
        <div className={styles.mealContainer}>
          <MealPolicy mealPolicy={ratePlan.mealType} />
          <PoliciesInfo ratePlan={ratePlan} />
        </div>
        <CancellationPolicy
          cancellationPolicy={ratePlan.cancellationPolicy}
          lengthOfStay={ratePlan.lengthOfStay}
          checkinDate={checkinDate}
          hotelPolicy={hotelPolicy}
        />
        <PaymentPolicy cancellationPolicy={ratePlan.cancellationPolicy} />
      </div>
    </Cell>
  );
}
