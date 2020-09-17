import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "../components/HomePage";
import NotFoundPage from "../components/NotFoundPage";
import SortingAlgorithmsOverviewPage from "../components/SortingAlgorithmsOverviewPage";
import SortingAlgorithmsVisualizerPage from "../components/SortingAlgorithmsVisualizerPage";
import PathfindingAlgorithmsVisualizerPage from "../components/PathfindingAlgorithmsVisualizerPage";
import PathfindingAlgorithmsOverviewPage from "../components/PathfindingAlgorithmsOverviewPage";

const AppRouter = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/" component={HomePage} exact />
			<Route path="/pathfinding-algorithms" component={PathfindingAlgorithmsOverviewPage} exact />
			<Route path="/pathfinding-algorithms/visualizer" component={PathfindingAlgorithmsVisualizerPage} />
			<Route path="/sorting-algorithms" component={SortingAlgorithmsOverviewPage} exact />
			<Route path="/sorting-algorithms/visualizer" component={SortingAlgorithmsVisualizerPage} />
			<Route component={NotFoundPage} />
		</Switch>
	</BrowserRouter>
);

export default AppRouter;
