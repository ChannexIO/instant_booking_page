import { useCallback, useMemo, useReducer } from "react";
import { useHistory, useLocation } from "react-router-dom";

import routes from "routing/routes";

import buildPath from "utils/build_path";

import getBookingParamsFromUrl from "../utils/get_booking_params_from_url";

import { INITIAL_STATE, reducer } from "./reducers/app_data";

export default () => {
  const [appData] = useReducer(reducer, INITIAL_STATE);
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

  const appActions = useMemo(
    () => ({
      init,
    }),
    [init],
  );

  return useMemo(() => ({ appData, appActions }), [appData, appActions]);
};
