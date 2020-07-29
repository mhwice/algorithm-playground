import React from 'react';
import { shallow } from 'enzyme';
import AlgorithmPage from './../../components/AlgorithmPage';

test('should render AlgorithmPage', () => {
  const wrapper = shallow(<AlgorithmPage />);
  expect(wrapper).toMatchSnapshot();
});