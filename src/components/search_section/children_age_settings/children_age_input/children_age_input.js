import React from 'react';
import { useTranslation } from 'react-i18next';

import SearchSectionSelect from 'components/inputs/search_section_select';

import styles from './children_age_input.module.css';

export default function ChildrenAgeInput({ index, value, options, onChange }) {
  const { t } = useTranslation();

  return (
    <div className={styles.inputContainer}>
      <SearchSectionSelect
        name={index}
        placeholder={t('hotel_page:children_age_placeholder')}
        value={value}
        options={options}
        onChange={onChange}
      />
    </div>
  );
}