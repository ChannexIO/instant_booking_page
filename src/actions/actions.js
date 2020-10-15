import dateFormatter from 'utils/date_formatter';

import transport from './utils/transport';

const PATH_PREFIX = `/api/v1/meta/${process.env.REACT_APP_CHANNEL_CODE}`;

export default {
  getPropertyInfo: (propertyChannelId) => {
    return transport.get(`${PATH_PREFIX}/${propertyChannelId}/property_info`);
  },

  getClosedDates: (propertyChannelId) => {
    return transport.get(`${PATH_PREFIX}/${propertyChannelId}/closed_dates`);
  },

  getRoomsInfo: (propertyChannelId, queryParams) => {
    const formattedQueryParams = {
      ...queryParams,
      checkinDate: dateFormatter.toApi(queryParams.checkinDate),
      checkoutDate: dateFormatter.toApi(queryParams.checkoutDate),
    };

    return transport.get(`${PATH_PREFIX}/${propertyChannelId}/rooms`, formattedQueryParams);
  },
};