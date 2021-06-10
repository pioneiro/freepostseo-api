import { Router } from "express";

import youtubemp3 from "../lib/utils/youtubemp3.js";

const router = Router();

router.post("/", (req, res) => {
	youtubemp3(req.body.url, (data) => {
		if (data.error) res.json(data);
		else {
			const { fileName, readStream } = data;

			res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
			res.setHeader("Content-Type", "audio/mpeg");
			res.setHeader(
				"Content-Disposition",
				`attachment;\ filename="${fileName}"`
			);

			readStream.pipe(res);
		}
	});
});

export default router;
