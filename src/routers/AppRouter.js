import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "../components/HomePage";
import NotFoundPage from "../components/NotFoundPage";
import GraphAlgorithmsOverviewPage from "../components/GraphAlgorithmsOverviewPage";
import GraphAlgorithmsVisualizerPage from "../components/GraphAlgorithmsVisualizerPage";
import SortingAlgorithmsOverviewPage from "../components/SortingAlgorithmsOverviewPage";
import DataStructuresPage from "../components/DataStructuresPage";

const AppRouter = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/" component={HomePage} exact />
			<Route path="/data-structures" component={DataStructuresPage} />
			<Route path="/graph-algorithms" component={GraphAlgorithmsOverviewPage} exact />
			<Route path="/graph-algorithms/dijkstra" component={GraphAlgorithmsVisualizerPage} />
			<Route path="/graph-algorithms/depth-first-search" component={GraphAlgorithmsVisualizerPage} />
			<Route path="/sorting-algorithms" component={SortingAlgorithmsOverviewPage} />
			<Route path="/dijkstra" component={GraphAlgorithmsVisualizerPage} />
			<Route component={NotFoundPage} />
		</Switch>
	</BrowserRouter>
);

export default AppRouter;
