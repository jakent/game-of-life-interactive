import React from 'react';
import { mount } from 'enzyme';
import {Provider} from 'react-redux';
import {store} from '../../../store';
import Grid from '../';

describe('<Grid />', () => {

  it('should initialize one row', () => {
    const grid = mount(wrapWithProvider(<Grid cells={[[false, false]]} />));
    expect(grid.find('Cell').length).toEqual(2);
  });

  it('should initialize two rows', () => {
    const grid = mount(wrapWithProvider(<Grid cells={[[false, false], [false, true]]} />));
    expect(grid.find('.cell').length).toEqual(4);
  });

  it('should initialize a cell with its position', () => {
    const grid = mount(wrapWithProvider(<Grid cells={[[false, false], [false, true]]} />));
    expect(grid.find('Cell').first().prop('position')).toEqual({x: 0, y: 0})
  });

  const wrapWithProvider = (component) => <Provider store={store}>{component}</Provider>

});
