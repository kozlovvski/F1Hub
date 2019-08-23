import cachedFetch from "util/cachedFetch";

export default async function(season = "current") {
  const data = await cachedFetch(
    `https://ergast.com/api/f1/${season}.json?limit=999`
  ).then(res => res.MRData.RaceTable.Races);
  return data;
}