import React from "react";
import { useTranslation } from "react-i18next";

import ExpandableContainer from "components/layout/expandable_container";
import MobileSummaryContainer from "components/layout/mobile_summary_container";

import ActionButton from "../action_button";
import MissingSpaces from "../missing_spaces";
import PriceBreakdown from "../price_breakdown";
import TotalPrice from "../total_price";

export default function MobileSummary(props) {
  const { t } = useTranslation();
  const {
    selectedRatesByRoom,
    isDatesSelected,
    isRateSelected,
    missingSpaces,
    totalPrice,
    currency,
    loading,
    onBook,
    onSearch,
  } = props;

  return (
    <MobileSummaryContainer>
      {isRateSelected && (
        <>
          <ExpandableContainer title={t("hotel_page:booking_summary")}>
            <PriceBreakdown selectedRatesByRoom={selectedRatesByRoom} currency={currency} />
            <TotalPrice totalPrice={totalPrice} currency={currency} />
          </ExpandableContainer>
          <MissingSpaces missingSpaces={missingSpaces} />
        </>
      )}
      <ActionButton
        isDatesSelected={isDatesSelected}
        isRateSelected={isRateSelected}
        missingSpaces={missingSpaces}
        total={totalPrice}
        currency={currency}
        loading={loading}
        onBook={onBook}
        onSearch={onSearch}
      />
    </MobileSummaryContainer>
  );
}
