import React from 'react';
import { useTranslation } from "react-i18next";

import RatePlanOccupancy from "./rate_plan_occupancy";
import RatePlanPrice from "./rate_plan_price";
import RatePlanCancellationPolicy from "./rate_plan_cancellation_policy";

export default function RatePlan({ ratePlan }) {
  const { t } = useTranslation();

  return (
    <>
      <td><RatePlanOccupancy occupancy={ratePlan.occupancy} /></td>
      <td><RatePlanPrice ratePlan={ratePlan} /></td>
      <td><RatePlanCancellationPolicy ratePlan={ratePlan} /></td>
      <td>{t("rates_table:select_rooms")}</td>
    </>
  )
}