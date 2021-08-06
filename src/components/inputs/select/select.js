import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";

import SelectDropdown from "../select_dropdown";

import styles from "./select.module.css";

export default function Select({ label, value, options, withSearch = false, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  const getOptions = useCallback(() => {
    return options.filter((option) => {
      if (option.Component) {
        return !searchQuery;
      }

      const formattedSearchQuery = searchQuery.toLowerCase();
      const optionValueFormatted = option.value.toLowerCase();

      return optionValueFormatted.includes(formattedSearchQuery);
    });
  }, [searchQuery, options]);

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

  // TODO - unify dropdown menus for selects
  return (
    <Dropdown
      className={styles.dropdown}
      show={isOpen}
      onSelect={onChange}
      onToggle={handleSelectToggle}
    >
      <Dropdown.Toggle className={styles.toggle} variant="link">
        {label}
      </Dropdown.Toggle>
      <SelectDropdown
        activeValue={value}
        options={getOptions()}
        withSearch={withSearch}
        searchRef={searchInputRef}
        searchQuery={searchQuery}
        onChange={handleSearchInput}
      />
    </Dropdown>
  );
}
