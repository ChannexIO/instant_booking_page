const TURNSTILE_ERROR_CODE = "turnstile_verification_failed";
const FORBIDDEN_STATUS = 403;

// Failed requests reject with the raw fetch Response, so the body is read here.
export default async function isTurnstileError(error) {
  if (error?.status !== FORBIDDEN_STATUS || typeof error.json !== "function") {
    return false;
  }

  try {
    const body = await error.json();

    return body?.errors?.code === TURNSTILE_ERROR_CODE;
  } catch (_parseError) {
    return false;
  }
}
