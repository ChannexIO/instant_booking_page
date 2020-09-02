import React, { useState, useEffect, useCallback } from 'react';
import { Dropdown, Button } from 'react-bootstrap';

import styles from './search_section_select.module.css';

const VERTICAL_ORIENTATION = 'vertical';

export default function SearchSectionSelect({ name, label, value, options, placeholder, layout, onChange }) {
  const [selectOptions, setSelectOptions] = useState([]);
  const [valueToDisplay, setValueToDisplay] = useState(null);
  const containerClass = layout === VERTICAL_ORIENTATION ? styles.containerVertical : styles.containerHorizontal;

  useEffect(function updatedSelectOptions() {
    const processedOptions = options.map((option) => (
      <Dropdown.Item key={option.key} eventKey={option.key} active={option.key === value}>
        {option.value}
      </Dropdown.Item>
    ));

    setSelectOptions(processedOptions);
  }, [options, value]);

  useEffect(function updateActiveValueToDisplay() {
    const newActiveOption = options.find((option) => option.key === value) || {};
    const { value: newValueToDisplay = placeholder } = newActiveOption;

    setValueToDisplay(newValueToDisplay);
  }, [value, options, placeholder]);

  const handleChange = useCallback((newValue, event) => {
    const parsedValue = Number(newValue);

    setValueToDisplay(event.target.text);
    onChange(parsedValue, name);
  }, [onChange, name]);

  return (
    <div className={containerClass}>
      {label && (
        <span className={styles.selectLabel}>
          {label}
        </span>
      )}
      <Dropdown
        className={styles.dropdown}
        onSelect={handleChange}
      >
        <Dropdown.Toggle className={styles.dropdownToggle}>
          <Button className={styles.dropdownButton}>
            {valueToDisplay}
          </Button>
        </Dropdown.Toggle>
        <Dropdown.Menu className={styles.dropdownMenu}>
          {selectOptions}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}