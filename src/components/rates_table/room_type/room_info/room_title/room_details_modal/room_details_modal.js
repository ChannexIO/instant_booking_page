import React, { useMemo } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FrownOutlined } from "@ant-design/icons";

import FacilityGroup from "components/facility_group";
import PhotoSlider from "components/photo_slider";
import Placeholder from "components/placeholder";

import RoomDetailsSection from "./room_details_section";

import styles from "./room_details_modal.module.css";

export default function RoomDetailsModal({ room, show, onHide }) {
  const { t } = useTranslation();
  const { photos, description, title, facilities } = room;

  const roomFacilities = useMemo(() => {
    return facilities.map((facilityGroup) => (
      <FacilityGroup key={facilityGroup.categoryCode} facilityGroup={facilityGroup} />
    ));
  }, [facilities]);
  const isPhotosPresent = Boolean(photos?.length);
  const isFacilitiesPresent = Boolean(roomFacilities.length);
  const isContentMissing = !(isPhotosPresent || isFacilitiesPresent || description);

  return (
    <Modal dialogClassName={styles.modal} show={show} onHide={onHide}>
      <Modal.Header className={styles.modalHeader} closeButton>
        <h6>{title}</h6>
      </Modal.Header>
      {isPhotosPresent && (
        <Modal.Body className={styles.modalBody}>
          <div className={styles.sliderContainer}>
            <PhotoSlider photos={photos} />
          </div>
        </Modal.Body>
      )}
      {isContentMissing && (
        <Placeholder icon={<FrownOutlined />} text={t("rates_table:no_room_description")} />
      )}
      <Modal.Footer className={styles.modalFooter}>
        {description && <RoomDetailsSection>{description}</RoomDetailsSection>}
        {isFacilitiesPresent && (
          <RoomDetailsSection lable={t("rates_table:room_facilities")}>
            {roomFacilities}
          </RoomDetailsSection>
        )}
      </Modal.Footer>
    </Modal>
  );
}
