import React, { useState, useEffect } from 'react';
import GridCell from './GridCell';

const createMatrix = (rows, columns) => {
  if (typeof rows !== 'number' || typeof columns !== 'number' || rows < 1 || columns < 1) {
    return [[0]]
  }
  let matrix = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < columns; j++) {
      row.push(i * columns + j);
    }
    matrix.push(row);
  }
  return matrix;
};

const Grid = ({ rows = 1, columns = 1}) => {

  const [matrix, setMatrix] = useState([[]]);

  useEffect(() => {
    setMatrix(createMatrix(rows, columns));
  }, []);

  return (
    <div className="grid">
      {
        matrix.map((row, rowIndex) => {
          return (
            <div className="row" key={`row${rowIndex}`}>
              {
                row.map((col) => <GridCell key={col.toString()} />)
              }
            </div>
          )
        })
      }
    </div>
  );
};

export { createMatrix, Grid as default };