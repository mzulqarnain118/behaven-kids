export const AL = (data) => alert(JSON.stringify(data));
export const parseJSON = (data) => data !== "undefined" && JSON.parse(data);
export const getLocal = (key) =>
  parseJSON(window !== "undefined" && localStorage.getItem(key));
export const setLocal = (key, value) =>
  window !== "undefined" && localStorage.setItem(key, JSON.stringify(value));
export const rmLocal = (key) =>
  window !== "undefined" && localStorage.removeItem(key);
