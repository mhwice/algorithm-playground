import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./routers/AppRouter";
import "normalize.css";
import "./styles/styles.scss";
import FastGraph from "./components/FastGraph";

ReactDOM.render(<AppRouter />, document.getElementById("app"));
