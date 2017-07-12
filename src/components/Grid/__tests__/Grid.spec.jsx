import React from 'react';
import { mount } from 'enzyme';
import {Provider} from 'react-redux';
import {store} from '../../../store';
import Grid from '../';

describe('<Grid />', () => {

  xit('should initialize one row', () => {
    const grid = mount(wrapWithProvider(<Grid cells={[[false, false]]} />));
    expect(grid.find('Cell').length).toEqual(2);
  });

  xit('should initialize two rows', () => {
    const grid = mount(wrapWithProvider(<Grid cells={[[false, false], [false, true]]} />));
    expect(grid.find('.cell').length).toEqual(4);
  });

  xit('should initialize a cell with its position', () => {
    const grid = mount(wrapWithProvider(<Grid cells={[[false, false], [false, true]]} />));
    expect(grid.find('Cell').first().prop('position')).toEqual({x: 0, y: 0})
  });

  xit('should tell a cell how man alive neighbors it has', () => {
    const grid = mount(wrapWithProvider(<Grid cells={[[false, true],
                                                      [false, false]]} />));
    expect(grid.find('Cell').first().prop('aliveNeighbors')).toEqual(1)
  });

  it('should tell a cell how man alive neighbors it has', () => {
    const grid = mount(wrapWithProvider(<Grid cells={[[false, true, false],
                                                      [true, false, false],
                                                      [true, true, false]]} />));
    expect(grid.find('Cell').first().prop('aliveNeighbors')).toEqual(2)
  });

  const wrapWithProvider = (component) => <Provider store={store}>{component}</Provider>

});
