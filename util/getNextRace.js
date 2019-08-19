import cachedFetch from "util/cachedFetch";

export default async function() {
  const data = await cachedFetch(
    `https://ergast.com/api/f1/current/next.json`
  ).then(res => res.MRData.RaceTable.Races[0]);
  return data;
};