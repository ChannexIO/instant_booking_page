import React from 'react';
import { useTranslation } from 'react-i18next';

import InfoEntry from './info_entry';

const TRANSLATION_PATH = 'hotel_page:hotel_policy:pets';

export default function InternetAccessPolicies({ hotelPolicy }) {
  const { t } = useTranslation();
  const { petsPolicy } = hotelPolicy;

  return (
    <InfoEntry
      title={t(`${TRANSLATION_PATH}:title`)}
      text={t(`${TRANSLATION_PATH}:options:${petsPolicy}`)}
    />
  );
}
