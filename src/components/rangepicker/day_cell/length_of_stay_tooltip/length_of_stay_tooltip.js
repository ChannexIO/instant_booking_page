import React from 'react';
import { Overlay, Tooltip } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export default function LengthOfStayTootip({ show, minStayLength, containerRef }) {
  const { t } = useTranslation();

  return (
    <Overlay
      show={show}
      placement="top"
      target={containerRef}
      container={containerRef}
    >
      {(props) => (
        <Tooltip
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
        >
          {`${minStayLength}-${t('hotel_page:night_minimum')}`}
        </Tooltip>
      )}
    </Overlay>
  );
}
