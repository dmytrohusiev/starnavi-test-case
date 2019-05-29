class WinnersModel {
	constructor() {
		this.winners = [
			{ winner: "User Name", date: "Date and Time" },
			{ winner: "User Name", date: "Date and Time" },
			{ winner: "User Name", date: "Date and Time" }
		];
	}

	get() {
		return this.winners;
	}

	add(winner, date) {
		const { validate } = this;

		if (validate(winner) && validate(date)) {
			this.winners.unshift({ winner, date });
		}

		return this.winners;
	}

	validate(value) {
		return typeof value === "string" && value !== "";
	}
}

const winnersModelInstanse = new WinnersModel();

module.exports = winnersModelInstanse;
