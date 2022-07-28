import React, { Component } from "react";
import { ToastContainer } from "react-toast";
import Menu from "./menu";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Menu />
        <ToastContainer delay={2500} position="top-right" />
      </React.Fragment>
    );
  }
}

export default App;
