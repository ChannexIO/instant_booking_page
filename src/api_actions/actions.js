import dateFormatter from 'utils/date_formatter';

import convertClosedDatesToClientFormat from './utils/convert_closed_dates_to_client_format';
import transport from './utils/transport';

const PATH_PREFIX = `/api/v1/meta/${process.env.REACT_APP_CHANNEL_CODE}`;
const PCI_PATH_PREFIX = '/api/v1';

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
    let formattedQueryParams = {
      ...queryParams,
    };

    const formattedDates = {
      checkinDate: dateFormatter.toApi(queryParams.checkinDate),
      checkoutDate: dateFormatter.toApi(queryParams.checkoutDate),
    };

    if (formattedDates.checkinDate && formattedDates.checkoutDate) {
      formattedQueryParams = { ...formattedQueryParams, ...formattedDates };
    }

    return transport.get(`${PATH_PREFIX}/${propertyChannelId}/rooms`, formattedQueryParams);
  },

  getBestOffer: (propertyChannelId, queryParams) => {
    const formattedQueryParams = {
      currency: queryParams.currency,
    };

    if (queryParams.checkinDate && queryParams.checkoutDate) {
      formattedQueryParams.checkinDate = dateFormatter.toApi(queryParams.checkinDate);
      formattedQueryParams.checkoutDate = dateFormatter.toApi(queryParams.checkoutDate);
    }

    return transport.get(`${PATH_PREFIX}/${propertyChannelId}/best_offer`, formattedQueryParams);
  },

  createBooking: (propertyChannelId, booking) => {
    return transport.post(`${PATH_PREFIX}/${propertyChannelId}/push_booking`, { booking });
  },

  getPciSessionToken: () => {
    const payload = {
      sessionToken: {
        scope: 'card',
      },
    };

    const queryParams = {
      apiKey: process.env.REACT_APP_CAPTURE_CARD_API_KEY,
    };

    return transport.pciPost(`${PCI_PATH_PREFIX}/session_tokens`, payload, queryParams);
  },
};
