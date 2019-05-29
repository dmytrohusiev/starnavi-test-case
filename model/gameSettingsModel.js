class GameSettingsModel {
	constructor() {
		this.gameSettings = [
			{ field: 5, delay: 1500 },
			{ field: 7, delay: 1000 },
			{ field: 10, delay: 700 }
		];
	}

	get() {
		return this.gameSettings;
	}
}

const gameSettingsInstance = new GameSettingsModel();

module.exports = gameSettingsInstance;
