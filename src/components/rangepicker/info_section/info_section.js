import React from 'react';
import { useTranslation } from 'react-i18next';

import LinkButton from 'components/buttons/link_button';

import styles from './info_section.module.css';

export default function InfoSection({ onClear }) {
  const { t } = useTranslation();

  return (
    <div className={styles.infoContainer}>
      <LinkButton
        onClick={onClear}
      >
        {t('hotel_page:clear')}
      </LinkButton>
    </div>
  );
}
