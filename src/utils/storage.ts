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
    value = JSON.parse(window.localStorage.getItem(key) || "") || null;
  } catch (e) {
    console.error(e);
  }
  return value;
};
