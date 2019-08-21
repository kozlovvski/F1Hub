import cachedFetch from "util/cachedFetch";

export default async function(driver, year) {
  const data = await cachedFetch(
    `https://ergast.com/api/f1/${year}/drivers/${driver}/results.json`
  ).then(res => res.MRData.RaceTable.Races);
  return data;
};