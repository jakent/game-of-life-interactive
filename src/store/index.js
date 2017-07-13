import {createStore} from 'redux';
import Cell from '../domain/Cell'
import Grid from '../domain/Grid'

export const changeCellState = (data) => ({type: 'CHANGE_CELL_STATE', data: data});
export const nextGeneration = () => ({type: 'NEXT_GENERATION'});
export const startGeneration = () => ({type: 'START_GENERATION'});

const defaultState = {
  grid: Grid.createEmpty(50, 50)
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_CELL_STATE':
      const position = action.data.position;
//ask grid to update
      const newCells = state.grid.cells.slice();
      newCells[position.y][position.x] = new Cell(action.data.alive, {x: position.x, y: position.y});

      return Object.assign({}, state, {grid: new Grid(newCells)});
    case 'START_GENERATION':
    case 'NEXT_GENERATION':
      return Object.assign({}, state, { grid: state.grid.nextGeneration() });
    default:
      return state;
  }
};

export const store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

