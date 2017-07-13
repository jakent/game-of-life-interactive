import React from 'react';
import {shallow} from 'enzyme';
import {Game} from '../';
import Cell from '../../../domain/Cell'
import Grid from '../../../domain/Grid'

describe('<Game />', () => {

  it('should initialize grid', () => {
    const cells = [[new Cell(false, {x: 0, y:0}), new Cell(false, {x: 1, y:0})],
                   [new Cell(false, {x: 0, y:1}), new Cell(false, {x: 1, y:1})]];
    const props = {
      grid: new Grid(cells)
    };
    const game = shallow(<Game {...props} />);
    expect(game.find('Grid').length).toBe(1);
    expect(game.find('Grid').prop('cells')).toEqual(cells);
  });

});
