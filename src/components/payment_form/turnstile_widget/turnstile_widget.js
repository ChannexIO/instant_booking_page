import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";

import styles from "./turnstile_widget.module.css";

const SITE_KEY = process.env.REACT_APP_TURNSTILE_SITE_KEY;
const SCRIPT_URL = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

export const IS_TURNSTILE_ENABLED = Boolean(SITE_KEY);

// Permanent errors (no retry) meaning the widget can't run on this page, e.g. a client's custom
// domain that isn't listed in the widget's hostnames. The widget then steps aside and the API
// decides whether the booking needs a token.
// https://developers.cloudflare.com/turnstile/troubleshooting/client-side-errors/error-codes/
const UNAVAILABLE_ERROR_CODES = new Set([
  "110100", // invalid sitekey
  "110110", // sitekey not found
  "110200", // domain not authorized
  "400020", // invalid sitekey
  "400021", // sitekey domain mismatch
  "400070", // sitekey disabled
]);

let scriptPromise = null;

const loadTurnstileScript = () => {
  if (window.turnstile) {
    return Promise.resolve(window.turnstile);
  }

  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");

      script.src = SCRIPT_URL;
      script.onload = () => resolve(window.turnstile);
      script.onerror = () => {
        scriptPromise = null;
        script.remove();
        reject(new Error("Failed to load Cloudflare Turnstile"));
      };

      document.head.appendChild(script);
    });
  }

  return scriptPromise;
};

// i18n uses codes like "pt_BR", Turnstile expects "pt-br". Unsupported codes fall back to English.
const toTurnstileLanguage = (language) => {
  return language ? language.replace("_", "-").toLowerCase() : "auto";
};

export default forwardRef(function TurnstileWidget({ onTokenChange, onUnavailable }, ref) {
  const { t, i18n } = useTranslation();
  const containerRef = useRef();
  const widgetIdRef = useRef(null);
  const onTokenChangeRef = useRef(onTokenChange);
  const onUnavailableRef = useRef(onUnavailable);
  const isUnavailableRef = useRef(false);
  // Read once: re-rendering the widget on language change would drop a solved challenge.
  const languageRef = useRef(toTurnstileLanguage(i18n.language));
  const [isLoadFailed, setIsLoadFailed] = useState(false);
  const [isUnavailable, setIsUnavailable] = useState(false);

  onTokenChangeRef.current = onTokenChange;
  onUnavailableRef.current = onUnavailable;

  const updateToken = useCallback((token) => {
    if (onTokenChangeRef.current) {
      onTokenChangeRef.current(token);
    }
  }, []);

  const removeWidget = useCallback(() => {
    if (window.turnstile && widgetIdRef.current !== null) {
      window.turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    }
  }, []);

  useImperativeHandle(ref, () => ({
    isRequired: () => !isUnavailableRef.current,
    getToken: () => {
      if (!window.turnstile || widgetIdRef.current === null) {
        return null;
      }

      return window.turnstile.getResponse(widgetIdRef.current) || null;
    },
    reset: () => {
      updateToken(null);

      if (window.turnstile && widgetIdRef.current !== null) {
        window.turnstile.reset(widgetIdRef.current);
      }
    },
  }));

  useEffect(
    function renderWidget() {
      let isUnmounted = false;
      const clearToken = () => updateToken(null);

      const markUnavailable = (reason) => {
        // eslint-disable-next-line no-console
        console.warn(`Turnstile is unavailable on this page (${reason}).`);
        isUnavailableRef.current = true;

        // Remove outside of Turnstile's own callback.
        setTimeout(() => {
          if (isUnmounted) {
            return;
          }

          removeWidget();
          setIsUnavailable(true);

          if (onUnavailableRef.current) {
            onUnavailableRef.current();
          }
        }, 0);
      };

      const handleError = (errorCode) => {
        clearToken();

        if (!UNAVAILABLE_ERROR_CODES.has(String(errorCode))) {
          // Not handled: Turnstile logs the error and retries where it can.
          return false;
        }

        markUnavailable(`error ${errorCode}`);

        return true;
      };

      loadTurnstileScript()
        .then((turnstile) => {
          if (isUnmounted || !containerRef.current) {
            return;
          }

          try {
            widgetIdRef.current = turnstile.render(containerRef.current, {
              sitekey: SITE_KEY,
              language: languageRef.current,
              callback: updateToken,
              "expired-callback": clearToken,
              "timeout-callback": clearToken,
              "error-callback": handleError,
            });
          } catch (renderError) {
            markUnavailable(renderError.message);
          }
        })
        .catch(() => {
          if (!isUnmounted) {
            setIsLoadFailed(true);
          }
        });

      return () => {
        isUnmounted = true;
        updateToken(null);
        removeWidget();
      };
    },
    [updateToken, removeWidget],
  );

  if (isUnavailable) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div ref={containerRef} />
      {isLoadFailed && (
        <div className={styles.error}>
          {t(
            "payment_page:turnstile:load_error",
            "Security check could not be loaded. Please disable content blockers for this page and reload it.",
          )}
        </div>
      )}
    </div>
  );
});
