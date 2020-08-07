import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "../components/HomePage";
import NotFoundPage from "../components/NotFoundPage";
import GraphAlgorithmsPage from "../components/GraphAlgorithmsPage";
import ShortestPathVisualizer from "../components/ShortestPathVisualizer";
import SortingAlgorithmPage from "../components/SortingAlgorithmPage";
import DataStructuresPage from "../components/DataStructuresPage";

const AppRouter = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/" component={HomePage} exact />
			<Route path="/data-structures" component={DataStructuresPage} />
			<Route path="/graph-algorithms" component={GraphAlgorithmsPage} exact />
			<Route path="/graph-algorithms/dijkstra" component={ShortestPathVisualizer} />
			<Route path="/sorting-algorithms" component={SortingAlgorithmPage} />
			<Route component={NotFoundPage} />
		</Switch>
	</BrowserRouter>
);

export default AppRouter;
