const getSettings = (index) => {
	switch (index) {
		case "1": {
			return {
				IS_WEIGHTED: false,
				IS_DIRECTED: false,
				ALLOWS_NEGATIVE: false,
				ALGORITHM: "dfs",
				HEADINGS: [["Node", "Reached By"]],
				TITLES: ["Path Table"],
				INITIAL_HISTORY: [[], []]
			};
		}
		case "2": {
			return {
				IS_WEIGHTED: true,
				IS_DIRECTED: true,
				ALLOWS_NEGATIVE: false,
				ALGORITHM: "dijkstra",
				HEADINGS: [
					["Node", "Reached By"],
					["Node", "Lowest Cost to Reach Node"],
					["Node", "Priority"]
				],
				TITLES: ["Path Table", "Cost Table", "Priority Queue"],
				INITIAL_HISTORY: [[], [], [], []]
			};
		}
		case "3": {
			return {
				IS_WEIGHTED: false,
				IS_DIRECTED: false,
				ALLOWS_NEGATIVE: false,
				ALGORITHM: "bfs",
				HEADINGS: [["Node", "Reached By"], ["Node"], ["Node"]],
				TITLES: ["Path Table", "Queue", "Visited Nodes"],
				INITIAL_HISTORY: [[], [], [], []]
			};
		}
		case "4": {
			return {
				IS_WEIGHTED: true,
				IS_DIRECTED: true,
				ALLOWS_NEGATIVE: true,
				ALGORITHM: "bellman-ford",
				HEADINGS: [
					["Node", "Reached By"],
					["Node", "Lowest Cost to Reach Node"]
				],
				TITLES: ["Path Table", "Cost Table"],
				INITIAL_HISTORY: [[], [], []]
			};
		}
		default: {
			return {
				IS_WEIGHTED: false,
				IS_DIRECTED: false,
				ALLOWS_NEGATIVE: false,
				ALGORITHM: "unknown",
				HEADINGS: [],
				TITLES: [],
				INITIAL_HISTORY: []
			};
		}
	}
};

export { getSettings as default };
