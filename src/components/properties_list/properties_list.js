import React from "react";
import { Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

import PropertiesItem from "./properties_item";

import styles from "./properties.module.css";

export default function PropertiesList(props) {
  const {
    properties,
    loading,
    currency,
    highlightedProperties,
    onSelectProperty,
    onPropertyMouseOver,
    onPropertyMouseOut,
  } = props;
  const { t } = useTranslation();
  const isPropertiesPresent = properties && !loading;

  const listClassName = classNames(styles.list, {
    [`${styles.listGrid}`]: isPropertiesPresent && properties.length > 0,
  });

  const renderContent = () => {
    if (!isPropertiesPresent) {
      return (
        <div className={styles.spinner}>
          <Spinner animation="border" size="xl" />
        </div>
      );
    }

    if (properties && properties.length > 0) {
      return properties.map((item) => {
        const isHighlighted = highlightedProperties[item.id];

        return (
          <PropertiesItem
            key={item.id}
            property={item}
            currency={currency}
            isHighlighted={isHighlighted}
            onSelectProperty={onSelectProperty}
            onMouseOver={onPropertyMouseOver}
            onMouseOut={onPropertyMouseOut}
          />
        );
      });
    }

    return (
      <div className={styles.emptyWrapper}>
        <p className={styles.empty}>{t("properties:no_search_results")}</p>
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={listClassName}>{renderContent()}</div>
    </div>
  );
}
