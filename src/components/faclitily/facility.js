import React from 'react';
import { useTranslation } from 'react-i18next';

import getFacilityIconByCode from 'utils/get_facility_icon_by_code';

import styles from './facility.module.css';

export default function Facility({ code }) {
  const { t } = useTranslation();
  const Icon = getFacilityIconByCode(code);

  return (
    <div className={styles.facility}>
      <Icon className={styles.facilityIcon} />
      <div className={styles.facilityTitle}>
        {t(`facilities:${code}`)}
      </div>
    </div>
  );
}