import cachedFetch from "util/cachedFetch";

export default async function() {
  const data = await cachedFetch(
    `https://ergast.com/api/f1/seasons.json?limit=999`
  ).then(res => res.MRData.SeasonTable.Seasons);
  return data;
}