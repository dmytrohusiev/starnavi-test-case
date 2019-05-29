import React from "react";
import classes from "./Button.css";

export default function Button({ onClick, label, disabled }) {
	return (
		<button onClick={onClick} className={classes.Button} disabled={disabled}>
			{label}
		</button>
	);
}
