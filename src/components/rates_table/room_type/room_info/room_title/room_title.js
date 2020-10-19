import React, { useCallback, useState } from 'react';
import { Button } from 'react-bootstrap';

import RoomDetailsModal from './room_details_modal';

import styles from './room_title.module.css';

export default function RoomTitle({ room }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = useCallback(() => {
    setIsModalOpen(!isModalOpen);
  }, [isModalOpen, setIsModalOpen]);

  return (
    <>
      <Button
        variant="link"
        className={styles.title}
        onClick={handleModalToggle}
      >
        {room.title}
      </Button>
      <RoomDetailsModal room={room} show={isModalOpen} onHide={handleModalToggle} />
    </>
  );
}
