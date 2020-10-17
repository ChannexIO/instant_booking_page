import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import setUrlParams from 'utils/set_url_params';

import ChildrenAgeInput from './children_age_input';

import styles from './children_age_settings.module.css';

const MAX_CHILD_AGE = 17;

export default function ChildrenAgeSettings({ bookingParams, handleSearchChange }) {
  const [childrenAgeOptions, setChildrenAgeOptions] = useState([]);
  const { t } = useTranslation();
  const history = useHistory();

  useEffect(function initChildrenAgeOptions() {
    const newChildrenAgeOptions = Array(MAX_CHILD_AGE + 1)
      .fill(null)
      .map((el, index) => ({
        key: index,
        value: index,
      }));

    setChildrenAgeOptions(newChildrenAgeOptions);
  }, [t]);

  useEffect(function handleChildrenAmountChange() {
    const { children, childrenAge } = bookingParams;
    const isChildrenArrayUpToDate = Array.isArray(childrenAge) && children === childrenAge.length;
    const isChildrenAmountUnset = children === undefined;

    if (isChildrenAmountUnset || isChildrenArrayUpToDate) {
      return;
    }

    const oldChildrenAge = Array.isArray(childrenAge) ? childrenAge : [];
    const updatedChildrenAge = Array(children)
      .fill(null)
      .map((el, index) => {
        return oldChildrenAge[index];
      });
      
    setUrlParams({ childrenAge: updatedChildrenAge }, history);
    handleSearchChange({ ...bookingParams, childrenAge: updatedChildrenAge });
  }, [bookingParams, history, handleSearchChange]);

  const handleChange = useCallback((value, index) => {
    const { childrenAge = [] } = bookingParams;

    const updatedChildrenAge = [...childrenAge];
    updatedChildrenAge[index] = value;

    setUrlParams({ childrenAge: updatedChildrenAge }, history);
    handleSearchChange({ ...bookingParams, childrenAge: updatedChildrenAge });
  }, [bookingParams, handleSearchChange, history]);

  if (!Array.isArray(bookingParams.childrenAge) || !bookingParams.childrenAge.length) {
    return null;
  }

  return (
    <div className={styles.settingsWrapper}>
      <div className={styles.settingsTitle}>
        {t('hotel_page:children_section_title')}:
      </div>
      <div className={styles.settingsContainer}>
        {bookingParams.childrenAge
          .map((value, index) => (
            <ChildrenAgeInput
              key={index.toString()}
              index={index}
              value={value}
              options={childrenAgeOptions}
              onChange={handleChange}
            />
        ))}
      </div>
    </div>
  );
}