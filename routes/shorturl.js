import { Router } from "express";

import { pushurl, geturl } from "../lib/utils/shorturl.js";

const router = Router();

router.post("/", (req, res) => {
  pushurl(req.body.url, ({ error, urlid }) => {
    if (error) res.status(409).json({ error });
    else res.json({ urlid });
  });
});

router.get("/:urlid", (req, res) => {
  geturl(req.params.urlid, ({ error, url }) => {
    if (error) res.status(409).json({ error });
    else res.json({ url });
  });
});

export default router;
