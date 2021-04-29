import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

import Dropdown from "components/dropdown";
import RangePicker from "components/rangepicker";
import OccupancySettingsForm from "components/search_section/occupancy_settings/occupancy_settings_form";

import styles from "./header_search.module.css";

export default function HeaderSearch({ searchParams, handleDatesChange, handleChangeOccupancy }) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [rangePickerVisible, setRangePickerVisible] = useState(false);

  const handleToggleDropdown = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const onCloseCallback = useCallback(() => {
    setRangePickerVisible(false);
  }, []);

  const getDropdownTitle = () => {
    const title = `${searchParams.adults} ${t("hotel_page:adults")} ·
    ${searchParams.children} ${t("hotel_page:children")}`;

    return title;
  };

  const dropdownTitle = getDropdownTitle();
  const rangePickerClassName = classNames(styles.rangePicker, {
    [`${styles.rangePicker__error}`]: rangePickerVisible,
  });

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{t("properties:header")}</p>
      <div className={styles.inner}>
        <p className={styles.title}>{t("global:search")}</p>
        <RangePicker
          checkinDatePlaceholder={t("hotel_page:checkin_placeholder")}
          checkoutDatePlaceholder={t("hotel_page:checkout_placeholder")}
          checkinDate={searchParams.checkinDate}
          checkoutDate={searchParams.checkoutDate}
          name="search_dates"
          className={rangePickerClassName}
          onDatesChange={handleDatesChange}
          isVisible={rangePickerVisible}
          closeCallback={onCloseCallback}
        />

        <Dropdown
          show={isOpen}
          onToggle={handleToggleDropdown}
          title={dropdownTitle}
          className={styles.occupancyDropDown}
          layout="vertical"
        >
          <OccupancySettingsForm
            bookingParams={searchParams}
            onClose={handleToggleDropdown}
            onChange={handleChangeOccupancy}
          />
        </Dropdown>
      </div>
    </div>
  );
}
