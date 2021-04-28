import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import RangePicker from "components/rangepicker";

import dateFormatter from "utils/date_formatter";
import setUrlParams from "utils/set_url_params";

export default function DateSelect({ bookingParams, handleSearchChange }) {
  const { t } = useTranslation();
  const history = useHistory();

  const handleDatesChange = useCallback(
    ({ startDate, endDate }) => {
      const formattedDates = {
        checkinDate: dateFormatter.toApi(startDate),
        checkoutDate: dateFormatter.toApi(endDate),
      };
      setUrlParams(formattedDates, history);
      handleSearchChange({ ...bookingParams, checkinDate: startDate, checkoutDate: endDate });
    },
    [history, bookingParams, handleSearchChange],
  );

  return (
    <RangePicker
      checkinDateLabel={t("hotel_page:checkin_label")}
      checkoutDateLabel={t("hotel_page:checkout_label")}
      checkinDatePlaceholder={t("hotel_page:checkin_placeholder")}
      checkoutDatePlaceholder={t("hotel_page:checkout_placeholder")}
      checkinDate={bookingParams.checkinDate}
      checkoutDate={bookingParams.checkoutDate}
      name="search_dates"
      onDatesChange={handleDatesChange}
    />
  );
}
