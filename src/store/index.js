import {createStore} from 'redux';
import Grid from '../domain/Grid'

import preset from './gosper-glider-gun.json'

export const changeCellState = (data) => ({type: 'CHANGE_CELL_STATE', data});
export const nextGeneration = () => ({type: 'NEXT_GENERATION'});
export const startGeneration = () => ({type: 'START_GENERATION'});
export const reset = (data) => ({type: 'RESET', data});

const defaultState = {
  grid: Grid.createEmpty(10, 10),
  // grid: Grid.createRandom(20, 20),
  // grid: Grid.from(preset),
  iterations: 0
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_CELL_STATE':
      const updatedGrid = state.grid.updateCell(action.data.position, action.data.alive);
      return Object.assign({}, state, {grid: updatedGrid});
    case 'START_GENERATION':
    case 'NEXT_GENERATION':
      return Object.assign({}, state, { grid: state.grid.nextGeneration(true), iterations: state.iterations + 1 });
    case 'RESET':
      console.log(JSON.stringify(action.data));
      return Object.assign({}, state, { grid: new Grid(action.data), iterations: 0 });
    default:
      return state;
  }
};

export const store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

