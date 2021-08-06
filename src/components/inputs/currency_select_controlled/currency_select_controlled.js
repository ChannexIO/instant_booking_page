import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import currencies from "world-currencies";

import Select from "components/inputs/select";

const CURRENCY_RATE_BY_CODE = {
  USD: 3,
  EUR: 2,
  GBP: 1,
  default: 0,
};

export default function CurrencySelectControlled({ value, preferredCurrency, onChange }) {
  const { t } = useTranslation();

  const currencySign = currencies[value]?.units.major.symbol || "";
  const selectLabel = `${currencySign} (${value})`;

  const currencyOptions = useMemo(() => {
    let options = Object.values(currencies)
      .map(({ name, iso }) => {
        const currencyName =
          iso.code === preferredCurrency ? `${t("currency_select:hotel_currency")}:` : name;

        return {
          key: iso.code,
          value: `${currencyName} (${iso.code})`,
        };
      })
      .sort((a, b) => {
        const priorityByEqualityToDefault =
          (b.key === preferredCurrency) - (a.key === preferredCurrency);

        if (priorityByEqualityToDefault !== 0) {
          return priorityByEqualityToDefault;
        }

        const aPriorityByCode = CURRENCY_RATE_BY_CODE[a.key] ?? CURRENCY_RATE_BY_CODE.default;
        const bPriorityByCode = CURRENCY_RATE_BY_CODE[b.key] ?? CURRENCY_RATE_BY_CODE.default;

        const isPriorityEqual = aPriorityByCode === bPriorityByCode;

        return isPriorityEqual ? a.key.localeCompare(b.key) : bPriorityByCode - aPriorityByCode;
      });

    const PopularCurrenciesSeparator = {
      Component: (
        <Select.Separator>{t("currency_select:popular_currencies_separator")}</Select.Separator>
      ),
    };

    const AvailableCurrenciesSeparator = {
      Component: (
        <Select.Separator>{t("currency_select:available_currencies_separator")}</Select.Separator>
      ),
    };

    const { default: _default, ...topRatedCurrencies } = CURRENCY_RATE_BY_CODE;
    const topCurrenciesListLength = Object.values(topRatedCurrencies).length;
    const separatorPosition = topCurrenciesListLength + !topRatedCurrencies[preferredCurrency];

    options.splice(separatorPosition, 0, AvailableCurrenciesSeparator);
    options = [PopularCurrenciesSeparator, ...options];

    return options;
  }, [t, preferredCurrency]);

  return (
    <Select
      withSearch
      label={selectLabel}
      value={value}
      options={currencyOptions}
      onChange={onChange}
    />
  );
}
