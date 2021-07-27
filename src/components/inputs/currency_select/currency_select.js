import React, { useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";

import CurrencySelectControlled from "components/inputs/currency_select_controlled";

import { BookingActionsContext, BookingDataContext } from "containers/data_context";

import { DEFAULT_CURRENCY } from "constants/defaults";
import setUrlParams from "utils/set_url_params";

export default function CurrencySelect() {
  const history = useHistory();
  const { params, property, channelId } = useContext(BookingDataContext);
  const { setParamsAndLoadRoomsInfo } = useContext(BookingActionsContext);
  const { data: propertyData } = property;

  const preferredCurrency = propertyData?.currency || DEFAULT_CURRENCY;

  const handleCurrencyChange = useCallback(
    (currency) => {
      setUrlParams({ currency }, history);

      const roomParams = { ...params, currency };
      setParamsAndLoadRoomsInfo(channelId, roomParams);
    },
    [history, setParamsAndLoadRoomsInfo, params, channelId],
  );

  return (
    <CurrencySelectControlled
      value={params.currency}
      preferredCurrency={preferredCurrency}
      onChange={handleCurrencyChange}
    />
  );
}
