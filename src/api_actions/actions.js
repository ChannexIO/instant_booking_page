import dateFormatter from 'utils/date_formatter';

import convertClosedDatesToClientFormat from './utils/convert_closed_dates_to_client_format';
import transport from './utils/transport';

const PATH_PREFIX = `/api/v1/meta/${process.env.REACT_APP_CHANNEL_CODE}`;

export default {
  getPropertyInfo: (propertyChannelId) => {
    return transport.get(`${PATH_PREFIX}/${propertyChannelId}/property_info`);
  },

  getClosedDates: async (propertyChannelId) => {
    const rawDates = await transport.get(`${PATH_PREFIX}/${propertyChannelId}/closed_dates`);
    const convertedData = convertClosedDatesToClientFormat(rawDates);

    return convertedData;
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
