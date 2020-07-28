import React from 'react';
import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import RoomType from "./room_type";

import styles from "./rates_table.module.css";

export default function RatesTable({ roomTypes }) {
  const { t } = useTranslation();

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th className={styles.roomTypeColumn}>{t("rates_table:room_type")}</th>
          <th>{t("rates_table:sleeps")}</th>
          <th>{t("rates_table:price")}</th>
          <th>{t("rates_table:your_choises")}</th>
          <th>{t("rates_table:select_rooms")}</th>
        </tr>
      </thead>
      <tbody>
        {roomTypes.map((roomType, rowIndex) => (
          <RoomType roomType={roomType} rowIndex={rowIndex} />
        ))}
      </tbody>
    </Table>
  );
}