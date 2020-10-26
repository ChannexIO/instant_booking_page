import attributesExtractor from './attributes_extractor';
import caseConverter from './case_converter';
import stringifyArguments from './stringify_arguments';

const formatApiResponse = async (payload) => {
  const parsedPayload = await payload.json();
  const convertedPayload = caseConverter.convertToCamelCase(parsedPayload);

  return convertedPayload;
};

const handleApiResponse = async (payload) => {
  const formattedPayload = await formatApiResponse(payload);

  return attributesExtractor(formattedPayload.data);
};

const handleApiError = async (payload) => {
  const formattedPayload = await formatApiResponse(payload);

  throw formattedPayload.errors;
};

const getUrl = (path, params) => {
  const urlParams = stringifyArguments(params);

  return `${process.env.REACT_APP_API_URL}${path}${urlParams}`;
};

const getRequestOptions = (method, params) => {
  const requestOptions = { method };

  if (params) {
    requestOptions.body = JSON.stringify(params);
  }

  return requestOptions;
};

const request = async (method, path, payload, queryParams) => {
  const formattedPayload = caseConverter.convertToSnakeCase(payload);
  const formattedQueryParams = caseConverter.convertToSnakeCase(queryParams);

  const url = getUrl(path, formattedQueryParams);
  const requestOptions = getRequestOptions(method, formattedPayload);

  try {
    const response = await fetch(url, requestOptions);

    return handleApiResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
};

const requestWithBodyParams = (method) => (path, payload, queryParams) => {
  return request(method, path, payload, queryParams);
};

const requestWithoutBodyParams = (method) => (path, queryParams) => {
  return request(method, path, null, queryParams);
};

export default {
  get: requestWithoutBodyParams('GET'),
  delete: requestWithoutBodyParams('DELETE'),
  post: requestWithBodyParams('POST'),
  put: requestWithBodyParams('PUT'),
  patch: requestWithBodyParams('PATCH'),
  options: requestWithBodyParams('OPTIONS'),
};
