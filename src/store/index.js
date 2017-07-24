import {createStore} from 'redux';
import Grid from '../domain/Grid'

import preset from './gosper-glider-gun.json'

export const changeCellState = (data) => ({type: 'CHANGE_CELL_STATE', data});
export const nextGeneration = () => ({type: 'NEXT_GENERATION'});
export const startGeneration = () => ({type: 'START_GENERATION'});
export const reset = (data) => ({type: 'RESET', data});
export const changeGridSize = (data) => ({type: 'CHANGE_GRID_SIZE', data});
export const clearGrid = (random) => ({type: 'CLEAR_GRID', random});
export const submit = () => ({type: 'SUBMIT'});

export const defaultState = {
  // grid: Grid.createEmpty(5, 5),
  grid: Grid.createRandom(10, 10),
  // grid: Grid.from(preset),
  history: [Grid.createEmpty(10, 10).exportData()],
  iterations: 0,
  stable: false,
  game: 'Create a still life'
};

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_GRID_SIZE': {
      //add test about resetting iterations
      const newGrid = Grid.createEmpty(action.data.width, action.data.height);
      return Object.assign({}, state, {grid: newGrid, history: [newGrid.exportData()]});
    }
    case 'CLEAR_GRID': {
      //add test about resetting iterations
      const newGrid = action.random ? Grid.createRandom(10, 10) : Grid.createEmpty(10, 10);
      return Object.assign({}, state, {grid: newGrid, history: [newGrid.exportData()], iterations: 0});
    }
    case 'CHANGE_CELL_STATE': {
      //add test about resetting history, setting stable
      const updatedGrid = state.grid.updateCell(action.data.position, action.data.alive);
      return Object.assign({}, state, {grid: updatedGrid, history: [updatedGrid.exportData()], stable: false});
    }
    case 'SUBMIT':
    case 'START_GENERATION':
    case 'NEXT_GENERATION': {
      console.log('action.type', action.type)

      const nextGeneration = state.grid.nextGeneration(true);
      const nextGenerationData = nextGeneration.exportData();

      const newHistory = state.history.slice();
      newHistory.push(nextGenerationData);

      const stable = repeated(nextGenerationData, state.history);

      return Object.assign({}, state, {
        grid: state.grid.nextGeneration(true),
        iterations: state.iterations + 1,
        stable: stable,
        history: newHistory,
        game: stable ? 'congratulations!' : 'Nope, not exactly what we are looking for'
      });
    }
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

