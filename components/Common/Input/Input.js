import React from "react";
import classes from "./Input.css";
import propTypes from "prop-types";

const materialInput = props => {
	const {
		className,
		name,
		value,
		onChange,
		label,
		type,
		onBlur,
		readonly,
		autocomplete,
		...rest
	} = props;
	let wrapperClasses = [classes.Container, value !== "" ? classes.Active : ""];

	if (className) {
		if (Array.isArray(className)) {
			wrapperClasses.push(...className);
		} else {
			wrapperClasses.push(className);
		}
	}

	let error = null;
	if (props.errors) {
		wrapperClasses.push(classes.Error);
		error = <p>{props.errors}</p>;
	}

	return (
		<>
			<div className={wrapperClasses.join(" ")}>
				<input
					type={type || "text"}
					id={name}
					name={name}
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					readOnly={readonly}
					onFocus={e => {
						props.onFocus && props.onFocus(e);
					}}
					{...rest}
					autoComplete={autocomplete ? autocomplete : type === "password" ? "new-password" : "off"}
				/>
				<label htmlFor={name}>{label}</label>
				{error && <div className={["material-icons", classes.ErrorIcon].join(" ")}>error</div>}
				{error}
				<div className={classes.Focus} />
			</div>
		</>
	);
};

materialInput.propTypes = {
	className: propTypes.array,
	name: propTypes.string.isRequired,
	value: propTypes.string.isRequired,
	onChange: propTypes.func.isRequired,
	label: propTypes.string.isRequired
};

export default materialInput;
