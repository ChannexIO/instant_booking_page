import React from "react";
import { useTranslation } from "react-i18next";

import InfoEntry from "./info_entry";

const TRANSLATION_PATH = "hotel_page:hotel_policy";

export default function GeneralPolicies({ hotelPolicy }) {
  const { t } = useTranslation();
  const { checkinFromTime, checkinToTime, checkoutFromTime, checkoutToTime } = hotelPolicy;

  return (
    <>
      {checkinFromTime && checkinToTime && (
        <InfoEntry
          title={t(`${TRANSLATION_PATH}:checkin_time`)}
          text={`${checkinFromTime} - ${checkinToTime}`}
        />
      )}
      {checkoutFromTime && checkoutToTime && (
        <InfoEntry
          title={t(`${TRANSLATION_PATH}:checkout_time`)}
          text={`${checkoutFromTime} - ${checkoutToTime}`}
        />
      )}
    </>
  );
}
