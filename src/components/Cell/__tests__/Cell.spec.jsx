import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import {Cell} from '../';
import store from '../../../store'


describe('<Cell />', () => {

  it('should be DEAD', () => {
    const cell = shallow(<Cell alive={false}/>);
    expect(cell.hasClass('dead')).toBe(true);
    expect(cell.hasClass('alive')).toBeFalsy();
  });

  it('should be ALIVE', () => {
    const cell = shallow(<Cell alive={true}/>);
    expect(cell.hasClass('alive')).toBeTruthy();
    expect(cell.hasClass('dead')).toBeFalsy();
  });

  xit('should change from DEAD to ALIVE on click', () => {
    const spy = sinon.spy(store, 'changeCellState');
    const cell = shallow(<Cell alive={false} position={{x: 0, y: 0}}/>);
    cell.simulate('click');
    expect(spy.called()).toEqual(true);
  });

});
