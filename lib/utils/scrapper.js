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
      error: errorFetching.message || "Error fetching URL",
    })
  );

  if (res) {
    const $ = load(
      await res.text().catch((responseError) =>
        callback({
          error: responseError.message || "Error reading HTML",
        })
      )
    );

    const scrapData = {
      url: url,
      title: $("title").first().text().trim() || new URL(url).hostname,
      favicon: $("link[rel='shortcut icon']").attr("href"),
      description: getMetaData($, "description") || null,
      image: getMetaData($, "image"),
    };

    if (!scrapData.favicon) scrapData.favicon = null;
    else scrapData.favicon = getURL(scrapData.favicon, scrapData.url);

    if (!scrapData.image) scrapData.image = null;
    else scrapData.image = getURL(scrapData.image, scrapData.url);

    callback({ scrapData });
  }
};

export default scrapper;
