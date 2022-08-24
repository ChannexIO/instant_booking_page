import React, { useCallback, useState } from "react";

import Cell from "components/layout/cell";

import BedOptions from "./bed_options";
import Description from "./description";
import RoomAvailability from "./room_availability";
import RoomFacilities from "./room_facilities";
import RoomTitle from "./room_title";
import RoomDetailsModal from "./room_details_modal";

import styles from "./room_info.module.css";

export default function RoomInfo({ roomType }) {
  const { availability, bedOptions, facilities, description } = roomType;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = useCallback(() => {
    setIsModalOpen(!isModalOpen);
  }, [isModalOpen, setIsModalOpen]);

  return (
    <Cell className={styles.roomContainer}>
      <RoomTitle room={roomType} handleModalToggle={handleModalToggle} />
      <Description description={description} handleModalToggle={handleModalToggle} />
      <RoomAvailability availability={availability} />
      <BedOptions bedOptions={bedOptions} />
      <RoomFacilities facilities={facilities} />
      <RoomDetailsModal room={roomType} show={isModalOpen} onHide={handleModalToggle} />
    </Cell>
  );
}
