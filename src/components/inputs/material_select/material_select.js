import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { Dropdown, Form } from 'react-bootstrap';

import Label from 'components/label';
import FieldWrapper from 'components/layout/field_wrapper';

import styles from './material_select.module.css';

const DEFAULT_OPTIONS = [];

const MaterialSelect = forwardRef((props, ref) => {
  const {
    name,
    label,
    value,
    options = DEFAULT_OPTIONS,
    placeholder,
    meta = {},
    text,
    disabled,
    onChange,
  } = props;
  const { valid = true } = meta;

  const [selectOptions, setSelectOptions] = useState([]);
  const [valueToDisplay, setValueToDisplay] = useState(null);

  const toggleClasses = [styles.dropdownToggle];

  if (!valid) {
    toggleClasses.push(styles.dropdownToggleInvalid);
  }

  useEffect(function updatedSelectOptions() {
    const processedOptions = options.map((option) => (
      <Dropdown.Item
        className={styles.menuItem}
        key={option.key}
        eventKey={option.key}
        active={option.key === value}
      >
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
    setValueToDisplay(event.target.text);
    onChange(newValue, name);
  }, [onChange, name]);
  // TODO - fix height change when active

  return (
    <FieldWrapper>
      <Form.Group>
        <Form.Label>
          <Label>
            {label}
          </Label>
        </Form.Label>
        <Dropdown
          ref={ref}
          className={styles.dropdown}
          onSelect={handleChange}
        >
          <Dropdown.Toggle disabled={disabled} className={toggleClasses.join(' ')}>
            {valueToDisplay}
          </Dropdown.Toggle>
          <Dropdown.Menu className={styles.dropdownMenu}>
            {selectOptions}
          </Dropdown.Menu>
        </Dropdown>
        <Form.Text>
          {text}
        </Form.Text>
      </Form.Group>
    </FieldWrapper>
  );
});

export default MaterialSelect;
