import moment from 'moment';

import { DATE_FORMAT } from 'constants/formats';
import getUrlParams from 'utils/get_url_params';

const DEFAULT_PARAMS = {
  children: 0,
  adults: 1,
};

export default function getBookingParamsFromUrl() {
  const {
    currency,
    checkinDate,
    checkoutDate,
    adults,
    children,
    childrenAge,
  } = getUrlParams();

  const optionalParams = DEFAULT_PARAMS;

  const parsedStartDate = moment(checkinDate, DATE_FORMAT);
  const parsedEndDate = moment(checkoutDate, DATE_FORMAT);

  if (checkinDate && parsedStartDate.isValid()) {
    optionalParams.checkinDate = parsedStartDate;
  }

  if (checkoutDate && parsedEndDate.isValid()) {
    optionalParams.checkoutDate = parsedEndDate;
  }
  if (childrenAge) {
    const processedChildrenAge = childrenAge.split(',')
      .map((val) => (val ? Number(val) : null));

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

  return ({ ...optionalParams, currency });
}
