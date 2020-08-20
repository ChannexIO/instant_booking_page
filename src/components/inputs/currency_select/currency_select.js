import React, { useEffect, useState } from 'react';
import currencies from "world-currencies";
import { useHistory } from "react-router-dom";

import Select from "components/inputs/select";

import getUrlParams from "utils/get_url_params";
import setUrlParams from "utils/set_url_params";

import { DEFAULT_CURRENCY } from "constants/defaults";

export default function CurrencySelect({ searchParams, handleSearchChange }) {
  const [currencyOptions, setCurrencyOptions] = useState([]); 
  const history = useHistory();

  const setCurrencyFromURL = () => {
    const { currency = DEFAULT_CURRENCY } = getUrlParams();

    handleSearchChange({ ...searchParams, currency });
  }

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
    setCurrencyFromURL();
  }, []);

  return (
    <Select value={searchParams.currency} options={currencyOptions} onChange={handleCurrencyChange}>
      {searchParams.currency}
    </Select>
  )
}
