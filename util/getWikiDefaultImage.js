import cachedFetch from "util/cachedFetch";

export default async function getWikiDefaultImage(url, size = 500) {
  const pageName = url.match(/([^\/]+$)/);
  const pagesData = await cachedFetch(
    `https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=pageimages&titles=${pageName[0]}&pithumbsize=${size}&format=json`
  ).then(res => res.query.pages)
  const key = await Object.keys(pagesData)[0];
  return await pagesData[key].thumbnail.source
}
