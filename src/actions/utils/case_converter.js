const convertToSnakeCase = (varName) => {
  return varName.replace(/[A-Z]/g, (char) => `_${char.toLowerCase()}`);
};

const convertToCamelCase = (varName) => {
  return varName.replace(/_[a-z]/g, (charWithUnderscore) => `${charWithUnderscore[1].toUpperCase()}`);
};

const convertArrayEntries = (array, converter) => {
  return array.map((el) => convertDataCase(converter, el));
};

const convertObjectEntries = (object, converter) => {
  const updatedEntries = Object.entries(object)
    .map(([name, value]) => {
      const updatedName = converter(name);
      const updatedValue = convertDataCase(converter, value);

      return [updatedName, updatedValue];
    });

  return Object.fromEntries(updatedEntries);
};

const convertDataCase = (converter, data) => {
  if (!data || typeof data !== 'object') {
    return data;
  }

  if (Array.isArray(data)) {
    return convertArrayEntries(data, converter);
  }

  return convertObjectEntries(data, converter);
};

export default {
  convertToCamelCase: convertDataCase.bind(this, convertToCamelCase),
  convertToSnakeCase: convertDataCase.bind(this, convertToSnakeCase),
};
