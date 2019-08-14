import lscache from 'lscache';
import fetch from 'isomorphic-unfetch';

const TTL_MINUTES = 60;

export default async function cachedFetch(url, options) {
  let cachedResponse = lscache.get(url);

  if (cachedResponse === null) {
    cachedResponse = await fetch(url, options)
      .then(response => response.json());
    lscache.set(url, cachedResponse, TTL_MINUTES);
  }

  return cachedResponse;
}

export function overrideCache(key, val) {
  lscache.set(key, val, TTL_MINUTES);
}