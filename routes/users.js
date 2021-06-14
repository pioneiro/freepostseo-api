import { Router } from "express";

import { register, login } from "../lib/utils/users.js";

const router = Router();

router.post("/register", (req, res) => {
	register(req.body.user, (data) => {
		res.json(data);
	});
});

router.post("/login", (req, res) => {
	login(req.body.user, (data) => {
		res.json(data);
	});
});

export default router;
