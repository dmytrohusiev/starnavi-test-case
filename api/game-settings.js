const express = require("express");
const router = express.Router();

// Game setting mock model
const settingsModel = require("../model/gameSettingsModel");

/**
 * @route  GET /game-settings
 * @desc   Get game settings array
 * @access Public
 */
router.get("/", (req, res) => {
	const gameSettings = settingsModel.get();

	if (gameSettings && gameSettings.length > 0) {
		res.json(gameSettings);
	} else {
		res.status(401).json({ error: "Game settings not found" });
	}
});

module.exports = router;
