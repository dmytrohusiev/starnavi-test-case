import React from "react";
import { connect } from "react-redux";

import GameControls from "../components/GameControls/GameControls";
import GameTable from "../components/GameTable/GameTable";
import LeadersBoard from "../components/LeadersBoard/LeadersBoard";

import { fetchGameSettings, fetchWinners } from "../store/actions";

class Index extends React.Component {
	componentDidMount() {
		this.props.fetchGameSettings();
		this.props.fetchWinners();
	}

	render() {
		return (
			<div className="container py-2">
				<GameControls />
				<GameTable />
				<LeadersBoard winners={this.props.winners.slice(0, 10)} />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	winners: state.winners,
	winnersLoading: state.winnersLoading
});

const mapDispatchToProps = dispatch => ({
	fetchGameSettings: () => dispatch(fetchGameSettings()),
	fetchWinners: () => dispatch(fetchWinners())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Index);
