/* eslint-disable no-use-before-define */

const prepareKey = (key, prefix) => {
  let output;

  if (prefix === null) {
    output = key;
  } else {
    output = `${prefix}[${key}]`;
  }

  return output;
}

const convertArgsToString = (args, prefix = null) => {
  return Object
    .keys(args)
    .reduce((acc, key) => {
      acc.push(prepareArgument(args, key, prefix));
      return acc;
    }, [])
    .join('&');
}

const stringifyArgumentValue = (argValue) => {
  const argType = typeof argValue;

  if (argType !== "object" || argValue === null) {
    return encodeURIComponent(argValue);
  }

  if (Array.isArray(argValue)) {
    return argValue.map(encodeURIComponent).join(',')
  }
}

const prepareArgument = (args, key, prefix) => {
  const argValue = args[key];
  const isValueIsObject = checkIsPlainObject(argValue);

  if (isValueIsObject) {
    return convertArgsToString(args[key], prepareKey(key, prefix));
  }

  const stringifiedArgValue = stringifyArgumentValue(argValue);

  return `${prepareKey(key, prefix)}=${stringifiedArgValue}`;
}

const checkIsPlainObject = (value) => {
  return value && typeof value === "object" && !Array.isArray(value);
}

const stringifyArguments = (args) => {
  let query;
  const isArgsPlainObject = checkIsPlainObject(args);  

  if (isArgsPlainObject) {
    const stringifiedArgs = convertArgsToString(args);

    query = stringifiedArgs.length > 1 ? `?${convertArgsToString(args)}` : '';
  } else {
    query = '';
  }

  return query;
}

export default stringifyArguments;
