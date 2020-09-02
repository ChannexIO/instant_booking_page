import moment from 'moment';

import getUrlParams from 'utils/get_url_params';

import { DEFAULT_CURRENCY } from 'constants/defaults';
import { DATE_FORMAT } from 'constants/formats';

export default function initSearchParamsFromUrl(callback) {
  const {
    currency = DEFAULT_CURRENCY,
    startDate,
    endDate,
    adults,
    children,
    childrenAge,
  } = getUrlParams();
  
  const optionalParams = {};

  const parsedStartDate = moment(startDate, DATE_FORMAT);
  const parsedEndDate = moment(endDate, DATE_FORMAT);

  if (startDate && parsedStartDate.isValid()) {
    optionalParams.startDate = parsedStartDate;
  }

  if (endDate && parsedEndDate.isValid()) {
    optionalParams.endDate = parsedEndDate;
  }
  if (childrenAge) {
    const processedChildrenAge = childrenAge.split(',')
      .map((val) => val ? Number(val) : null);

    optionalParams.childrenAge = processedChildrenAge;
  }

  if (!Number.isNaN(Number(children))) {
    optionalParams.children = Number(children);
  }

  if (!Number.isNaN(Number(adults))) {
    optionalParams.adults = Number(adults);
  }

  callback({ ...optionalParams, currency });
}