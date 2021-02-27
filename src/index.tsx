import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Web3ReactProvider } from "@web3-react/core";
import "./index.css";
import App, { Updaters } from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./state";
import { getLibrary } from "./utils/helpers";

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <Updaters />
        <App />
      </Provider>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
