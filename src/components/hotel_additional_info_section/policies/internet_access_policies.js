import React from "react";
import { useTranslation } from "react-i18next";

import Currency from "components/currency";

import InfoEntry from "./info_entry";

const TRANSLATION_PATH = "hotel_page:hotel_policy:internet";

export default function InternetAccessPolicies({ hotelPolicy }) {
  const { t } = useTranslation();
  const { internetAccessType, internetAccessCost, internetAccessCoverage, currency } = hotelPolicy;

  const internetAcessPrice = internetAccessCost ? (
    <Currency amount={internetAccessCost} currency={currency} />
  ) : (
    t(`${TRANSLATION_PATH}:cost_options:free`)
  );

  const isInternetAvailable = internetAccessType !== "none";

  return (
    <>
      <InfoEntry
        title={t(`${TRANSLATION_PATH}:type_title`)}
        text={t(`${TRANSLATION_PATH}:type_options:${internetAccessType}`)}
      />
      {isInternetAvailable && (
        <>
          <InfoEntry
            title={t(`${TRANSLATION_PATH}:coverage_title`)}
            text={t(`${TRANSLATION_PATH}:coverage_options:${internetAccessCoverage}`)}
          />
          <InfoEntry title={t(`${TRANSLATION_PATH}:cost_title`)} text={internetAcessPrice} />
        </>
      )}
    </>
  );
}
