import React, { forwardRef, useCallback } from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import styles from './select_dropdown.module.css';

function SelectDropdown(props, ref) {
  const { activeValue, options, withSearch, searchRef, searchQuery, onChange } = props;
  const { t } = useTranslation();

  const getOption = useCallback(({ key, Component, value }) => {
    if (Component) {
      return Component;
    }

    return (
      <Dropdown.Item
        className={styles.menuItem}
        key={key}
        eventKey={key}
        active={key === activeValue}
      >
        {value}
      </Dropdown.Item>
    );
  }, [activeValue]);

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
        {options.map(getOption)}
      </div>
  </Dropdown.Menu>
  );
}

export default forwardRef(SelectDropdown);
