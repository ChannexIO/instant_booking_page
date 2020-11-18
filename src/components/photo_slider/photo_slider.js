import React from 'react';
import { Carousel } from 'react-bootstrap';

import styles from './photo_slider.module.css';

const ARROW_STYLES = {
  default: styles.defaultArrows,
  box: styles.boxArrows,
}

export default function PhotoSlider({ photos, arrowStyle = "default" }) {
  if (!photos || !photos.length) {
    return null;
  }

  const { [arrowStyle]: arrowClass = ARROW_STYLES.default } = ARROW_STYLES; 

  return (
    <Carousel className={[styles.carousel, arrowClass].join(" ")}>
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
