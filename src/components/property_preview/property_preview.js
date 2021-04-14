import React, { useCallback } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import routes from "routing/routes";

import buildPath from "utils/build_path";

import CloseIcon from "static/close-icon.svg";
import EmptyIcon from "static/empty-property.svg";
import styles from "./property_preview.module.css";

export default function PropertyPreview({ property, onClearSelectProperty }) {
  const { t } = useTranslation();
  const history = useHistory();
  const { photos, title, description, address, id } = property;

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

  const onSeeMore = useCallback(() => {
    const redirectPath = buildPath("", routes.hotelPage, { channelId: id });

    history.push(redirectPath);
  }, [history, id]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        {getUrlPhoto(photos)}
        <div
          className={styles.closeWrapper}
          onClick={onClearSelectProperty}
          style={{ backgroundImage: `url(${CloseIcon})` }}
        />
      </div>
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <p className={styles.title}>{title}</p>
          <p className={styles.address}>{address}</p>
        </div>
        <div className={styles.seeMoreBtnWrapper}>
          <Button onClick={onSeeMore}>{t("properties:see_more")}</Button>
        </div>
      </div>

      <p className={styles.description}>{description || t("properties:no_info")}</p>
    </div>
  );
}
