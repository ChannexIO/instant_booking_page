import React, { useMemo } from "react";
import { Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

import PropertiesItem from "./properties_item";

import styles from "./properties.module.css";

export default function PropertiesList({ properties, loading, onSelectProperty }) {
  const { t } = useTranslation();
  const isPropertiesPresent = properties && !loading;

  const listClassName = classNames(styles.list, {
    [`${styles.listGrid}`]: isPropertiesPresent && properties.length > 0,
  });

  return (
    <div className={styles.wrapper}>
      <div className={listClassName}>
        {useMemo(() => {
          if (!isPropertiesPresent) {
            return (
              <div className={styles.spinner}>
                <Spinner animation="border" size="xl" />
              </div>
            );
          }
          if (properties && properties.length > 0) {
            return properties.map((item, index) => {
              return (
                <PropertiesItem property={item} key={index} onSelectProperty={onSelectProperty} />
              );
            });
          }
          return (
            <div className={styles.emptyWrapper}>
              <p className={styles.empty}>{t("properties:no_search_results")}</p>
            </div>
          );
        }, [isPropertiesPresent, properties, t, onSelectProperty])}
      </div>
    </div>
  );
}
