const PORT = process.env.PORT || 5192;

import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import { createServer } from "http";

import routes from "./routes/index.js";

config({ path: "./.env" });

const index = express();

const server = createServer(index);

index.use(express.json());
index.use(express.urlencoded({ extended: true }));

index.use(routes);

mongoose
	.connect(process.env.databaseURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => server.listen(PORT));