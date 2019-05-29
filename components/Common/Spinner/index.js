import React from "react";

export default function index() {
	return (
		<>
			<div className="Spinner material-icons">autorenew</div>
			<style jsx>{`
				.Spinner {
					width: 50px;
					height: 50px;
					font-weight: bold;
					font-size: 50px;
					margin: 2rem auto;
					color: #56ccf2;
					animation: spin 0.5s infinite ease-in-out;
				}

				@keyframes spin {
					0% {
						transform: rotate(0deg);
					}
					100% {
						transform: rotate(360deg);
					}
				}
			`}</style>
		</>
	);
}
