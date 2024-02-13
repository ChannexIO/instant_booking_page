import moment from "moment";

import { DATE_API_FORMAT } from "constants/formats";

const convertToHashmap = (array) => array.reduce((acc, key) => ({ ...acc, [key]: true }), {});

const buildAffectedRange = (startDay, length) => {
  return new Array(length)
    .fill(null)
    .map((_value, index) =>
      moment(startDay, DATE_API_FORMAT).add(index, "day").format(DATE_API_FORMAT),
    );
};

const buildRangeBlockedHash = (closedHash, rangeRestrictions) => {
  return Object.keys(rangeRestrictions).reduce((acc, key) => {
    const restrictionValue = rangeRestrictions[key];

    const affectedRange = buildAffectedRange(key, restrictionValue);
    const isRangeIncludesClosed = affectedRange.some((val) => closedHash[val]);

    if (!isRangeIncludesClosed) {
      return acc;
    }

    return { ...acc, [key]: true };
  }, {});
};

export default (data) => {
  if (!data) {
    return null;
  }

  const { closed, closedToArrival, closedToDeparture, minStayArrival, minStayThrough } = data;

  const filteredClosedDates = closed.filter((date, index) => {
    if (index !== 0) {
      if (moment(date).diff(moment(closed[index - 1]), "day") > 1) {
        closedToArrival.push(date);
        return false;
      }
      return true;
    }
    return true;
  });

  const closedHash = convertToHashmap(filteredClosedDates);
  // const CTAHash = convertToHashmap(closedToArrival);
  const CTDHash = convertToHashmap(closedToDeparture);

  const closedToArrivalHash = convertToHashmap(closedToArrival);

  const rangeBlockedByMinStayArrival = buildRangeBlockedHash(closedHash, minStayArrival);
  const rangeBlockedByMinStayThrough = buildRangeBlockedHash(closedHash, minStayThrough);

  const closedToArrivalByMinStayHash = {
    ...rangeBlockedByMinStayThrough,
    ...rangeBlockedByMinStayArrival,
  };

  const closedToDepartureHash = {
    ...CTDHash,
  };

  return {
    ...data,
    closedHash,
    closedToArrivalHash,
    closedToArrivalByMinStayHash,
    closedToDepartureHash,
  };
};
