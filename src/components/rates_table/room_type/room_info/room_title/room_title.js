import React from "react";
import { Button } from "react-bootstrap";

import styles from "./room_title.module.css";

export default function RoomTitle({ room, handleModalToggle }) {
  return (
    <>
      <Button variant="link" className={styles.title} onClick={handleModalToggle}>
        <strong>{room.title}</strong>
      </Button>
    </>
  );
}
