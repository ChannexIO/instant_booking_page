import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

import { BookingDataContext } from "containers/data_context";

export default function HeadManager() {
  const { t } = useTranslation();
  const { property } = useContext(BookingDataContext);
  const { data } = property;

  const docTitle = data?.title ?? t("global:loading");

  return (
    <Helmet>
      <title>{docTitle}</title>
    </Helmet>
  );
}
