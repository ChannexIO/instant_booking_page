import React from "react";
import { Col } from "react-bootstrap";

import SectionWrapper from "components/layout/section_wrapper";

import Map from "./map";

import styles from "./map_section.module.css";

export default function MapSection({ property }) {
  const { location } = property;

  return (
    <SectionWrapper theme="dark" padded={false}>
      <Col xs="12">
        <div className={styles.contactsSection}>
          <Map location={location} />
        </div>
      </Col>
    </SectionWrapper>
  );
}
