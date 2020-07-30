import React from 'react';
import { shallow } from 'enzyme';
import Grid, { createMatrix } from './../../components/Grid';

test('should render Grid correctly', () => {
  const wrapper = shallow(<Grid />);
  expect(wrapper).toMatchSnapshot();
});

test('should render Grid correctly with props', () => {
  const wrapper = shallow(<Grid rows={3} columns={7} />);
  expect(wrapper).toMatchSnapshot();
});

test('should generate matrix correctly with valid input', () => {
  const matrix = createMatrix(2, 3);
  expect(matrix).toEqual([
    [0,1,2],
    [3,4,5]
  ]);
});

test('should generate matrix correctly with no input', () => {
  const matrix = createMatrix();
  expect(matrix).toEqual([
    [0]
  ]);
});

test('should generate matrix correctly with invalid input', () => {
  const matrix = createMatrix('apples', 3);
  expect(matrix).toEqual([
    [0]
  ]);
});