import React from 'react';
import { useTranslation } from 'react-i18next';

import InfoEntry from './info_entry';

const TRANSLATION_PATH = 'hotel_page:hotel_policy:parking';

export default function ParkingPolicies({ hotelPolicy }) {
  const { t } = useTranslation();
  const { parkingIsPrivate, parkingReservation, parkingType } = hotelPolicy;

  const isParkingAvailable = parkingType !== 'none';
  const parkingProperty = parkingIsPrivate ? 'private' : 'public';

  return (
    <>
      <InfoEntry
        title={t(`${TRANSLATION_PATH}:type_title`)}
        text={t(`${TRANSLATION_PATH}:type_options:${parkingType}`)}
      />
      {isParkingAvailable && (
        <>
          <InfoEntry
            title={t(`${TRANSLATION_PATH}:reservation_title`)}
            text={t(`${TRANSLATION_PATH}:reservation_options:${parkingReservation}`)}
          />
          <InfoEntry
            title={t(`${TRANSLATION_PATH}:property_title`)}
            text={t(`${TRANSLATION_PATH}:property_options:${parkingProperty}`)}
          />
        </>
      )}
    </>
  );
}
