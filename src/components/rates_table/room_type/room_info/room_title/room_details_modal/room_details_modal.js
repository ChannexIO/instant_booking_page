import React from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import PhotoSlider from 'components/photo_slider';

import styles from './room_details_modal.module.css';

export default function RoomDetailsModal({ room, show, onHide }) {
  const { t } = useTranslation(); 
  const { photos, description, title } = room;

  const isPhotosPresent = Boolean(Array.isArray(photos) && photos.length);

  return (
    <Modal
      className={styles.modal}
      show={show}
      onHide={onHide}
    >
      <Modal.Header
        className={styles.modalHeader}
        closeButton
      >
        {title}
      </Modal.Header>
      {isPhotosPresent && (
        <Modal.Body className={styles.modalBody}>
          <div className={styles.sliderContainer}>
            <PhotoSlider photos={photos} />
          </div>
        </Modal.Body>
      )}
      <Modal.Footer className={styles.modalFooter}>
        <div className={styles.roomDescriptionHeader}>{t('rates_table:room_description')}</div>
        <div className={styles.roomDescription}>
          {description}
        </div>
      </Modal.Footer>
    </Modal>
  );  
}