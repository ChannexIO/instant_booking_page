import React, { useMemo } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import classNames from "classnames";

import routes from "routing/routes";

import buildPath from "utils/build_path";

import BestOffer from "./best_offer";

import EmptyIcon from "static/empty-property.svg";
import styles from "./properties.module.css";

export default function PropertiesItem(props) {
  const { property, currency, isHighlighted, onSelectProperty, onMouseOver, onMouseOut } = props;
  const { t } = useTranslation();
  const history = useHistory();

  const { description, photos, title, id, bestOffer } = property;

  const handleMouseOver = () => {
    onMouseOver(property);
  };

  const handleMouseOut = () => {
    onMouseOut(property);
  };

  const handleSelectProperty = () => {
    onSelectProperty(property);
  };

  const selectRoomPath = buildPath(history.location.search, routes.hotelPage, { channelId: id });

  const photo = useMemo(() => {
    if (photos?.length > 0) {
      return (
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${photos[0].url}-/resize/570x454/.jpg)` }}
        />
      );
    }

    return (
      <div className={styles.emptyImage}>
        <img src={EmptyIcon} alt={title} />
      </div>
    );
  }, [photos, title]);

  const itemClassName = classNames(styles.item, isHighlighted && styles.itemHighlighted);

  return (
    <div
      className={itemClassName}
      onClick={handleSelectProperty}
      onMouseOver={handleMouseOver}
      onFocus={handleMouseOver}
      onMouseOut={handleMouseOut}
      onBlur={handleMouseOut}
    >
      <div className={styles.overlay}>
        <div className={styles.previewBtnWrapper}>
          <Button className={styles.previewButton}>{t("properties:preview")}</Button>
        </div>
      </div>

      <div>
        <div className={styles.imageWrapper}>{photo}</div>

        <div className={styles.info}>
          <p className={styles.title}>{title}</p>
          <p className={styles.description}>{description || t("properties:no_info")}</p>
        </div>
      </div>

      <div className={styles.footer}>
        <BestOffer amount={bestOffer} currency={currency} />
        <Link to={selectRoomPath} className={styles.seeMoreLink}>
          {t("properties:book_now")}
        </Link>
      </div>
    </div>
  );
}
