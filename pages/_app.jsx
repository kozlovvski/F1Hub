import React from "react";
import App from "next/app";
import LayoutWrapper from "../components/Layout";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <LayoutWrapper name={pageProps.name}>
        <Component {...pageProps} />
      </LayoutWrapper>
    );
  }
}

export default MyApp;
