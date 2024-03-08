import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import Dropdown from "components/dropdown";

import setUrlParams from "utils/set_url_params";

import OccupancySettingsForm from "./occupancy_settings_form";

const getDropdownTitle = (t, children, adults, isAdultsOnly) => {
  if (isAdultsOnly) {
    return `${t("hotel_page:adults", { count: adults })}`;
  }
  return `${t("hotel_page:adults", { count: adults })} · ${t("hotel_page:children", {
    count: children,
  })}`;
};

export default function OccupancySettings({ bookingParams, isAdultsOnly, handleSearchChange }) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const { children, adults } = bookingParams;

  const isGuestsPresent = children || adults;
  const dropdownTitle = isGuestsPresent
    ? getDropdownTitle(t, children, adults, isAdultsOnly)
    : t("hotel_page:guests_placeholder");

  const handleChange = useCallback(
    (value, name) => {
      handleSearchChange({ ...bookingParams, [name]: value });
      setUrlParams({ [name]: value }, history);
    },
    [handleSearchChange, bookingParams, history],
  );

  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <Dropdown
      show={isOpen}
      onToggle={handleToggle}
      title={dropdownTitle}
      label={t("hotel_page:guests")}
      layout="vertical"
    >
      <OccupancySettingsForm
        bookingParams={bookingParams}
        isAdultsOnly={isAdultsOnly}
        onClose={handleToggle}
        onChange={handleChange}
      />
    </Dropdown>
  );
}
