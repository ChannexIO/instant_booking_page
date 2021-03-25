import React from "react";
import { useTranslation } from "react-i18next";

import Currency from "components/currency";

import InfoEntry from "./info_entry";

const TRANSLATION_PATH = "hotel_page:hotel_policy:pets";

export default function InternetAccessPolicies({ hotelPolicy }) {
  const { t } = useTranslation();
  const { petsPolicy, petsNonRefundableFee, petsRefundableDeposit, currency } = hotelPolicy;

  const isPetsFeesDisplayed = petsPolicy !== "not_allowed";

  return (
    <>
      <InfoEntry
        title={t(`${TRANSLATION_PATH}:title`)}
        text={t(`${TRANSLATION_PATH}:options:${petsPolicy}`)}
      />
      {isPetsFeesDisplayed && (
        <>
          <InfoEntry
            title={t(`${TRANSLATION_PATH}:non_refundable_fee`)}
            text={<Currency amount={petsNonRefundableFee} currency={currency} />}
          />
          <InfoEntry
            title={t(`${TRANSLATION_PATH}:refundable_deposit`)}
            text={<Currency amount={petsRefundableDeposit} currency={currency} />}
          />
        </>
      )}
    </>
  );
}
