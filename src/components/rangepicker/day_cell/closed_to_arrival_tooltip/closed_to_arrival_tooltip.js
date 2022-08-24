import React from "react";
import { Overlay, Tooltip } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function ClosedToArrivalTootip({ show, containerRef }) {
  const { t } = useTranslation();

  return (
    <Overlay show={show} placement="top" target={containerRef} container={containerRef}>
      {(props) => (
        <Tooltip
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
        >
          {t("hotel_page:closed_to_arrival")}
        </Tooltip>
      )}
    </Overlay>
  );
}
