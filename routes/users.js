import { Router } from "express";

import {
  register,
  login,
  forgotPassword,
  verifyOTP,
  resetPassword,
} from "../lib/utils/users.js";

const router = Router();

const getMaxAge = () => {
  const now = new Date();
  const expiry = new Date();

  expiry.setDate(now.getDate() + 1);
  expiry.setHours(0);
  expiry.setMinutes(0);
  expiry.setSeconds(0);
  expiry.setMilliseconds(0);

  const age = expiry.getTime() - now.getTime();

  return age;
};

const cookieOptions = ({ maxAge = getMaxAge(), httpOnly = true }) => ({
  httpOnly,
  maxAge,
  sameSite: "none",
  secure: true,
});

router.post("/register", (req, res) => {
  if (req.cookies["auth-token"])
    res.status(405).json({ error: "Already Logged In" });
  else
    register(req.body.user, ({ error, token, userDetails }) => {
      if (error) res.status(401).json({ error });
      else
        res
          .cookie("auth-token", token, cookieOptions({}))
          .cookie("isLoggedIn", true, cookieOptions({ httpOnly: false }))
          .cookie(
            "email",
            userDetails.email,
            cookieOptions({ httpOnly: false })
          )
          .cookie("name", userDetails.name, cookieOptions({ httpOnly: false }))
          .sendStatus(200);
    });
});

router.post("/login", (req, res) => {
  if (req.cookies["auth-token"])
    res.status(405).json({ error: "Already Logged In" });
  else
    login(req.body.user, ({ error, token, userDetails }) => {
      if (error) res.status(401).json({ error });
      else
        res
          .cookie("auth-token", token, cookieOptions({}))
          .cookie("isLoggedIn", true, cookieOptions({ httpOnly: false }))
          .cookie(
            "email",
            userDetails.email,
            cookieOptions({ httpOnly: false })
          )
          .cookie("name", userDetails.name, cookieOptions({ httpOnly: false }))
          .sendStatus(200);
    });
});

router.post("/logout", (req, res) => {
  if (!req.cookies["auth-token"])
    res.status(405).json({ error: "No Users Logged In!" });
  else
    res
      .cookie("auth-token", "", cookieOptions({ maxAge: 0 }))
      .cookie("isLoggedIn", false, cookieOptions({ httpOnly: false }))
      .sendStatus(200);
});

router.post("/forgot", (req, res) => {
  forgotPassword(req.body.email, ({ error, token }) => {
    if (error) res.status(401).json({ error });
    else res.cookie("reset-token", token, cookieOptions(3e5)).sendStatus(200);
  });
});

router.post("/verifyotp", (req, res) => {
  if (!req.cookies["reset-token"])
    res.status(401).json({ error: "Reset Token not Found!" });
  else
    verifyOTP(
      req.cookies["reset-token"],
      req.body.otp,
      ({ error, resetid }) => {
        if (error) res.status(401).json({ error });
        else
          res
            .cookie("reset-token", "", cookieOptions({ maxAge: 0 }))
            .json({ resetid });
      }
    );
});

router.post("/reset/:resetid", (req, res) => {
  resetPassword(req.params.resetid, req.body.password, ({ error }) => {
    if (error) res.status(409).json({ error });
    else res.sendStatus(200);
  });
});

export default router;
