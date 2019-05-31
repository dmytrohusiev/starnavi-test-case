import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { setGameSettings, startGame } from "../../store/actions";

import Select from "react-select";
import Input from "../Common/Input/Input";
import Button from "../Common/Button/Button";

import classes from "./GameControls.css";

class GameControls extends Component {
	static propTypes = {
		gameSettings: PropTypes.array.isRequired,
		isPlaying: PropTypes.bool,
		isGameOver: PropTypes.bool,
		setGameSettings: PropTypes.func.isRequired,
		startGame: PropTypes.func.isRequired
	};

	state = {
		selectedGameMode: null,
		name: "",
		errors: {
			name: null,
			gameMode: null
		}
	};

	handleGameModeChange = value => {
		this.setState({ selectedGameMode: value, errors: { ...this.state.errors, gameMode: null } });
		this.props.setGameSettings(value);
	};

	handleNameChange = event => {
		const target = event.currentTarget;
		this.setState({ [target.name]: target.value });
	};

	startGame = () => {
		const { name, selectedGameMode } = this.state;
		if (name !== "" && selectedGameMode) {
			this.props.startGame(name);
		} else {
			const errors = { name: null, gameMode: null };
			if (name === "") {
				errors.name = "This field is required";
			}
			if (!selectedGameMode) {
				errors.gameMode = "Please select the game mode";
			}
			this.setState({ errors });
		}
	};

	onFocus = ({ currentTarget }) => {
		this.setState({
			errors: {
				...this.state.errors,
				[currentTarget.name || currentTarget.getAttribute("name")]: null
			}
		});
	};

	removeSelectError = () => {
		this.setState({
			errors: {
				...this.state.errors,
				gameMode: null
			}
		});
	};
	render() {
		const { gameSettings, isGameOver, isPlaying } = this.props;
		const { name, selectedGameMode, errors } = this.state;
		return (
			<div className="row my-3 justify-content-center">
				<div className="col-12 col-md-4 mb-2">
					<Select
						getOptionLabel={({ field }) => `Field size: ${field}x${field}`}
						options={gameSettings}
						placeholder="Pick game mode"
						onChange={this.handleGameModeChange}
						className={["Select", errors.gameMode ? "Error" : ""].join(" ")}
						value={selectedGameMode}
						isDisabled={isPlaying}
						onFocus={this.removeSelectError}
					/>
					{errors.gameMode && <p className={classes.Error}>{errors.gameMode}</p>}
				</div>
				<div className="col-12 col-md-4 mb-2">
					<Input
						name="name"
						value={name}
						onChange={this.handleNameChange}
						label="Enter your name"
						readOnly={isPlaying}
						errors={errors.name}
						onFocus={this.onFocus}
					/>
				</div>
				<div className="col-12 col-md-2 mb-2">
					<Button onClick={this.startGame} label={isGameOver ? "Play again" : "Play"} />
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	gameSettings: state.gameSettings,
	isPlaying: state.isPlaying,
	isGameOver: state.isGameOver
});

const mapDispatchToProps = dispatch => ({
	setGameSettings: settings => dispatch(setGameSettings(settings)),
	startGame: name => dispatch(startGame(name))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GameControls);
