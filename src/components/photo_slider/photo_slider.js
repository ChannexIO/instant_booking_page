import React from 'react';
import { Carousel } from "react-bootstrap";

import styles from "./photo_slider.module.css";

export default function PhotoSlider({ property }) {
  const { photos } = property;

  if (!photos || !photos.length) {
    return null;
  }

  return (
    <Carousel className={styles.carousel}>
      {photos.map((photoUrl, index) => (
        <Carousel.Item className={styles.carouselItem} key={index}>
          <img
            className="d-block w-100"
            src={photoUrl}
            alt="First slide"
          />
        </Carousel.Item>
      ))}
    </Carousel>
  )
}