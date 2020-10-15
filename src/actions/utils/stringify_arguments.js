/* eslint-disable no-use-before-define */

function prepareKey(key, prefix) {
  let output;

  if (prefix === null) {
    output = key;
  } else {
    output = `${prefix}[${key}]`;
  }

  return output;
}

function parseArgs(args, prefix = null) {
  return Object
    .keys(args)
    .reduce((acc, key) => {
      acc.push(prepareArgument(args, key, prefix));
      return acc;
    }, [])
    .join('&');
}

function prepareArgument(args, key, prefix) {
  let output;

  switch (typeof args[key]) {
    case 'object':
      if (args[key] === null) {
        output = `${prepareKey(key, prefix)}=${encodeURIComponent(args[key])}`;
      } else if (typeof args[key].length === 'undefined') {
        output = parseArgs(args[key], prepareKey(key, prefix));
      } else {
        output = `${prepareKey(key, prefix)}=${args[key].map(encodeURIComponent).join(',')}`;
      }
      break;

    default:
      output = `${prepareKey(key, prefix)}=${encodeURIComponent(args[key])}`;
      break;
  }

  return output;
}

function stringifyArguments(args) {
  let query;

  if (args && typeof args === 'object' && typeof args.length === 'undefined') {
    const parsedArgs = parseArgs(args);

    query = parsedArgs.length > 1 ? `?${parseArgs(args)}` : '';
  } else {
    query = '';
  }

  return query;
}

export default stringifyArguments;
