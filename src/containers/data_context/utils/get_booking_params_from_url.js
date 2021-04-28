import moment from "moment";
import currencies from "world-currencies";

import { DATE_API_FORMAT } from "constants/formats";
import getUrlParams from "utils/get_url_params";

const DEFAULT_PARAMS = {
  children: 0,
  adults: 1,
};

export default function getBookingParamsFromUrl() {
  const { currency, checkinDate, checkoutDate, adults, children, childrenAge } = getUrlParams();

  const optionalParams = DEFAULT_PARAMS;

  const parsedStartDate = moment(checkinDate, DATE_API_FORMAT);
  const parsedEndDate = moment(checkoutDate, DATE_API_FORMAT);

  if (checkinDate && parsedStartDate.isValid()) {
    const isCheckinAfterCurrent = moment().isSameOrBefore(parsedStartDate, "day");

    optionalParams.checkinDate = isCheckinAfterCurrent ? parsedStartDate : null;
  }

  if (checkoutDate && parsedEndDate.isValid()) {
    const { checkinDate: parsedCheckinDate } = optionalParams;
    const isCheckoutValid = parsedCheckinDate && parsedCheckinDate.isBefore(parsedEndDate, "day");

    optionalParams.checkoutDate = isCheckoutValid ? parsedEndDate : null;
  }

  if (childrenAge) {
    const processedChildrenAge = childrenAge.split(",").map((val) => (val ? Number(val) : null));

    optionalParams.childrenAge = processedChildrenAge;
  }

  const parsedChildrenAmount = Number(children);
  if (!Number.isNaN(parsedChildrenAmount)) {
    optionalParams.children = Math.max(DEFAULT_PARAMS.children, parsedChildrenAmount);
  }

  const parsedAdultsAmount = Number(adults);
  if (!Number.isNaN(parsedAdultsAmount)) {
    optionalParams.adults = Math.max(DEFAULT_PARAMS.adults, parsedAdultsAmount);
  }

  const isValidCurrency = currencies[currency];
  if (isValidCurrency) {
    optionalParams.currency = currency;
  }

  return { ...optionalParams };
}
