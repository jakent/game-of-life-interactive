import {createStore} from 'redux';
import Cell from '../domain/Cell'

const makeCells = (num) => {
  return new Array(num).fill(undefined).map((columns, y) => {
    return new Array(num).fill(undefined).map((row, x) => {
      return new Cell(false, {x: x, y: y})
    })
  })
};

const defaultState = {
  cells: makeCells(15)
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_CELL_STATE':
      console.log(action)
      const position = action.data.position;

      const newCells = state.cells.slice();
      newCells[position.y][position.x] = new Cell(action.data.alive, {x: position.x, y: position.y});

      return Object.assign({}, state, {cells: newCells});
    case 'NEXT_GENERATION':
      const findLivingNeighbors = (cell) => state.cells
        .reduce((a, b) => {return a.concat(b)})
        .filter(c => c.isNear(cell.position))
        .filter(c => c.alive)
        .length;

      const nextGeneration = state.cells.map((column, y) => {
        return column.map((cell, x) => {
          return cell.transform(findLivingNeighbors(cell));
        })
      });

      return Object.assign({}, state, { cells: nextGeneration });
    default:
      return state;
  }
};

export const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export const changeCellState = (data) => ({
    type: 'CHANGE_CELL_STATE',
    data: data
  }
);

export const nextGeneration = () => ({type: 'NEXT_GENERATION'});

