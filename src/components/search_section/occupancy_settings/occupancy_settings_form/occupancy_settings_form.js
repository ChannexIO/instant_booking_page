import React from "react";
import { useTranslation } from "react-i18next";

import LinkButton from "components/buttons/link_button";
import IntegerInput from "components/inputs/integer_input";
import Cell from "components/layout/cell";

import ChildrenAgeSettings from "./children_age_settings";

import styles from "./occupancy_settings_form.module.css";

const MAX_ADULTS_AMOUNT = 30;
const MIN_ADULTS_AMOUNT = 1;
const MAX_CHILDREN_AMOUNT = 11;
const MIN_CHILDREN_AMOUNT = 0;

export default function OccupancySettingsForm({ bookingParams, onClose, onChange }) {
  const { t } = useTranslation();

  return (
    <div>
      <Cell noPadding>
        <IntegerInput
          label={t("hotel_page:adults_label")}
          minValue={MIN_ADULTS_AMOUNT}
          maxValue={MAX_ADULTS_AMOUNT}
          name="adults"
          value={bookingParams.adults}
          onChange={onChange}
        />
      </Cell>
      <Cell noLine noPadding>
        <IntegerInput
          label={t("hotel_page:children_label")}
          minValue={MIN_CHILDREN_AMOUNT}
          maxValue={MAX_CHILDREN_AMOUNT}
          name="children"
          value={bookingParams.children}
          onChange={onChange}
        />
      </Cell>
      <ChildrenAgeSettings bookingParams={bookingParams} name="childrenAge" onChange={onChange} />
      <div className={styles.closeSection}>
        <LinkButton onClick={onClose}>{t("global:close")}</LinkButton>
      </div>
    </div>
  );
}
