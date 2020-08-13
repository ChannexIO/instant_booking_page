import React, { useEffect, useState } from 'react';
import currencies from "world-currencies";
import { useHistory } from "react-router-dom";

import Select from "components/inputs/select";

import getUrlParams from "utils/get_url_params";
import setUrlParams from "utils/set_url_params";

import { DEFAULT_CURRENCY } from "constants/defaults";

export default function HotelCurrency(params) {
  const [activeCurrency, setActiveCurrency] = useState(DEFAULT_CURRENCY);
  const [currencyOptions, setCurrencyOptions] = useState([]); 
  const history = useHistory();

  const setCurrencyFromURL = () => {
    const { currency = DEFAULT_CURRENCY } = getUrlParams();

    setActiveCurrency(currency);
  }

  const handleCurrencyChange = (currency) => {
    setUrlParams({ currency }, history);
    setActiveCurrency(currency)
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

  useEffect(function setHistoryListener() {
    return history.listen(() => {
      setCurrencyFromURL();
    })
  }, [history]);

  return (
    <Select value={activeCurrency} options={currencyOptions} onChange={handleCurrencyChange}>
      {activeCurrency}
    </Select>
  )
}
