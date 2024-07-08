import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Col } from "react-bootstrap";

import SectionWrapper from "components/layout/section_wrapper";

import Map from "./map";

import styles from "./map_section.module.css";

export default function MapSection({ property }) {
  const [mapIsActive, setMapIsActive] = useState(false);
  const { t } = useTranslation();
  const { location } = property;

  const enableMap = () => {
    setMapIsActive(true);
  };

  return (
    <SectionWrapper theme="dark" padded={false}>
      <Col xs="12">
        <div className={styles.contactsSection}>
          {mapIsActive && <Map location={location} />}
          {!mapIsActive && (
            <div className={styles.mapPlaceholder}>
              <button className={styles.showMapButton} onClick={enableMap}>{t("show_map")}</button>
            </div>
          )}
        </div>
      </Col>
    </SectionWrapper>
  );
}
