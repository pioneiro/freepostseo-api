import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userdb from "../models/users.js";

import { validateRegistration, validateLogin } from "./validators.js";

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

		// send token
		const token = jwt.sign({ userid: newUser._id }, process.env.secret);
		callback({ token });

		// end
	} catch (error) {
		// if any kind of error encountered in try
		return callback({ error: error.message });
	}
};

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

		// send token
		const token = jwt.sign({ userid: foundUser._id }, process.env.secret);
		callback({ token });

		// end
	} catch (error) {
		// if any kind of error encountered in try
		return callback({ error: error.message });
	}
};

export { register, login };
