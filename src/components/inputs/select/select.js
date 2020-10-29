import React, { useCallback, useState } from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import styles from './select.module.css';

export default function Select({ label, value, options, withSearch = false, onChange }) {
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation();

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  const renderOptions = useCallback(() => {
    return options
      .filter((option) => {
        const formattedSearchQuery = searchQuery.toLowerCase();
        const optionValueFormatted = option.value.toLowerCase();

        return optionValueFormatted.includes(formattedSearchQuery);
      })
      .map((option) => (
        <Dropdown.Item
          className={styles.menuItem}
          key={option.key}
          eventKey={option.key}
          active={option.key === value}
        >
          {option.value}
        </Dropdown.Item>
      ));
  }, [value, searchQuery, options]);

  return (
    <Dropdown onSelect={onChange}>
      <Dropdown.Toggle className={styles.toggle} variant="link">
        {label}
      </Dropdown.Toggle>
      <Dropdown.Menu className={styles.menu}>
          {withSearch && (
            <Form.Control
              value={searchQuery}
              className={styles.searchInput}
              type="text"
              placeholder={t('global:search')}
              onChange={handleSearchInput}
            />
          )}
          <div className={styles.srollableOptions}>
            {renderOptions()}
          </div>
      </Dropdown.Menu>
    </Dropdown>
  );
}
