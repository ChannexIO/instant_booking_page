import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import setUrlParams from 'utils/set_url_params';

import ChildrenAgeInput from './children_age_input';

const MAX_CHILD_AGE = 17;

export default function ChildrenAgeSettings({ searchParams, handleSearchChange }) {
  const [childrenAgeOptions, setChildrenAgeOptions] = useState([]);
  const { t } = useTranslation();
  const history = useHistory();

  useEffect(function initChildrenAgeOptions() {
    const newChildrenAgeOptions = Array(MAX_CHILD_AGE + 1)
      .fill(null)
      .map((el, index) => ({
        key: index,
        value: `${index} ${t('hotel_page:years_old')}`,
      }));

    setChildrenAgeOptions(newChildrenAgeOptions);
  }, [t]);

  useEffect(function handleChildrenAmountChange() {
    const { children, childrenAge } = searchParams;
    const isChildrenArrayUpToDate = Array.isArray(childrenAge) && children === childrenAge.length;
    const isChildrenAmountUnset = children === undefined;

    if (isChildrenAmountUnset || isChildrenArrayUpToDate) {
      return;
    }

    const oldChildrenAge = Array.isArray(childrenAge) ? childrenAge : [];
    const updatedChildrenAge = Array(children)
      .fill(null)
      .map((el, index) => {
        return oldChildrenAge[index];// !== undefined ? oldChildrenAge[index] : el;
      });
      
    setUrlParams({ childrenAge: updatedChildrenAge }, history);
    handleSearchChange({ ...searchParams, childrenAge: updatedChildrenAge });
  }, [searchParams, history, handleSearchChange]);

  const handleChange = useCallback((value, index) => {
    const { childrenAge = [] } = searchParams;

    const updatedChildrenAge = [...childrenAge];
    updatedChildrenAge[index] = value;

    setUrlParams({ childrenAge: updatedChildrenAge }, history);
    handleSearchChange({ ...searchParams, childrenAge: updatedChildrenAge });
  }, [searchParams, handleSearchChange, history]);

  if (!Array.isArray(searchParams.childrenAge)) {
    return null;
  }

  return (
    <div>
      {searchParams.childrenAge
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
  );
}