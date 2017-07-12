import React from 'react';
import { mount } from 'enzyme';
import {Provider} from 'react-redux';
import {store} from '../../../store';
import Game from '../';
import Cell from '../../../domain/Cell'

describe('<Game />', () => {

  it('should initialize grid', () => {
    const props = {
      cells: [[new Cell(false, {x: 0, y:0}), new Cell(false, {x: 1, y:0})],
              [new Cell(false, {x: 0, y:1}), new Cell(false, {x: 1, y:1})]]
    };
    const game = mount(wrapWithProvider(<Game {...props} />));
    expect(game.find('Grid').length).toBe(1);
    expect(game.find('Grid').prop('cells')).toEqual(props.cells);
  });

  const wrapWithProvider = (component) => <Provider store={store}>{component}</Provider>

});
