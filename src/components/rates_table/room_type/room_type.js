import React from 'react';
import RatePlan from "./rate_plan";
import RoomInfo from "./room_info";

import styles from "./room_type.module.css";

export default function RoomType({ roomType, rowIndex }) {
    const { ratePlans } = roomType;
  
    return (
      <>
        {ratePlans.map((ratePlan, index) => (
          <tr key={ratePlan.id}>
            {!index ? <RoomInfo roomType={roomType} rowIndex={rowIndex} /> : null}
            <RatePlan ratePlan={ratePlan} />
          </tr>
        ))}
      </>
    )
}