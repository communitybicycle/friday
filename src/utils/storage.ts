export const isValidJSON = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const setItem = (key: string, value: string): [boolean, any] => {
  let success = false;
  let error;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    success = true;
  } catch (e) {
    error = e;
  }
  return [success, error];
};

export const getItem = (key: string): string | null => {
  let value = null;
  try {
    const item = window.localStorage.getItem(key) || "";

    if (isValidJSON(item)) {
      value = JSON.parse(item);
    } else {
      value = item;
    }
  } catch (e) {
    console.error(e);
  }
  return value;
};
