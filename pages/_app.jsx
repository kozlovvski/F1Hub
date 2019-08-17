import React from "react";
import { Provider } from "react-redux";
import App, {Container} from "next/app";
import Layout from "components/ui/Layout";
import withRedux from "next-redux-wrapper";
import makeStore from "../redux";

export default withRedux(makeStore, { debug: true })(
	class MyApp extends App {
		componentDidMount() {
			// Remove the server-side injected CSS.
			const jssStyles = document.querySelector("#jss-server-side");
			if (jssStyles) {
				jssStyles.parentNode.removeChild(jssStyles);
			}
		}

		static async getInitialProps({ Component, ctx }) {
			return {
				pageProps: {
					...(Component.getInitialProps
						? await Component.getInitialProps(ctx)
						: {})
				}
			};
		}

		render() {
			const { Component, pageProps, store } = this.props;
			return (
				<Container>
					<Provider store={store}>
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</Provider>
				</Container>
			);
		}
	}
);
