const convertToSnakeCase = (varName) => {
  return varName.replace(/[A-Z]/g, (char) => `_${char.toLowerCase()}`);
};

const convertToCamelCase = (varName) => {
  return varName.replace(/_[a-z]/g, (charWithUnderscore) => `${charWithUnderscore[1].toUpperCase()}`);
};

const convertDataCase = (converter, data) => {
  if (!data || typeof data !== 'object') {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map((el) => convertDataCase(converter, el));
  }

  const updatedEntries = Object.entries(data)
    .map(([name, value]) => {
      const updatedName = converter(name);
      const updatedValue = convertDataCase(converter, value);

      return [updatedName, updatedValue];
    });

  return Object.fromEntries(updatedEntries);
};

export default {
  convertToCamelCase: convertDataCase.bind(this, convertToCamelCase),
  convertToSnakeCase: convertDataCase.bind(this, convertToSnakeCase)
};
