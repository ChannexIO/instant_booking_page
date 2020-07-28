import React from 'react';
import { useTranslation } from "react-i18next";

export default function RatePlan({ ratePlan }) {
  const { t } = useTranslation();

  return (
    <>
      <td>{ratePlan.occupancy}</td>
      <td>{t("rates_table:price")}</td>
      <td>{ratePlan.cancellationPolicy}</td>
      <td>{t("rates_table:select_rooms")}</td>
    </>
  )
}