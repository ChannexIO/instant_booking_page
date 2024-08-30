import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import moment from "moment";

import Select from "components/inputs/select";

import SUPPORTED_LANGUAGES from "constants/supported_languages";
import getUrlParams from "utils/get_url_params";
import setUrlParams from "utils/set_url_params";

import "moment/locale/en-gb";
import "moment/locale/tr";
import "moment/locale/es";
import "moment/locale/pt";
import "moment/locale/it";
import "moment/locale/de";
import "moment/locale/fr";
import "moment/locale/el";
import "moment/locale/sr";
import "moment/locale/nl";
import "moment/locale/hu";
import "moment/locale/th";

export default function LocaleSelect() {
  const { t, i18n } = useTranslation();
  const history = useHistory();

  const handleLocaleChange = useCallback(
    (localeKey) => {
      i18n.changeLanguage(localeKey);
      moment.locale(localeKey);
      setUrlParams({ lang: localeKey }, history);
    },
    [i18n, history],
  );

  useEffect(
    function setSelectedLanguage() {
      const { lang } = getUrlParams();

      if (!lang) {
        return;
      }

      moment.locale(lang);
      i18n.changeLanguage(lang);
    },
    [i18n],
  );

  return (
    <Select
      label={t("general:locale")}
      value={i18n.language}
      options={SUPPORTED_LANGUAGES}
      onChange={handleLocaleChange}
    />
  );
}
