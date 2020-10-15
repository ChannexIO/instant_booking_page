import dateFormatter from 'utils/date_formatter';

export default (closedDates) => {
  return Object.keys(closedDates)
    .reduce((acc, key) => {
      const closedDatesEntry = closedDates[key];

      if (!Array.isArray(closedDatesEntry)) {
        return acc;
      }

      acc[key] = closedDatesEntry.map(dateFormatter.toClient);

      return acc;
    }, {});
};