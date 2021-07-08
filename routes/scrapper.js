import { Router } from "express";

import scrapper from "../lib/utils/scrapper.js";

const router = Router();

router.post("/", (req, res) => {
  scrapper(req.body.url, ({ error, scrapData }) => {
    if (error) res.status(409).json({ error });
    else res.json({ scrapData });
  });
});

export default router;
