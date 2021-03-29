import React from "react";
import { render } from "react-dom";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

import i18nInit from "utils/i18n_init";

import App from "./app";

i18nInit().then(() => {
  return render(
    <I18nextProvider i18n={i18next}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </I18nextProvider>,
    document.getElementById("root"),
  );
});
