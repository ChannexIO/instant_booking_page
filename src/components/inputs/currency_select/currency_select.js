import React, { useEffect, useState } from 'react';
import currencies from 'world-currencies';
import { useHistory } from 'react-router-dom';

import Select from 'components/inputs/select';

import setUrlParams from 'utils/set_url_params';

export default function CurrencySelect({ searchParams, handleSearchChange }) {
  const [currencyOptions, setCurrencyOptions] = useState([]); 
  const history = useHistory();

  const handleCurrencyChange = (currency) => {
    setUrlParams({ currency }, history);
    handleSearchChange({ ...searchParams, currency });
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
