import React from "react";
import { useTranslation } from "react-i18next";

import Label from "components/label";

import IconCheckIn from "static/icons-checkin.svg";
import IconCheckOut from "static/icons-checkout.svg";
import styles from "./date.module.css";

const DATE_FORMAT = "DD MMM";
const CHECKIN_DATE = "checkin";

export default function Date({ date, type = CHECKIN_DATE }) {
  const { t } = useTranslation();

  const dateConfig = {
    checkin: {
      label: t("payment_page:booking_summary:check_in"),
      className: styles.dateFrom,
      iconSrc: IconCheckIn,
    },
    checkout: {
      label: t("payment_page:booking_summary:check_out"),
      className: styles.dateTo,
      iconSrc: IconCheckOut,
    },
  };

  const dateParams = dateConfig[type];

  if (!date) {
    return null;
  }

  return (
    <div className={styles.datesFromTo}>
      <Label>{dateParams.label}</Label>
      <div className={dateParams.className}>
        <img className={styles.icon} src={dateParams.iconSrc} alt={type} />
        <div>
          <strong>{date.locale(t("general.code")).format(DATE_FORMAT)}</strong>
        </div>
      </div>
    </div>
  );
}
