export const setToStorage = (name, value) => {
  try {
    const valueToStash = JSON.stringify(value);

    sessionStorage.setItem(name, valueToStash);

    return true;
  } catch (_error) {
    return false;
  }
};

export const getFromStorage = (name) => {
  try {
    const stashedValue = sessionStorage.getItem(name);

    return JSON.parse(stashedValue);
  } catch (_error) {
    return null;
  }
};

export const removeFromStorage = (name) => {
  sessionStorage.removeItem(name);
};
