

import cachedFetch from "util/cachedFetch";

export default async function(driver) {
  const data = await cachedFetch(
    `https://ergast.com/api/f1/drivers/${driver}/seasons.json`
  ).then(res => res.MRData.SeasonTable.Seasons);
  return data;
};