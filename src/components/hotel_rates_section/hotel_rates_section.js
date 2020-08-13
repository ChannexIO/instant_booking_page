import React from 'react';
import { Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import RatesTable from "components/rates_table";

import styles from "./hotel_rates_section.module.css";

export default function HotelRatesSection({ property }) {
  const { t } = useTranslation();

  const roomTypes = [
    {
      "type": "room_with_rates",
      "id": "room_id",
      "title": "Room Title",
      "description": "Description",
      "bedOptions": [
        {
          "title": "Olympic Queen",
          "count": 2,
          "size": "90x200 CM"
        }
      ],
      "facilities": ["facility 1", "facility 2"],
      "photos": [
        {
          "url": "PHOTO_URL",
          "title": "title",
          "author": "author"
        }
      ],
      "ratePlans": [
        {
          "id": "RATE_PLAN_ID",
          "title": "Title",
          "currency": "GBP",
          "occupancy": {
            "adults": 1,
            "children": 0,
            "infants": 0
          },
          "cancellationPolicy": "Cancellation policy",
          "price": "100.00",
          "taxes": [
            {
              "title": "Tax Title",
              "amount": "10.00",
              "inclusive": false,
              "rate": "10.00",
              "mode": "percent"
            }
          ]
        }
      ]
    }
  ];

  return (
    <Row id="hotel_rates_section">
      <div className={styles.hotelRatesTitle}>{t("rates_table:title")}</div>
      <RatesTable roomTypes={roomTypes} />
    </Row>
  );
}