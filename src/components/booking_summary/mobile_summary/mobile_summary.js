import React from 'react';
import { useTranslation } from "react-i18next";

import PriceBreakdown from "components/search_section/price_breakdown";  
import TotalPrice from "components/search_section/total_price";
import MobileSummaryContainer from "components/layout/mobile_summary_container";
import ExpandableContainer from "components/layout/expandable_container";

import Button from "components/button";

import Dates from "../dates";
import Guests from "../guests";

export default function MobileSummary({ params, selectedRatesByRoom, total, loading, disabled, onBook }) {
  const { t } = useTranslation();
  const { checkinDate, checkoutDate, adults, children, currency } = params;

  return (
    <MobileSummaryContainer>
      <ExpandableContainer title={t("payment_page:booking_summary:title")}>
        <Dates checkinDate={checkinDate} checkoutDate={checkoutDate} />
        <Guests adultGuests={adults} childrenGuests={children} />
        <PriceBreakdown 
          selectedRatesByRoom={selectedRatesByRoom}
          currency={currency}
        />
        <TotalPrice totalPrice={total} currency={currency} />
      </ExpandableContainer>
      <Button
        loading={loading}
        disabled={disabled}
        onClick={onBook}
      >
        {t("payment_page:agree_and_book")}
      </Button>
    </MobileSummaryContainer>
  );
}