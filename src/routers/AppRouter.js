import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "../components/HomePage";
import NotFoundPage from "../components/NotFoundPage";
import DataStructuresPage from "../components/DataStructuresPage";
import SortingAlgorithmsVisualizerPage from "../components/SortingAlgorithmsVisualizerPage";
import GraphVisualizer from "../components/GraphVisualizer";

const AppRouter = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/" component={HomePage} exact />
			<Route path="/data-structures" component={DataStructuresPage} />
			<Route path="/graph-algorithms" component={GraphVisualizer} exact />
			<Route path="/sorting-algorithms" component={SortingAlgorithmsVisualizerPage} exact />
			<Route component={NotFoundPage} />
		</Switch>
	</BrowserRouter>
);

export default AppRouter;
