import cachedFetch from "util/cachedFetch";

export default async function getWikiDefaultImage(url) {
	const pageName = url.match(/([^\/]+$)/);
	const pagesData = await cachedFetch(
		`https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${
			pageName[0]
		}`
	).then(res => res.query.pages);
	const key = await Object.keys(pagesData)[0];
	if (pagesData[key].extract) {
		const text = pagesData[key].extract;
		if (text.split(" ").length > 50) {
			return text
				.split(" ")
				.slice(0, 50)
				.join(" ") + "...";
		} else {
			return text;
		}
	} else {
		return null;
  }
}
