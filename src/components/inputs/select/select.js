import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import styles from './select.module.css';

export default function Select({ label, value, options, withSearch = false, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation();
  const searchInputRef = useRef(null);

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

  const handleSelectToggle = useCallback(() => {
    setIsOpen(!isOpen);
    setSearchQuery('');
  }, [isOpen]);

  useEffect(function handleVisibilityChange() {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchInputRef, isOpen]);

  // TODO - unify dropdown menus for selects
  return (
    <Dropdown
      show={isOpen}
      onSelect={onChange}
      onToggle={handleSelectToggle}
    >
      <Dropdown.Toggle className={styles.toggle} variant="link">
        {label}
      </Dropdown.Toggle>
      <Dropdown.Menu className={styles.menu}>
          {withSearch && (
            <Form.Control
              ref={searchInputRef}
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
