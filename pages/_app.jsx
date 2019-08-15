import App from "next/app";
import Layout from "components/Layout";
import themes from "../material-ui/themes";
import { ThemeProvider } from "@material-ui/styles";

class MyApp extends App {
  state = {
    darkTheme: false
  };

  handleThemeChange = () => {
    this.setState(state => {
      return { darkTheme: !state.darkTheme };
    });
  };

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider
        theme={this.state.darkTheme ? themes.darkTheme : themes.lightTheme}
      >
        <Layout
          name={pageProps.name}
          darkTheme={this.state.darkTheme}
          handleThemeChange={this.handleThemeChange}
        >
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    );
  }
}

export default MyApp;
