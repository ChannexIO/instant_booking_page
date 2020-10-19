import moment from 'moment';

import { DEFAULT_CURRENCY } from 'constants/defaults';
import { DATE_FORMAT } from 'constants/formats';
import getUrlParams from 'utils/get_url_params';

export default function getSearchParamsFromUrl() {
  const {
    currency = DEFAULT_CURRENCY,
    checkinDate,
    checkoutDate,
    adults,
    children,
    childrenAge,
  } = getUrlParams();

  const optionalParams = {};

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

  if (!Number.isNaN(Number(children))) {
    optionalParams.children = Number(children);
  }

  if (!Number.isNaN(Number(adults))) {
    optionalParams.adults = Number(adults);
  }

  return ({ ...optionalParams, currency });
}
