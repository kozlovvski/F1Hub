import cachedFetch from "util/cachedFetch";

export default async function(season = "current") {
  const data = await cachedFetch(
    `https://ergast.com/api/f1/${season}/driverStandings.json?limit=999`
  ).then(res => res.MRData.StandingsTable.StandingsLists[0]);
  return data;
}