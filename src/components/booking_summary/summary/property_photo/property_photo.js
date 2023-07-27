import React from "react";

import styles from "./property_photo.module.css";

export default function PropertyPhoto({ photos }) {
  if (!photos.length) {
    return null;
  }

  const [photo] = photos;

  return (
    <div className={styles.photoContainer}>
      <picture className={styles.picture}>
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

        <img className="d-block w-100" src={`${photo.url}-/resize/575x/575.jpg`} alt={photo.description} />
      </picture>
    </div>
  );
}
