import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import currencies from 'world-currencies';

import Select from 'components/inputs/select';

import { BookingActionsContext, BookingDataContext } from 'containers/data_context';

import { DEFAULT_CURRENCY } from 'constants/defaults';
import setUrlParams from 'utils/set_url_params';

const CURRENCY_RATE_BY_CODE = {
  USD: 3,
  EUR: 2,
  GBP: 1,
  default: 0,
};

export default function CurrencySelect() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const history = useHistory();
  const { params, property } = useContext(BookingDataContext);
  const { setParamsAndLoadRoomsInfo } = useContext(BookingActionsContext);
  const { t } = useTranslation();
  const { data: propertyData } = property;
  const currencySign = currencies[params.currency]?.units.major.symbol || '';
  const selectLabel = `${currencySign} (${params.currency})`;

  const handleCurrencyChange = useCallback((currency) => {
    setUrlParams({ currency }, history);
    setParamsAndLoadRoomsInfo({ ...params, currency });
  }, [history, setParamsAndLoadRoomsInfo, params]);

  useEffect(function handlePropertyLoad() {
    if (params.currency || !propertyData) {
      return;
    }

    const { currency = DEFAULT_CURRENCY } = propertyData;
    handleCurrencyChange(currency);
  }, [propertyData.hotelPolicy, handleCurrencyChange, params.currency, propertyData]);

  useEffect(function initSelectorState() {
    const { currency = DEFAULT_CURRENCY } = propertyData;

    let options = Object.values(currencies)
      .map(({ name, iso }) => {
        const currencyName = iso.code === currency ? `${t('currency_select:hotel_currency')}:` : name;

        return {
          key: iso.code,
          value: `${currencyName} (${iso.code})`,
        };
      })
      .sort((a, b) => {
        const priorityByEqualityToDefault = (b.key === currency) - (a.key === currency);

        if (priorityByEqualityToDefault !== 0) {
          return priorityByEqualityToDefault;
        }

        const aPriorityByCode = CURRENCY_RATE_BY_CODE[a.key] ?? CURRENCY_RATE_BY_CODE.default;
        const bPriorityByCode = CURRENCY_RATE_BY_CODE[b.key] ?? CURRENCY_RATE_BY_CODE.default;

        const isPriorityEqual = aPriorityByCode === bPriorityByCode;

        return isPriorityEqual
          ? a.key.localeCompare(b.key)
          : bPriorityByCode - aPriorityByCode;
      });

    const PopularCurrenciesSeparator = {
      Component: (
        <Select.Separator>
          {t('currency_select:popular_currencies_separator')}
        </Select.Separator>
      ),
    };

    const AvailableCurrenciesSeparator = {
      Component: (
        <Select.Separator>
          {t('currency_select:available_currencies_separator')}
        </Select.Separator>
      ),
    };

    const { default: _default, ...topRatedCurrencies } = CURRENCY_RATE_BY_CODE;
    const topCurrenciesListLength = Object.values(topRatedCurrencies).length;
    const separatorPosition = topCurrenciesListLength + !topRatedCurrencies[currency];

    options.splice(separatorPosition, 0, AvailableCurrenciesSeparator);
    options = [PopularCurrenciesSeparator, ...options];

    setCurrencyOptions(options);
  }, [t, propertyData]);

  return (
    <Select
      withSearch
      label={selectLabel}
      value={params.currency}
      options={currencyOptions}
      onChange={handleCurrencyChange}
    />
  );
}
