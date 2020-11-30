import dateFormatter from 'utils/date_formatter';

const DATE_MAPS_KEYS = [
  'minStayArrival',
  'minStayThrough',
];

export default (closedDates) => {
  console.log(closedDates);
  return Object.keys(closedDates)
    .reduce((acc, key) => {
      const closedDatesEntry = closedDates[key];

      if (DATE_MAPS_KEYS.includes(key)) {
        acc[key] = Object.keys(closedDatesEntry)
          .reduce((newEntry, originalKey) => {
            const formattedKey = dateFormatter.toClient(originalKey);
            const updatedEntry = {
              ...newEntry,
              [formattedKey]: closedDatesEntry[originalKey],
            };

            return updatedEntry;
          }, {});

        return acc;
      }

      if (Array.isArray(closedDatesEntry)) {
        acc[key] = closedDatesEntry.map(dateFormatter.toClient);
      }

      return acc;
    }, {});
};
