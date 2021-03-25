import caseConverter from "utils/case_converter";

import attributesExtractor from "./attributes_extractor";
import stringifyArguments from "./stringify_arguments";

const API_URL = process.env.REACT_APP_API_URL;

const formatApiResponse = async (payload) => {
  const parsedPayload = await payload.json();
  const convertedPayload = caseConverter.convertToCamelCase(parsedPayload);

  return convertedPayload;
};

const handleApiResponse = async (payload) => {
  if (!payload?.ok) {
    throw payload;
  }

  const formattedPayload = await formatApiResponse(payload);
  const { data, errors } = formattedPayload;

  if (data) {
    return attributesExtractor(data);
  }

  if (errors) {
    throw errors;
  }

  return formattedPayload;
};

const handleApiError = async (payload) => {
  const formattedPayload = await formatApiResponse(payload);

  throw formattedPayload.errors;
};

const getUrl = (apiUrl, path, params) => {
  const urlParams = stringifyArguments(params);

  return `${apiUrl}${path}${urlParams}`;
};

const getRequestOptions = (method, params) => {
  const requestOptions = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  if (params) {
    requestOptions.body = JSON.stringify(params);
  }

  return requestOptions;
};

const request = async (method, apiUrl, path, payload, queryParams) => {
  const formattedPayload = caseConverter.convertToSnakeCase(payload);
  const formattedQueryParams = caseConverter.convertToSnakeCase(queryParams);

  const url = getUrl(apiUrl, path, formattedQueryParams);
  const requestOptions = getRequestOptions(method, formattedPayload);

  try {
    const response = await fetch(url, requestOptions);

    return handleApiResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
};

const requestWithBodyParams = (method, apiUrl) => (path, payload, queryParams) => {
  return request(method, apiUrl, path, payload, queryParams);
};

const requestWithoutBodyParams = (method, apiUrl) => (path, queryParams) => {
  return request(method, apiUrl, path, null, queryParams);
};

export default {
  get: requestWithoutBodyParams("GET", API_URL),
  delete: requestWithoutBodyParams("DELETE", API_URL),
  post: requestWithBodyParams("POST", API_URL),
  put: requestWithBodyParams("PUT", API_URL),
  patch: requestWithBodyParams("PATCH", API_URL),
  options: requestWithBodyParams("OPTIONS", API_URL),
};
