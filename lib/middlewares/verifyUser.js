import jwt from "jsonwebtoken";

// verify an user
const verify = (req, res, next) => {
	const token = req.header("token");
	if (!token) res.json({ error: "Please login to continue" });

	try {
		// verify token
		req.user = jwt.verify(token, process.env.secret);

		// pass to next function
		next();
	} catch (error) {
		// if any kind of error encountered in try
		res.json({ error: error.message });
	}
};

export default verify;
