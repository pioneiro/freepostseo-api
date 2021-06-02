import { Router } from "express";

import shorturl from "./shorturl.js";
import scrapper from "./scrapper.js";

const router = Router();

router.use("/tools/shorturl", shorturl);
router.use("/tools/scrapper", scrapper);

router.get("/", (req, res) => {
	res.send("Root");
});

export default router;
