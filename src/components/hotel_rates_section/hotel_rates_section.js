import React from 'react';
import { Row } from "react-bootstrap";

import RatesTable from "components/rates_table";

import styles from "./hotel_rates_section";

export default function HotelRatesSection({ property }) {
  
  const dataMock = {
    roomTypes: [
      {
        id: "123123",
        title: "Room type 1",
        description: "some room",
        availability: 5,
        bedType: {
          code: 249,
          value: 1,
        },
        facilities: [ 0, 12,3,0, 1,2 ],
        otherFacilities: [0, 2, 5, 0,0,0,0,0],
        ratePlans: [
          {
            id: "12tg42",
            title: "room rate 1",
            occupancy: 5,
            cancellationPolicy: "partially_refundable",
            mealPlan: {},
            taxes: {}
          },
          {
            id: "54g35h45",
            title: "room rate 2",
            occupancy: 3,
            cancellationPolicy: "non_refundable",
            mealPlan: {},
            taxes: {}
          }
        ]
      },
      {
        id: "123123",
        title: "Room type 1",
        description: "some room",
        availability: 5,
        bedTypes: [
          { 
            roomType: 0,
            bedType: 0,
            value: 14,
          }
        ],
        facilities: [ 0, 12,3,0, 1,2 ],
        otherFacilities: [0, 2, 5, 0,0,0,0,0],
        ratePlans: [
          {
            id: "12tg42",
            title: "room rate 1",
            occupancy: 5,
            cancellationPolicy: "partially_refundable",
            mealPlan: {},
            taxes: {}
          },
          {
            id: "54g35h45",
            title: "room rate 2",
            occupancy: 3,
            cancellationPolicy: "non_refundable",
            mealPlan: {},
            taxes: {}
          }
        ]
      }
    ]
  }

  return (
    <Row>
      <RatesTable roomTypes={dataMock.roomTypes} />
    </Row>
  );
}