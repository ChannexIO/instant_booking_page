import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import moment from "moment";

import RangePicker from "components/rangepicker";

import { DATE_FORMAT } from "constants/formats";
import dateFormatter from "utils/date_formatter";
import getUrlParams from "utils/get_url_params";
import setUrlParams from "utils/set_url_params";

export default function DateSelect({ bookingParams, handleSearchChange }) {
  const { t } = useTranslation();
  const history = useHistory();
  const urlParams = getUrlParams();

  const handleDatesChange = useCallback(
    ({ startDate, endDate }) => {
      const formattedDates = {
        checkinDate: dateFormatter.toClient(startDate),
        checkoutDate: dateFormatter.toClient(endDate),
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
      checkinDate={bookingParams.checkinDate || moment(urlParams.checkinDate, DATE_FORMAT)}
      checkoutDate={bookingParams.checkoutDate || moment(urlParams.checkoutDate, DATE_FORMAT)}
      name="search_dates"
      onDatesChange={handleDatesChange}
    />
  );
}
