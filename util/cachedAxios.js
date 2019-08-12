import lscache from 'lscache';
import axios from "axios";

const TTL_MINUTES = 5;

export default async function cachedAxios(url) {
  let cachedResponse = lscache.get(url);

  // If there is no cached response,
  // do the actual call and store the response
  if (cachedResponse === null) {
    cachedResponse = await axios(url)
    lscache.set(url, cachedResponse, TTL_MINUTES);
  }

  return cachedResponse;
}

export function overrideCache(key, val) {
  lscache.set(key, val, TTL_MINUTES);
}