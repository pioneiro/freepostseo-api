import { Router } from "express";

import shorturl from "./shorturl.js";

const router = Router();

router.use("/tools/shorturl", shorturl);

router.get("/", (req, res) => {
	res.send("Root");
});

export default router;
