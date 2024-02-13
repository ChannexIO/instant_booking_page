import React from "react";
import { useTranslation } from "react-i18next";

import Caption from "components/caption";

const FACILITY_DIVIDER = " · ";

export default function FacilitiesContainer({ facilities }) {
  const { t } = useTranslation();
  const translated_facilities = facilities.map((facility) => {
    return t(`facilities:${facility.toLowerCase()}`);
  });

  return <Caption variant="green">{translated_facilities.join(FACILITY_DIVIDER)}</Caption>;
}
