import {createStore} from 'redux';
import {reducer, defaultState, changeCellState, changeGridSize, nextGeneration} from '../';
import Grid from '../../domain/Grid'
import Cell from '../../domain/Cell'


describe('store', () => {

  it('should use default state', () => {
    const store = createStore(reducer);

    expect(store.getState()).toEqual(defaultState);
  });

  it('should set grid height and width', () => {
    const store = createStore(reducer);

    store.dispatch(changeGridSize({width: 3, height: 3}));

    const nextGridState = Grid.createEmpty(3, 3);
    expect(store.getState().grid).toEqual(nextGridState);
  });

  it('should change cell state from alive to dead', () => {
    const store = createStore(reducer);
    store.dispatch(changeGridSize({width: 2, height: 2}));

    store.dispatch(changeCellState({position: {x: 0, y: 0}, alive: true}));

    const nextGridState = new Grid([
      [new Cell(true, {x: 0, y: 0}), new Cell(false, {x: 1, y: 0})],
      [new Cell(false, {x: 0, y: 1}), new Cell(false, {x: 1, y: 1})]
    ]).exportData();
    expect(store.getState().grid.exportData()).toEqual(nextGridState);
  });

  it('should update generations alive when changing cell state', () => {
    const store = createStore(reducer);
    store.dispatch(changeGridSize({width: 2, height: 2}));

    store.dispatch(changeCellState({position: {x: 0, y: 0}, alive: true}));

    expect(store.getState().grid.cells[0][0].generationsAlive).toEqual(1);
  });

  it('should detect that an empty board is stable', () => {
    const store = createStore(reducer);
    store.dispatch(changeGridSize({width: 2, height: 2}));

    store.dispatch(nextGeneration());

    expect(store.getState().stable).toEqual(true);
  });

  it('should detect that a board with a cell that dies is not stable', () => {
    const store = createStore(reducer);
    store.dispatch(changeGridSize({width: 2, height: 2}));
    store.dispatch(changeCellState({position: {x: 0, y: 0}, alive: true}));

    store.dispatch(nextGeneration());

    expect(store.getState().stable).toEqual(false);
  });

  it('should detect that a board is stable after two generations', () => {
    const store = createStore(reducer);
    store.dispatch(changeGridSize({width: 2, height: 2}));
    store.dispatch(changeCellState({position: {x: 0, y: 0}, alive: true}));

    store.dispatch(nextGeneration());
    expect(store.getState().stable).toEqual(false);

    store.dispatch(nextGeneration());
    expect(store.getState().stable).toEqual(true);
  });

  it('should detect that a board is stable with a still life', () => {
    const store = createStore(reducer);
    store.dispatch(changeGridSize({width: 4, height: 4}));
    store.dispatch(changeCellState({position: {x: 0, y: 0}, alive: true}));
    store.dispatch(changeCellState({position: {x: 0, y: 1}, alive: true}));
    store.dispatch(changeCellState({position: {x: 1, y: 0}, alive: true}));
    store.dispatch(changeCellState({position: {x: 1, y: 1}, alive: true}));

    store.dispatch(nextGeneration());

    expect(store.getState().stable).toEqual(true);
  });

  it('should detect that a board is stable with a blinker', () => {
    const store = createStore(reducer);
    store.dispatch(changeGridSize({width: 4, height: 4}));
    store.dispatch(changeCellState({position: {x: 1, y: 1}, alive: true}));
    store.dispatch(changeCellState({position: {x: 1, y: 2}, alive: true}));
    store.dispatch(changeCellState({position: {x: 1, y: 3}, alive: true}));

    store.dispatch(nextGeneration());
    store.dispatch(nextGeneration());

    expect(store.getState().stable).toEqual(true);
  });

});