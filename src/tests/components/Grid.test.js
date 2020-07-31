import React from "react";
import { shallow } from "enzyme";
import Grid, { createGrid } from "../../components/Grid";

test("should render Grid correctly", () => {
	const wrapper = shallow(<Grid />);
	expect(wrapper).toMatchSnapshot();
});

test("should render Grid correctly with props", () => {
	const wrapper = shallow(<Grid rows={3} columns={7} />);
	expect(wrapper).toMatchSnapshot();
});

test("should generate grid correctly with input", () => {
	const grid = createGrid(2, 3);
	expect(grid).toEqual([
		[
			{ isStart: true, isEnd: false },
			{ isStart: false, isEnd: false },
			{ isStart: false, isEnd: false }
		],
		[
			{ isStart: false, isEnd: false },
			{ isStart: false, isEnd: false },
			{ isStart: false, isEnd: false }
		]
	]);
});
