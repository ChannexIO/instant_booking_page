import React from 'react';
import { Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { InfoCircleFilled } from '@ant-design/icons';

import styles from './reserve_section_missing_spaces.module.css';

export default function ReseveSectionMissingSpaces({ missingSpaces }) {
  const { t } = useTranslation();

  const emptyMessage = t('rates_table:missing_spaces_message');

  const message = Object.entries(missingSpaces)
    .reduce((acc, [key, value], index, array) => {
      if (value) {
        const textToAdd = t(`rates_table:missing_${key}`).replace('{n}', value);
        const separator = (array.length - 1) === index ? '.' : ',';
        const updatedMessage = `${acc} ${textToAdd}${separator}`;

        return updatedMessage;
      }

      return acc;
    }, emptyMessage);

  if (message === emptyMessage) {
    return null;
  }

  return (
    <Alert variant="danger" className={styles.alert}>
      <Alert.Heading className={styles.heading}>
        <InfoCircleFilled className={styles.icon} />
        <div className={styles.headingText}>{message}</div>
      </Alert.Heading>
      <div className={styles.description}>
        {t('rates_table:missing_spaces_description')}
      </div>
    </Alert>
  );
}
