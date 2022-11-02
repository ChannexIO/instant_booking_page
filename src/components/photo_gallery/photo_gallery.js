import React, { useState } from "react";
import ReactBnbGallery from "react-bnb-gallery";
import classNames from "classnames";

import "react-bnb-gallery/dist/style.css";
import styles from "./photo_gallery.module.css";

const DEFAULT_WIDTH_PHOTO = 275;
const ONE_OR_TWO_WIDTH_PHOTO = 1140;
const THREE_OR_FOUR_WIDTH_PHOTO = 855;
const FIVE_OR_MORE_WIDTH_PHOTO = 570;

export default function PhotoGallery({ photos }) {
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);

  const closeGallery = () => setActivePhotoIndex(null);

  const parsePhotos = photos.map((photo) => {
    return {
      photo: `${photo.url}-/resize/1920x/.jpg 1x`,
      thumbnail: `${photo.url}-/resize/58x/20.jpg 1x`,
    };
  });

  const previewList = photos.slice(0, 5);

  const isOneOrTwoPhotos = previewList.length === 1 || previewList.length === 2;
  const isThreeOrFourPhotos = previewList.length === 3 || previewList.length === 4;
  const isFiveOrMorePhotos = previewList.length >= 5;

  const getPhotoWidth = (index) => {
    let width = DEFAULT_WIDTH_PHOTO;

    if (isOneOrTwoPhotos) {
      width = ONE_OR_TWO_WIDTH_PHOTO;
    }
    if (isThreeOrFourPhotos && index === 0) {
      width = THREE_OR_FOUR_WIDTH_PHOTO;
    }
    if (isFiveOrMorePhotos && index === 0) {
      width = FIVE_OR_MORE_WIDTH_PHOTO;
    }
    return width;
  };

  const listClassName = classNames(styles.list, {
    [`${styles.list__oneOrTwo}`]: isOneOrTwoPhotos,
    [`${styles.list__threeOrFour}`]: isThreeOrFourPhotos,
    [`${styles.list__fiveOrMore}`]: isFiveOrMorePhotos,
  });

  return (
    <div className={styles.wrapper}>
      <div className={listClassName}>
        {previewList.map((photo, index) => {
          const itemClassName = classNames(styles.item, styles[`item--${index + 1}`]);
          const width = getPhotoWidth(index);
          const onOpenGallery = () => setActivePhotoIndex(index);
          const set = `
          ${photo.url}-/resize/${width}x/.jpg,
          ${photo.url}-/resize/${width * 2}x/.jpg 2x`;

          return (
            <div className={itemClassName} key={photo.url} onClick={onOpenGallery}>
              <img className="d-block w-100" srcSet={set} src={photo.url} alt={photo.description} />
            </div>
          );
        })}
      </div>
      <ReactBnbGallery
        activePhotoIndex={activePhotoIndex}
        show={activePhotoIndex !== null}
        photos={parsePhotos}
        onClose={closeGallery}
      />
    </div>
  );
}
