import React, { useState } from 'react';
import { Accordion, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import RoomFacilities from "../room_facilities";

import styles from "./room_additional_facilities.module.css";

export default function RoomAdditionalFacilities({ facilities, collapsable }) {
  const { t } = useTranslation();
  const defaultKey = collapsable ? null : "0";
  const [isOpen, setOpenState] = useState(defaultKey);
  const toggleOpen = () => setOpenState(!isOpen ? "0" : null);
  const buttonText = isOpen ? t("rates_table:show_less") : t("rates_table:show_more");

  return (
    <div className={styles.roomAdditionalFacilitiesContainer}>
      <Accordion activeKey={isOpen}>
        <Accordion.Collapse eventKey="0">
          <RoomFacilities facilities={facilities} />
        </Accordion.Collapse>
      </Accordion>
      {collapsable && (
        <Button
          variant="link"
          className={styles.toggleButton}
          onClick={toggleOpen}
        >
          {buttonText}
        </Button>
      )}
    </div>
  )
}