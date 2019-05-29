import React from "react";
import classes from "./LeadersBoard.css";
import Spinner from "../Common/Spinner";

export default function LeadersBoard({ winners, winnersLoading }) {
	return (
		<div className="row py-2">
			<h2 className="col-12 text-center">Leader Board (TOP-10)</h2>
			{winnersLoading && <Spinner />}
			{!winnersLoading &&
				winners.map((winner, ind) => (
					<div key={ind} className={classes.Leader + " col-12"}>
						<div>{winner.winner}</div>
						<div>{winner.date}</div>
					</div>
				))}
		</div>
	);
}
