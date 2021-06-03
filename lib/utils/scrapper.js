import fetch from "node-fetch";
import { load } from "cheerio";

const getURL = (link, parent) => new URL(link, parent).href;

const getMetaData = ($, name) =>
	$(`meta[name=${name}]`).attr("content") ||
	$(`meta[property="og:${name}"]`).attr("content") ||
	$(`meta[property="twitter:${name}"]`).attr("content");

const scrapper = async (url, callback) => {
	const res = await fetch(url, { mode: "cors" }).catch((errorFetching) =>
		callback({
			error: { message: errorFetching.message || "Error fetching URL" },
		})
	);

	if (res) {
		const $ = load(
			await res.text().catch((responseError) =>
				callback({
					error: { message: responseError.message || "Error reading HTML" },
				})
			)
		);

		const data = {
			url: url,
			title: $("title").first().text().trim() || new URL(url).hostname,
			favicon: $("link[rel='shortcut icon']").attr("href"),
			description: getMetaData($, "description") || null,
			image: getMetaData($, "image"),
		};

		if (!data.favicon) data.favicon = null;
		else data.favicon = getURL(data.favicon, data.url);

		if (!data.image) data.image = null;
		else data.image = getURL(data.image, data.url);

		callback(data);
	}
};

export default scrapper;
