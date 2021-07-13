import { Router } from "express";

const router = Router();

// URL Shortener

import { pushurl, geturl } from "../lib/utils/shorturl.js";

router.post("/shorturl", (req, res) => {
  pushurl(req.body.url, ({ error, urlid }) => {
    if (error) res.status(409).json({ error });
    else res.json({ urlid });
  });
});

router.get("/shorturl/:urlid", (req, res) => {
  geturl(req.params.urlid, ({ error, url }) => {
    if (error) res.status(409).json({ error });
    else res.json({ url });
  });
});

// Scrapper

import scrapper from "../lib/utils/scrapper.js";

router.post("/scrapper", (req, res) => {
  scrapper(req.body.url, ({ error, scrapData }) => {
    if (error) res.status(409).json({ error });
    else res.json({ scrapData });
  });
});

// YouTube MP3 Downloader

import youtubemp3 from "../lib/utils/youtubemp3.js";

router.post("/youtubemp3", (req, res) => {
  youtubemp3(req.body.url, ({ error, fileName, readStream }) => {
    if (error) return res.json({ error });

    res.setHeader("Access-Control-Expose-Headers", "filename");
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("filename", fileName);
    res.setHeader("Content-Disposition", `attachment;\ filename="${fileName}"`);

    readStream.pipe(res);
  });
});

export default router;
