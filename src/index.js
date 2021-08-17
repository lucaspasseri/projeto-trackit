import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App/App";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./css/index.css";

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);