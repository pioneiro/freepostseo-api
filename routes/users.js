import { Router } from "express";

import {
	register,
	login,
	forgotPassword,
	verifyOTP,
	resetPassword,
} from "../lib/utils/users.js";

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

router.post("/forgot", (req, res) => {
	forgotPassword(req.body.email, (data) => res.json(data));
});

router.post("/verifyotp", (req, res) => {
	verifyOTP(req.headers["token"], req.body.otp, (data) => res.json(data));
});

router.post("/reset/:resetid", (req, res) => {
	resetPassword(req.params.resetid, req.body.password, (data) =>
		res.json(data)
	);
});

export default router;
