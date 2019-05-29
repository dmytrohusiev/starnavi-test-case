const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const gameSettings = require("./api/game-settings");
const winners = require("./api/winners");

const PORT = process.env.PORT || 3000;

const dev = process.env.NODE_ENV !== "production";

const nextjsApp = next({ dev });
const handle = nextjsApp.getRequestHandler();

nextjsApp
	.prepare()
	.then(() => {
		const server = express();

		server.use(helmet());
		server.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
		server.use(bodyParser.json({ limit: "50mb", extended: true }));
		server.use(bodyParser.text({ limit: "1mb", extended: true }));

		// Adding API endpoints
		server.use("/game-settings", gameSettings);
		server.use("/winners", winners);

		// Handling all Next.js server-side logic
		server.get("*", async (req, res) => {
			return handle(req, res);
		});

		server.listen(PORT, err => {
			if (err) throw err;
			console.log(`> Ready on PORT:${PORT}`);
		});
	})
	.catch(err => console.log(err.stack));
