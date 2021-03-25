import React from "react";
import { useTranslation } from "react-i18next";

import InfoEntry from "./info_entry";

const TRANSLATION_PATH = "hotel_page:hotel_policy";

export default function GeneralPolicies({ hotelPolicy }) {
  const { t } = useTranslation();
  const { checkinTime, checkoutTime } = hotelPolicy;

  return (
    <>
      {checkinTime && (
        <InfoEntry title={t(`${TRANSLATION_PATH}:checkin_time`)} text={checkinTime} />
      )}
      {checkoutTime && (
        <InfoEntry title={t(`${TRANSLATION_PATH}:checkout_time`)} text={checkoutTime} />
      )}
    </>
  );
}
