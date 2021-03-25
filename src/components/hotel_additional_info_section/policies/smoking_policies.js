import React from "react";
import { useTranslation } from "react-i18next";

import InfoEntry from "./info_entry";

const TRANSLATION_PATH = "hotel_page:hotel_policy:smoking";

export default function InternetAccessPolicies({ hotelPolicy }) {
  const { t } = useTranslation();
  const { smokingPolicy } = hotelPolicy;

  return (
    <InfoEntry
      title={t(`${TRANSLATION_PATH}:title`)}
      text={t(`${TRANSLATION_PATH}:options:${smokingPolicy}`)}
    />
  );
}
