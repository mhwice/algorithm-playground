import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./routers/AppRouter";
import "normalize.css";
import "./styles/styles.scss";
import Demo from "./playground/Demo";

ReactDOM.render(<AppRouter />, document.getElementById("app"));
