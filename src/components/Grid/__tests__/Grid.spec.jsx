import React from 'react';
import { mount } from 'enzyme';
import Grid from '../';

describe('<Grid />', () => {

  it('should initialize one row', () => {
    const grid = mount(<Grid columns={5}/>);
    expect(grid.find('.cell').length).toBe(5);
  });

  it('should initialize two rows', () => {
    const grid = mount(<Grid rows={2} columns={5}/>);
    expect(grid.find('.cell').length).toBe(10);
  });

});
