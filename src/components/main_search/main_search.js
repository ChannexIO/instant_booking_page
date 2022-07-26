import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import classNames from "classnames";

import Button from "components/buttons/button";
import Dropdown from "components/dropdown";
import RangePicker from "components/rangepicker";
import OccupancySettingsForm from "components/search_section/occupancy_settings/occupancy_settings_form";

import routes from "routing/routes";

import DEFAULT_OCCUPANCY_PARAMS from "constants/default_occopancy_params";
import buildPath from "utils/build_path";
import dateFormatter from "utils/date_formatter";
import setUrlParams from "utils/set_url_params";

import styles from "./main_search.module.css";

export default function MainSearch() {
  const { t } = useTranslation();
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);

  const [checkinDate, setCheckinDate] = useState(null);
  const [checkoutDate, setCheckoutDate] = useState(null);
  const [rangePickerVisible, setRangePickerVisible] = useState(false);
  const [occupancyParams, setOccupancyParams] = useState(DEFAULT_OCCUPANCY_PARAMS);

  const handleDatesChange = useCallback(({ startDate, endDate }) => {
    setCheckinDate(startDate);
    setCheckoutDate(endDate);
  }, []);

  const handleToggleDropdown = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleChangeOccupancy = useCallback(
    (value, name) => {
      const params = { ...occupancyParams, [name]: value };
      setOccupancyParams(params);
    },
    [occupancyParams],
  );

  const getDropdownTitle = useCallback(() => {
    const title = `${t("hotel_page:adults", { count: occupancyParams.adults })} ·
    ${t("hotel_page:children", { count: occupancyParams.children })}`;

    return title;
  }, [t, occupancyParams]);

  const dropdownTitle = getDropdownTitle();

  const onSearch = () => {
    if (checkinDate && checkoutDate) {
      const formattedDates = {
        checkinDate: dateFormatter.toApi(checkinDate),
        checkoutDate: dateFormatter.toApi(checkoutDate),
      };

      const params = { ...formattedDates, ...occupancyParams };
      setUrlParams(params, history);
      const searchPagePath = buildPath(history.location.search, routes.searchPage);
      return history.push(searchPagePath);
    }

    return setRangePickerVisible(true);
  };

  const rangePickerClassName = classNames(styles.rangePicker, {
    [`${styles.rangePicker__error}`]: rangePickerVisible,
  });

  return (
    <div className={styles.wrapper}>
      <RangePicker
        checkinDatePlaceholder={t("hotel_page:checkin_placeholder")}
        checkoutDatePlaceholder={t("hotel_page:checkout_placeholder")}
        checkinDate={checkinDate}
        checkoutDate={checkoutDate}
        name="search_dates"
        className={rangePickerClassName}
        onDatesChange={handleDatesChange}
        isVisible={rangePickerVisible}
        closeCallback={() => setRangePickerVisible(false)}
      />

      <Dropdown
        show={isOpen}
        onToggle={handleToggleDropdown}
        title={dropdownTitle}
        className={styles.occupancyDropDown}
        layout="vertical"
      >
        <OccupancySettingsForm
          bookingParams={occupancyParams}
          onClose={handleToggleDropdown}
          onChange={handleChangeOccupancy}
        />
      </Dropdown>

      <Button onClick={onSearch} className={styles.searchBtn}>
        {t("main_page:search_btn")}
      </Button>
    </div>
  );
}
