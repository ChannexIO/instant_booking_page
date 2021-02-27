import moment from 'moment';

import { DATE_API_FORMAT } from 'constants/formats';

const convertToHashmap = (array) => array.reduce((acc, key) => ({ ...acc, [key]: true }), {});

const buildRangeBlockedHash = (closedHash, rangeRestrictions) => {
  return Object.keys(rangeRestrictions).reduce((acc, key) => {
    const restrictionValue = rangeRestrictions[key];

    const affectedRange = new Array(restrictionValue)
      .fill(null)
      .map((_value, index) => moment(key, DATE_API_FORMAT).add(index).format(DATE_API_FORMAT));

    affectedRange.pop(); // reduce range by one because closed date could be used for checkout;

    const isRangeIncludesClosed = affectedRange.some((val) => closedHash[val]);

    if (!isRangeIncludesClosed) {
      return acc;
    }

    const rangeBlockedHash = convertToHashmap(affectedRange);

    return { ...acc, ...rangeBlockedHash };
  }, {});
};

export default (data) => {
  if (!data) {
    return null;
  }

  const { closed, closedToArrival, closedToDeparture, minStayArrival, minStayThrough } = data;

  const closedHash = convertToHashmap(closed);
  const CTAHash = convertToHashmap(closedToArrival);
  const CTDHash = convertToHashmap(closedToDeparture);

  const rangeBlockedByMinStayArrival = buildRangeBlockedHash(closedHash, minStayArrival);
  const rangeBlockedByMinStayThrough = buildRangeBlockedHash(closedHash, minStayThrough);

  const enrichedCTAHash = {
    ...closedHash,
    ...CTAHash,
    ...rangeBlockedByMinStayArrival,
    ...rangeBlockedByMinStayThrough,
  };

  const enrichCTDHash = {
    ...CTDHash,
  };

  return {
    ...data,
    closedHash,
    closedToArrivalHash: enrichedCTAHash,
    closedToDepartureHash: enrichCTDHash,
  };
};
