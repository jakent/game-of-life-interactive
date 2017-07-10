import {createStore} from 'redux';

const defaultState = {
  cells: [[false, false, false], [false, false, false], [false, false, false]]
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_CELL_STATE':
      const position = action.data.position;
      const newCells = state.cells.slice();
      newCells[position.x][position.y] = action.data.alive;
      return Object.assign({}, state, { cells: newCells });
    default:
      return state;
  }
};

export const store = createStore(reducer);

export const changeCellState = (data) => store.dispatch({
    type: 'CHANGE_CELL_STATE',
    data: {position: data.position, alive: data.alive}
  }
);

