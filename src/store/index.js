import {createStore} from 'redux';
import Grid from '../domain/Grid'

import preset from './gosper-glider-gun.json'

export const changeCellState = (data) => ({type: 'CHANGE_CELL_STATE', data});
export const nextGeneration = () => ({type: 'NEXT_GENERATION'});
export const startGeneration = () => ({type: 'START_GENERATION'});
export const reset = (data) => ({type: 'RESET', data});
export const changeGridSize = (data) => ({type: 'CHANGE_GRID_SIZE', data});

export const defaultState = {
  // grid: Grid.createEmpty(5, 5),
  grid: Grid.createRandom(10, 10),
  // grid: Grid.from(preset),
  history: [Grid.createEmpty(10, 10).exportData()],
  iterations: 0,
  stable: false
};

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_GRID_SIZE':
      let newGrid = Grid.createEmpty(action.data.width, action.data.height);
      return Object.assign({}, state, {grid: newGrid, history: [newGrid.exportData()]});
    case 'CHANGE_CELL_STATE':
      //add test about resetting history
      const updatedGrid = state.grid.updateCell(action.data.position, action.data.alive);
      return Object.assign({}, state, {grid: updatedGrid, history: [updatedGrid.exportData()]});
    case 'START_GENERATION':
    case 'NEXT_GENERATION':
      const nextGeneration = state.grid.nextGeneration(true);
      const nextGenerationData = nextGeneration.exportData();

      const newHistory = state.history.slice();
      newHistory.push(nextGenerationData);

      const stable = repeated(nextGenerationData, state.history);

      return Object.assign({}, state, {
        grid: state.grid.nextGeneration(true),
        iterations: state.iterations + 1,
        stable: stable ,
        history: newHistory
      });
    case 'RESET':
       return Object.assign({}, state, { grid: new Grid(action.data), iterations: 0, stable: false });
    default:
      return state;
  }
};

const repeated = (next, history) =>
  history
    .map((i) => JSON.stringify(i) === JSON.stringify(next))
    .filter((i) => i)
    .length >= 1;

export const store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

