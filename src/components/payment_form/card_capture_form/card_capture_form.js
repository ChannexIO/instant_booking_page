import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import ApiActions from 'api_actions';

import Panel from 'components/layout/panel';

import caseConverter from 'utils/case_converter';

const PCI_URL = process.env.REACT_APP_PCI_URL;

const FUNCTION_FALLBACK = () => {};

export default forwardRef(function CardCaptureForm(props, ref) {
  const [sessionToken, setSessionToken] = useState(null);
  const iframeRef = useRef();
  const {
    onSubmit = FUNCTION_FALLBACK,
    onValidate = FUNCTION_FALLBACK,
  } = props;

  const getMessageEmitter = useCallback((type) => () => {
    if (!iframeRef.current) {
      return;
    }

    iframeRef.current.contentWindow.postMessage(type, PCI_URL);
  }, [iframeRef]);

  const eventListener = useCallback((event) => {
    if (event.origin !== PCI_URL) {
      return;
    }

    const formattedEvent = caseConverter.convertToCamelCase(event.data);

    if (formattedEvent.error || formattedEvent.card) {
      onSubmit(formattedEvent);
      return;
    }

    onValidate(formattedEvent);
  }, [onSubmit, onValidate]);

  const getSessionToken = useCallback(async () => {
    try {
      const response = await ApiActions.getPciSessionToken();

      setSessionToken(response.sessionToken);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [setSessionToken]);

  useImperativeHandle(ref, () => ({
    submit: getMessageEmitter('submit'),
    validate: getMessageEmitter('validate'),
    resetSession: getSessionToken,
  }));

  useEffect(function initSessionToken() {
    getSessionToken();
  }, [getSessionToken]);

  useEffect(function initEventListener() {
    window.addEventListener('message', eventListener);

    return () => {
      window.removeEventListener('message', eventListener);
    };
  }, [eventListener]);

  if (!sessionToken) {
    return null;
  }

  return (
    <Panel>
      <iframe
        ref={iframeRef}
        title="cardCaptureIframe"
        id="cardCaptureIframe"
        height="220"
        width="400"
        scrolling="no"
        style={{ border: 'none', maxWidth: "100%" }}
        src={`${PCI_URL}/api/v1/capture_form?session_token=${sessionToken}`}
      />
    </Panel>
  );
});
