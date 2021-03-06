import { Router } from "express";
import jwt from "jsonwebtoken";

import userdb from "../lib/models/users.js";

const router = Router();

router.use(async (req, res, next) => {
  try {
    if (!req.cookies["auth-token"]) throw Error("User Login Required");

    const { userid } = jwt.verify(
      req.cookies["auth-token"],
      process.env.secret
    );

    req.userid = userid;

    const tool = req.url.substring(req.url.lastIndexOf("/") + 1);

    const user = await userdb.findById(req.userid);

    if (!user.tools) user.tools = {};
    if (!user.tools[tool]) user.tools[tool] = [];

    const existing = user.tools[tool].filter((e) => e.url === req.body.url);

    if (!existing.length)
      user.tools[tool].push({
        url: req.body.url,
        lastUsed: new Date(),
      });
    else existing.forEach((e) => (e.lastUsed = new Date()));

    await userdb.findByIdAndUpdate(req.userid, user);

    next();
  } catch ({ message }) {
    res.status(401).json({ error: message });
  }
});

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
    if (error) return res.status(409).json({ error });

    res.setHeader("Access-Control-Expose-Headers", "filename");
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("filename", fileName);
    res.setHeader("Content-Disposition", `attachment;\ filename="${fileName}"`);

    readStream.pipe(res);
  });
});

export default router;
