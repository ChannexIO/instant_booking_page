import { useCallback } from 'react';

import getBookingParamsFromUrl from '../utils/get_booking_params_from_url';

export default () => {
  const init = useCallback((channelId, bookingActions, savedState) => {
    if (!channelId) {
      const bookingQueryParams = getBookingParamsFromUrl();

      bookingActions.initBookingData(bookingQueryParams, savedState);
    }
  }, []);

  const appActions = {
    init,
  };

  return { appActions };
};
