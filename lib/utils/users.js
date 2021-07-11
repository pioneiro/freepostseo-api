import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { customAlphabet } from "nanoid";
import { createTransport } from "nodemailer";

import userdb from "../models/users.js";
import resetdb from "../models/reset.js";

import {
  validateRegistration,
  validateLogin,
  validatePassword,
} from "./validators.js";

// generate and send otp to client
const emailOTP = async ({ email, _id }) => {
  try {
    const generateOTP = customAlphabet("0123456789", 6);

    const host = createTransport({
      name: "Free Post SEO",
      host: "mail.freepostseo.com",
      port: 465,
      secure: true,
      auth: {
        user: "support@freepostseo.com",
        pass: process.env.mailPassword,
      },
    });

    const otp = generateOTP();

    const mailtext = `OTP to Reset your password is ${otp}.\n\nOTP valid for 5 minutes only.`;

    const mailOptions = {
      from: '"Free Post SEO" <support@freepostseo.com>',
      to: email,
      subject: "OTP to Reset your Password",
      text: mailtext,
    };

    await host.sendMail(mailOptions);

    const token = jwt.sign({ email, userid: _id }, otp, {
      expiresIn: "5m",
    });

    return { token };
  } catch (error) {
    return { error };
  }
};

// registers an user
const register = async (user, callback) => {
  try {
    // check if user present in db
    const foundUser = await userdb.findOne({ email: user.email });
    if (foundUser) return callback({ error: "User Already Registered" });

    // validate user data
    const { error } = validateRegistration(user);
    if (error) return callback({ error: "Invalid User Details" });

    // hash password
    const salt = await bcrypt.genSalt(16);
    user.password = await bcrypt.hash(user.password, salt);

    // push user into db
    const newUser = await new userdb(user).save();

    // set user details
    const user = {
      name: newUser.name,
      email: newUser.email,
    };

    // send token
    const token = jwt.sign({ userid: newUser._id }, process.env.secret);
    callback({ token, user });

    // end
  } catch (error) {
    // if any kind of error encountered
    return callback({ error: error.message });
  }
};

// logs an user in
const login = async (user, callback) => {
  try {
    // validate user data
    const { error } = validateLogin(user);
    if (error) return callback({ error: "Invalid User Details" });

    // check if user present
    const foundUser = await userdb.findOne({ email: user.email });
    if (!foundUser) return callback({ error: "Invalid Email or Password" });

    // check password
    const validPass = await bcrypt.compare(user.password, foundUser.password);
    if (!validPass) return callback({ error: "Invalid Email or Password" });

    // set user details
    const user = {
      name: foundUser.name,
      email: foundUser.email,
    };

    // send token
    const token = jwt.sign({ userid: foundUser._id }, process.env.secret);
    callback({ token, user });

    // end
  } catch (error) {
    // if any kind of error encountered
    return callback({ error: error.message });
  }
};

// email OTP to client
const forgotPassword = async (email, callback) => {
  try {
    // check if user present
    const foundUser = await userdb.findOne({ email: email });
    if (!foundUser) throw new Error("User Not Registered");

    // send email with OTP and token containing email and userid
    const { error, token } = await emailOTP(foundUser);

    // error in sending OTP
    if (error) throw error;

    // return token on successful email send
    callback({ token });

    // end
  } catch (error) {
    // if any kind of error encountered
    return callback({ error: error.message });
  }
};

// verify OTP
const verifyOTP = async (token, otp, callback) => {
  try {
    // verify token and return email
    const { userid } = jwt.verify(token, otp);

    await resetdb.deleteMany({ userid });

    // push userid into db
    const { _id } = await new resetdb({ userid }).save();

    // send the _id
    callback({ resetid: _id });

    // end
  } catch (error) {
    // if any kind of error encountered
    callback({ error: error.message });
  }
};

const resetPassword = async (resetid, newPassword, callback) => {
  try {
    // fetch user to reset password
    const { userid } = await resetdb.findOne({ _id: resetid });

    // validate new password
    const { error } = validatePassword({ password: newPassword });
    if (error) throw new Error("Invalid Password");

    // hash password
    const salt = await bcrypt.genSalt(16);
    newPassword = await bcrypt.hash(newPassword, salt);

    // update password in database
    await userdb.findOneAndUpdate({ _id: userid }, { password: newPassword });

    // delete request from resetdb
    await resetdb.findOneAndDelete({ _id: resetid });

    callback({ success: true });

    // end
  } catch (error) {
    // if any kind of error encountered
    callback({ error: error.message });
  }
};

export { register, login, forgotPassword, verifyOTP, resetPassword };
