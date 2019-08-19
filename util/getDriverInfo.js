import cachedFetch from "util/cachedFetch";

export default async function(driver) {
  const data = await cachedFetch(
    `http://ergast.com/api/f1/drivers/${driver}.json`
  ).then(res => res.MRData.DriverTable.Drivers[0]);
  return data;
};