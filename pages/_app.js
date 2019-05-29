import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import withRedux from "next-redux-wrapper";
import { Provider } from "react-redux";

import makeStore from "../store/store";

class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

		return {
			pageProps
		};
	}

	render() {
		const { Component, pageProps, store } = this.props;

		return (
			<Container>
				<Head>
					<link
						rel="stylesheet"
						href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
						integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
						crossOrigin="anonymous"
						key="bootstrap"
					/>
				</Head>
				<Provider store={store}>
					<Component {...pageProps} />
				</Provider>
				<link
					href="https://fonts.googleapis.com/icon?family=Material+Icons"
					rel="stylesheet"
					key="MaterialIcons-font"
				/>
			</Container>
		);
	}
}

export default withRedux(makeStore)(MyApp);
