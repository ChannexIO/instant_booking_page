import React, { useCallback } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import routes from "routing/routes";

import buildPath from "utils/build_path";

import EmptyIcon from "static/empty-property.svg";
import styles from "./properties.module.css";

export default function PropertiesItem({ property, onSelectProperty }) {
  const { t } = useTranslation();

  const { description, photos, title, id } = property;

  const getUrlPhoto = useCallback(
    (arr) => {
      if (arr?.length > 0) {
        return <div className={styles.image} style={{ backgroundImage: `url(${arr[0].url})` }} />;
      }

      return (
        <div className={styles.emptyImage}>
          <img src={EmptyIcon} alt={title} />
        </div>
      );
    },
    [title],
  );

  const selectRoomPath = buildPath("", routes.hotelPage, { channelId: id });

  return (
    <div className={styles.item}>
      <div className={styles.imageWrapper}>
        {getUrlPhoto(photos)}
        <div className={styles.previewBtnWrapper}>
          <Button onClick={() => onSelectProperty(property)}>{t("properties:preview")}</Button>
        </div>
      </div>

      <div className={styles.info}>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{description || t("properties:no_info")}</p>
      </div>

      <div className={styles.footer}>
        <Link to={selectRoomPath} className={styles.seeMoreLink}>
          {t("properties:see_more")}
        </Link>
      </div>
    </div>
  );
}
