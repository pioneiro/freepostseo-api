import { Router } from "express";

import scrapper from "../lib/utils/scrapper.js";

const router = Router();

router.post("/", (req, res) => {
	scrapper(req.body.url, (data) => res.json(data));
});

export default router;
