import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { gameOver } from "../../store/actions";

import classes from "./GameTable.css";

class GameTable extends Component {
	static propTypes = {
		gameOver: PropTypes.func.isRequired,
		field: PropTypes.number,
		isPlaying: PropTypes.bool,
		isGameOver: PropTypes.bool,
		delay: PropTypes.number,
		name: PropTypes.string,
		winner: PropTypes.string
	};
	state = {
		playDeck: [],
		computerCount: 0,
		playerCount: 0,
		x: null,
		y: null,
		countToWin: null
	};

	componentDidMount() {
		this.props.field && this.createPlayDeck();
	}

	componentDidUpdate(prevProps, prevState) {
		prevProps.field !== this.props.field && this.createPlayDeck();
		!prevProps.isPlaying && this.props.isPlaying && this.startGame();
	}
	createPlayDeck = () => {
		const { field } = this.props;
		const playDeck = new Array(field).fill(new Array(field).fill(0));
		this.setState({ playDeck });
	};

	startGame = () => {
		this.createPlayDeck();
		this.resetCounters();
		this.setState({ countToWin: Math.pow(this.props.field, 2) / 2 });
		this.intervalId = setInterval(this.gameSequense, this.props.delay);
	};

	gameSequense = () => {
		if (this.state.x) {
			const isGameOver = this.checkResult();
			if (isGameOver) {
				return;
			}
		}
		this.getRandomCellCoordinates();
		const { y, x } = this.state;

		const playDeck = this.state.playDeck.map(row => [...row]);

		const cellValue = playDeck[y][x];
		if (cellValue === 0) {
			playDeck[y][x] = 1;
			this.setState({ playDeck });
		}
	};

	checkResult = () => {
		if (!this.props.isPlaying) {
			return true;
		}
		const { x, y } = this.state;

		const playDeck = this.state.playDeck.map(row => row.map(col => col));
		let { computerCount, playerCount } = this.state;

		if (playDeck[y][x] === 1) {
			playDeck[y][x] = 3;
			computerCount++;
		} else {
			playDeck[y][x] = 2;
			playerCount++;
		}
		this.setState({ playDeck, computerCount, playerCount });

		if (computerCount > this.state.countToWin || playerCount > this.state.countToWin) {
			clearInterval(this.intervalId);
			this.props.gameOver(computerCount < playerCount ? this.props.name : "Computer AI");
			return true;
		}
		return false;
	};

	getRandomCellCoordinates = () => {
		const { field } = this.props;
		const row = Math.floor(Math.random() * field);
		const column = Math.floor(Math.random() * field);
		const playDeck = this.state.playDeck.map(row => row.map(col => col));
		if (playDeck[row][column] === 0) {
			this.setState({ x: column, y: row });
		} else {
			this.getRandomCellCoordinates();
		}
	};

	handleCellClick = ({ currentTarget }) => {
		const value = currentTarget.getAttribute("data-value");
		if (value === "1") {
			const row = currentTarget.getAttribute("data-row");
			const col = currentTarget.getAttribute("data-col");
			const playDeck = this.state.playDeck.map(row => row.map(col => col));
			playDeck[row][col] = 2;
			this.setState({ playDeck });
		}
	};

	resetCounters = () => {
		this.setState({ computerCount: 0, playerCount: 0, x: null, y: null });
	};

	render() {
		const { playDeck } = this.state;
		const { isGameOver, winner } = this.props;
		return (
			<>
				{isGameOver && <h2 className="text-center">{winner} wins!</h2>}
				<div className={classes.Container}>
					{playDeck.map((row, rowIndex) => {
						const rowConfig = row.map((col, colIndex) => (
							<div
								key={colIndex}
								className={classes.Cell}
								onClick={this.handleCellClick}
								data-row={rowIndex}
								data-col={colIndex}
								data-value={col}
							/>
						));
						return (
							<div key={rowIndex} className={classes.Row}>
								{rowConfig}
							</div>
						);
					})}
				</div>
			</>
		);
	}
}

const mapStateToProps = state => ({
	field: state.field,
	isPlaying: state.isPlaying,
	isGameOver: state.isGameOver,
	delay: state.delay,
	name: state.name,
	winner: state.winner
});

const mapDispatchToProps = dispatch => ({
	gameOver: (isPlayerWin, name) => dispatch(gameOver(isPlayerWin, name))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GameTable);
