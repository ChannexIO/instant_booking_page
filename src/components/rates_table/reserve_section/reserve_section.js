import React from "react"
import { useTranslation } from "react-i18next";
import { Table, Button } from "react-bootstrap";

import styles from "./reserve_section.module.css";

export default function ReserveSection({ isMobile, isRateSelected, isRatePlansPresent, onClick }) {
  const { t } = useTranslation();
  const containerClasses = [styles.reserveSectionContainer];
  const buttonClasses = [styles.reserveButton];
  const buttonText = isRatePlansPresent ? t("rates_table:reserve") : t("rates_table:show_prices");

  if (isMobile) {
    containerClasses.push(styles.reserveSectionContainerMobile);
    buttonClasses.push(styles.reserveButtonMobile);
  }

  return (
    <div className={containerClasses.join(" ")}>
      {!isMobile && <div className={styles.reserveSectionHeader}/>}
      <div className={styles.reserveSectionBody}>
        <Button
          className={buttonClasses.join(" ")}
          disabled={!isRateSelected}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}