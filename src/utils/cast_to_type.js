export default (value, type) => {
  if (type === "boolean") {
    return !!(value === "true");
  }
  return value;
};
