import React from 'react';
import { Image, Nav } from "react-bootstrap";

import styles from "./hotel_logo.module.css";

export default function HotelLogo({ property }) {
  return (
    <Nav.Link className={styles.hotelLogoLink} href={property.link} target="_blank">
      <Image className={styles.hotelLogo} src={property.logo} roundedCircle />
    </Nav.Link>
  );
}