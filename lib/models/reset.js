import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const Schema = mongoose.Schema;

const resetSchema = new Schema({
	_id: {
		type: String,
		required: true,
		default: customAlphabet(
			"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
			512
		),
	},
	userid: {
		type: String,
		required: true,
	},
});

const resetdb = new mongoose.model("reset", resetSchema);

export default resetdb;
