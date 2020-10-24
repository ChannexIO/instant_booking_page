import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import Dropdown from 'components/dropdown';

import setUrlParams from 'utils/set_url_params';

import OccupancySettingsForm from './occupancy_settings_form';

import styles from './occupancy_settings.module.css';

export default function OccupancySettings({ bookingParams, handleSearchChange }) {
  const { t } = useTranslation();
  const history = useHistory();
  const { children, adults } = bookingParams;
  const isGuestsPresent = children || adults;
  const dropdownTitle = isGuestsPresent
    ? `${adults} ${t('hotel_page:adults')} · ${children} ${t('hotel_page:children')}`
    : t('hotel_page:guests_placeholder');

  const handleChange = useCallback((value, name) => {
    handleSearchChange({ ...bookingParams, [name]: value });
    setUrlParams({ [name]: value }, history);
  }, [handleSearchChange, bookingParams, history]);

  return (
    <Dropdown
      title={dropdownTitle}
      label={t('hotel_page:guests')}
      layout="vertical"
    >
      <OccupancySettingsForm bookingParams={bookingParams} onChange={handleChange} />
    </Dropdown>
  );
}
