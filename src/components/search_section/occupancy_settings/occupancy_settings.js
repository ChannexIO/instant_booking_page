import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import SearchSectionSelect from 'components/inputs/search_section_select';

import setUrlParams from 'utils/set_url_params';

import styles from './occupancy_settings.module.css';

const MAX_ADULTS_AMOUNT = 30;
const MAX_CHILDREN_AMOUNT = 11;

export default function OccupancySettings({ bookingParams, isMobile, handleSearchChange }) {
  const [adultsOptions, setAdultsOptions] = useState([]);
  const [childrenOptions, setChildrenOptions] = useState([]);
  const inputLayout = isMobile ? 'vertical' : 'horizontal';
  const { t } = useTranslation();
  const history = useHistory();

  useEffect(function initSelectOptions() {
    const newAdultsOptions = Array(MAX_ADULTS_AMOUNT)
      .fill(null)
      .map((val, index) => ({
        value: index + 1,
        key: index + 1,
      }));

    const newChildrenOptions = Array(MAX_CHILDREN_AMOUNT)
      .fill(null)
      .map((value, index) => ({
        value: index,
        key: index,
      }));

    setAdultsOptions(newAdultsOptions);
    setChildrenOptions(newChildrenOptions);
  }, [t]);

  const handleChange = useCallback((value, name) => {
    handleSearchChange({ ...bookingParams, [name]: value });
    setUrlParams({ [name]: value }, history);
  }, [handleSearchChange, bookingParams, history]);

  return (
    <div className={styles.occupancySettingsContainer}>
      <div className={styles.occupancySettingsInput}>
        <SearchSectionSelect
          name="adults"
          label={t('hotel_page:adults_label')}
          placeholder={t('hotel_page:adults_placeholder')}
          value={bookingParams.adults}
          layout={inputLayout}
          options={adultsOptions}
          onChange={handleChange}
        />
      </div>
      <div className={styles.occupancySettingsInput}>
        <SearchSectionSelect
          name="children"
          label={t('hotel_page:children_label')}
          placeholder={t('hotel_page:children_placeholder')}
          value={bookingParams.children}
          layout={inputLayout}
          options={childrenOptions}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
