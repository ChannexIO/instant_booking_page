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

export default forwardRef(function TurnstileWidget({ onTokenChange }, ref) {
  const { t, i18n } = useTranslation();
  const containerRef = useRef();
  const widgetIdRef = useRef(null);
  const onTokenChangeRef = useRef(onTokenChange);
  // Read once: re-rendering the widget on language change would drop a solved challenge.
  const languageRef = useRef(toTurnstileLanguage(i18n.language));
  const [isLoadFailed, setIsLoadFailed] = useState(false);

  onTokenChangeRef.current = onTokenChange;

  const updateToken = useCallback((token) => {
    if (onTokenChangeRef.current) {
      onTokenChangeRef.current(token);
    }
  }, []);

  useImperativeHandle(ref, () => ({
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

      loadTurnstileScript()
        .then((turnstile) => {
          if (isUnmounted || !containerRef.current) {
            return;
          }

          widgetIdRef.current = turnstile.render(containerRef.current, {
            sitekey: SITE_KEY,
            language: languageRef.current,
            callback: updateToken,
            "expired-callback": clearToken,
            "timeout-callback": clearToken,
            "error-callback": clearToken,
          });
        })
        .catch(() => {
          if (!isUnmounted) {
            setIsLoadFailed(true);
          }
        });

      return () => {
        isUnmounted = true;
        updateToken(null);

        if (window.turnstile && widgetIdRef.current !== null) {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        }
      };
    },
    [updateToken],
  );

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
