import { Router } from "express";

import { pushurl, geturl } from "../lib/utils/shorturl.js";

const router = Router();

router.post("/", (req, res) => {
	pushurl(req.body.url, (data) => res.json(data));
});

router.get("/:urlid", (req, res) => {
	geturl(req.params.urlid, (data) => res.json(data));
});

export default router;
