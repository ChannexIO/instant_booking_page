import React from "react";

import CurrencyConversionWarning from "components/currency_conversion_warning";
import SubmitBookingButton from "components/payment_form/submit_booking_button";

import styles from "./submit_section.module.css";

export default function SubmitSection() {
  return (
    <div className={styles.container}>
      <CurrencyConversionWarning />
      <SubmitBookingButton />
    </div>
  );
}
