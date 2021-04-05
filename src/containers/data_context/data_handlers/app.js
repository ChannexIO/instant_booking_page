import { useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";

import routes from "routing/routes";

import buildPath from "utils/build_path";

import getBookingParamsFromUrl from "../utils/get_booking_params_from_url";

export default () => {
  const history = useHistory();
  const location = useLocation();

  const init = useCallback(
    async (channelId, bookingActions, savedState) => {
      if (!channelId) {
        const bookingQueryParams = getBookingParamsFromUrl();
        try {
          await bookingActions.initBookingData(location, bookingQueryParams, savedState);
        } catch (e) {
          if (e.message === "PROPERY_NOT_FOUND") {
            const redirectRoute = buildPath("", routes.default);

            history.push(redirectRoute);
          }
        }
      }
    },
    [location, history],
  );

  const appActions = {
    init,
  };

  return { appActions };
};
