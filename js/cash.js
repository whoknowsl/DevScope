import { CACHE_DURATION } from "./config.js";

//save the data with time
export function saveCache(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify({ date: Date.now(), value }));
  } catch (err) {
    console.log(err);
  }
}

export function readCache(key) {
  const text = localStorage.getItem(key);
  if (text == null) return null;
  const entry = JSON.parse(text);
  if (Date.now() - entry.data > CACHE_DURATION) {
    localStorage.removeItem(key);
    return null;
  }
  return entry.value;
}
