import React from 'react';
import { Carousel } from 'react-bootstrap';

import styles from './photo_slider.module.css';

export default function PhotoSlider({ photos }) {
  if (!photos || !photos.length) {
    return null;
  }

  return (
    <Carousel className={styles.carousel}>
      {photos.map((photo) => (
        <Carousel.Item className={styles.carouselItem} key={photo.url}>
          <img
            className="d-block w-100"
            src={photo.url}
            alt={photo.description}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
