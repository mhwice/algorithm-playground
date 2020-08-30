const getSettings = (index) => {
	switch (index) {
		case "1": {
			return {
				IS_WEIGHTED: false,
				IS_DIRECTED: false,
				ALGORITHM: "dfs",
				headings: [["Node", "Reached By"]],
				titles: ["Path Table"],
				INITIAL_HISTORY: [[], []]
			};
		}
		case "2": {
			return {
				IS_WEIGHTED: true,
				IS_DIRECTED: true,
				ALGORITHM: "dijkstra",
				headings: [
					["Node", "Reached By"],
					["Node", "Lowest Cost to Reach Node"],
					["Node", "Priority"]
				],
				titles: ["Path Table", "Cost Table", "Priority Queue"],
				INITIAL_HISTORY: [[], [], [], []]
			};
		}
		default: {
			return {
				IS_WEIGHTED: false,
				IS_DIRECTED: false,
				ALGORITHM: "unknown",
				headings: [],
				titles: [],
				INITIAL_HISTORY: []
			};
		}
	}
};

export { getSettings as default };
