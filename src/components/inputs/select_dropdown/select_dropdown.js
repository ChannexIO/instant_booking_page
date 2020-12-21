import React, { forwardRef } from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import styles from './select_dropdown.module.css';

function SelectDropdown(props, ref) {
  const { activeValue, options, withSearch, searchRef, searchQuery, onChange } = props;
  const { t } = useTranslation();

  return (
    <Dropdown.Menu
      renderOnMount
      ref={ref}
      className={styles.menu}
    >
      {withSearch && (
        <Form.Control
          ref={searchRef}
          value={searchQuery}
          className={styles.searchInput}
          type="text"
          placeholder={t('global:search')}
          onChange={onChange}
        />
      )}
      <div className={styles.srollableOptions}>
        {options.map((option) => (
          <Dropdown.Item
            className={styles.menuItem}
            key={option.key}
            eventKey={option.key}
            active={option.key === activeValue}
          >
            {option.value}
          </Dropdown.Item>
        ))}
      </div>
  </Dropdown.Menu>
  );
}

export default forwardRef(SelectDropdown);
