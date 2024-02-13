import React from "react";
import { useTranslation } from "react-i18next";

import Link from "components/link";

export default function PolicyLink() {
  const { t } = useTranslation();
  const host = window.location.host;
  let url;

  if (host.indexOf("channex.io") > -1) {
    url = "https://channex.io/policy#Policy";
  }

  if (url) {
    return (
      <Link to={url} target="_blank">
        {t("footer:privacy_policy")}
      </Link>
    );
  }
  return null;
}
