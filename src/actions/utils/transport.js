import caseConverter from './case_converter';
import attributesExtractor from './attributes_extractor';
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

const getUrl = (path, params, useUrlParams) => {
  const urlParams = useUrlParams ? stringifyArguments(params) : '';

  return `${process.env.REACT_APP_API_URL}${path}${urlParams}`;
};

const getRequestOptions = (method, params, useUrlParams) => {
  const requestOptions = { method };

  if (!useUrlParams) {
    requestOptions.body = JSON.stringify(params);
  }

  return requestOptions;
};

const request = (method, useUrlParams) => (path, payload) => { 
  const formattedPayload = caseConverter.convertToSnakeCase(payload);

  const url = getUrl(path, formattedPayload, useUrlParams);
  const requestOptions = getRequestOptions(method, formattedPayload, useUrlParams);

  return fetch(url, requestOptions)
    .then(handleApiResponse)
    .catch(handleApiError);
};

const requestWithUrlParams = (method) => {
  const useUrlParams = true;

  return request(method, useUrlParams);
};

export default {
  get: requestWithUrlParams('GET'),
  delete: requestWithUrlParams('DELETE'),
  post: request('POST'),
  put: request('PUT'),
  patch: request('PATCH'),
  options: request('OPTIONS'),
};
