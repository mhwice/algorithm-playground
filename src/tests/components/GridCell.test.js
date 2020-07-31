import React from "react";
import { shallow } from "enzyme";
import GridCell from "../../components/GridCell";

test("should render GridCell correctly", () => {
	const wrapper = shallow(<GridCell />);
	expect(wrapper).toMatchSnapshot();
});
