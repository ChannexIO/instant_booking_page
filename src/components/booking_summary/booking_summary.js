import React, { useEffect, useState } from "react";
import { useMedia } from "react-media";

import MEDIA_QUERIES from "constants/media_queries";
import calculateSummaryParams from "utils/calculate_summary_params";

import MobileSummary from "./mobile_summary";
import Summary from "./summary";

import styles from "./booking_summary.module.css";

export default function BookingSummary({ property, rooms, params, onBook }) {
  const [selectedRatesByRoom, setSelectedRatesByRoom] = useState({});
  const matchedQueries = useMedia({ queries: MEDIA_QUERIES });
  const [total, setTotal] = useState(0);
  const { ratesOccupancyPerRoom } = params;
  const isMobile = matchedQueries.xs || matchedQueries.sm || matchedQueries.md;
  const SummaryComponent = isMobile ? MobileSummary : Summary;

  useEffect(
    function setSummaryParams() {
      const summaryParams = calculateSummaryParams(rooms, ratesOccupancyPerRoom);

      if (!summaryParams) {
        return;
      }

      setTotal(summaryParams.total);
      setSelectedRatesByRoom(summaryParams.selectedRatesByRoom);
    },
    [rooms, ratesOccupancyPerRoom],
  );

  return (
    <>
      <SummaryComponent
        property={property}
        params={params}
        total={total}
        selectedRatesByRoom={selectedRatesByRoom}
        onBook={onBook}
      />
      <div className={styles.summaryPoliciesWrapper} />
    </>
  );
}
