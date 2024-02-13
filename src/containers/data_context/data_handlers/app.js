import { useCallback, useMemo, useReducer } from "react";
import { useHistory } from "react-router-dom";

import routes from "routing/routes";

import buildPath from "utils/build_path";
import getBookingParamsFromUrl from "utils/get_booking_params_from_url";
import getChannelId from "utils/get_channel_id";

import { INITIAL_STATE, reducer } from "./reducers/app_data";

export default () => {
  const [appData] = useReducer(reducer, INITIAL_STATE);
  const history = useHistory();

  const init = useCallback(
    async (bookingActions, savedState) => {
      const channelId = getChannelId();
      const bookingQueryParams = { channelId, ...getBookingParamsFromUrl() };

      try {
        await bookingActions.initBookingData(bookingQueryParams, savedState);
      } catch (e) {
        if (e.message === "PROPERY_NOT_FOUND") {
          const redirectRoute = buildPath("", routes.default);

          history.push(redirectRoute);
        }
      }
    },
    [history],
  );

  const appActions = useMemo(
    () => ({
      init,
    }),
    [init],
  );

  return useMemo(() => ({ appData, appActions }), [appData, appActions]);
};
