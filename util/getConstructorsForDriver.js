import cachedFetch from "util/cachedFetch";

export default async function(driver) {
  const data = await cachedFetch(
    `https://ergast.com/api/f1/drivers/${driver}/constructors.json?limit=999`
  ).then(res => res.MRData.ConstructorTable.Constructors);
  return data;
};