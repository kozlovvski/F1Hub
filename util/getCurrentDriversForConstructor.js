
import cachedFetch from "util/cachedFetch";

export default async function(constructor) {
  const data = await cachedFetch(
    `https://ergast.com/api/f1/current/constructors/${constructor}/drivers.json?limit=999`
  ).then(res => res.MRData.DriverTable.Drivers);
  return data;
};