import React from "react";
import { useTranslation } from "react-i18next";

import CurrencyConversionWarning from "components/currency_conversion_warning";
import ExpandableContainer from "components/layout/expandable_container";
import MobileSummaryContainer from "components/layout/mobile_summary_container";
import SubmitBookingButton from "components/payment_form/submit_booking_button";
import PriceBreakdown from "components/search_section/price_breakdown";
import TotalPrice from "components/search_section/total_price";

import Dates from "../dates";
import Guests from "../guests";

export default function MobileSummary({ params, selectedRatesByRoom, total }) {
  const { t } = useTranslation();
  const { checkinDate, checkoutDate, currency } = params;

  return (
    <MobileSummaryContainer>
      <ExpandableContainer title={t("payment_page:booking_summary:title")}>
        <Dates checkinDate={checkinDate} checkoutDate={checkoutDate} />
        <Guests params={params} />
        <PriceBreakdown selectedRatesByRoom={selectedRatesByRoom} currency={currency} />
        <TotalPrice totalPrice={total} currency={currency} />
      </ExpandableContainer>
      <CurrencyConversionWarning />
      <SubmitBookingButton />
    </MobileSummaryContainer>
  );
}
