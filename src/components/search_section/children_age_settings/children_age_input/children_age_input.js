import React from 'react';
import { useTranslation } from 'react-i18next';

import SearchSectionSelect from 'components/inputs/search_section_select';

export default function ChildrenAgeInput({ index, value, options, onChange }) {
  const { t } = useTranslation();

  return (
    <SearchSectionSelect
      name={index}
      placeholder={t('hotel_page:children_age_placeholder')}
      value={value}
      options={options}
      onChange={onChange}
    />
  );
}