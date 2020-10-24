import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { GlobalOutlined } from '@ant-design/icons';

import Select from 'components/inputs/select';

import styles from './locale_select.module.css';

const AVAILABLE_LANGUAGES = [
  {
    key: 'en',
    value: 'ENG',
  },
  {
    key: 'test',
    value: 'TEST',
  },
];

export default function LocaleSelect() {
  const { t, i18n } = useTranslation();

  const handleLocaleChange = useCallback((localeKey) => {
    i18n.changeLanguage(localeKey);
  }, [i18n]);

  return (
    <Select
      label={t('general:locale')}
      value={i18n.language}
      options={AVAILABLE_LANGUAGES}
      onChange={handleLocaleChange}
    />
  );
}
