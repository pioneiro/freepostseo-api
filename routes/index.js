import { Router } from "express";

import shorturl from "./shorturl.js";
import scrapper from "./scrapper.js";
import youtubemp3 from "./youtubemp3.js";

import endpoints from "../lib/data/endpoints.js";

const router = Router();

router.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Method", "GET, POST");
	next();
});

router.use("/tools/shorturl", shorturl);
router.use("/tools/scrapper", scrapper);
router.use("/tools/youtubemp3", youtubemp3);

router.get("/", (req, res) => {
	res.render("documentation", { endpoints });
});

export default router;
