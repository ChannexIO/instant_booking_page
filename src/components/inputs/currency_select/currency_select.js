import React, { useContext, useEffect, useState } from 'react';
import currencies from 'world-currencies';
import { useHistory } from 'react-router-dom';

import Select from 'components/inputs/select';

import { DataContext, ActionsContext } from 'containers/data_context';

import setUrlParams from 'utils/set_url_params';

export default function CurrencySelect() {
  const [currencyOptions, setCurrencyOptions] = useState([]); 
  const history = useHistory();
  const { searchParams } = useContext(DataContext);
  const { setSearchParams } = useContext(ActionsContext);


  const handleCurrencyChange = (currency) => {
    setUrlParams({ currency }, history);
    setSearchParams({ ...searchParams, currency });
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
    <Select value={searchParams.currency} options={currencyOptions} onChange={handleCurrencyChange}>
      {searchParams.currency}
    </Select>
  );
}
