import React, { useMemo } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import Caption from "components/caption";
import Currency from "components/currency";
import Label from "components/label";

import RoomDetailsSection from "./room_details_section";
import RoomPhotosSection from "./room_photos_section";

import styles from "./room_details_modal.module.css";

const FACILITY_DIVIDER = " · ";

const getMinPrice = (ratePlans) => {
  const prices = ratePlans.map((rate) => rate.totalPrice);

  return Math.min(...prices);
};

export default function RoomDetailsModal({ room, show, onHide }) {
  const { t } = useTranslation();
  const { photos, description, title, facilities, ratePlans = [] } = room;

  const roomFacilities = useMemo(
    () =>
      facilities
        .reduce((acc, facilityGroup) => [...acc, ...facilityGroup.facilities], [])
        .join(FACILITY_DIVIDER),
    [facilities],
  );

  const isFacilitiesPresent = Boolean(roomFacilities.length);
  const minPrice = getMinPrice(ratePlans);
  const currency = ratePlans[0]?.currency;

  return (
    <Modal dialogClassName={styles.modal} show={show} onHide={onHide}>
      <Modal.Body className={styles.modalBody}>
        <RoomPhotosSection photos={photos} />
        <div className={styles.contentContainer}>
          <Modal.Header className={styles.modalHeader} closeButton>
            <h5>{title}</h5>
          </Modal.Header>

          <div>
            <Label className={styles.priceLabel}>{t("rates_table:price_from")}</Label>
            <div>
              <Currency className={styles.roomPrice} amount={minPrice} currency={currency} />
              <span className={styles.pricePostfix}>{t("rates_table:per_night")}</span>
            </div>
            <Caption>{t("rates_table:taxes_note")}</Caption>
          </div>
          {description && (
            <RoomDetailsSection>
              <div className={styles.description}>{description}</div>
            </RoomDetailsSection>
          )}
          {isFacilitiesPresent && (
            <RoomDetailsSection lable={t("rates_table:room_facilities")}>
              <div className={styles.facilities}>{roomFacilities}</div>
            </RoomDetailsSection>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
