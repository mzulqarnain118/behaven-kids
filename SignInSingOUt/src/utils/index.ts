export const AL = (data) => alert(JSON.stringify(data));
export const parseJSON = (data) => data !== "undefined" && JSON.parse(data);
export const getLocal = (key) =>
  parseJSON(window !== "undefined" && localStorage.getItem(key));
export const setLocal = (key, value) =>
  window !== "undefined" && localStorage.setItem(key, JSON.stringify(value));
export const rmLocal = (key) =>
  window !== "undefined" && localStorage.removeItem(key);

export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export const debounce = (func, delay) => {
  let timeoutId;

  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
