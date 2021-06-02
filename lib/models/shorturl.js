import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const idSize = 8;
const genid = customAlphabet(
	"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
	idSize
);

const Schema = mongoose.Schema;

const urlSchema = new Schema({
	_id: {
		type: String,
		default: genid,
	},
	url: {
		type: String,
		required: true,
	},
});

const urldb = mongoose.model("shorturl", urlSchema);

export default urldb;
