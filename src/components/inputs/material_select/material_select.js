import React, { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";

import Label from "components/label";
import FieldWrapper from "components/layout/field_wrapper";

import SelectDropdown from "../select_dropdown";

import styles from "./material_select.module.css";

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
    withSearch,
    disabled,
    onChange,
  } = props;
  const { valid = true } = meta;
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [valueToDisplay, setValueToDisplay] = useState(null);
  const searchInputRef = useRef(null);

  const toggleClasses = [styles.dropdownToggle];

  if (!valid) {
    toggleClasses.push(styles.dropdownToggleInvalid);
  }

  const getOptions = useCallback(() => {
    return options.filter((option) => {
      const formattedSearchQuery = searchQuery.toLowerCase();
      const optionValueFormatted = String(option.value).toLowerCase();

      return optionValueFormatted.includes(formattedSearchQuery);
    });
  }, [searchQuery, options]);

  useEffect(
    function updateActiveValueToDisplay() {
      const newActiveOption = options.find((option) => option.key === value) || {};
      const { value: newValueToDisplay = placeholder } = newActiveOption;

      setValueToDisplay(newValueToDisplay);
    },
    [value, options, placeholder],
  );

  const handleChange = useCallback(
    (newValue, event) => {
      setValueToDisplay(event.target.text);
      onChange(newValue, name);
    },
    [onChange, name],
  );
  // TODO - fix height change when active

  const handleSelectToggle = useCallback(() => {
    setIsOpen(!isOpen);
    setSearchQuery("");
  }, [isOpen]);

  useEffect(
    function handleVisibilityChange() {
      if (isOpen && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    },
    [searchInputRef, isOpen],
  );

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <FieldWrapper>
      <Form.Group>
        <Form.Label>
          <Label>{label}</Label>
        </Form.Label>
        <Dropdown
          show={isOpen}
          ref={ref}
          className={styles.dropdown}
          onSelect={handleChange}
          onToggle={handleSelectToggle}
        >
          <Dropdown.Toggle disabled={disabled} className={toggleClasses.join(" ")}>
            {valueToDisplay}
          </Dropdown.Toggle>
          <SelectDropdown
            withSearch={withSearch}
            activeValue={value}
            options={getOptions()}
            searchRef={searchInputRef}
            searchQuery={searchQuery}
            onChange={handleSearchInput}
          />
        </Dropdown>
        <Form.Text>{text}</Form.Text>
      </Form.Group>
    </FieldWrapper>
  );
});

export default MaterialSelect;
