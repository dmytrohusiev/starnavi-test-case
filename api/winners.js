const express = require("express");
const router = express.Router();

// Winners mock model
const winnersModel = require("../model/winnersModel");

/**
 * @route  GET /winners
 * @desc   Get leaderboard array
 * @access Public
 */
router.get("/", async (req, res) => {
	const winners = winnersModel.get();

	if (winners) {
		res.json(winners);
	} else {
		res.status(401).json({ error: "Winners not found" });
	}
});

/**
 * @route  POST /winners
 * @desc   Save winner to server
 * @access Public
 */
router.post("/", (req, res) => {
	const { winner, date } = req.body;

	const winners = winnersModel.add(winner, date);
	res.json(winners);
});

module.exports = router;
