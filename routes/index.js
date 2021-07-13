import { Router } from "express";

import users from "./users.js";
import tools from "./tools.js";

import endpoints from "../lib/data/endpoints.js";

const router = Router();

router.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    req.headers.origin || req.headers.host
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Method", "GET, POST");
  next();
});

router.use("/users", users);
router.use("/tools", tools);

router.get("/", (req, res) => {
  res.render("documentation", { endpoints });
});

export default router;
