import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import currencies from 'world-currencies';

import Select from 'components/inputs/select';

import { BookingActionsContext, BookingDataContext } from 'containers/data_context';

import setUrlParams from 'utils/set_url_params';

export default function CurrencySelect() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const history = useHistory();
  const { params } = useContext(BookingDataContext);
  const { setParams } = useContext(BookingActionsContext);

  const handleCurrencyChange = (currency) => {
    setUrlParams({ currency }, history);
    setParams({ ...params, currency });
  };

  useEffect(function initSelectorState() {
    const options = Object.values(currencies)
      .map(({ name, iso }) => ({
        key: iso.code,
        value: `${name} (${iso.code})`,
      }));

    setCurrencyOptions(options);
  }, []);

  return (
    <Select value={params.currency} options={currencyOptions} onChange={handleCurrencyChange}>
      {params.currency}
    </Select>
  );
}
