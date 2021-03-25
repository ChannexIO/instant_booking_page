import React from "react";
import { Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import SectionWrapper from "components/layout/section_wrapper";

import styles from "./not_found_message.module.css";

export default function NotFoundMessage() {
  const { t } = useTranslation();

  return (
    <SectionWrapper theme="light">
      <Col xs="12">
        <div className={styles.container}>
          <div className={styles.notFound}>404</div>
          <div className={styles.message}>{t("not_found_page:not_found")}</div>
        </div>
      </Col>
    </SectionWrapper>
  );
}
