import React from "react";
import { Carousel } from "react-bootstrap";

import styles from "./photo_slider.module.css";

const ARROW_STYLES = {
  default: styles.defaultArrows,
  box: styles.boxArrows,
};

export default function PhotoSlider({ photos, arrowStyle = "default" }) {
  if (!photos || !photos.length) {
    return null;
  }

  const { [arrowStyle]: arrowClass = ARROW_STYLES.default } = ARROW_STYLES;

  return (
    <Carousel className={[styles.carousel, arrowClass].join(" ")}>
      {photos.map((photo) => (
        <Carousel.Item className={styles.carouselItem} key={photo.url}>
          <picture>
            <source media="(max-width: 575px)" srcSet={`${photo.url}-/resize/575x/575.jpg 1x`} />
            <source
              media="(min-width: 576px) and (max-width: 767px)"
              srcSet={`${photo.url}-/resize/767x/767.jpg 1x`}
            />
            <source
              media="(min-width: 768px) and (max-width: 991px)"
              srcSet={`${photo.url}-/resize/991x/991.jpg 1x`}
            />
            <source
              media="(min-width: 992px) and (max-width: 1199px)"
              srcSet={`${photo.url}-/resize/1199x/1199.jpg 1x`}
            />
            <source
              media="(min-width: 1200px) and (max-width: 1920px)"
              srcSet={`${photo.url}-/resize/1920x/1920.jpg 1x`}
            />
            <source media="(min-width: 1921px)" srcSet={`${photo.url} 1x`} />

            <img className="d-block w-100" src={photo.url} alt={photo.description} />
          </picture>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
