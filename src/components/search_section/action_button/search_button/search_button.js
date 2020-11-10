import React, { useCallback } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { HOTEL_INFO_SECTION } from 'constants/element_ids';
import scrollToElementById from 'utils/scroll_to_element_by_id';

import styles from './search_button.module.css';

export default function SearchButton({ loading, onClick }) {
  const { t } = useTranslation();

  const handleClick = useCallback(async () => {
    await onClick();
    scrollToElementById(HOTEL_INFO_SECTION);
  }, [onClick]);

  return (
    <Button
      variant="primary"
      className={styles.button}
      disabled={loading}
      onClick={handleClick}
    >
      <>
        {loading && <Spinner animation="border" size="sm" className={styles.spinner}/>}
        {t('hotel_page:search')}
      </>
    </Button>
  );
}
