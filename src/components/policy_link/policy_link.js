import React from "react";
import { useTranslation } from "react-i18next";

import Link from "components/link";

export default function PolicyLink() {
  const { t } = useTranslation();

  return (
    <Link to="https://channex.io/policy#Policy" target="_blank">
      {t("footer:privacy_policy")}
    </Link>
  );
}
