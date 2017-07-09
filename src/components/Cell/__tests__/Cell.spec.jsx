import React from 'react';
import { shallow } from 'enzyme';
import Cell from '../';

describe('<Cell />', () => {

  const cell = shallow(<Cell />);

  it('should start as dead', () => {
    expect(cell.hasClass('dead')).toBeTruthy();
    expect(cell.hasClass('alive')).toBeFalsy();
  });

  it('should become alive on click', () => {
    cell.simulate('click');
    expect(cell.hasClass('alive')).toBeTruthy();
    expect(cell.hasClass('dead')).toBeFalsy();
  });

});
