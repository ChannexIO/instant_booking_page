import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FrownOutlined } from "@ant-design/icons";
import classnames from "classnames";

import PhotoSlider from "components/photo_slider";
import Placeholder from "components/placeholder";

import styles from "./room_photos_section.module.css";

export default function RoomPhotosSection({ photos, className }) {
  const { t } = useTranslation();
  const isPhotosPresent = photos?.length;
  const containerClass = classnames(styles.container, className);

  const placeholder = useMemo(
    () => <Placeholder icon={<FrownOutlined />} text={t("rates_table:no_room_photos")} />,
    [t],
  );

  const content = isPhotosPresent ? <PhotoSlider photos={photos} /> : placeholder;

  return <div className={containerClass}>{content}</div>;
}
