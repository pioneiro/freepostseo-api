import { Router } from "express";

import youtubemp3 from "../lib/utils/youtubemp3.js";

const router = Router();

router.post("/", (req, res) => {
  youtubemp3(req.body.url, ({ error, fileName, readStream }) => {
    if (error) return res.json({ error });

    res.setHeader("Access-Control-Expose-Headers", "filename");
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("filename", fileName);
    res.setHeader("Content-Disposition", `attachment;\ filename="${fileName}"`);

    readStream.pipe(res);
  });
});

export default router;
