import React from "react";
import { useTranslation } from "react-i18next";

import Alert from "components/alert";

export default function MissingSpaces({ missingSpaces }) {
  const { t } = useTranslation();

  if (!missingSpaces) {
    return null;
  }

  return <Alert text={t("hotel_page:missing_spaces")} variant="error" />;
}
