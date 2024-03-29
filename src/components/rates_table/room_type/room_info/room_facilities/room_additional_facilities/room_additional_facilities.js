import React, { useCallback, useState } from "react";
import { Accordion, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import classnames from "classnames";

import FacilitiesContainer from "../facilities_container";

import styles from "./room_additional_facilities.module.css";

export default function RoomAdditionalFacilities({ facilities }) {
  const [isOpen, setOpenState] = useState(null);
  const { t } = useTranslation();

  const toggleOpen = useCallback(() => {
    setOpenState(!isOpen ? "0" : null);
  }, [setOpenState, isOpen]);

  const buttonText = isOpen ? t("rates_table:show_less") : t("rates_table:show_more");

  if (!facilities.length) {
    return null;
  }

  const containerClass = classnames(styles.container, isOpen && styles.containerExpanded);

  return (
    <div className={containerClass}>
      <Accordion activeKey={isOpen}>
        <Accordion.Collapse className={styles.facilities} eventKey="0">
          <FacilitiesContainer facilities={facilities} />
        </Accordion.Collapse>
      </Accordion>
      <Button variant="link" className={styles.toggleButton} onClick={toggleOpen}>
        {buttonText}
      </Button>
    </div>
  );
}
