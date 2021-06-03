import { Router } from "express";

import shorturl from "./shorturl.js";
import scrapper from "./scrapper.js";
import youtubemp3 from "./youtubemp3.js";

const router = Router();

router.use("/tools/shorturl", shorturl);
router.use("/tools/scrapper", scrapper);
router.use("/tools/youtubemp3", youtubemp3);

router.get("/", (req, res) => {
	res.send("Root");
});

export default router;
