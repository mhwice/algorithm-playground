import React from "react";
import { shallow } from "enzyme";
import ShortestPathVisualizer from "../../components/ShortestPathVisualizer";

test("should render ShortestPathVisualizer correctly", () => {
	const wrapper = shallow(<ShortestPathVisualizer />);
	expect(wrapper).toMatchSnapshot();
});
