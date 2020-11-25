import React from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export default function ErrorModal({ visible, onClose }) {
  const { t } = useTranslation();

  return (
    <Modal show={visible} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('payment_page:error_modal:header')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('payment_page:error_modal:text')}
      </Modal.Body>
    </Modal>
  );
}
