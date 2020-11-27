import dateFormatter from 'utils/date_formatter';

export default (closedDates) => {
  return Object.keys(closedDates)
    .reduce((acc, key) => {
      const closedDatesEntry = closedDates[key];

      if (!Array.isArray(closedDatesEntry)) {
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

      acc[key] = closedDatesEntry.map(dateFormatter.toClient);

      return acc;
    }, {});
};
