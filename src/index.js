import React from 'react';
import { render } from 'react-dom';
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

import i18nInit from "utils/i18n_init";
import App from './app';
import * as serviceWorker from './serviceWorker';


i18nInit().then(() => {
  return render(
    <I18nextProvider i18n={i18next}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </I18nextProvider>,
    document.getElementById('root')
  )
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
